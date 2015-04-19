(function (ConfApp) {
	cjs.registerCustomPartial("voter_id_inp", {
		createNode: function(options) {
			return $("<div />").voter_id_inp(options);
		},
		destroyNode: function(node) {
			$(node).voter_id_inp("destroy");
		}
	});

	var voterIdInputTemplate = cjs.createTemplate(
		"<div class='modal-dialog'>" +
			"<div class='modal-content'>" +
				"<div class='modal-header'>" +
					"<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>{{{'&times;'}}}</button>" +
					"<h4 class='modal-title'>Voter ID</h4>" +
				"</div>" +
				"<form role='form'>" +
					"<div class='modal-body'>" +
						"<p>" +
							"To record your vote, please enter the six-character voter ID on the back of your name tag." +
						"</p>" +
						"<div class='form-group has-feedback {{(is_valid === \"no\") ? \"has-error\" : ((is_valid === \"yes\") ? \"has-success\" : \"\") }}'>" +
							"<label class='control-label' for='voterIdInp'>Voter ID</label>" +
							"<input class='form-control input-lg' type='text' maxlength='6' autocomplete='off' autocorrect='off' autocapitalize='on' id='voterIDInput' placeholder='6 characters'>" +
							"{{#if is_valid === 'no'}}" +
								"<span class='glyphicon glyphicon-remove form-control-feedback'></span>" +
								"<p class='control-label'>" +
									"{{validity_error}}" +
								"</p>" +
							"{{#elif is_valid === 'yes'}}" +
								"<span class='glyphicon glyphicon-ok form-control-feedback'></span>" +
							"{{/if}}" +
						"</div>" +
					"</div>" +
					"<div class='modal-footer'>" +
						"<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" +
						"<button type='submit' class='btn btn-primary'>OK</button>" +
					"</div>" +
				"</form>" +
			"</div>"  +
		"</div>"
	);

	$.widget("confapp.voter_id_inp", {
		options: {
			database: ConfApp.database
		},

		_create: function() {
			this._super("create");
			this.one_time_submit_listeners = [];

			this.$is_valid = cjs("invalid");
			this.$validity_error = cjs(false);

			this._add_content_bindings();
			this._add_class_bindings();
			this._addListeners();
		},

		_addListeners: function() {
			var did_submit = false,
				inp_value = false;
			this._submitListener = $.proxy(function(event) {
				inp_value = $("#voterIDInput", this.element).val();
				did_submit = true;
				this.element.modal("hide");
				event.preventDefault();
				event.stopPropagation();
			}, this);
			this._hiddenListener = $.proxy(function() {
				if(did_submit) {
					did_submit = false;
					if(inp_value.length > 0) {
						ConfApp.checkVoterIDValidity(inp_value, function(is_valid, reason) {
							if(is_valid) {
								this.$is_valid.set("yes");
								this.$validity_error.set(false);
								_.each(this.one_time_submit_listeners, function(listener) {
									listener(true, inp_value);
								});
								this.one_time_submit_listeners = [];
								inp_value = false;
							} else {
								this.$is_valid.set("no");
								this.$validity_error.set(reason);

								this.requestValue(false);

								this.element.modal("show");
							}
						}, this);
					} else {
						_.each(this.one_time_submit_listeners, function(listener) {
							listener(true, inp_value);
						});
						this.one_time_submit_listeners = [];
						inp_value = false;
					}
				} else {
					_.each(this.one_time_submit_listeners, function(listener) {
						listener(false);
					});
					this.one_time_submit_listeners = [];
				}
			}, this);

			$("form", this.element).on("submit", this._submitListener);
			this.element.on('hidden.bs.modal', this._hiddenListener);

			var callback_count = 0,
				check_validity = _.throttle(_.bind(function(value) {
					callback_count++;
					ConfApp.checkVoterIDValidity(value, function(is_valid, reason) {
						callback_count--;
						if(callback_count === 0) {
							if(is_valid) {
								this.$is_valid.set("yes");
								this.$validity_error.set(false);
							} else {
								this.$is_valid.set("no");
								this.$validity_error.set(reason);
							}
						}
					}, this);
				}, this), 500);

			$("input#voterIDInput", this.element).on("input change", $.proxy(function() {
				var value = $("#voterIDInput", this.element).val();
				this.$is_valid.set("unknown");
				this.$validity_error.set(false);
				check_validity(value);
			}, this));
		},

		_removeListeners: function() {
			$("form", this.element).off("submit", this._submitListener);
			this.element.off('hidden.bs.modal', this._hiddenListener);
		},


		_destroy: function() {
			this._super("destroy");
			this._removeListeners();
			this._remove_content_bindings();
			this._remove_class_bindings();
			
			this.$is_valid.destroy();
			this.$validity_error.destroy();
		},

		_add_content_bindings: function() {
			voterIdInputTemplate({
				is_valid: this.$is_valid,
				validity_error: this.$validity_error
			}, this.element);
		},
		_remove_content_bindings: function() {
			cjs.destroyTemplate(this.element);
			this.saving_state.destroy(true);
		},

		_add_class_bindings: function() {
			this.element.addClass("modal fade")
						.attr({
							id: "voterIDModal",
							tabIndex: -1,
							role: "dialog",
							"aria-hidden": true
						});
		},
		_remove_class_bindings: function() {
			this.element.removeClass("modal fade");
		},
		requestValue: function(callback) {
			if(callback) {
				this.one_time_submit_listeners.push(callback);
			}
			this.element.modal("show");
			_.delay(_.bind(function() {
				$("input#voterIDInput", this.element).focus().select();
			}, this), 800);
		}
	});
}(ConfApp));
