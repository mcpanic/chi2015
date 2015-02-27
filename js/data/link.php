<?php
header('Content-Type: application/json');
echo '
{
	"data" : [
		{
			"rank": 1,
			"title": "CHI 2015",
			"link": "/",
			"sub_links" : []
		},
		{
			"rank": 2,
			"title": "Program",
			"link": "/program/",
			"sub_links" : [
				{
					"rank": -1,
					"title": "Full Schedule",
					"link": "/program/full_schedule/"
				},
				{
					"rank": 0,
					"title": "Schedule at a Glance",
					"link": "/program/schedule_glance/"
				},
				{
					"rank": 1,
					"title": "Keynotes",
					"link": "/program/keynotes/"
				},
				{
					"rank": 2,
					"title": "Asian CHI Symposia (ACHIS)",
					"link": "/program/asianchisymposia/"
				},
				{
					"rank": 3,
					"title": "Workshops",
					"link": "/program/workshops/"
				},
				{
					"rank": 4,
					"title": "Papers and Notes",
					"link": "/program/papers-notes/"
				},
				{
					"rank": 5,
					"title": "Courses",
					"link": "/program/courses/"
				},
				{
					"rank": 6,
					"title": "Interactivity",
					"link": "/program/interactivity/"
				},
				{
					"rank": 7,
					"title": "Best of CHI",
					"link": "/program/best-of-chi/"
				}
			]
		},
		{
			"rank": 3,
			"title": "Attending",
			"link": "/attending/",
			"sub_links" : [
				{
					"rank": 1,
					"title": "Visa",
					"link": "/attending/visa/"
				},
				{
					"rank": 2,
					"title": "Housing",
					"link": "/attending/housing/"
				},
				{
					"rank": 3,
					"title": "Women\'s Breakfast",
					"link": "/attending/womens-breakfast/"
				},
				{
          "rank": 4,
          "title": "Physical Accessibility",
          "link": "/attending/physical-accessibility/"
        }
			]
		},
		{
			"rank": 4,
			"title": "Authors",
			"link": "/authors/",
			"sub_links" : [
			]
		},
		{
			"rank": 5,
			"title": "Organizers",
			"link": "/organizers/",
			"sub_links" : []
		},
		{
			"rank": 6,
			"title": "Sponsoring",
			"link": "/sponsoring/",
			"sub_links" : [
				{
					"rank": 1,
					"title": "Sponsors of CHI 2015",
					"link": "/sponsoring/sponsors-of-chi2015/"
				}
			]
		},
		{
			"rank": 7,
			"title": "Exhibiting",
			"link": "/exhibiting/",
			"sub_links" : [
				{
					"rank": 1,
					"title": "List of Exhibitors",
					"link": "/exhibiting/list-of-exhibitors/"
				}
			]
		},
		{
			"rank": 8,
			"title": "Recruiting",
			"link": "/recruiting",
			"sub_links" : []
		}

	]
}
';

?>