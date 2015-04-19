(function (root) {
	var base_url = "http://confapp.from.so/vote.php",
		user_id = cjs(false);

	try {
		var voter_id = localStorage.getItem("voter_id");
		if(voter_id) {
			user_id.set(voter_id);
		}
	} catch(e) {
		console.error(e);
	}
	ConfApp.getVoterId = function() {
		return user_id.get();
	};
	ConfApp.setVoterId = function(id) {
		user_id.set(id);
		localStorage.setItem("voter_id", id);
	};

	ConfApp.setAllVotes = function(user_id, paper_ids, callback) {
		if(user_id) {
			$.ajax({
				url: base_url,
				type: "GET",
				data: {
					command: "set_votes",
					id : user_id,
					event_fks: paper_ids.join(",")
				},
				dataType: "json"
			}).done(function(result) {
				callback(result);
			})
			.fail(function(e) {
				console.error(e);
			});
		} else {
			callback([]);
		}
	};
	
	ConfApp.checkVoterIDValidity = function(user_id, callback, thisArg) {
		if(user_id.length !== 6) {
			callback.call(thisArg || window, false, "Voter IDs have six characters");
		} else {
			$.ajax({
				url: base_url,
				type: "GET",
				data: {
					command: "check_voter_id",
					id : user_id
				},
				dataType: "json"
			}).done(function(val) {
				if(val.result === "ok") {
					callback.call(thisArg || window, true);
				} else {
					callback.call(thisArg || window, false, "Invalid voter ID");
				}
			})
			.fail(function(e) {
				console.error(e);
			});
		}
	};
	ConfApp.getAllVotes = function(user_id, callback) {
		if(user_id) {
			$.ajax({
				url: base_url,
				type: "GET",
				data: {
					command: "get_votes",
					id : user_id
				},
				dataType: "json"
			}).done(function(result) {
				callback(result.value.split(","));
			})
			.fail(function(e) {
				console.error(e);
			});
		} else {
			callback([]);
		}
	};

	ConfApp.getVote = function(user_id, event_fk, callback) {
		$.ajax({
			url: base_url,
			type: "GET",
			data: {
				command: "get_vote_value",
				id : user_id,
				event_fk: event_fk
			},
			dataType: "json"
		}).done(function(value) {
			callback(value);
		})
		.fail(function(e) {
			console.error(e);
		});
	};

	ConfApp.setVote = function(user_id, event_fk, value, callback) {
		$.ajax({
			url: base_url,
			type: "GET",
			data: {
				command: "set_vote_value",
				id : user_id,
				event_fk: event_fk,
				value: value ? "true" : "false"
			},
			dataType: "json"
		}).done(function(value) {
			callback(value);
		})
		.fail(function(e) {
			console.error(e);
		});
	};
}(this));
