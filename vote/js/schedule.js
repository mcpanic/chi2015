(function (ConfApp) {
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		ampm = ["AM", "PM"],
		day_playlists = {
			"Monday": "PLn0nrSd4xjjYVVJ0ZrOb1-3md2P-F0WeA",
			"Tuesday": "PLn0nrSd4xjjbSC9xHtJJtCYQih73yvppU",
			"Wednesday": "PLn0nrSd4xjjZtg9r6vH1LIKI8pY3M3XHK",
			"Thursday": "PLn0nrSd4xjjaakmOUZOBu5-JLicawDNcv"
		};

	function pad(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	var location_template = cjs.createTemplate(
		"<span class='session_location'>{{this.name}}</span>"
	);

	cjs.registerPartial("location", location_template);

	var schedule_template = cjs.createTemplate(
		"{{#if db.isLoaded()}}" +
			"{{>modal_map}}" +
			"{{>modal_video}}" +
			"{{>voter_id_inp getVoterIDOptions()}}" +
			"{{>navbar getNavbarOptions() }}" +
			"{{#each getDays(db, filters)}}" +
				"<div class='row timeslot' id='tstamp_{{round(this.getTime()/1000)}}'>" +
					"<div class='day col-sm-8'>" +
						"<span class='day_name'>{{displayDay(this)}}</span> " +
						"<span class='date_name'>{{displayDate(this)}}</span> " +
						"<a class='dayVideoPreviews' href='#' data-cjs-on-click='playDayVideos'>" +
							"<span class='glyphicon glyphicon-play-circle'></span> Previews" +
						"</a>" +
					"</div>" + // div.col
				"</div>" + // div.day.row
				"{{#each getTimeSlots(this, db, filters)}}" +
					"<div class='row' id='tstamp_{{this.start_timestamp}}'>" +
						"<div class='col-md-12'>" +
							"{{#if isSingularEvent(this)}}" +//this.events.length === 1 && events[0]}}" +
								"<div class='panel panel-default'>" +
									"<div class='panel-body'>" +
										"<div class='row'>" +
											"<div class='col-md-2'>" +
												"<div class='time'>{{displayTimeRange(this.start_time, this.end_time)}}</div> " +
												"<span class='day_name'>{{displayDay(this.start_time)}}</span> " +
											"</div>" + // div.col
											"{{#each this.events}}" +
												"<div class='col-md-4 full_row session_container' " +
														"data-cjs-on-click=onClickSession " +
														"class='{{isExpanded(this) ? \"expanded_thumbnail\" : \"\" }}'" +
														">" +
													"<div class='session_title'>{{this.title}}</div> " +
													"<span class='session_type'>{{this.type}}</span> " +
													"{{>location db.getLocation(this.location_fk)}}" +
												"</div>" + // div.col
												"<div class='col-md-2'>" +
													"<div class='schedule unselectectable icon_row {{isSessionInSchedule(this) ? \"selected\" : \"not_selected\"}}' data-cjs-on-click=toggleSessionSchedule>" +
														"<span class='conficon conficon-schedule'></span><span class='conficon_label'> Schedule</span>" +
													"</div>" +
												"</div'>" +
											"{{/each}}" + // events
										"</div>" + // div.row
										"{{#if isExpanded(this)}}" +
											"{{>expanded_session getExpandedSessionOptions(this)}}" +
										"{{/if}}" +
									"</div>" +
								"</div>" +
							"{{#else}}" +
								"{{>timeslot_grid getTGridOptions(this)}}" +
							"{{/if}}" + // events.length===1
						"</div>" + // div.col
					"</div>" + // div.row
				"{{/each}}" +
			"{{/each}}" +
			"<footer>" +
				"<a class='pull-left' href='http://cjs.from.so/' target=_blank>" +
					"<img src='images/cjs_logo_64.png' style='height:16px;'/>" +
					//" Powered by ConstraintJS"+
				"</a>" +
				"<a class='pull-right' href='mailto:mobileapps@chi2015.acm.org?subject=CHI2015 Web Program' target=_blank>" +
					"Contact: mobileapps@chi2015.acm.org"+
				"</a>" +
			"</footer>" +
		"{{#else}}" +
			"<div class='row'>" +
				"<div class='col-md-12 loading'>" +
					"loading..." +
				"</div>" + // loading col
			"</div>" + // row
		"{{/if}}"
	);

	cjs.__debug = true;

	$.widget("confapp.schedule", {
		options: {
			db_url: 'chi_2015_0.1.1.json',
			displayDay: function(time) {
				return days[time.getDay()];
			},

			displayDate: function(time) {
				return months[time.getMonth()] + " " + time.getDate();
			},

			displayTimeRange: function(start_time, end_time) {
				var start_hours = start_time.getHours(),
					end_hours = end_time.getHours(),
					ampm = "AM";

				if(end_hours >= 12) {
					ampm = "PM";
					end_hours -= 12;
				}

				if(start_hours >= 12) {
					start_hours -= 12;
				}
				
				if(start_hours === 0) { start_hours = 12; }
				if(end_hours === 0)   { end_hours = 12; }

				return start_hours+":" + pad(start_time.getMinutes(), 2)+"-"+end_hours+":"+pad(end_time.getMinutes(), 2) + " " + ampm;
			},

			getDays: function(db, filters) {
				filters = cjs.get(filters);
				var days = db.getDays();
				//if(filters && filters.length > 0) {
					days = _.filter(days, function(day) {
						var events = db.getDayEvents(day);
						return events.length>0;
						/*
						return _.any(events, function(event) {
							return _.any(filters, function(filter) {
								return filter.matches(event);
							});
						});
						*/
					});
				////}
				return days;
			},

			getTimeSlots: function(time, db, filters) {
				filters = cjs.get(filters);
				var events = (filters && filters.length > 0) ? _.filter(db.getDayEvents(time), function(event) {
						return _.any(filters, function(filter) {
							return filter.matches(event);
						});
					}) : _.clone(db.getDayEvents(time)),

					slot_map = {},
					slots = [];
				_.each(events, function(e) {
					var time_id = "t" + e.start_time + "_" + e.end_time;
					if(_.has(slot_map, time_id)) {
						slot_map[time_id].push(e);
					} else {
						slot_map[time_id] = [e];
					}
				});

				_.each(slot_map, function(events, key) {
					var start_timestamp = events[0].start_time,
						end_timestamp = events[0].end_time;

					events.sort(function(a, b) { return a.location_fk - b.location_fk; });
					slots.push({
						events: events,
						start_time: new Date(start_timestamp*1000 + db._time_offset ),
						end_time: new Date(end_timestamp*1000 + db._time_offset),
						start_timestamp: start_timestamp,
						end_timestamp: end_timestamp
					});
				});
				slots.sort(function(a, b) { return a.start_timestamp - b.start_timestamp; });

				return slots;
			}
		},

		_create: function() {
			var self = this;

			this._super("create");
			ConfApp.load_db(this.option("db_url"));
			this.$filters = cjs([]);
			this._add_listeners();
			this._add_content_bindings();

			var gotoHash = function(hash) {
				if(hash) {
					ConfApp.database._async_unique_id_sessions_getter(hash, function(event) {
						if(event) {
							var jqEvent;
							if(event.top_level) {
								jqEvent = jQuery.Event("openSession");
								jqEvent.session = event;
								jqEvent.changeState = false;
								self.element.trigger(jqEvent);
							} else {
								jqEvent = jQuery.Event("openPaper");
								jqEvent.paper = event;
								jqEvent.changeState = false;
								self.element.trigger(jqEvent);
							}
						}
					});
				}
			};

			var onLoaded = _.bind(function() {
					var hash = History.getHash();

					if(hash) {
						gotoHash(hash);
					} else {
						var getTimeSlots = this.option("getTimeSlots"),
							db = ConfApp.database;
						
						db._get_closest_start_time(function(closest_tstamp) {
							if(closest_tstamp) {
								_.delay(function() {
									$("#tstamp_"+closest_tstamp).goTo();
								}, 500);
							}
						});
					}

					History.Adapter.bind(window, 'anchorchange', function() { // Note: We are using statechange instead of popstate
						var hash = History.getHash();
						gotoHash(hash);
					});
					History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
						console.log("STATE CHANGE", arguments);
					});
				}, this),
				live_fn = cjs.liven(function() {
					if(ConfApp.database.isLoaded()) {
						onLoaded();
						live_fn.destroy();
					}
				},  {
					run_on_create: false
				});
			live_fn.run();
		},

		_destroy: function() {
			this._super("destroy");
			this._remove_content_bindings();
			this._remove_listeners();
		},

		_add_listeners: function() {
			this.$expanded_sessions = cjs.map({
				hash: function(session) {
					return session.unique_id;
				},
				equals: function(a, b) {
					return a.unique_id === b.unique_id;
				}
			});
			this.element.on("addFilter", $.proxy(this.addFilter, this))
						.on("removeFilter", $.proxy(this.removeFilter, this))
						.on("openSession", $.proxy(this.openSession, this))
						.on("closeSession", $.proxy(this.closeSession, this))
						.on("openPaper", $.proxy(this.openPaper, this))
						.on("closePaper", $.proxy(this.closePaper, this))
						.on("playVideos", $.proxy(this.playVideos, this));
		},
		_remove_listeners: function() {
			this.$expanded_sessions.destroy(true);
		},

		_add_content_bindings: function() {
			var self = this,
				expanded_sessions = this.$expanded_sessions;
			schedule_template({
				db: ConfApp.database,
				filters: this.$filters,
				displayDay: this.option("displayDay"),
				displayDate: this.option("displayDate"),
				getTimeSlots: this.option("getTimeSlots"),
				displayTimeRange: this.option("displayTimeRange"),
				getDays: this.option("getDays"),
				getTGridOptions: _.bind(function(timeslot) {
					return {
						schedule: this,
						timeSlot: timeslot
					};
				}, this),
				getVoterIDOptions: _.bind(function() {
					return {
						database: ConfApp.database
					};
				}, this),
				getNavbarOptions: _.bind(function(timeslot) {
					return {
						dropboxName: ConfApp.dropboxName,
						database: ConfApp.database,
						schedule: this
					};
				}, this),
				toggleSessionSchedule: function(e) {
					ConfApp.toggleSessionInSchedule(this);
					e.preventDefault();
					e.stopPropagation();
				},
				isSingularEvent: function(e_block) {
					var type = e_block.events[0].type;
					return e_block.events.length === 1 && (type !== "Papers" && type !== "alt.chi");
				},
				isSessionInSchedule: ConfApp.isSessionInSchedule,
				playDayVideos: function(event) {
					var jqEvent = jQuery.Event("playVideos"),
						time = this;
					jqEvent.videoTitle = days[time.getDay()];
					jqEvent.videoURL = "embed?list="+day_playlists[days[time.getDay()]]+"&autoplay=1&html5=1";
					self.element.trigger(jqEvent);

					event.preventDefault();
					event.stopPropagation();
				},
				onClickSession: function(e) {
					var session = this;
					if(expanded_sessions.has(session)) {
						expanded_sessions.remove(session);
					} else {
						expanded_sessions.put(session, true);
					}
					e.preventDefault();
					e.stopPropagation();
				},
				isExpanded: function(timeSlot) {
					var session;
					if(timeSlot.events) {
						session = timeSlot.events[0];
					} else {
						session = timeSlot;
					}
					return expanded_sessions.has(session);
				},
				getExpandedSessionOptions: function(timeSlot) {
					var session = timeSlot.events[0];
					return {
						session: session,
						schedule: self,
						timeSlot: timeSlot,
						getBubbleClasses: self.option("getBubbleClasses"),
						getSubEventPercentages: self.option("getSubEventPercentages")
					};
				},
				round: _.bind(Math.round, Math)
			}, this.element);
		},
		_remove_content_bindings: function() {
			cjs.destroyTemplate(this.element);
			this.loading_state.destroy();
			this.$expanded_sessions.destroy();
		},
		openSession: function(event) {
			if(event.changeState !== false) {
				var session = event.session;
				//History.pushState({type: "session", event: session}, session.title, "#"+session.unique_id);
			}
		},
		closeSession: function(event) {
			var session = event.session;
			this.$expanded_sessions.remove(session);
		/*
				currIndex = History.getCurrentIndex(),
				diff = 0,
				state;
			while(currIndex > 0) {
				state = History.getStateByIndex(currIndex);
				if(state.event === session) {
					console.log(diff);
					History.go(diff);
					break;
				}
				diff--;
				currIndex--;
			}
			*/
		},
		openPaper: function(event) {
			if(event.changeState !== false) {
				var paper = event.paper;
				//History.pushState({type: "paper", event: paper}, paper.title, "#"+paper.unique_id);
			}
		},
		closePaper: function(event) {
			//var paper = event.paper;
			//console.log("close paper", paper);
		},
		addFilter: function(event) {
			var filter = event.filter,
				db = ConfApp.database;
			this.$filters.push(filter);

			var openEvents = _.bind(function(events) {
				_.each(events, function(e) {
					var jqEvent;
					if(e.top_level) {
						jqEvent = jQuery.Event("openSession");
						jqEvent.session = e;
						jqEvent.alsoScroll = false;
						jqEvent.changeState = false;
						this.element.trigger(jqEvent);
					} else {
						ConfApp.database._async_parent_getter(e, _.bind(function(session) {
							jqEvent = jQuery.Event("openSession");
							jqEvent.session = session;
							jqEvent.alsoScroll = false;
							jqEvent.changeState = false;
							this.element.trigger(jqEvent);

							_.defer(_.bind(function() {
								jqEvent = jQuery.Event("openPaper");
								jqEvent.paper = e;
								jqEvent.alsoScroll = false;
								jqEvent.changeState = false;
								this.element.trigger(jqEvent);
							}, this));
						}, this));
					}
				}, this);
			}, this);

			if(filter instanceof ConfApp.PersonFilter) {
				var person = filter.getPerson();

				db._async_get_person_events(person._id, openEvents);
			} else if(filter instanceof ConfApp.AffiliationFilter) {
				var affiliation = filter.getAffiliation();
				db._async_get_affiliation_events(affiliation, openEvents);
			}
		},
		removeFilter: function(event) {
			var filter = event.filter;

			var index = this.$filters.indexOf(filter);
			this.$filters.splice(index, 1);
		},
		playVideos: function(event) {
			$('#videoModal').modal_video("showModal", event.videoTitle, event.videoURL);
		},
		requestVoterID: function(callback) {
			$('#voterIDModal').voter_id_inp("requestValue", callback);
		}
	});
}(ConfApp));
