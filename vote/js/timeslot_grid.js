(function (ConfApp) {
	cjs.registerCustomPartial("timeslot_grid", {
		createNode: function(options) {
			return $("<div />").timeslot_grid(options);
		},
		destroyNode: function(node) {
			$(node).timeslot_grid("destroy");
		}
	});

	var timeslot_grid_template = cjs.createTemplate(
			"<div class='panel-heading'>" +
				"<div class='time row'>" +
					"<div class='col-xs-10'>" +
						"{{displayTimeRange(timeSlot.start_time, timeSlot.end_time)}}" +
						"<span class='day_name'>{{displayDay(timeSlot.start_time)}}</span> " +
					"</div>" + // div.col
					"<div class='col-xs-2'>" +
						"<button type='button' data-cjs-on-click=playSlotVideos class='btn btn-default btn-sm pull-right'>" +
							"<span class='glyphicon glyphicon-play-circle'></span> Previews" +
						"</button>" +
					"</div>" + // div.col
				"</div>" + // div.day.row
			"</div>" +
								
			"<div class='panel-body'>" +
				"{{#each timeSlot.events}}" +
					"{{#if isExpanded(this)}}" +
						"{{>expanded_session getExpandedSessionOptions(this)}}" +
					"{{/if}}" +
					"{{/each}}" + // events
					"{{#each gridify(timeSlot.events, 4)}}" +
						"<div class='row'>" +
							"{{#each this}}" +
								"<div id={{this.unique_id}} class='col-sm-3 gridded session_container collapsed {{isExpanded(this) ? \"expanded_thumbnail\" : \"\"}}' data-cjs-on-click=onClickSession>" +
									"<div class='session_title'>{{this.title}}</div>" +
									"<span class='session_type'>{{this.type}}</span> " +
									"{{>location db.getLocation(this.location_fk)}}" +
									"{{#if this.type=='Papers' || this.type=='alt.chi'}}" +
										"<div class='time_bubbles'>" +
											"{{#each getSubEventPercentages(db.getEventContents(this))}}" +
												"<span data-cjs-on-mouseover=onMouseoverUnexpandedBubble " +
													"data-cjs-on-mouseout=onMouseoutUnexpandedBubble " +
													"data-cjs-on-click=onClickUnexpandedBubble " +
													"class='time_bubble {{getBubbleClasses(this)}}' style='width: {{this.pct*90}}%'>" +
														"{{#if this.event.award}}" +
															"<div class='award {{this.event.award.replace(\" \", \"_\")}}'>" +
															"</div>" +
														"{{/if}}" +
												"</span>" +
											"{{/each}}" +
										"</div>" +
									"{{/if}}" +
								"</div>" + // div.col
							"{{/each}}" + // this
						"</div>" + // div.row
					"{{/each}}" + // events
				"{{/if}}" + // events
			"</div>"
	);

	$.widget("confapp.timeslot_grid", {
		options: {
			timeSlot: false,
			schedule: false,
			expandedSessions: false,
			expandedPapers: false,
			getSubEventPercentages: function(sub_events) {
				if(sub_events.length === 0) {
					return [];
				} else if(sub_events.length === 1) {
					return [{pct: 1, event: sub_events[0]}];
				} else {
					return _.map(sub_events, function(sub_e) {
						var subtype = sub_e.subtype,
							pct;
						if(subtype === "Paper") {
							pct = 0.25;
						} else if(subtype === "Note") {
							pct = 0.125;
						} else {
							pct = 0.25;
						}
						
						return { pct: pct, event: sub_e };
					});
				}
			},
			getBubbleClasses: function(bubble) {
				var event = bubble.event,
					inSchedule = ConfApp.isPaperInSchedule(event),
					votedFor = ConfApp.isPaperVotedFor(event),
					inReadingList = ConfApp.isPaperInReadingList(event),
					hasNotes = ConfApp.getPaperNotes(event);

				var classes = [];
				if(inSchedule) { classes.push("schedule"); }
				if(inReadingList) { classes.push("readinglist"); }
				if(votedFor) { classes.push("voted"); }
				if(hasNotes) { classes.push("notes"); }

				return classes.join(" ");
			},
		},

		_create: function() {
			this._super("create");

			this._addExpansionTrackers();
			this._addListeners();
			this._add_content_bindings();
			this._add_class_bindings();

		},

		_addListeners: function() {
			var schedule = this.option("schedule");

			this.$openSession = _.bind(this._openSession, this);
			this.$closeSession = _.bind(this._closeSession, this);
			//this.$openPaper = _.bind(this._openPaper, this);
			//this.$closePaper = _.bind(this._closePaper, this);

			schedule.element.on("openSession", this.$openSession)
							.on("closeSession", this.$closeSession);
							//.on("openPaper", this.$openPaper)
							//.on("closePaper", this.$closePaper);

						/*

						*/
		},

		_removeListeners: function() {
			var schedule = this.option("schedule");

			schedule.element.off("openSession", this.$openSession)
							.off("closeSession", this.$closeSession);
							//.off("openPaper", this.$openPaper)
							//.off("closePaper", this.$closePaper);
		},

		_addExpansionTrackers: function() {
			this.$expanded_sessions = cjs.map({
				hash: function(session) {
					return session.unique_id;
				},
				equals: function(a, b) {
					return a.unique_id === b.unique_id;
				}
			});
		},
		_removeExpansionTrackers: function() {
			this.$expanded_sessions.destroy(true);
		},


		_destroy: function() {
			this._super("destroy");
			this._remove_content_bindings();
			this._remove_class_bindings();
			this._removeExpansionTrackers();
			this._removeListeners();
		},

		_add_content_bindings: function() {
			var self = this,
				schedule = this.option("schedule"),
				timeSlot = this.option("timeSlot"),
				expanded_sessions = this.$expanded_sessions,
				expanded_papers   = this.$expanded_papers,
				hover_bubble = this.$hover_bubble;

			timeslot_grid_template({
				db: ConfApp.database,
				displayDay: schedule.option("displayDay"),
				displayDate: schedule.option("displayDate"),
				displayTimeRange: schedule.option("displayTimeRange"),
				timeSlot: this.option("timeSlot"),
				getSubEventPercentages: this.option("getSubEventPercentages"),
				gridify: function(arr, num_cols, also_center, flex_one_col_size) {
					var	rv = [];

					for(var i = 0; i<arr.length; i+=num_cols) {
						rv.push(arr.slice(i, i+num_cols));
					}
					
					if(also_center && (rv.length === 1)) {
						var first_row = rv[0],
							diff = (num_cols-first_row.length)/2,
							num_to_unshift = Math.floor(diff);

						while(num_to_unshift-- > 0) {
							first_row.unshift(true);
						}
					}

					return rv;
				},
				onClickSession: function(event) {
					var jqEvent;
					if(expanded_sessions.has(this)) {
					/*
						var keys = expanded_papers.keys(),
							same_parent = false,
							len = keys.length,
							i = 0, key;
						for(; i<len; i++) {
							key = keys[i];
							if(key.parent_fk === this._id) {
								same_parent = key;
								break;
							}
						}
						if(same_parent) {
							expanded_papers.remove(same_parent);
						}
						*/

						jqEvent = jQuery.Event("closeSession");
						jqEvent.session = this;
						self.element.trigger(jqEvent);
					} else {
						jqEvent = jQuery.Event("openSession");
						jqEvent.session = this;
						self.element.trigger(jqEvent);
					}
				},
				anyExpandedSessions: _.bind(function() {
					return !expanded_sessions.isEmpty();
				}, this),
				isExpanded: function(event) {
					return expanded_sessions.has(event);
				},
				onClickUnexpandedBubble: function(e) {
					e.preventDefault();
					e.stopPropagation();

					var paper = this.event;
					ConfApp.database._async_parent_getter(paper, function(session) {
						if(!expanded_sessions.has(session)) {
							jqEvent = jQuery.Event("openSession");
							jqEvent.session = session;
							self.element.trigger(jqEvent);

							//expanded_sessions.put(session, []);
						}
						jqEvent = jQuery.Event("openPaper");
						jqEvent.paper = paper;
						jqEvent.closeOthers = true;
						self.element.trigger(jqEvent);
						//onClickPaper.call(this.event, e);
					});
				},
				onMouseoverUnexpandedBubble: function(mo_event) {
					var db = ConfApp.database,
						event_people = db.getEventPeople(this.event),
						authors = ConfApp.summarizeAuthors(event_people);

					var event = this.event,
						inSchedule = ConfApp.isPaperInSchedule(event),
						votedFor = ConfApp.isPaperVotedFor(event),
						inReadingList = ConfApp.isPaperInReadingList(event),
						hasNotes = ConfApp.getPaperNotes(event),
						icons = [],
						//annotations = db.getEventAnnotations(event),
						award = this.event.award;
						//annotations.length > 0 ? annotations[0].name : "";
				

					if(inSchedule) { icons.push("schedule"); }
					if(inReadingList) { icons.push("readinglist"); }
					if(votedFor) { icons.push("vote"); }
					if(hasNotes) { icons.push("note"); }

					$(mo_event.target).popover({
						html: true,
						content: "<div class='pover'>"+
									"<div class='ev_title'>" + this.event.title + "</div>" +
									"<div class='ev_authors'>" + authors + "</div>" +
									(award.length > 0 ? "<div class='award " + award.replace("Honorable Mention", "Honorable_Mention") + "'>" + award.replace("Best", "Best Paper") + "</div>"  : "") +
										(icons.length>0 ? "<div class='icon_row selected'>" + _.map(icons, function(i) {
											return "<span class='conficon conficon-"+i+"'></span>";
										}).join(" ") +"</div>" : "") +
								"</div>",
						placement: 'bottom'
					}).popover("show");
				},
				onMouseoutUnexpandedBubble: function(mo_event) {
					$(mo_event.target).popover("destroy");
				},
				isHoverTarget: function(ev) {
					return hover_bubble.get() === ev;
				},
				playSlotVideos: function(event) {
					event.preventDefault();
					event.stopPropagation();

					ConfApp.database._async_get_session_attachments(timeSlot.events, function(attachments) {
						var jqEvent = jQuery.Event("playVideos"),
							youtube_attachments = _.filter(attachments, function(attachment) {
								return attachment.type === "YoutubeVP";
							}),
							codes = _.pluck(youtube_attachments, "url"),
							codes_str = codes.join(","),
							displayDay = schedule.option("displayDay"),
							displayTimeRange = schedule.option("displayTimeRange");

						jqEvent.videoTitle = displayDay(timeSlot.start_time) + " " + displayTimeRange(timeSlot.start_time, timeSlot.end_time);
						jqEvent.videoURL = "embed?playlist=" + codes_str + "&autoplay=1";
						self.element.trigger(jqEvent);
					});
				},
				//onClickPaper: onClickPaper,
				isPaperExpanded: function(event) {
					return expanded_papers.has(event);
				},
				togglePaperSchedule: function(e) {
					ConfApp.togglePaperInSchedule(this);
					e.preventDefault();
					e.stopPropagation();
				},
				togglePaperReadingList: function(e) { 
					ConfApp.togglePaperInReadingList(this);
					e.preventDefault();
					e.stopPropagation();
				},
				togglePaperVote: function(e) {
					ConfApp.togglePaperVote(this);
					e.preventDefault();
					e.stopPropagation();
				},
				getBubbleClasses: this.option("getBubbleClasses"),
				filterAuthor: function(e) {
					var jqEvent = jQuery.Event("addFilter");
					jqEvent.filter = new ConfApp.PersonFilter(this);
					self.element.trigger(jqEvent);

					e.preventDefault();
					e.stopPropagation();
				},

				round: _.bind(Math.round, Math),

				getPaperNotes: ConfApp.getPaperNotes,
				isPaperVotedFor: ConfApp.isPaperVotedFor,
				getExpandedPaperOptions: function(paper) {
					return {
						paper: paper
					};
				},
				getExpandedSessionOptions: function(session) {
					return {
						session: session,
						schedule: self.option("schedule"),
						timeSlot: self.option("timeSlot"),
						getBubbleClasses: self.option("getBubbleClasses"),
						getSubEventPercentages: self.option("getSubEventPercentages")
					};
				},

				onNotesChange: _.throttle(function(e) {
					var value = $(e.target).val();
					ConfApp.setPaperNotes(this, value);
				}, 900)
			}, this.element);
		},
		_remove_content_bindings: function() {
			cjs.destroyTemplate(this.element);
		},

		_add_class_bindings: function() {
			this.element.addClass("panel panel-default");
		},
		_remove_class_bindings: function() {
			this.element.removeClass("panel panel-default");
		},

		_openSession: function(event) {
			var session = event.session,
				timeSlot = this.option("timeSlot"),
				db = ConfApp.database;
			if(session.start_time >= timeSlot.start_timestamp && session.end_time <= timeSlot.end_timestamp) {
				if(_.any(timeSlot.events, function(tse) {
						return tse._id === session._id;
					})) {
					this.$expanded_sessions.put(session, true);
					if(event.alsoScroll !== false) {
						_.delay(function() {
							$("#"+session.unique_id, self.element).goTo();
						}, 100);
					}
				}
			}
		},

		_closeSession: function(event, callback) {
			var session = event.session,
				timeSlot = this.option("timeSlot"),
				db = ConfApp.database;
			if(session.start_time >= timeSlot.start_timestamp && session.end_time <= timeSlot.end_timestamp) {
				if(_.any(timeSlot.events, function(tse) {
						return tse._id === session._id;
					})) {
					this.$expanded_sessions.remove(session);
					_.delay(_.bind(function() {
						$(this.element).goTo();
					}, this), 100);
					if(callback) { callback(); }
				}
			}
		},

/*
		_openPaper: function(event, callback) {
			var paper = event.paper,
				timeSlot = this.option("timeSlot"),
				db = ConfApp.database,
				self = this;
			if(paper.start_time >= timeSlot.start_timestamp && paper.end_time <= timeSlot.end_timestamp) {
				db._async_parent_getter(paper, function(session) {
					if(_.any(timeSlot.events, function(tse) {
							return tse._id === session._id;
						})) {
						self.$expanded_sessions.put(session, true);
						self.$expanded_papers.put(paper, true);
						if(callback) { callback(); }
						if(event.alsoScroll !== false) {
							_.delay(function() {
								$("#"+paper.unique_id, self.element).goTo();
							}, 100);
						}
					}
				});
			}
		},

		_closePaper: function(event) {
			var paper = event.paper,
				timeSlot = this.option("timeSlot"),
				db = ConfApp.database,
				self = this;
			if(paper.start_time >= timeSlot.start_timestamp && paper.end_time <= timeSlot.end_timestamp) {
				db._async_parent_getter(paper, function(session) {
					if(_.any(timeSlot.events, function(tse) {
							return tse._id === session._id;
						})) {
						self.$expanded_papers.remove(paper, true);
					}
				});
			}
		}
		*/
	});
}(ConfApp));
						/*
						"<div class='col-md-12 gridded expanded session_header'>" +
							"<div class='row'>" +
								"<div id={{this.unique_id}} class='col-md-2 user_save_icons'>" +
									"<button data-cjs-on-click=onClickSession type='button' class='close pull-left close_session' data-dismiss='modal'>{{{'&times;'}}}</button>" +
									"<div class='unselectable schedule icon_row {{isSessionInSchedule(this) ? \"selected\" : \"not_selected\"}}' data-cjs-on-click=toggleSessionSchedule>" +
										"<span class='conficon_label'>Schedule </span><span class='conficon conficon-schedule'></span>" +
									"</div>" +
									"<div class='unselectable readinglist icon_row {{isSessionInReadingList(this) ? \"selected\" : \"not_selected\"}}' data-cjs-on-click=toggleSessionReadingList>" +
										"<span class='conficon_label'>Reading List </span><span class='conficon conficon-readinglist'></span>" +
									"</div>" +
								"</div>" +
								"<div class='col-md-10'>" +
									"<h3 class='session_title'>" +
										"{{this.title}}" +
										"<button type='button' data-cjs-on-click=playSessionVideos class='btn btn-default btn-sm pull-right'>" +
											"<span class='glyphicon glyphicon-play-circle'></span> Previews" +
										"</button>" +
									"</h3>" +
									"<h5>" +
										"<span class='session_type'>{{this.type}}</span> / " +
										"{{>location db.getLocation(this.location_fk)}}" +
										"{{#if getChair(this)}}" + 
											"<br/>Chair: {{getChair(this)}}" +
										"{{/if}}" +  //getchair
									"</h5>" +
								"</div>" + // div.col
							"</div>" +
						"</div>" +
						"{{#if this.type=='Interactivity' || this.type=='Papers' || this.type=='alt.chi'}}" +
							"<div class='col-md-12 gridded expanded'>" +
								"{{#if this.type=='Papers' || this.type=='alt.chi'}}" +
									"<div class='time_bubbles row session_header'>" +
										"<div class='col-md-10 col-md-offset-2'>" +
											"{{#each getSubEventPercentages(db.getEventContents(this))}}" +
												"<span data-cjs-on-mouseover=onMouseoverExpandedBubble " +
													"data-cjs-on-mouseout=onMouseoutExpandedBubble " +
													"data-cjs-on-click=onClickBubble " +
													"class = 'time_bubble {{getBubbleClasses(this)}} {{isHoverTarget(this.event) ? \"hover\" : \"\"}}' " +
													"style='width: {{this.pct*90}}%'>" +
														"{{#if this.event.award}}" +
															"<div class='award {{this.event.award.replace(\" \", \"_\")}}'>" +
															"</div>" +
														"{{/if}}" +
													"</span> " +
											"{{/each}}" +
										"</div>" +
									"</div>" + // div.col
								"{{/if}}" + //papers or alt.chi
								"{{#each db.getEventContents(this)}}" +
									"<div id={{this.unique_id}} class='paper row {{isPaperExpanded(this) ? \"expanded\" : \"collapsed\"}} {{(isHoverTarget(this) || isPaperExpanded(this)) ? \"highlight\" : \"no_highlight\"}}' " +
											"data-cjs-on-mouseover=onMouseoverExpandedPaperRow " +
											"data-cjs-on-mouseout=onMouseoutExpandedPaperRow " +
											"data-cjs-on-click=onClickPaper " +
									">" +
										"<div class='col-md-12'>" +
											"{{#if isPaperExpanded(this)}}" +
												"{{>expanded_paper getExpandedPaperOptions(this)}}" +
											"{{#else}}" +
												"<div class='row'>" +
													"<div class='col-sm-1 icon_row selected'>" +
														"{{#if isPaperInSchedule(this)}}" +
															"<span class='conficon conficon-schedule'></span>" +
														"{{/if}}" +
														"{{#if isPaperInReadingList(this)}}" +
															"<span class='conficon conficon-readinglist'></span>" +
														"{{/if}}" +
														"{{#if isPaperVotedFor(this)}}" +
															"<span class='conficon conficon-vote'></span>" +
														"{{/if}}" +
														"{{#if getPaperNotes(this)}}" +
															"<span class='conficon conficon-note'></span>" +
														"{{/if}}" +
													"</div>" +
													"<div class='col-sm-1 icon_row selected'>" +
														"{{#if this.award}}" +
															"<div class='award {{this.award.replace(\" \", \"_\")}}'>" +
															"</div>" +
														"{{/if}}" +
													"</div>" +
													"<div class='col-sm-10'>" +
														"<span class='pull-right type'>{{this.subtype}}</span>" +
														"<div class='paper_title'>" +
															"<div class='title'>{{this.title}}</div>" +
														"</div>" +
														"<div class='authors'>" +
															"<div class='author_summary'>{{summarizeAuthors(db.getEventPeople(this))}}</div>" +
														"</div>" +
													"</div>" +
												"</div>" +
											"{{/if}}" +
										"</div>" +
									"</div>" +
								"{{/each}}" +
							"</div>" + // div.col
						"{{#else}}" + // papers or altchi
							"<div class='col-md-12 expanded'>" +
								"<p>" +
									"{{this.description}}" +
								"</p>" +
							"</div>" +
						"{{/if}}" + // papers or altchi
						*/
