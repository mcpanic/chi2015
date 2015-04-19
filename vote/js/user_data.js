(function (root) {
	var scheduled_papers = cjs.map({
		hash: function(e) {
			return e.unique_id;
		},
		equals: function(a, b) {
			return a.unique_id === b.unique_id;
		}
	}),
	reading_list_papers = cjs.map({
		hash: function(e) {
			return e.unique_id;
		},
		equals: function(a, b) {
			return a.unique_id === b.unique_id;
		}
	}),
	paper_notes = cjs.map({
		hash: function(e) {
			return e.unique_id;
		},
		equals: function(a, b) {
			return a.unique_id === b.unique_id;
		}
	}),
	paper_votes = cjs.map({
		hash: function(e) {
			return e.unique_id;
		},
		equals: function(a, b) {
			return a.unique_id === b.unique_id;
		}
	}),
	scheduled_sessions = cjs.map({
		hash: function(e) {
			return e.unique_id;
		},
		equals: function(a, b) {
			return a.unique_id === b.unique_id;
		}
	}),
	reading_list_sessions = cjs.map({
		hash: function(e) {
			return e.unique_id;
		},
		equals: function(a, b) {
			return a.unique_id === b.unique_id;
		}
	}),
	update_times = ConfApp.updateTimes = { };

	function update_timestamp(unique_id, field, tstamp) {
		var curr_time = _.isNumber(tstamp) ? tstamp : Math.round((new Date()).getTime()/1000);

		if(!_.has(update_times, unique_id)) {
			update_times[unique_id] = {
				schedule: 0,
				reading_list: 0,
				note: 0
			};
		}

		update_times[unique_id][field] = update_times[unique_id].updated = curr_time;
	}

	_.extend(ConfApp, {
		removePaperInSchedule: function(paper, tstamp, avoidDropboxPost) {
			if(!paper) { return; }

			scheduled_papers.remove(paper);

			update_timestamp(paper.unique_id, "schedule", tstamp);

			if(!avoidDropboxPost) {
				try {
					ConfApp.postDropboxUpdate(paper.unique_id, "schedule", 0);
				} catch(e) {
					console.error(e);
				}
			}

			ConfApp.database._async_parent_getter(paper, function(parent) {
				if(scheduled_sessions.get(parent)) {
					scheduled_sessions.remove(parent);
					update_timestamp(parent.unique_id, "schedule", tstamp);
					if(!avoidDropboxPost) {
						try {
							ConfApp.postDropboxUpdate(parent.unique_id, "schedule", 0);
						} catch(e) {
							console.error(e);
						}
					}
				}
			});
		},
		addPaperInSchedule: function(paper, tstamp, avoidDropboxPost) {
			if(!paper) { return; }

			scheduled_papers.put(paper, true);

			update_timestamp(paper.unique_id, "schedule", tstamp);
			if(!avoidDropboxPost) {
				try {
					ConfApp.postDropboxUpdate(paper.unique_id, "schedule", 1);
				} catch(e) {
					console.error(e);
				}
			}

			ConfApp.database._async_parent_getter(paper, function(parent) {
				ConfApp.database._async_sub_session_getter(parent, function(papers) {
					if(_.every(papers, function(paper) {
							return scheduled_papers.get(paper);
						})) {
						scheduled_sessions.put(parent, true);

						update_timestamp(parent.unique_id, "schedule", tstamp);
						if(!avoidDropboxPost) {
							try {
								ConfApp.postDropboxUpdate(parent.unique_id, "schedule", 1);
							} catch(e) {
								console.error(e);
							}
						}
					}
				});
			});
		},
		togglePaperInSchedule: function(paper, tstamp) {
			if(scheduled_papers.has(paper)) {
				ConfApp.removePaperInSchedule(paper);
			} else {
				ConfApp.addPaperInSchedule(paper);
			}
			_.delay(saveUserData, 500);
		},
		removePaperInReadingList: function(paper, tstamp, avoidDropboxPost) {
			if(!paper) { return; }

			reading_list_papers.remove(paper);
			update_timestamp(paper.unique_id, "reading_list", tstamp);

			if(!avoidDropboxPost) {
				try {
					ConfApp.postDropboxUpdate(paper.unique_id, "reading_list", 0);
				} catch(e) {
					console.error(e);
				}
			}

			ConfApp.database._async_parent_getter(paper, function(parent) {
				if(reading_list_sessions.get(parent)) {
					reading_list_sessions.remove(parent);
					update_timestamp(parent.unique_id, "reading_list", tstamp);
					if(!avoidDropboxPost) {
						try {
							ConfApp.postDropboxUpdate(parent.unique_id, "reading_list", 0);
						} catch(e) {
							console.error(e);
						}
					}
				}
			});
		},
		addPaperInReadingList: function(paper, tstamp, avoidDropboxPost) {
			if(!paper) { return; }

			reading_list_papers.put(paper, true);
			update_timestamp(paper.unique_id, "reading_list", tstamp);
			if(!avoidDropboxPost) {
				try {
					ConfApp.postDropboxUpdate(paper.unique_id, "reading_list", 1);
				} catch(e) {
					console.error(e);
				}
			}

			ConfApp.database._async_parent_getter(paper, function(parent) {
				ConfApp.database._async_sub_session_getter(parent, function(papers) {
					if(_.every(papers, function(paper) {
							return reading_list_papers.get(paper);
						})) {
						reading_list_sessions.put(parent, true);
						update_timestamp(parent.unique_id, "reading_list", tstamp);
						if(!avoidDropboxPost) {
							try {
								ConfApp.postDropboxUpdate(parent.unique_id, "reading_list", 1);
							} catch(e) {
								console.error(e);
							}
						}
					}
				});
			});
		},
		togglePaperInReadingList: function(paper) {
			if(reading_list_papers.has(paper)) {
				ConfApp.removePaperInReadingList(paper);
			} else {
				ConfApp.addPaperInReadingList(paper);
			}
			_.delay(saveUserData, 500);
		},
		togglePaperVote: function(paper) {
			if(paper_votes.has(paper)) {
				ConfApp.removeVote(paper);
			} else {
				ConfApp.addVote(paper);
			}
		},
		getVotedForPapers: function() {
			return paper_votes.keys();
		},
		addVote: function(paper, tstamp, avoidDropboxPost, avoidIdRequest) {
			if(!paper) { return; }

			var voter_id = ConfApp.getVoterId();
			paper_votes.put(paper, true);
			update_timestamp(paper.unique_id, "vote", tstamp);
			if(!avoidDropboxPost) {
				//try {
					ConfApp.postDropboxUpdate(paper.unique_id, "vote", 1);
				//} catch(e) {
					//console.error(e);
				//}
			}
			if(voter_id) {
				ConfApp.setVote(voter_id, paper.unique_id, true, function(result) {
					//console.log(result);
				});
			} else if(!avoidIdRequest) {
				$('.container').schedule("requestVoterID", function(did_submit, voter_id) {
					if(did_submit) {
						ConfApp.setVoterId(voter_id);

						ConfApp.setVote(voter_id, paper.unique_id, false, function(result) {
							//console.log(result);
						});
					}
				});
			}
		},
		removeVote: function(paper, tstamp, avoidDropboxPost, avoidIdRequest) {
			if(!paper) { return; }

			var voter_id = ConfApp.getVoterId();
			paper_votes.remove(paper);
			update_timestamp(paper.unique_id, "vote", tstamp);

			if(!avoidDropboxPost) {
				try {
					ConfApp.postDropboxUpdate(paper.unique_id, "vote", 0);
				} catch(e) {
					console.error(e);
				}
			}

			if(voter_id) {
				ConfApp.setVote(voter_id, paper.unique_id, false, function(result) {
					//console.log(result);
				});
			} else if(!avoidIdRequest) {
				$('.container').schedule("requestVoterID", function(did_submit, voter_id) {
					if(did_submit) {
						ConfApp.setVoterId(voter_id);

						ConfApp.setVote(voter_id, paper.unique_id, false, function(result) {
							//console.log(result);
						});
					}
				});
			}
		},
		removeSessionInSchedule: function(session, tstamp, strict, avoidDropboxPost) {
			if(!session) { return; }

			var papers = ConfApp.database.getEventContents(session);

			scheduled_sessions.remove(session);
			update_timestamp(session.unique_id, "schedule", tstamp);
			if(!avoidDropboxPost) {
				try {
					ConfApp.postDropboxUpdate(session.unique_id, "schedule", 0);
				} catch(e) {
					console.error(e);
				}
			}

			if(!strict) {
				_.each(papers, function(paper) {
					if(scheduled_papers.get(paper)) {
						scheduled_papers.remove(paper);
						update_timestamp(paper.unique_id, "schedule", tstamp);
						if(!avoidDropboxPost) {
							try {
								ConfApp.postDropboxUpdate(paper.unique_id, "schedule", 0);
							} catch(e) {
								console.error(e);
							}
						}
					}
				});
			}
		},
		addSessionInSchedule: function(session, tstamp, strict, avoidDropboxPost) {
			if(!session) { return; }

			var papers = ConfApp.database.getEventContents(session);

			scheduled_sessions.put(session, true);
			update_timestamp(session.unique_id, "schedule", tstamp);

			if(!avoidDropboxPost) {
				try {
					ConfApp.postDropboxUpdate(session.unique_id, "schedule", 1);
				} catch(e) {
					console.error(e);
				}
			}

			if(!strict) {
				_.each(papers, function(paper) {
					if(!scheduled_papers.get(paper)) {
						scheduled_papers.put(paper, true);
						update_timestamp(paper.unique_id, "schedule", tstamp);
						if(!avoidDropboxPost) {
							try {
								ConfApp.postDropboxUpdate(paper.unique_id, "schedule", 1);
							} catch(e) {
								console.error(e);
							}
						}
					}
				});
			}
		},
		toggleSessionInSchedule: function(session) {
			if(scheduled_sessions.has(session)) {
				ConfApp.removeSessionInSchedule(session);
			} else {
				ConfApp.addSessionInSchedule(session);
			}
			_.delay(saveUserData, 500);
		},
		removeSessionInReadingList: function(session, tstamp, strict, avoidDropboxPost) {
			if(!session) { return; }

			var papers = ConfApp.database.getEventContents(session);

			reading_list_sessions.remove(session);
			update_timestamp(session.unique_id, "reading_list", tstamp);

			if(!avoidDropboxPost) {
				try {
					ConfApp.postDropboxUpdate(session.unique_id, "reading_list", 0);
				} catch(e) {
					console.error(e);
				}
			}

			if(!strict) {
				_.each(papers, function(paper) {
					if(reading_list_papers.get(paper)) {
						reading_list_papers.remove(paper);
						update_timestamp(paper.unique_id, "reading_list", tstamp);
						try {
							ConfApp.postDropboxUpdate(paper.unique_id, "reading_list", 0);
						} catch(e) {
							console.error(e);
						}
					}
				});
			}
		},
		addSessionInReadingList: function(session, tstamp, strict, avoidDropboxPost) {
			if(!session) { return; }

			var papers = ConfApp.database.getEventContents(session);

			reading_list_sessions.put(session, true);
			update_timestamp(session.unique_id, "reading_list", tstamp);

			if(!avoidDropboxPost) {
				try {
					ConfApp.postDropboxUpdate(session.unique_id, "reading_list", 1);
				} catch(e) {
					console.error(e);
				}
			}

			if(!strict) {
				_.each(papers, function(paper) {
					if(!reading_list_papers.get(paper)) {
						reading_list_papers.put(paper, true);
						update_timestamp(session.unique_id, "reading_list");

						if(!avoidDropboxPost) {
							try {
								ConfApp.postDropboxUpdate(paper.unique_id, "reading_list", 1);
							} catch(e) {
								console.error(e);
							}
						}
					}
				});
			}
		},
		toggleSessionInReadingList: function(session) {
			if(reading_list_sessions.has(session)) {
				ConfApp.removeSessionInReadingList(session);
			} else {
				ConfApp.addSessionInReadingList(session);
			}

			_.delay(saveUserData, 500);
		},
		isPaperInSchedule: function(paper) {
			return scheduled_papers.get(paper);
		},
		isPaperVotedFor: function(paper) {
			return paper_votes.get(paper);
		},
		isPaperInReadingList: function(paper) {
			return reading_list_papers.get(paper);
		},
		isSessionInSchedule: function(session) {
			return scheduled_sessions.get(session);
		},
		isSessionInReadingList: function(session) {
			return reading_list_sessions.get(session);
		},
		setPaperNotes: function(paper, notes, tstamp, avoidDropboxPost) {
			if(!paper) { return; }

			paper_notes.put(paper, notes);
			update_timestamp(paper.unique_id, "note", tstamp);

			if(!avoidDropboxPost) {
				try {
					ConfApp.postDropboxUpdate(paper.unique_id, "note", notes);
				} catch(e) {
					console.error(e);
				}
			}

			_.delay(saveUserData, 500);
		},
		getPaperNotes: function(paper) {
			if(!paper) { return []; }

			return paper_notes.get(paper);
		}
	});

	ConfApp.getLocalUpdateInfo = function(uid) {
		return update_times[uid];
	};

	function serializeMap(map) {
		var keys = _.map(map.keys(), function(key) {
				return key.unique_id;
			}),
			values = map.values(),
			rv = {};
		_.each(keys, function(key, i) {
			rv[key] = values[i];
		});
		return rv;
	}

	function serializeUserData() {
		return {
			s_papers: serializeMap(scheduled_papers),
			rl_papers: serializeMap(reading_list_papers),
			n_papers: serializeMap(paper_notes),
			v_papers: serializeMap(paper_votes),
			s_sessions: serializeMap(scheduled_sessions),
			rl_sessions: serializeMap(reading_list_sessions),
			update_times: update_times
		};
	}

	function saveUserData() {
		var userData = serializeUserData(),
			stringified_userData = JSON.stringify(userData),
			voter_id = ConfApp.getVoterId();

		localStorage.setItem("userData", stringified_userData);

		if(voter_id) {
			var voted_for_papers = ConfApp.getVotedForPapers(),
				voted_for_paper_ids = _.pluck(voted_for_papers, "unique_id");
			ConfApp.setAllVotes(voter_id, voted_for_paper_ids, function(result) {
				
			});
		}

		try {
			ConfApp.pullDropboxData();
			ConfApp.pushDropboxData();
		} catch(e) {
			console.error(e);
		}
	}

	ConfApp.loadUserData = function() {
		var stringified_userData = localStorage.getItem("userData"),
			userData;
		try {
			userData = JSON.parse(stringified_userData);
		} catch(e) {
			console.error("Could not parse user data");
		}
		if(userData) {
			_.each({
					s_papers: scheduled_papers,
					rl_papers: reading_list_papers,
					n_papers: paper_notes,
					v_papers: paper_votes,
					s_sessions: scheduled_sessions,
					rl_sessions: reading_list_sessions
				}, function(cjs_map, serialized_obj_name) {
					_.each(userData[serialized_obj_name], function(val, id) {
						ConfApp.database._async_unique_id_sessions_getter(id, function(s) {
							if(s) {
								cjs_map.put(s, val);
							}
						});
					});
				});
			ConfApp.updateTimes = update_times = userData.update_times;
		}

		var voter_id = ConfApp.getVoterId();

		if(voter_id) {
			ConfApp.getAllVotes(ConfApp.getVoterId(), function(paper_unique_ids) {
				if(_.isArray(paper_unique_ids)) {
					_.each(paper_unique_ids, function(uid) {
						ConfApp.database._async_unique_id_sessions_getter(uid, function(event) {
							if(event) {
								paper_votes.put(event, true);
							}
						});
					});
				}
			});
		}
	};
	ConfApp.nukeLocalUserData = function() {
		scheduled_papers.clear();
		reading_list_papers.clear();
		paper_notes.clear();
		paper_votes.clear();
		scheduled_sessions.clear();
		reading_list_sessions.clear();
		localStorage.clear();
		ConfApp.updateTimes = update_times = { };
	};
}(this));
