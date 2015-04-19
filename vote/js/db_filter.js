(function(ConfApp) {
	ConfApp.PersonFilter = function(person) {
		this.person = person;
		this.match_cache = {};
	};

	(function(My) {
		var proto = My.prototype;

		proto.getPerson = function() { return this.person; };
		proto.matches = function(event) {
			if(this.match_cache[event._id]) {
				return this.match_cache[event._id];
			} else {
				var people = ConfApp.database.getEventPeople(event),
					my_id = this.person._id;
					rv = _.any(people, function(person) {
						return person._id === my_id;
					}, this);
				if(!rv && event.top_level) {
					var sub_events = ConfApp.database.getEventContents(event);
					rv = _.any(sub_events, function(sub_event) {
						return this.matches(sub_event);
					}, this);
				}
				this.match_cache[event._id] = rv;
				return rv;
			}
		};
		proto.toString = function() {
			var person = this.getPerson();
			return person.name;
		};
		proto.getIcon = function() {
			return "glyphicon-user";
		};
	}(ConfApp.PersonFilter));

	ConfApp.AffiliationFilter = function(affiliation) {
		this.affiliation = affiliation;
		this.match_cache = {};
	};

	(function(My) {
		var proto = My.prototype;

		proto.getAffiliation = function() { return this.affiliation; };

		proto.matches = function(event) {
			if(this.match_cache[event._id]) {
				return this.match_cache[event._id];
			} else {
				var people = ConfApp.database.getEventPeople(event),
					my_affiliation = this.affiliation,
					rv = _.any(people, function(person) {
						return person.affiliation === my_affiliation;
					}, this);
				if(!rv && event.top_level) {
					var sub_events = ConfApp.database.getEventContents(event);
					rv = _.any(sub_events, function(sub_event) {
						return this.matches(sub_event);
					}, this);
				}
				this.match_cache[event._id] = rv;
				return rv;
			}
		};
		proto.toString = function() {
			return this.getAffiliation();
		};
		proto.getIcon = function() {
			return "glyphicon-user";
		};
	}(ConfApp.AffiliationFilter));
}(ConfApp));
