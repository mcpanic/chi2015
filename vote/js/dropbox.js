(function (ConfApp) {
	var dropboxName = ConfApp.dropboxName,
		// Insert your Dropbox app key here:
		DROPBOX_APP_KEY = 'ptvr4nont026y3n',
		// Exposed for easy access in the browser console.
		client = new Dropbox.Client({key: DROPBOX_APP_KEY}),
		up_table;

	ConfApp.authenticateDropbox = function () {
		// This will redirect the browser to OAuth login.
		client.authenticate();
	};
	ConfApp.signOutDropbox = function() {
		client.signOut(function() {
			up_table = false;
			records = false;
			dropboxName.set(false);
		});
	};

	// Try to finish OAuth authorization.
	client.authenticate({interactive:false}, function (error) {
		if (error) {
			console.error('Authentication error: ' + error);
			client.reset();
		}
	});

	if (client.isAuthenticated()) {
		// Client is authenticated. Display UI.
		client.getDatastoreManager().openDefaultDatastore(function (error, datastore) {
			if (error) {
				console.error('Error opening default datastore: ' + error);
			}

			client.getAccountInfo(function(errors, ai) {
				try {
					dropboxName.set(ai.name);
				} catch(e) {
					console.error(e);
				}
			});

			try {
				up_table = datastore.getTable('user_preferences');

				_.each([ "event_unique_id", "created_at", "updated_at", "reading_list", "reading_list_updated_at",
									"schedule", "schedule_updated_at", "note", "note_updated_at", "vote", "vote_updated_at"
					
				], function(fieldName) {
					up_table.setResolutionRule(fieldName, "local");
				});

				// Populate the initial task list.
				updateUserData();

				// Ensure that future changes update the list.
				datastore.recordsChanged.addListener(updateUserData);

				var live_fn = cjs.liven(function() {
					if(ConfApp.database.isLoaded()) {
						ConfApp.pullDropboxData();
						ConfApp.pushDropboxData();
						live_fn.destroy();
					}
				},  {
					run_on_create: false
				});
				live_fn.run();
			} catch(e) {
				console.error(e);
			}
		});
	}

	var records;
	function updateUserData(changes) {
		records = up_table.query();
		if(changes && !changes.isLocal() && ConfApp.database.isLoaded()) {
			ConfApp.pullDropboxData();
			ConfApp.pushDropboxData();
		}
	}

	var int64 = _.bind(Dropbox.Datastore.int64, Dropbox.Datastore),
		toInt = parseInt;

	function pushRecord(event, pushIfTimestampsEqual) {
		var update_times = ConfApp.updateTimes,
			is_session = event.top_level,
			uid = event.unique_id,
			info = update_times[uid],
			is_reading_list = (is_session ? ConfApp.isSessionInReadingList(event) : ConfApp.isPaperInReadingList(event)),
			is_schedule = (is_session ? ConfApp.isSessionInSchedule(event) : ConfApp.isPaperInSchedule(event)),
			is_vote = ConfApp.isPaperVotedFor(event),
			records = up_table.query({
				event_unique_id: uid
			}), record;

		if(records.length === 0) {
			record = up_table.insert({
								event_unique_id: uid,

								created_at: int64(info.updated),
								updated_at: int64(info.updated),

								reading_list: int64(is_reading_list ? 1 : 0),
								reading_list_updated_at: int64(info.reading_list || 0),

								schedule:  int64(is_schedule ? 1 : 0),
								schedule_updated_at: int64(info.schedule || 0),

								note: ConfApp.getPaperNotes(event) || "",
								note_updated_at: int64(info.note || 0),

								vote: int64(is_vote ? 1 : 0),
								vote_updated_at: int64(info.vote || 0)
							});
		} else {
			record = records[0];

			var other_records = _.rest(records),
				new_record_info = {
					schedule_updated_at: toInt(record.get("schedule_updated_at")),
					reading_list_updated_at: toInt(record.get("reading_list_updated_at")),
					note_updated_at: toInt(record.get("note_updated_at")),
					vote_updated_at: toInt(record.get("vote_updated_at"))
				};

			_.each(other_records, function(other_record) {
				if(toInt(other_record.get("schedule_updated_at")) > new_record_info.schedule_updated_at) {
					new_record_info.schedule = toInt(other_record.get("schedule"));
					new_record_info.schedule_updated_at = toInt(other_record.get("schedule_updated_at"));
				}
				if(toInt(other_record.get("reading_list_updated_at")) > new_record_info.reading_list_updated_at) {
					new_record_info.reading_list = toInt(other_record.get("reading_list"));
					new_record_info.reading_list_updated_at = toInt(other_record.get("reading_list_updated_at"));
				}
				if(toInt(other_record.get("note_updated_at")) > new_record_info.note_updated_at) {
					new_record_info.note = other_record.get("note");
					new_record_info.note_updated_at = toInt(other_record.get("note_updated_at"));
				}
				if(toInt(other_record.get("vote_updated_at")) > new_record_info.vote_updated_at) {
					new_record_info.vote = other_record.get("vote");
					new_record_info.vote_updated_at = toInt(other_record.get("vote_updated_at"));
				}
				other_record.deleteRecord();
			});

			if(info.schedule && info.schedule > 0 && (info.schedule > new_record_info.schedule_updated_at || 
					(pushIfTimestampsEqual && info.schedule === new_record_info.schedule_updated_at ))) {
				//console.log("pushing schedule", !!(is_session ? ConfApp.isSessionInSchedule(event) : ConfApp.isPaperInSchedule(event)) ? 1 : 0 );
				new_record_info.schedule = int64( !!(is_session ? ConfApp.isSessionInSchedule(event) : ConfApp.isPaperInSchedule(event)) ? 1 : 0 );
				new_record_info.schedule_updated_at = int64(info.schedule);
			}
			if(info.reading_list && info.reading_list > 0 && (info.reading_list > new_record_info.reading_list_updated_at ||
					(pushIfTimestampsEqual && info.reading_list === new_record_info.reading_list_updated_at ))) {
				//console.log("pushing reading list",  !!(is_session ? ConfApp.isSessionInReadingList(event) : ConfApp.isPaperInReadingList(event)) ? 1 : 0 );
				new_record_info.reading_list = int64( !!(is_session ? ConfApp.isSessionInReadingList(event) : ConfApp.isPaperInReadingList(event)) ? 1 : 0 );
				new_record_info.reading_list_updated_at = int64(info.reading_list);
			}
			if(info.note && info.note > 0 && (info.note > new_record_info.note_updated_at ||
					(pushIfTimestampsEqual && info.note === new_record_info.note_updated_at ))) {
				new_record_info.note = ConfApp.getPaperNotes(event);
				new_record_info.note_updated_at = int64(info.note);
			}
			if(info.vote && info.vote > 0 && (info.vote > new_record_info.vote_updated_at ||
					(pushIfTimestampsEqual && info.vote === new_record_info.vote_updated_at ))) {
				new_record_info.vote = ConfApp.isPaperVotedFor(event);
				new_record_info.vote_updated_at = int64(info.vote);
			}

			var field_names = ["schedule", "note", "reading_list", "vote"];
			if(_.any(field_names, function(name) { return _.has(new_record_info, name); })) {
				new_record_info.updated_at = int64(Math.max(new_record_info.schedule_updated_at,
																new_record_info.reading_list_updated_at,
																new_record_info.note_updated_at));
				_.each(field_names, function(field_name) {
					if(!_.has(new_record_info, field_name)) {
						delete new_record_info[field_name+"_updated_at"];
					}
				});
				record.update(new_record_info);
			}
		}
	}

	ConfApp.postDropboxUpdate = function(uid, column, value) {
		if(up_table) {
			ConfApp.database._async_unique_id_sessions_getter(uid, function(event) {
				pushRecord(event, true);
			});
		} else {
			console.error("Could not save user data to Dropbox");
		}
	};

	ConfApp.pullDropboxData = function() {
		var synced_uids = {};
		_.each(records, function(record) {
			var local_update_info = ConfApp.getLocalUpdateInfo(record.get("event_unique_id"));
			ConfApp.database._async_unique_id_sessions_getter(record.get("event_unique_id"), function(event) {
				if(!local_update_info || (local_update_info.schedule < toInt(record.get("schedule_updated_at")))) {
					console.log("Pulling schedule", record.get("schedule"));
					if(event.top_level) {
						ConfApp[toInt(record.get("schedule")) ? "addSessionInSchedule" : "removeSessionInSchedule"](event, toInt(record.get("schedule_updated_at")), true, true);
					} else {
						ConfApp[toInt(record.get("schedule")) ? "addPaperInSchedule" : "removePaperInSchedule"](event, toInt(record.get("schedule_updated_at")), true);
					}
				}
				if(!local_update_info || (local_update_info.reading_list < toInt(record.get("reading_list_updated_at")))) {
					console.log("Pulling reading list", record.get("schedule"));
					if(event.top_level) {
						ConfApp[toInt(record.get("reading_list")) ? "addSessionInReadingList" : "removeSessionInReadingList"](event, record.get("reading_list_updated_at"), true, true);
					} else {
						ConfApp[toInt(record.get("reading_list")) ? "addPaperInReadingList" : "removePaperInReadingList"](event, record.get("reading_list_updated_at"), true);
					}
				}
				if(!local_update_info || (local_update_info.note < toInt(record.get("note_updated_at")))) {
					ConfApp.setPaperNotes(event, record.get("note"), toInt(record.get("note_updated_at")));
				}
				if(!local_update_info || (local_update_info.vote < toInt(record.get("vote_updated_at")))) {
					ConfApp[toInt(record.get("vote")) ? "addVote" : "removeVote"](event, record.get("vote_updated_at"), true);
				}
			});
		});
	};
	ConfApp.pushDropboxData = function() {
		if(up_table) {
			var update_times = ConfApp.updateTimes;
			_.each(update_times, function(info, uid) {
				ConfApp.database._async_unique_id_sessions_getter(uid, function(event) {
					if(event) {
						pushRecord(event);
					}
				});
			});
		} else {
			console.error("Could not save user data to Dropbox");
		}
	};
	ConfApp.nukeDropboxData = function() {
		_.each(records, function(record) {
			if(!record.isDeleted()) {
				record.deleteRecord();
			}
		});
	};
}(ConfApp));
