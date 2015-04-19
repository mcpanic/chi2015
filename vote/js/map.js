(function (ConfApp) {
	cjs.registerCustomPartial("modal_map", {
		createNode: function() {
			return $("<div />").modal_map({});
		},
		destroyNode: function(node) {
			$(node).modal_map("destroy");
		}
	});

	var mapModal = cjs.createTemplate(
			"<div class='modal-dialog'>" +
				"<div class='modal-content'>" +
					"<div class='modal-header'>" +
						"<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>{{{'&times;'}}}</button>" +
						"<h4 class='modal-title' id='videosTitle'></h4>" +
					"</div>" +
					"<div class='modal-body'>" +
						"<iframe width='560' height='315' frameborder='0' allowfullscreen=''></iframe>" +
					"</div>" +
				"</div>" +
			"</div>"
	);

	$.widget("confapp.modal_map", {
		options: {
			database: ConfApp.database
		},

		_create: function() {
			this._super("create");

			this._add_content_bindings();
			this._add_class_bindings();
			this._addListeners();
		},

		_addListeners: function() {
		},

		_removeListeners: function() {
		},


		_destroy: function() {
			this._super("destroy");
			this._removeListeners();
			this._remove_content_bindings();
			this._remove_class_bindings();
		},

		_add_content_bindings: function() {
			mapModal({
			}, this.element);
		},
		_remove_content_bindings: function() {
			cjs.destroyTemplate(this.element);
		},

		_add_class_bindings: function() {
			this.element.addClass("modal fade")
						.attr({
							id: "mapModal",
							tabIndex: -1,
							role: "dialog",
							"aria-hidden": true
						});
		},
		_remove_class_bindings: function() {
			this.element.removeClass("modal fade");
		},
		showModal: function(title, videoURL) {
			this.element.modal("show");
		}
	});
}(ConfApp));
