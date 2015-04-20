(function(ConfApp) {
	var also_search_descriptions = false;
	ConfApp.load_db = function(db_name) {
		ConfApp.database = new Database(db_name);
	};

	var Database = function(db_url) {
		this._database = undefined;
		this._loaded = cjs(false);
		this._load(db_url);

		this._days = cjs(function(node) {
			if(this.isLoaded()) {
				node.pauseGetter([]);
				this._async_days_getter(function(days) {
					node.resumeGetter(days);
				});
			} else {
				return [];
			}
		}, {
			context: this
		});
		this._conference = cjs(function(node) {
			if(this.isLoaded()) {
				node.pauseGetter([]);
				this._async_conference_info_getter(_.bind(function(info) {
					//var timezone_offset = (new Date()).getTimezoneOffset() * 60;
					//this._time_offset = (info.utc_offset + timezone_offset) * 1000;
					node.resumeGetter(info);
				}, this));
			} else {
				return [];
			}
		}, {
			context: this
		});
		//this._time_offset = 0;

		this._day_sessions = cjs.map();
		this._session_sessions = cjs.map();
		this._session_people = cjs.map();
		this._locations = cjs.map();
		this._event_attachments = cjs.map();
		this._event_annotations = cjs.map();
	};

	(function(My) {
		var proto = My.prototype,
			_get_map = function(arr) {
				var rv = {};
				_.each(arr, function(item, i) { rv[item] = i; });
				return rv;
			};

		proto.isLoaded = function() { return this._loaded.get(); };

		proto._load = function(filename) {
			var data = localStorage.getItem('database'),
				fname = localStorage.getItem('database_filename'),
				onLoad = _.bind(function() {
					this._loaded.set(true);
					this._async_conference_info_getter(_.bind(function(info) {
						document.title = info.name + " Program";
						var timezone_offset = (new Date()).getTimezoneOffset() * 60;
						this._time_offset = (info.utc_offset + timezone_offset) * 1000;
					}, this));

					_.defer(ConfApp.loadUserData);
				}, this);


			if(data && fname === filename) {
				this._database = JSON.parse(data);
				onLoad();
			} else {
				$.ajax({
					url: filename,
					dataType: "text",
					error: function() { console.log("error"); },
					success: $.proxy(function(data) {
						localStorage.setItem('database', data);
						localStorage.setItem('database_filename', filename);
						this._database = JSON.parse(data);

						onLoad();
					}, this)
				});
			}
		};

		proto.getDays = function() {
			return this._days.get();
		};
		proto.getConferenceInfo = function() {
			return this._conference.get();
		};

		proto.getDayEvents = function(day) {
			if(this._day_sessions.has(day)) {
				return this._day_sessions.get(day);
			} else {
				this._day_sessions.put(day, _.bind(function(node) {
					node.pauseGetter([]);
					var start_timestamp = day.getTime() - this._time_offset,
						end_timestamp = start_timestamp + (24 * 60 * 60 * 1000) - 1;
					this._async_time_range_sessions_getter(new Date(start_timestamp), new Date(end_timestamp), function(rv) {
						node.resumeGetter(rv);
					});
				}, this));
				return this._day_sessions.get(day);
			}
		};
		proto.hasSubEvents = function(parent_session) {
			var contents = this.getEventContents(parent_session);
			return contents && contents.length > 0;
		};
		proto.getEventContents = function(parent_session) {
			if(this._session_sessions.has(parent_session)) {
				return this._session_sessions.get(parent_session);
			} else {
				this._session_sessions.put(parent_session, _.bind(function(node) {
					node.pauseGetter([]);
					this._async_sub_session_getter(parent_session, function(rv) {
						node.resumeGetter(rv);
					});
				}, this));
				return this._session_sessions.get(parent_session);
			}
		};
		proto.getEventPeople = function(parent_session) {
			if(this._session_people.has(parent_session)) {
				return this._session_people.get(parent_session);
			} else {
				this._session_people.put(parent_session, _.bind(function(node) {
					node.pauseGetter([]);
					this._async_person_getter(parent_session, function(rv) {
						node.resumeGetter(rv);
					});
				}, this));
				return this._session_people.get(parent_session);
			}
		};
		proto.getEventAttachments = function(parent_session) {
			if(this._event_attachments.has(parent_session)) {
				return this._event_attachments.get(parent_session);
			} else {
				this._event_attachments.put(parent_session, _.bind(function(node) {
					node.pauseGetter([]);
					this._async_event_attachments_getter(parent_session._id, function(rv) {
						node.resumeGetter(rv);
					});
				}, this));
				return this._event_attachments.get(parent_session);
			}
		};
		proto.getEventAnnotations = function(parent_session) {
			if(this._event_annotations.has(parent_session)) {
				return this._event_annotations.get(parent_session);
			} else {
				this._event_annotations.put(parent_session, _.bind(function(node) {
					node.pauseGetter([]);
					this._async_event_annotations_getter(parent_session._id, function(rv) {
						node.resumeGetter(rv);
					});
				}, this));
				return this._event_annotations.get(parent_session);
			}
		};
		proto.getLocation = function(fk) {
			if(this._locations.has(fk)) {
				return this._locations.get(fk);
			} else {
				this._locations.put(fk, _.bind(function(node) {
					node.pauseGetter({});
					this._async_location_getter(fk, function(rv) {
						node.resumeGetter(rv);
					});
				}, this));
				return this._locations.get(fk);
			}
		};

		proto._checkLoaded = function() {
			if(!this.isLoaded()) { throw new Error("Database is not loaded"); }
		};

		proto._toObj = function(table, row) {
			var headers = table.headers,
				rv = {};
			_.each(table.headers, function(header, i) {
				rv[header] = row[i];
			});
			return rv;
		};

		proto._async_conference_info_getter = function(callback) {
			this._checkLoaded();

			var conference = this._database.conference,
				conference_row = conference.rows[0],
				headers = _get_map(conference.headers);

			callback(this._toObj(conference, conference_row));
		};

		proto._async_days_getter = function(callback) {
			this._checkLoaded();

			var timezone_offset = (new Date()).getTimezoneOffset() * 60,
				conference = this._database.conference,
				conference_row = conference.rows[0],
				headers = _get_map(conference.headers),
				start_date = new Date((conference_row[headers.start_day] + conference_row[headers.utc_offset] + timezone_offset) * 1000),
				num_days = conference_row[headers.num_days],
				rv = [], i = 0;

			for(; i<num_days; i++) {
				rv[i] = new Date(start_date.getTime() + i * 24 * 60 * 60 * 1000);
			}

			callback(rv);
		};

		proto._get_closest_start_time = function(callback) {
			this._checkLoaded();

			var timezone_offset = 0,//(new Date()).getTimezoneOffset() * 60,
				curr_timestamp = Math.round(((new Date()).getTime() + timezone_offset)/1000),
				event = this._database.event,
				rows = event.rows,
				headers = _get_map(event.headers),
				closest_row = false,
				closest_start_time = false;


			_.each(rows, function(row) {
				var event_end_time = row[headers.end_time] + this._time_offset;

				if(row[headers.top_level]) {
					if(event_end_time && event_end_time > curr_timestamp) {
						var event_start_time = row[headers.start_time] + this._time_offset;
						if(closest_row === false || (event_start_time < closest_start_time)) {
							closest_start_time = event_start_time;
							closest_row = row;
						}
					}
				}
			}, this);

			callback(closest_start_time);
		};

		proto._async_time_range_sessions_getter = function(start_time, end_time, callback) {
			this._checkLoaded();


			var event = this._database.event,
				rows = event.rows,
				start_timestamp = start_time.getTime(),
				end_timestamp = end_time.getTime(),
				headers = _get_map(event.headers),
				children = _.filter(rows, function(row) {
					var event_start_time = row[headers.start_time] * 1000;
					return row[headers.parent_fk] < 0 && event_start_time > start_timestamp && event_start_time <= end_timestamp;
				}, this),
				rv = _.map(children, function(child) {
					return this._toObj(event, child);
				}, this);
			rv.sort(function(a, b) {
				return a.start_time - b.start_time;
			});
			//console.log(start_timestamp);

			callback(rv);
		};

		proto._async_unique_id_sessions_getter = function(id, callback) {
			this._checkLoaded();

			var event = this._database.event,
				rows = event.rows,
				headers = _get_map(event.headers),
				children = _.filter(rows, function(row) {
					return row[headers.unique_id] === id;
				}, this),
				rv = _.map(children, function(child) {
					return this._toObj(event, child);
				}, this);

			if(rv.length === 1) {
				callback(rv[0]);
			} else if(rv.length === 0) {
				callback(undefined);
			} else {
				callback(rv);
			}
		};
		
		proto._async_all_sessions_getter = function(callback) {
			this._checkLoaded();

			var event = this._database.event,
				rows = event.rows,
				headers = _get_map(event.headers),
				rv = _.map(rows, function(child) {
					return this._toObj(event, child);
				}, this);
			callback(rv);
		};

		proto._async_parent_getter = function(session, callback) {
			var event = this._database.event,
				rows = event.rows,
				headers = _get_map(event.headers),
				parent_fk = session.parent_fk;

			if(parent_fk < 0) {
				callback(false);
			} else {
				callback(this._toObj(event, rows[parent_fk-1]));
			}
		};

		proto._async_sub_session_getter = function(session, callback) {
			this._checkLoaded();

			var event_events = this._database.event_events,
				ee_rows = event_events.rows,
				ee_headers = _get_map(event_events.headers),
				event = this._database.event,
				e_rows = event.rows,
				e_headers = _get_map(event.headers),
				parent_fk = session._id,
				child_fks = [], children = [];

			_.each(ee_rows, function(row) {
				if(row[ee_headers.parent_fk] === parent_fk) {
					child_fks[row[ee_headers.sequence]] = row[ee_headers.child_fk];
				}
			});


			_.each(child_fks, function(child_fk, i) {
				var e_row = e_rows[child_fk-1];
				if(e_row[e_headers._id] === child_fk) {
					children[i] = this._toObj(event, e_row);
					this._async_event_annotations_getter(children[i]._id, function(annotations) {
						if(annotations.length>0) {
							children[i].award = annotations[0].description.replace(" Paper", "");
						} else {
							children[i].award = "";
						}
					});

				}
			}, this);

			children.sort(function(a, b) {
				return child_fks.indexOf(a._id) - child_fks.indexOf(b._id);
			});


			callback(children);
		};


		proto._async_person_getter = function(event, callback) {
			this._checkLoaded();

			var event_people = this._database.event_people,
				ep_rows = event_people.rows,
				ep_headers = _get_map(event_people.headers),
				person = this._database.person,
				p_rows = person.rows,
				p_headers = _get_map(person.headers),
				event_fk = event._id,
				person_fks = [], children = [];

			_.each(ep_rows, function(row) {
				if(row[ep_headers.event_fk] === event_fk) {
					person_fks[row[ep_headers.sequence]-1] = row[ep_headers.person_fk];
				}
			});

			_.each(person_fks, function(person_fk, i) {
				var p_row = p_rows[person_fk-1];
				if(p_row[p_headers._id] === person_fk) {
					children[i] = this._toObj(person, p_row);
				}
			}, this);

			callback(children);
		};

		proto._async_location_getter = function(fk, callback) {
			this._checkLoaded();

			var locations = this._database.location,
				rows = locations.rows,
				headers = _get_map(locations.headers),
				location;


			if(fk >= 0) {
				location = rows[fk-1];
				if(location[headers._id] === fk) {
					callback(this._toObj(locations, location));
				} else {
					callback(undefined);
				}
			} else {
				callback(undefined);
			}
		};

		proto._async_event_attachments_getter = function(fk, callback) {
			this._checkLoaded();

			var event_attachments = this._database.event_attachments,
				rows = event_attachments.rows,
				headers = _get_map(event_attachments.headers),
				attachments = [];

			_.each(rows, function(row) {
				if(row[headers.event_fk] === fk) {
					attachments.push(this._toObj(event_attachments, row));
				}
			}, this);

			callback(attachments);
		};

		proto._async_event_annotations_getter = function(fk, callback) {
			this._checkLoaded();

			var event_annotations = this._database.event_annotations,
				annotation = this._database.annotation,
				rows = event_annotations.rows,
				annotation_rows = annotation.rows,
				headers = _get_map(event_annotations.headers),
				annotation_headers = _get_map(annotation.headers),
				rv = [],
				annotations = [];

			_.each(annotation_rows, function(row) {
				var annotation_obj = this._toObj(annotation, row);
				annotations[annotation_obj._id] = annotation_obj;
			}, this);

			_.each(rows, function(row) {
				if(row[headers.event_fk] === fk) {
					var annotation_obj = this._toObj(event_annotations, row);

					rv[annotation_obj.sequence - 1] = annotations[annotation_obj.annotation_fk];
				}
			}, this);

			callback(rv);
		};

		proto._async_get_person_events = function(fk, callback) {
			this._checkLoaded();

			var event_people = this._database.event_people,
				ep_rows = event_people.rows,
				ep_headers = _get_map(event_people.headers),
				event = this._database.event,
				e_rows = event.rows,
				e_headers = _get_map(event.headers),
				events = [];

			_.each(ep_rows, function(row) {
				if(row[ep_headers.person_fk] === fk) {
					var event_fk = row[ep_headers.event_fk],
						event_row = e_rows[event_fk-1];
					if(event_row[e_headers._id] !== event_fk) {
						console.error("Could not find fk " + event_fk);
						return;
					}
					events.push(this._toObj(event, event_row));
				}
			}, this);

			callback(events);
		};
		proto._async_get_affiliation_events = function(affiliation, callback) {
			this._checkLoaded();

			var event_people = this._database.event_people,
				ep_rows = event_people.rows,
				ep_headers = _get_map(event_people.headers),
				event = this._database.event,
				e_rows = event.rows,
				e_headers = _get_map(event.headers),
				person = this._database.person,
				p_rows = person.rows,
				p_headers = _get_map(person.headers),
				people_fks = {},
				event_fks = {},
				events = [];

			_.each(p_rows, function(row) {
				if(row[p_headers.affiliation] === affiliation) {
					people_fks[row[p_headers._id]] = true;
				}
			});
			_.each(ep_rows, function(row) {
				if(people_fks[row[ep_headers.person_fk]]) {
					event_fks[row[ep_headers.event_fk]] = row[ep_headers.event_fk];
				}
			});
			_.each(event_fks, function(event_fk) {
				var event_row = e_rows[event_fk-1];
				if(event_row[e_headers._id] !== event_fk) {
					console.error("Could not find fk " + event_fk);
					return;
				}
				events.push(this._toObj(event, event_row));
			}, this);

			callback(events);
		};

		proto._async_get_session_attachments = function(sessions, callback, limit_1) {
			this._checkLoaded();

			if(!_.isArray(sessions)) { sessions = [sessions]; }

			var event_events = this._database.event_events,
				ee_rows = event_events.rows,
				ee_headers = _get_map(event_events.headers),
				event = this._database.event,
				e_rows = event.rows,
				e_headers = _get_map(event.headers),
				parent_fks = _.pluck(sessions, "_id"),
				child_fks = _.clone(parent_fks),
				event_attachments = this._database.event_attachments,
				ea_rows = event_attachments.rows,
				ea_headers = _get_map(event_attachments.headers),
				attachments = limit_1 ? false : [],
				min_fk, max_fk;
		
			min_fk = child_fks[0];
			max_fk = child_fks[0];
			_.each(parent_fks, function(fk) {
				if(fk < min_fk) { min_fk = fk; }
				if(fk > max_fk) { max_fk = fk; }
			});

			_.each(ee_rows, function(row) {
				var parent_fk = row[ee_headers.parent_fk];
				if(parent_fk >= min_fk && parent_fk <= max_fk && _.indexOf(parent_fks, parent_fk) >= 0) {
					var child_fk = row[ee_headers.child_fk];
					child_fks.push(child_fk);
				}
			});

			_.each(child_fks, function(fk) {
				if(fk < min_fk) { min_fk = fk; }
				if(fk > max_fk) { max_fk = fk; }
			});

			_.every(ea_rows, function(row) {
				var event_fk = row[ea_headers.event_fk];
				if(event_fk >= min_fk && event_fk <= max_fk && _.indexOf(child_fks, event_fk) >= 0) {
					if(limit_1) {
						attachments = true;
						return false;
					} else {
						attachments.push(this._toObj(event_attachments, row));
					}
				}
				return true;
			}, this);
			callback(attachments);
		};

		var first_four_letter_results = {};
		proto._get_search_categories = function(query_string, callback) {
			var person = this._database.person,
				p_rows = person.rows,
				p_headers = _get_map(person.headers),
				event = this._database.event,
				e_rows = event.rows,
				e_headers = _get_map(event.headers),
				p_name_index = p_headers.name,
				p_affiliation_index = p_headers.affiliation,
				e_title_index = e_headers.title,
				e_description_index = e_headers.description,
				e_top_level_index = e_headers.top_level,
				rv,
				first_four_letters = query_string.toLowerCase().slice(0, 3),
				ffr = first_four_letter_results[first_four_letters];

			if(!ffr) {
				rv = {};
				_.each(p_rows, function(row) {
					if(row[p_name_index].toLowerCase().indexOf(first_four_letters) >= 0) {
						if(rv.people) {
							rv.people.push(row);
						} else {
							rv.people = [row];
						}
					}
					if(row[p_affiliation_index] && row[p_affiliation_index].toLowerCase().indexOf(first_four_letters) >= 0) {
						if(!rv.affiliations) {
							rv.affiliations = {};
						}
						rv.affiliations[row[p_affiliation_index]] = {institute: row[p_affiliation_index]};
					}
				});

				_.each(e_rows, function(row) {
					if((row[e_title_index].toLowerCase().indexOf(first_four_letters) >= 0) ||
						(also_search_descriptions &&
							(row[e_description_index].toLowerCase().indexOf(first_four_letters) >= 0))) {
						if(row[e_top_level_index]) {
							if(rv.sessions) {
								rv.sessions.push(row);
							} else {
								rv.sessions = [row];
							}
						} else {
							if(rv.papers) {
								rv.papers.push(row);
							} else {
								rv.papers = [row];
							}
						}
					}
				});

				ffr = first_four_letter_results[first_four_letters] = rv;
			}

			query_string = query_string.toLowerCase();

			rv = {
				people: _	.chain(ffr.people)
							.filter(function(row) {
								return row[p_name_index].toLowerCase().indexOf(query_string) >= 0;
							})
							.map(function(row) {
								return this._toObj(person, row);
							}, this)
							.value(),
				affiliations: _	.chain(ffr.affiliations)
								.filter(function(affiliation) {
									return affiliation.institute.toLowerCase().indexOf(query_string) >= 0;
								})
								.value(),
				sessions: _	.chain(ffr.sessions)
							.filter(function(row) {
								return (row[e_title_index].toLowerCase().indexOf(query_string) >= 0) ||
										(also_search_descriptions &&
											(row[e_description_index].toLowerCase().indexOf(query_string) >= 0));
							})
							.map(function(row) {
								return this._toObj(event, row);
							}, this)
							.value(),
				papers: _	.chain(ffr.papers)
							.filter(function(row) {
								return (row[e_title_index].toLowerCase().indexOf(query_string) >= 0) ||
										(also_search_descriptions &&
											(row[e_description_index].toLowerCase().indexOf(query_string) >= 0));
							})
							.map(function(row) {
								return this._toObj(event, row);
							}, this)
							.value()
			};
			_.each(rv, function(val, key) {
				if(val.length === 0) {
					delete rv[key];
				}
			});

			callback(rv);
		};

	}(Database));
}(ConfApp));
