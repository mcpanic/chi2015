(function (root) {
	root.ConfApp = {
		dropboxName: cjs(false)
	};

	window.nuke = function() {
		root.ConfApp.nukeLocalUserData();
		root.ConfApp.nukeDropboxData();
	};
}(this));
