(function (root) {
	$.fn.goTo = function() {
		if(this.length > 0) {
			var navbar = $("nav"),
				top = this.offset().top,
				height = navbar.height();

			$('html, body').animate({
				scrollTop: (top - (Math.max(70, height))) + 'px'
			}, 'fast');
		}
		return this; // for chaining...
	};

	var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>');
	ConfApp.showLoading = function() {
		pleaseWaitDiv.modal();
	};
	ConfApp.hideLoading = function() {
		pleaseWaitDiv.modal('hide');
	};
	
	ConfApp.summarizeAuthors = function (people) { 
		if(people.length === 0) {
			return "";
		} else if(people.length === 1) {
			return people[0].last_name;
		} else if(people.length === 2) {
			return people[0].last_name + " & " + people[1].last_name;
		} else {
			return _.pluck(people.slice(0, -1), 'last_name').join(", ") + " & " + _.last(people).last_name;
		}
	};
}(this));
