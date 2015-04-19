(function (ConfApp) {
	cjs.registerCustomPartial("expanded_paper", {
		createNode: function(options) {
			return $("<div />").expanded_paper(options);
		},
		destroyNode: function(node) {
			$(node).expanded_paper("destroy");
		}
	});

	var expanded_paper_template = cjs.createTemplate(
		"<div class='row'>" +
			"<div class='col-md-10 col-md-push-2'>" +
				"<span class='pull-right type'>{{paper.subtype}}</span>" +
				"<h4 class='paper_title'>" +
					"<div class='title'>{{paper.title}}</div>" +
				"</h4>" +
				"{{#each gridify(db.getEventPeople(paper), 4)}}" +
					"<div class='authors row full'>" +
						"{{#each this}}" +
							"{{#if this}}" +
								"<div title='Add filter' class='author col-sm-3' data-cjs-on-click='filterAuthor'>" +
									"<div class='author_name'>" +
										"{{this.name}}" +
									"</div>" +
									"<div class='author_affiliation'>" +
										"{{this.affiliation}}" +
									"</div>" +
								"</div>" +
							"{{/if}}" +
						"{{/each}}" +
					"</div>" +
				"{{/each}}" +
			"</div>" +
			"<div class='user_save_icons col-md-2 col-md-pull-10'>" +
				"<div class='schedule unselectable icon_row {{isPaperInSchedule(paper) ? \"selected\" : \"not_selected\"}}' data-cjs-on-click=togglePaperSchedule>" +
					"<span class='conficon_label'>Schedule </span><span class='conficon conficon-schedule'></span>" +
				"</div>" +
				"<div class='readinglist unselectable icon_row {{isPaperInReadingList(paper) ? \"selected\" : \"not_selected\"}}' data-cjs-on-click=togglePaperReadingList>" +
					"<span class='conficon_label'>Reading List </span><span class='conficon conficon-readinglist'></span>" +
				"</div>" +
				"<div class='vote unselectable icon_row {{isPaperVotedFor(paper) ? \"selected\" : \"not_selected\"}}' data-cjs-on-click=togglePaperVote>" +
					"<span class='conficon_label'>Best Talk </span><span class='conficon conficon-vote'></span>" +
				"</div>" +
			"</div>" +
		"</div>" +
		"<div class='row'>" +
			"<div class='col-md-10 col-md-push-2'>" +
				"<p class='description'>" +
					"{{#if paper.award}}" +
						"<div class='award {{paper.award.replace(\" \", \"_\")}}'>" +
							"{{#if paper.award==='Best'}}" +
								"Best paper" +
							"{{#elif paper.award==='Honorable Mention'}}" +
								"Honorable Mention" +
							"{{/if}}" +
						"</div>" +
					"{{/if}}" +
					"{{#each getPaperAttachments(paper)}}" +
						"{{#if this.type==='YoutubeVP'}}" +
							"<div class='video-container'>" +
								"<iframe width='320' height='195' src='//www.youtube.com/embed/{{this.url}}' frameborder='0' allowfullscreen></iframe>" +
							"</div>" +
						"{{/if}}" +
					"{{/each}}" +
					"<strong>Abstract: </strong>{{paper.description}}" +
				"</p>" +
			"</div>" +
			"<div class='col-md-2 col-md-pull-10'>" +
				"<div class='notes'>" +
					"<textarea data-cjs-on-propertychange='onNotesChange' " +
							"data-cjs-on-input='onNotesChange' " +
							"data-cjs-on-keyup='onNotesChange' " +
							"class='my_notes' placeholder='My notes' class='form-control' rows='5'>" +
						"{{getPaperNotes(paper)}}" +
					"</textarea>" +
					"<div class='saving_note_state'>{{savingNoteState}}</div>" +
				"</div>" +
			"</div>" +
		"</div>"
	);

	$.widget("confapp.expanded_paper", {
		options: {
			paper: false
		},

		_create: function() {
			this._super("create");

			this._addListeners();
			this._add_content_bindings();
			this._add_class_bindings();
		},

		_addListeners: function() {
			var schedule = this.option("schedule");
		},

		_removeListeners: function() {
			var schedule = this.option("schedule");
		},


		_destroy: function() {
			this._super("destroy");
			this._remove_content_bindings();
			this._remove_class_bindings();
			this._removeListeners();
		},

		_add_content_bindings: function() {
			var self = this,
				paper = this.option("paper"),
				resetSavedTimeout = false,
				saveNotes = _.throttle(function(value) {
					ConfApp.setPaperNotes(paper, value);
					self.saving_state.set("saved");
					if(resetSavedTimeout) {
						clearTimeout(resetSavedTimeout);
					}
					resetSavedTimeout = setTimeout(function() {
						self.saving_state.set("");
						resetSavedTimeout = false;
					}, 5000);
				}, 900);
			this.saving_state = cjs("");

			expanded_paper_template({
				db: ConfApp.database,
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
				paper: this.option("paper"),
				onClickUnexpandedBubble: function(e) {
					onClickPaper.call(this.event, e);
					//e.preventDefault();
					//e.stopPropagation();
				},
				isPaperExpanded: function(event) {
					return expanded_papers.has(event);
				},
				togglePaperSchedule: function(e) {
					ConfApp.togglePaperInSchedule(paper);
					e.preventDefault();
					e.stopPropagation();
				},
				togglePaperReadingList: function(e) { 
					ConfApp.togglePaperInReadingList(paper);
					e.preventDefault();
					e.stopPropagation();
				},
				togglePaperVote: function(e) {
					if(self._canVote(paper)) {
						ConfApp.togglePaperVote(paper);
					} else {
						var target_parent = $(e.target).parent();
						if(target_parent.data("bs.popover")) {
							target_parent.popover("destroy");
						}
						target_parent.popover({
							html: true,
							content: "<div class='novoting'>"+
										"Voting for this paper is closed until the presentation begins." + 
									"</div>",
							placement: 'bottom'
						}).popover("show");
						_.delay(function() {
							if(target_parent.data("bs.popover")) {
								target_parent.popover("destroy");
							}
						}, 2000);
					}
					e.preventDefault();
					e.stopPropagation();
				},
				getPaperAttachments: function(paper) {
					var db = ConfApp.database,
						attachments = db.getEventAttachments(paper);
					
					return attachments;
				},
				filterAuthor: function(e) {
				/*
					var jqEvent = jQuery.Event("addFilter");
					jqEvent.filter = new ConfApp.PersonFilter(this);
					self.element.trigger(jqEvent);

					e.preventDefault();
					e.stopPropagation();
					*/
				},
				isPaperInSchedule: ConfApp.isPaperInSchedule,
				isPaperInReadingList: ConfApp.isPaperInReadingList,
				isSessionInSchedule: ConfApp.isSessionInSchedule,
				isSessionInReadingList: ConfApp.isSessionInReadingList,

				round: _.bind(Math.round, Math),

				getPaperNotes: ConfApp.getPaperNotes,
				isPaperVotedFor: ConfApp.isPaperVotedFor,
				onNotesChange: function(e) {
					var value = $(e.target).val();
					self.saving_state.set("");
					saveNotes(value);
				},
				savingNoteState: this.saving_state
				/*,

				onSaveNotesClick: function(e) {
					var value = $("textarea", $(e.target).parent()).val();
					ConfApp.setPaperNotes(this, value);
				}
				*/

			}, this.element);
		},
		_remove_content_bindings: function() {
			cjs.destroyTemplate(this.element);
			this.saving_state.destroy(true);
		},

		_add_class_bindings: function() {
			this.element.addClass("col-md-12 gridded expanded");
		},
		_remove_class_bindings: function() {
			this.element.removeClass("col-md-12 gridded expanded");
		},
		_canVote: function(paper) {
			var type = paper.type;
			if(_.indexOf(["paper", "note", "TOCHI", "altchi", "Paper", "Note", "alt.chi", "Case Study", "case study"], type) >= 0) {
				var curr_time = (new Date()).getTime();
				return (paper.start_time-68400)*1000 < curr_time;
			}
			return false;
		}
	});
}(ConfApp));