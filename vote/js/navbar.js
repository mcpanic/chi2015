(function (ConfApp) {
	cjs.registerCustomPartial("navbar", {
		createNode: function(options) {
			return $("<nav />").navbar(options);
		},
		destroyNode: function(node) {
			$(node).navbar("destroy");
		}
	});

	var navbar_template = cjs.createTemplate(
		"<div class='container-fluid'>" +
			"<a class='navbar-brand hidden-xs' data-cjs-on-click=gotoTop href='#'>" +
				"<img style='height:24px; position:relative; top:-2px;' alt='Logo' src='images/logo.png' /> " +
				"{{db.getConferenceInfo().name}}" +
			"</a>" +
			"<ul class='nav navbar-nav hidden-xs'>" +
				"<li class='dropdown'>" +
					"<a href='#' class='dropdown-toggle' data-toggle='dropdown'>Time slots <b class='caret'></b></a>" +
					"<ul class='dropdown-menu'>" +
						"<div class='row' style='padding:15px; width: 600px;'>" +
							"{{#each db.getDays()}}" +
								"<ul class='list-unstyled col-xs-3'>" +
									"<li class='day_header'>" +
										"<a data-cjs-on-click=gotoTimestamp href='#'>{{displayDay(this)}}</a>" +
									"</li>" +
									"{{#each getTimeSlots(this, db)}}" +
										"<li><a href='#' data-cjs-on-click=gotoTimestamp>{{displayTimeRange(this.start_time, this.end_time)}}</a></li>" +
									"{{/each}}" + //time slots
								"</ul>" +
							"{{/each}}" + //days
						"</div>" +
					"</ul>" +
				"</li>" +
			"</ul>" +
			/*
			"<form class='navbar-form navbar-left' role='search hidden-xs'>" +
				"<div class='form-group'>" +
					"<input id='search_input' type='text' class='form-control' autocomplete='off' placeholder='Search'>" +
					"{{#if searchResults}}" +
						"<div class='open'>" +
						"<ul class='immediate_search_results dropdown-menu'>" +
							"{{#each searchResults}}" +
								//"<div class='panel-body'>" +
									"<li role='presentation' class='search_category dropdown-header'>{{@key}}</li>" +
									"{{#each this}}" +
										"<li class='search_result' role='presentation'>" +
											"<a role='menuitem' tabindex='-1' href='#' data-cjs-on-mousedown=onClickFilter>" +
												"{{this.title || this.name || this.institute}}" +
											"</a>" +
										"</li>" +
									"{{/each}}" +
								//"</div>" +
							"{{/each}}" +
						"</ul>" +
						"</div>" +
					"{{/if}}" +
				"</div>" +
			"</form>" +
			*/
			"{{#if getVoterId()}}" +
				"<a class='login navbar-text navbar-right logged_in' data-cjs-on-click='setVoterId'>" +
					"Voter ID: {{'***' + getVoterId().slice(3)}}" +
					"<span class='logout'> Change</span>" +
				"</a>" +
			"{{#else}}" +
				"<a class='login navbar-text navbar-right' data-cjs-on-click='setVoterId'>" +
					"Set Voter ID" +
				"</a>" +
			"{{/if}}" +
			/*
			"{{#if dropboxName}}" +
				"<a class='login navbar-text navbar-right logged_in'>" +
					"<img id='dropbox_logo' src='images/dropbox_logo.png' height='20px' />" +
					" <span class='curr_name'>{{dropboxName}}</span>" +
					" <span class='logout' data-cjs-on-click='logoutClicked'>Log out</span>" +
				"</a>" +
			"{{#else}}" +
				"<a class='login navbar-text navbar-right' data-cjs-on-click='loginClicked'>" +
					"<img id='dropbox_logo' src='images/dropbox_logo.png' height='20px' />" +
					" Log in" +
				"</a>" +
			"{{/if}}" +
			*/
	"</div>"+ //container-fluid
		"{{#if filters.length()>0}}" +
			"<div class='bg-info filters col-md-12'>" +
				"<span class='filters_label'>Filters: </span>" +
				"{{#each filters}}" +
					"<span class='filter label label-primary'>" +
						"<span class='glyphicon glyphicon-remove' data-cjs-on-click=removeFilter></span>" +
						" {{this.toString()}}" +
					"</span>" +
				"{{/each}}" +
			"</div>" +
		"{{/if}}" +
		""
	);

	$.widget("confapp.navbar", {
		options: {
			dropboxName: false,
			database: false,
			displayDay: false,
			getTimeSlots: false,
			displayTimeRange: false,
			schedule: false
		},

		_create: function() {
			this._super("create");
			this._add_content_bindings();
			this._add_class_bindings();
			this._add_listeners();
		},

		_destroy: function() {
			this._super("destroy");
			this._remove_content_bindings();
			this._remove_class_bindings();
			this._remove_listeners();
		},

		_add_listeners: function() {
			$("input#search_input", this.element).keydown(_.bind(function(e){
				var curr_selected, next_selected;
				if(e.which == 13) { // enter
					curr_selected = $("li.search_result.selected", this.element);
					if(curr_selected.length===0) {
						curr_selected = $("li.search_result", this.element).first().addClass("selected");
					}

					if(curr_selected.length>0) {
						var category = curr_selected.prevAll("li.search_category").first(),
							category_name = category.text().toLowerCase(),
							index = curr_selected.index() - category.index() - 1;

						if(category_name && index>=0) {
							_.defer(_.bind(function() {
								var search_results = this.$search_results.get();
								if(search_results) {
									if(search_results[category_name][index]) {
										this._onClickFilter(search_results[category_name][index]);
									}
								}
							}, this));
						}

					}
					e.preventDefault();
					e.stopPropagation();
				} else if(e.which == 40 || (e.which === 9 && !e.shiftKey)) { // down
					curr_selected = $("li.search_result.selected", this.element);
					if(curr_selected.length>0) {
						curr_selected.removeClass("selected");

						next_selected = curr_selected.nextAll("li.search_result").first();
						if(next_selected.length>0) {
							next_selected.addClass("selected");
						} else {
							$("li.search_result", this.element).first().addClass("selected");
						}
					} else {
						$("li.search_result", this.element).first().addClass("selected");
					}
					e.preventDefault();
					e.stopPropagation();
				} else if(e.which == 38 || (e.which === 9 && e.shiftKey)) { // up
					curr_selected = $("li.search_result.selected", this.element);
					if(curr_selected.length>0) {
						next_selected = curr_selected.prevAll("li.search_result").first();

						curr_selected.removeClass("selected");
						if(next_selected.length>0) {
							next_selected.addClass("selected");
						} else {
							$("li.search_result", this.element).last().addClass("selected");
						}
					} else {
						$("li.search_result", this.element).last().addClass("selected");
					}
					e.preventDefault();
					e.stopPropagation();
				}
			}, this));
			/*

			$("li.dropdown").keydown(function(e){
				if(e.which == 40) { // down
					$(this).parent().next().find(".search-option").focus();
					return false; // stops the page from scrolling
				}
				if(e.which == 38) { // up
					$(this).parent().prev().find(".search-option").focus();
					return false; // stops the page from scrolling
				}
				if(e.which == 13) { // enter
					alert("Do something");
				}
			});	
			*/
		},

		_remove_listeners: function() {
		},

		_onClickFilter: function(result) {
			if(result.name) {
				this._applyPersonFilter(result);
			} else if(result.institute) {
				this._applyAffiliationFilter(result.institute);
			} else if(result.top_level) {
				this._viewSession(result);
			} else {
				this._viewPaper(result);
			}
			$("input#search_input", this.element).val("");
			this.$search_results.set(false);
		},

		_add_content_bindings: function() {
			var self = this,
				schedule = this.option("schedule");

			this.$search_results = cjs(false);
			navbar_template({
				db: this.option("database"),
				loginClicked: function(e) {
					ConfApp.authenticateDropbox();
				},
				logoutClicked: function(e) {
					ConfApp.signOutDropbox();
				},
				onClickFilter: function(e) {
					self._onClickFilter(this);
					e.preventDefault();
					e.stopPropagation();
				},
				removeFilter: function(e) {
					self._removeFilter(this);
				},
				filters: schedule.$filters,
				dropboxName: ConfApp.dropboxName,
				displayDay: schedule.option("displayDay"),
				getTimeSlots: schedule.option("getTimeSlots"),
				displayTimeRange: schedule.option("displayTimeRange"),
				searchResults: this.$search_results,
				gotoTop: function(event) {
					$('html, body').animate({
						scrollTop: '0px'
					}, 'fast');
					event.preventDefault();
					event.stopPropagation();
				},
				gotoTimestamp: function(event) {
					if(this.start_timestamp) { // specific time
						$("#tstamp_"+this.start_timestamp).goTo();
					} else if(this.getTime) { // day
						$("#tstamp_" + Math.round(this.getTime()/1000)).goTo();
					}
					event.preventDefault();
					event.stopPropagation();
				},
				getVoterId: ConfApp.getVoterId,
				setVoterId: function() {
					$('.container').schedule("requestVoterID", function(did_submit, voter_id) {
						if(did_submit) {
							ConfApp.setVoterId(voter_id);
						}
					});
				}
			}, this.element);
			this.$input_val = cjs($("input#search_input", this.element)[0]);

			var throttled_update_search_query = _.throttle(_.bind(this._update_search_query, this), 150);

			var old_val = "";
			this._live_search_updater = cjs.liven(function() {
			/*
				var val = this.$input_val.get().trim();
				if(val!==old_val) { 
					old_val = val;
					throttled_update_search_query(val);
				}
				*/
			}, {
				context: this
			});
		},
		_remove_content_bindings: function() {
			this._live_search_updater.destroy(true);
			this.$input_val.destroy(true);
			this.$search_results.destroy(true);
			cjs.destroyTemplate(this.element);
		},

		_applyPersonFilter: function(person) {
			var jqEvent = jQuery.Event("addFilter");
			jqEvent.filter = new ConfApp.PersonFilter(person);
			this.element.trigger(jqEvent);
		},

		_applyAffiliationFilter: function(affiliation) {
			var jqEvent = jQuery.Event("addFilter");
			jqEvent.filter = new ConfApp.AffiliationFilter(affiliation);
			this.element.trigger(jqEvent);
		},

		_removeFilter: function(filter) {
			var jqEvent = jQuery.Event("removeFilter");
			jqEvent.filter = filter;
			this.element.trigger(jqEvent);
		},

		_viewSession: function(event) {
			var jqEvent = jQuery.Event("openSession");
			jqEvent.session = event;
			this.element.trigger(jqEvent);
		},

		_viewPaper: function(event) {
			var jqEvent = jQuery.Event("openPaper");
			jqEvent.paper = event;
			this.element.trigger(jqEvent);
		},

		_update_search_query: function(query_string) {
			if(query_string.length > 2) {
				var db = this.option("database");
				db._get_search_categories(query_string, _.bind(function(rv) {
					this.$search_results.set(rv);
				}, this));
			} else {
				this.$search_results.set(false);
			}
		},

		_add_class_bindings: function() {
			this.element.addClass("navbar navbar-default navbar-fixed-top")
						.attr("role", "navigation");
						/*
						.affix({
							offset: {
								top: 0
							}
						});
						*/
		},
		_remove_class_bindings: function() {
			this.element.removeClass("navbar navbar-default navbar-fixed-top")
						.attr("role", "");
						//.affix("destroy");
		}
	});
}(ConfApp));
