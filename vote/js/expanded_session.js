(function (ConfApp) {
	cjs.registerCustomPartial("expanded_session", {
		createNode: function(options) {
			return $("<div />").expanded_session(options);
		},
		destroyNode: function(node) {
			$(node).expanded_session("destroy");
		}
	});

	var expanded_session_template = cjs.createTemplate(
			"<div class='col-md-12 gridded expanded session_header'>" +
				"<div class='row'>" +
					"<div id={{session.unique_id}} class='col-md-2 user_save_icons'>" +
						"<button data-cjs-on-click=closeSession type='button' class='close pull-left close_session' data-dismiss='modal'>{{{'&times;'}}}</button>" +
						"<div class='unselectable schedule icon_row {{isSessionInSchedule(session) ? \"selected\" : \"not_selected\"}}' data-cjs-on-click=toggleSessionSchedule>" +
							"<span class='conficon_label'>Schedule </span><span class='conficon conficon-schedule'></span>" +
						"</div>" +
						"<div class='unselectable readinglist icon_row {{isSessionInReadingList(session) ? \"selected\" : \"not_selected\"}}' data-cjs-on-click=toggleSessionReadingList>" +
							"<span class='conficon_label'>Reading List </span><span class='conficon conficon-readinglist'></span>" +
						"</div>" +
					"</div>" +
					"<div class='col-md-10'>" +
						"<h3 class='session_title'>" +
							"{{session.title}}" +

							"{{#if anyVideos}}" + 
								"<button type='button' data-cjs-on-click=playSessionVideos class='btn btn-default btn-sm pull-right'>" +
									"<span class='glyphicon glyphicon-play-circle'></span> Previews" +
								"</button>" +
							"{{/if}}" + 
						"</h3>" +
						"<h5>" +
							"<span class='session_type'>{{session.type}}</span> / " +
							"{{>location db.getLocation(session.location_fk)}}" +
							"{{#if getChair(session)}}" + 
								"<br/>Chair: {{getChair(session)}}" +
							"{{/if}}" +  //getchair
						"</h5>" +
					"</div>" + // div.col
					/*
						"<div class='col-md-2'>" +
							"{{#with db.getLocation(this.location_fk)}}" +
								"<div class='location row' style='background-image:url(\"images/{{this.map_file}}\"); background-position:{{this.map_x*100}}% {{this.map_y*100}}%; background-size:700px; background-repeat: no-repeat; height: 70px'>" +
									"(map)" +
								"</div>" +
							"{{/with}}" +
						"</div>" +
						*/
				"</div>" +
			"</div>" +
			"{{#if session.type=='Posters' || session.type=='Interactivity' || session.type=='Papers' || session.type=='alt.chi'}}" +
				"<div class='col-md-12 gridded expanded'>" +
					"{{#if session.type=='Papers' || session.type=='alt.chi'}}" +
						"<div class='time_bubbles row session_header'>" +
							"<div class='col-md-10 col-md-offset-2'>" +
								"{{#each getSubEventPercentages(db.getEventContents(session))}}" +
									"<span data-cjs-on-mouseover=onMouseoverExpandedBubble " +
										"data-cjs-on-mouseout=onMouseoutExpandedBubble " +
										"data-cjs-on-click=onClickPaper " +
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
					"{{#each db.getEventContents(session)}}" +
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
						"{{session.description}}" +
					"</p>" +
				"</div>" +
			"{{/if}}" + // papers or altchi
			""
	);

	$.widget("confapp.expanded_session", {
		options: {
			schedule: false,
			session: false,
			timeSlot: false,
			getSubEventPercentages: false,
			getBubbleClasses: false
		},

		_create: function() {
			this._super("create");

			this._addExpansionTrackers();
			this._addListeners();
			this._add_content_bindings();
			this._add_class_bindings();
		},

		_addListeners: function() {
			var session = this.option("session");

			var schedule = this.option("schedule");

			this.$openSession = _.bind(this._openSession, this);
			this.$openPaper = _.bind(this._openPaper, this);
			this.$closePaper = _.bind(this._closePaper, this);

			schedule.element.on("openSession", this.$openSession)
							.on("openPaper", this.$openPaper)
							.on("closePaper", this.$closePaper);
		},

		_removeListeners: function() {
			var schedule = this.option("schedule");

			schedule.element.off("openSession", this.$openSession)
							.off("openPaper", this.$openPaper)
							.off("closePaper", this.$closePaper);
		},

		_addExpansionTrackers: function() {
			this.$expanded_papers = cjs.map({
				hash: function(paper) {
					return paper.unique_id;
				},
				equals: function(a, b) {
					return a.unique_id === b.unique_id;
				}
			});
			this.$hover_bubble = cjs(false);
		},
		_removeExpansionTrackers: function() {
			this.$expanded_papers.destroy(true);
			this.$hover_bubble.destroy(true);
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
				session = this.option("session"),
				schedule = this.option("schedule"),
				timeSlot = this.option("timeSlot"),
				expanded_papers   = this.$expanded_papers,
				hover_bubble = this.$hover_bubble;
			this.anySessionVideos = cjs(false);
			var anySessionVideos = this.anySessionVideos;

			ConfApp.database._async_get_session_attachments(session, function(anyVideos) {
				anySessionVideos.set(anyVideos);
			}, true);

			expanded_session_template({
				db: ConfApp.database,
				session: session,
				toggleSessionSchedule: function(e) {
					ConfApp.toggleSessionInSchedule(session);
					e.preventDefault();
					e.stopPropagation();
				},
				toggleSessionReadingList: function(e) { 
					ConfApp.toggleSessionInReadingList(session);
					e.preventDefault();
					e.stopPropagation();
				},
				getChair: function(session) {
					var people = ConfApp.database.getEventPeople(session);
					if(people) {
						if(people[0]) {
							return people[0].name;
						}
					}
					return "";
				},
				playSessionVideos: function(event) {
					event.preventDefault();
					event.stopPropagation();

					ConfApp.database._async_get_session_attachments(session, function(attachments) {
						var jqEvent = jQuery.Event("playVideos"),
							youtube_attachments = _.filter(attachments, function(attachment) {
								return attachment.type === "YoutubeVP";
							}),
							codes = _.pluck(youtube_attachments, "url"),
							codes_str = codes.join(","),
							displayDay = schedule.option("displayDay"),
							displayTimeRange = schedule.option("displayTimeRange");

						jqEvent.videoTitle = session.title;
						jqEvent.videoURL = "embed?playlist=" + codes_str + "&autoplay=1";
						self.element.trigger(jqEvent);
					});
				},
				onMouseoverExpandedPaperRow: function(mo_event) {
					hover_bubble.set(this);
				},
				onMouseoutExpandedPaperRow: function(mo_event) {
					hover_bubble.set(false);
				},
				onMouseoverExpandedBubble: function(mo_event) {
					hover_bubble.set(this.event);
				},
				onMouseoutExpandedBubble: function(mo_event) {
					hover_bubble.set(false);
				},
				closeSession: function(event) {
					var jqEvent =jQuery.Event("closeSession");

					jqEvent.session = session;
					self.element.trigger(jqEvent);
				},
				isHoverTarget: function(ev) {
					return hover_bubble.get() === ev;
				},
				onClickPaper: onClickPaper,
				isSessionInSchedule: ConfApp.isSessionInSchedule,
				isSessionInReadingList: ConfApp.isSessionInReadingList,
				isPaperInSchedule: ConfApp.isPaperInSchedule,
				isPaperInReadingList: ConfApp.isPaperInReadingList,
				getSubEventPercentages: this.option("getSubEventPercentages"),
				getBubbleClasses: this.option("getBubbleClasses"),
				isPaperExpanded: function(event) {
					return expanded_papers.has(event);
				},
				getExpandedPaperOptions: function(paper) {
					return {
						paper: paper
					};
				},
				anyVideos: this.anySessionVideos
			}, this.element);

			function onClickPaper(c_event) {
				c_event.preventDefault();
				c_event.stopPropagation();
				var paper = this;
				if(paper.event) {
					paper = paper.event;
				}
				if(expanded_papers.has(paper)) {
				/*
					var tagName = c_event.target.tagName.toUpperCase();
					if(tagName !== 'BUTTON' && tagName !== 'TEXTAREA') {
						var jqEvent = jQuery.Event("closePaper");
						jqEvent.paper = this;
						self.element.trigger(jqEvent);
					}
					*/
				} else {
				/*
					var keys = expanded_papers.keys(),
						same_parent = false,
						len = keys.length,
						i = 0, key;
					for(; i<len; i++) {
						key = keys[i];
						if(key.parent_fk === paper.parent_fk) {
							same_parent = key;
							break;
						}
					}
					if(same_parent) {
						expanded_papers.remove(same_parent);
					}
					*/
					var jqEvent = jQuery.Event("openPaper");
					jqEvent.paper = paper;
					jqEvent.closeOthers = true;
					self.element.trigger(jqEvent);
				}
			}
		},
		_remove_content_bindings: function() {
			cjs.destroyTemplate(this.element);
			this.anySessionVideos.destroy(true);
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
					if(event.alsoScroll !== false) {
						_.delay(function() {
							$("#"+session.unique_id, self.element).goTo();
						}, 100);
					}
				}
			}
		},

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
						if(event.closeOthers) {
							self.$expanded_papers.clear();
						}
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
	});
}(ConfApp));
