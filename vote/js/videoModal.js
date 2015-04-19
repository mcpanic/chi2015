(function (ConfApp) {
	cjs.registerCustomPartial("modal_video", {
		createNode: function() {
			return $("<div />").modal_video({});
		},
		destroyNode: function(node) {
			$(node).modal_video("destroy");
		}
	});

	var videoModal = cjs.createTemplate(
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

	$.widget("confapp.modal_video", {
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
			this._hiddenListener = $.proxy(function() {
				$("iframe", this.element).attr("src", "");
			}, this);

			this.element.on('hidden.bs.modal', this._hiddenListener);
		},

		_removeListeners: function() {
			this.element.off('hidden.bs.modal', this._hiddenListener);
		},


		_destroy: function() {
			this._super("destroy");
			this._removeListeners();
			this._remove_content_bindings();
			this._remove_class_bindings();
		},

		_add_content_bindings: function() {
			videoModal({
			}, this.element);
		},
		_remove_content_bindings: function() {
			cjs.destroyTemplate(this.element);
		},

		_add_class_bindings: function() {
			this.element.addClass("modal fade")
						.attr({
							id: "videoModal",
							tabIndex: -1,
							role: "dialog",
							"aria-hidden": true
						});
		},
		_remove_class_bindings: function() {
			this.element.removeClass("modal fade");
		},
		showModal: function(title, videoURL) {
			var src = "//www.youtube.com/" + videoURL;
			console.log(src);

			$('iframe', this.element).attr('src', src);
			$("#videosTitle", this.element).text(title);
			this.element.modal("show");
		}
	});
}(ConfApp));
