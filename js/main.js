
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
    	// $(this).parent().width($(this).width() + 4);
	});
}

function computeDaysUntil(){
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var chiStartDate = new Date(2015, 3, 18); // 2015.04.18
	var today = new Date();
	return Math.round(Math.abs((today.getTime() - chiStartDate.getTime())/(oneDay)));
}

function addCrossingsPopover(){
	var crossingsText = "The butterfly is a traditional cultural symbol throughout Asia and other parts of the world.  As the butterfly flits from place to place, it picks up pollen and fosters new creation by taking the pollen to a new location.  Crossing paths in this way creates the potential to do new things, to find new solutions, and to create new directions. Come to CHI 2015 to cross paths with expertise from around the globe.";
	$(".about-crossings").popover({
		placement: "bottom",
		trigger: "hover",
		content: crossingsText
	});
}

$( document ).ready(function() {
	selectMenu();
	adjustMenuWidth();
	addCrossingsPopover();
	$("#counter .days-left").text(computeDaysUntil());

	$(document).on("click", "button.navbar-toggle", function(){
		if ($(this).hasClass("collapsed")) {// toggle yes
			$(this).closest(".navbar").css("background-color", "transparent");
			// console.log("to transparent");
		} else {
			$(this).closest(".navbar").css("background-color", "#E4211C");
			// console.log("to red");
		}
		// console.log("clicked");
	});
});
