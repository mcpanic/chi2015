
function selectMenu(){
	// TODO: debugging with edge cases and final URLs
	var href = window.location.pathname;
	var pageName = href.substr(href.lastIndexOf('/') + 1);
	if (pageName == "" || pageName == "chi2015.acm.org" || pageName == "index.php")
		pageName = "home";
	$(".nav li a").removeClass("selected");
	$(".menu-" + pageName).addClass("selected");
}

function adjustMenuWidth(){
	$('.nav li a').each(function(){
    	$(this).parent().width($(this).width() + 4);
	});
}

function computeDaysUntil(){
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var chiStartDate = new Date(2015, 3, 18); // 2015.04.18
	var today = new Date();
	return Math.round(Math.abs((today.getTime() - chiStartDate.getTime())/(oneDay)));
}

$( document ).ready(function() {
	selectMenu();
	adjustMenuWidth();
	$("#counter .days-left").text(computeDaysUntil());
});
