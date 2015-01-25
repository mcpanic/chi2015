angular.module('chi2015_app', ['chi2015_controllers'])
.filter("schedule_desktop", function(){
	return function(objs) {
		var filtered = [];
		angular.forEach(objs, function(obj){
			filtered.push(obj)
		})

		filtered.sort(function(a, b){
			return (a.time > b.time ? 1 : -1)
		})

		return filtered
	}
})

angular.module('chi2015_controllers', ["ngSanitize"])

.controller("course_controller", ["$scope", "$window",
	function($scope, $window) {

		$scope.isWide = function() {
        	return $window.innerWidth > 768; //your breakpoint here.
   		}

   		angular.element($window).on('resize', angular.bind($scope, $scope.$apply));

		$scope.data = {
			c01: {
				id: "C01",
				short_title: "Designing Websites for Adults 55+",
				paper_title: "Designing Websites for Adults 55+: Toward Universal Design",
				author: "Johnson, Jeff",
				instructor: "Jeff Johnson, Wiser Usability, Inc., Cupertino, California, United States",
				candb: "The ultimate outcome is that the usability of the Web will be improved for older adults.",
				description: 'Benefits: If a website’s target audience includes older adults, certain aspects of the site’s design become more important.  This course describes age-related factors that affect ability to use the Web, and presents web design guidelines that reflect the capabilities, usage patterns, and preferences of older web users. Attendees will:<br/>• understand how poorly-designed websites can present barriers for older adults.<br/>• see how their website’s usability can be improved.<br/>• know what resources are available.<br/>• learn that testing websites on the target population is crucial, yet need not be expensive.<br/><br/>Origins: Presented at American Society on Aging 2013, 2014, and at Stanford PCD Seminar. <br/><br/> Features:<br/> • demographics of users of online services, by age<br/>• age-related factors affecting ability to use computers and the Web,<br/>• common web-design problems that decrease the usability of websites for older adults,<br/>• design guidelines that can help web designers avoid these common pitfalls.<br/><br/>Audience:  Web designers and developers of all levels.  Also: Q/A engineers, Web usability testers, and managers.<br/><br/>Presentation: Lecture, short videos, Q&amp;A, class demonstrations.<br/><br/>Instructor background:  Jeff Johnson is Principal Consultant at UI Wizards and co-founder of Wiser Usability.  After earning B.A. and Ph.D.degrees in cognitive psychology from Yale and Stanford, he worked at Cromemco, Xerox, US West, Hewlett-Packard, and Sun.  Since 1996 he hasbeen a consultant.  He has taught at Stanford, Mills, and the University of Canterbury.  He is a member of the CHI Academy.  He authored articles and chapters on HCI, as well as the books GUI Bloopers, Web Bloopers, GUI Bloopers 2.0, Designing with the Mind in Mind, and Conceptual Models (with Austin Henderson).<br/><br/>Web: <a href="http://uiwizards.com">http://uiwizards.com</a>,  <a href="http://WiserUsability.com">http://WiserUsability.com</a>'
			},
			c02: {
				id: "C02",
				short_title: "Cross-Device, Context-dependent UI",
				paper_title: "Design and Adaptation for Cross-Device, Context-dependent User Interfaces",
				author: "Paternò, Fabio",
				instructor: "Fabio Paternò, CNR-ISTI, Pisa, Italy",
				candb: "This tutorial aims to help user interface designers and developers to understand the issues involved in multi-device, context-dependent interactive applications, which can be accessed through wearable, mobile and stationary devices",
				description: 'Benefits: This tutorial aims to help user interface designers and developers to understand the issues involved in multi-device, context-dependent interactive applications, which can be accessed through wearable, mobile and stationary devices even exploiting different interaction modalities. It will provide a discussion of the possible solutions in terms of concepts, techniques, languages, and tools, with particular attention to Web environments. The tutorial will deal with the various strategies in order to adapt, distribute, and migrate the user interface according to the context of use. It will consider how to address such issues both when authoring cross-device interfaces and when user interfaces for different devices are dynamically adapted, distributed, or even migrated seamlessly across them.<br/><br/>Features:<br/>- The influence of the interaction platforms on the possible tasks and their structure<br/>- Authoring multi-device interfaces<br/>- Adaptation rules for context-dependent adaptation<br/>- Model-based design of multi-device interfaces<br/>- Responsive design and its limitation<br/>- Context-Dependent Multimodal Augmentation of Web Applications<br/>- Dynamic Distribution of  User Interfaces Elements Across Devices<br/>- User interfaces able to migrate across devices and preserve their state<br/><br/>Audience: The tutorial will be interesting for interactive software developers and designers who want to understand the issues involved in context-dependent multi-device interactive applications and the space of the possible solutions. Likewise, user interface designers would benefit in that they could work more effectively and make their choices more explicit in designing pervasive cross-device services.<br/><br/>Presentation: Lectures, demonstrations, exercises, videos, group discussions<br/><br/>Instructor background: Fabio Paternò is Research Director at CNR-ISTI, where in recent years his main research interests have been in conceptsand tools for context-dependent applications, model-based design and development, authoring and design of cross-device interactive applications, distributed and migratory interfaces.'
			},
			c03: {
				id: "C03",
				short_title: "Cross-channel Conceptual Design",
				paper_title: "Cross-channel Conceptual Design - A Methodology",
				author: "Parush, Avi",
				instructor: "Avi Parush, Faculty of Industrial Management and Engineering, Israel Institute of Technology, Haifa, Israel",
				candb: "This course provides a proven strategy for transforming your research into a Conceptual Model, taking into consideration the users’ mental model.",
				description: "Taking the leap from research and requirements to product design is an age-old challenge. Here is the secret: This course provides a proven strategy for transforming your research into a Conceptual Model. It provides an iterative process that allows you to build the essential foundation for a successful interactive system, taking into consideration the users’ mental model. It provides one with a framework for envisioning how users perceive, understand, and experience their tasks and processes in the context of your product. This way, one can mould the model to facilitate users’ understanding of their tasks and processes and positively influence their experience, including: functionality - what they do; configuration – where; and navigation - how they go from one place to another within the system. For a proven, innovative strategy that allows one’s users to meet their goals with your intuitive, effective solution, CHI audience should take this course."
			},
			c04: {
				id : "C04",
				short_title: "Somatic Approaches to Experience in HCI",
				paper_title: "Body, Whys & Videotape: Somatic Approaches to Experience in HCI",
				author: "Schiphorst, Thecla",
				instructor: "Thecla Schiphorst, School of Interactive Arts and Technology , Simon Fraser University, Vancouver, British Columbia, Canada<br/> Lian Loke, Design Lab, University of Sydney, Sydney, NSW, Australia",
				candb: "<br/>• Introduces the value of incorporating somatic techniques to HCI design strategies.<br/>• Provides a contextual history of somatic techniques incorporated within HCI design and evaluation.<br/>• Discusses the challenges of articulating and incorporating Somatic Practices in HCI design processes.<br/> • Encourage participants to consider somatic approaches they can apply to interaction design",
				description: 'How can HCI designers and practitioners incorporate a somatic perspective or sensibility into interaction design? This course will enable participants to develop an understanding of how somatic experiential techniques can be used to support design and evaluation of user experience methods within HCI. It will provide multiple examples using case studies, video and in-class exercises that illustrate somatic application to design of technology. The course contextualizes the history of somatic methods within HCI, highlighting the relationships between user experience and the application of somatic principles. It illustrates the benefits and challenges of integrating somatic approaches to experience design in a technological context. Participants will be encouraged to explore body-based somatic and somaesthetic strategies and apply them to research. The course addresses differences in epistemological assumptions through contextual practice, discussion and case studies with a strong emphasis on multi-modal examples.'
			},
			c05: {
				id : "C05",
				short_title: "Design for Searching & Finding",
				paper_title: "Design for Searching & Finding",
				author: "Russell, Daniel",
				instructor: "Daniel Russell , Google, Mountain View, California, United States <br/> Jaime Teevan , Microsoft Research, Redmond, Washington, United States <br/>Meredith Morris , Microsoft Research, Redmond, Washington, United States <br/>Marti Hearst , School of Information, University of California, Berkeley, Berkeley, California, United States <br/> Ed Chi , Google, Inc., Mountain View, CA, United States",
				candb: "Search and finding is a common user activity. But do you know the relevant factors to design search interfaces?  This course reviews the theory and practices of search interface design.",
				description: 'Modern user interfaces often contain a search or find components so the user can search for content in the context of the application.  While there are common practices, what actually works best in these situations? What kinds of search tasks are the users actually trying to accomplish when they do a search?  In this course, we’ll review the search and findability issues that users confront in the course of their tasks, and ways in which information can be found.  We’ll also discuss the ways in which users seek information in social settings.  You will learn several key design principles for creating your own search interfaces, as well as coming to understand what is driving people to search.'
			},
			c06: {
				id : "C06",
				short_title: "Intro to HCI",
				paper_title: "Introduction to Human-Computer Interaction",
				author: "Barbosa, Simone",
				instructor: "Jonathan Lazar , Towson University, Towson, Maryland, United States <br/>Simone Barbosa , Informatics Department, Pontifical Catholic University of Rio de Janeiro, Rio de Janeiro, RJ, Brazil",
				candb: "Newcomers to the field of human-computer interaction will learn basic HCI concepts, processes, methods, and tools, through several real-world examples.",
				description: 'The objective of this course is to provide newcomers to Human-Computer Interaction (HCI) with an introduction and overview of the field. In addition to introducing basic concepts, the course will provide enough structure to help understand how the advanced material in the CHI 2015 technical program fits into the overall field.'
			},
			c07: {
				id : "C07",
				short_title: "Actionable Inexpensive Games",
				paper_title: "Actionable Inexpensive Games User Research",
				author: "Nacke, Lennart",
				instructor: "Lennart Nacke , Games and Media Entertainment Research Laboratory, University of Ontario Institute of Technology, Oshawa, Ontario, Canada <br/>Steve Engels , Computer Science, University of Toronto, Toronto, Ontario, Canada <br/>Pejman Mirza-Babaei , Games and Media Entertainment Research Laboratory, University of Ontario Institute of Technology, Oshawa, Ontario, Canada",
				candb: "This course is meant to provide new insights for user experience designers and human-computer interaction (HCI) graduate students interested in game evaluation and games user research.",
				description: 'This course will allow people to understand the intricacies of rapid games user research methods. For this we will weave together playtesting exercises and help participants turn player feedback into actionable design recommendations. The course is designed from a user experience (UX) perspective and should allow for people unfamiliar with rapid iteration and user testing to playtesting and basic user research skills.'
			},
			c08: {
				id : "C08",
				short_title: "Design for Video & TV",
				paper_title: "Interaction Design for Online Video and Television",
				author: "Geerts, David",
				instructor: "David Geerts , CUO , Social Spaces, KU Leuven, iMinds, Leuven, Belgium <br/>Pablo Cesar , CWI (Centrum voor Wiskunde en Informatica), Amsterdam, The Netherlands",
				candb: "This course will teach attendees how to design and evaluate interaction with online video and television. It provides a pragmatic toolset, techniques and guidelines, which can be applied in practice",
				description: 'In this course, the instructors will first give an extensive overview of successful existing and emerging television and online video applications, on the web, on television and on smartphones and tablets, and present them in a coherent framework. The framework will help in understanding the relevance of these emergent applications for the CHI community, in particular which aspects of user experience are relevant for TV and video applications and which interaction design techniques can be of help when designing them. <br/><br/>Next, the instructors will provide a detailed overview on the design of online video and television applications that exploit novel features, with an emphasis on social interactivity, interaction techniques and content. This will be illustrated by using existing design projects, including secondary screens, rich social experiences with other viewers and social sharing of television content with closed relationships.<br/><br/>After this, we will show how TV and online video applications can be evaluated. First we will discuss how usability and sociability can be studied by performing user tests, which aspects of testing are different from studying applications in other domains, and include practical tips on how to improve user testing focused on the user experience of TV and online video. Then we will go over a number of heuristics, based on the design principles discussed earlier, for designing online video and television applications.<br/><br/>In order to better explain the underlying concepts, we will perform a plenary group exercise in which the participants are invited to apply the design principles and heuristics and evaluate and redesign an online video application.<br/><br/> Finally, the instructors will explore the future of the emerging trends in TV and online video and together with the participants discuss what factors can lead to the success or failure of these kinds of applications.'
			},
			c09: {
				id : "C09",
				short_title: "Designing & Assessing using Task Models",
				paper_title: "Designing and Assessing Interactive Systems Using Task Models",
				author: "Palanque, Philippe",
				instructor: "Philippe Palanque , ICS-IRIT, University of Toulouse, Toulouse, France <br/>Célia Martinie , ICS-IRIT, University of Toulouse, Toulouse, France",
				candb: 'This course takes a practical approach to the principles, methods and tools in task modelling. Part 1 is introductory while Part 2 is interactive hands-on exercises about how to "do-it-right".',
				description: 'This two-part course takes a practical approach to the principles, methods and tools in task modelling. Part 1: A non-technical introduction demonstrates that task models support successful design of interactive systems. Foundations of task models are introduced followed by a review of notations and tools for describing users’ tasks. Three simple real-life examples are used throughout this introduction. Part 2: A more technical interactive hands-on exercise of how to "do-it-right" e.g. How to go from task analysis to task models? How to assess (through analysis and simulation) that a task model is correct? How to identify complexity of user tasks and how to reduce it? How to identify tasks that are good candidate for migration either towards automation or other users? Audience: HCI researchers, practitioners, and students. No prior knowledge of task modeling is required. Teaching Methods: Lecture, interactive exercises supported by software tool (HAMSTERS – provided to attendees). Instructors’ Background: Prof. Philippe Palanque research work is on bringing together Usability and Reliability in Interactive Systems. He has been working for over 20 years to integrate task modeling in the design on Interactive Systems using scalable notations and interactive tools. He has been teaching task modeling in various places e.g. University of Toulouse (France), University of Salzburg (Austria) and University of Granada (Spain). Philippe has been the recipient of the IFIP Silver Core award, is a member of the Distinguished Speaker Program at ACM and was the general co-chair of CHI 2014. Célia Martinie is Assistant Professor in Computer Science at University Toulouse 3. Philippe and Célia both have applied task modeling techniques to various application areas including interactive cockpits at Airbus, satellite ground segments and Air Traffic Management workstations but also to other consumer electronic systems such as games and interactive TV.'
			},
			c10: {
				id : "C10",
				short_title: "Learn to Sketch",
				paper_title: "Learn to Sketch (Even if You Can't Draw): Hands-on Sketching Course",
				author: "Foehrenbach, Stephanie",
				instructor: "Stephanie Foehrenbach , Zuehlke Engineering AG, Schlieren, Zuerich, Switzerland",
				candb: "Sketching as a technique to quickly draw ideas is used to explore and communicate ideas. This course introduces basic sketching techniques and a visual language, which participants can immediately apply.",
				description: 'Sketching as a technique to quickly draw ideas on a sheet of paper can be used to document, explore and communicate concepts and ideas. Sketches can help to elicit feedback from stakeholders and users in an early phase of the project and therefore prevent from getting on the wrong track. Within the user centered design process, sketches can further be a mean to quickly and inexpensively explore interaction concepts. They can be used to create storyboards and inform wireframes and prototypes. The ability to draw sketches can be a powerful extension for a practitioner’s toolbox.<br/><br/>However, the task of producing sketches can be challenging, especially if drawing skills are lacking. In this course, participants will be introduced to basic sketching techniques and a visual language, which they can immediately apply. It is not a theoretical course but rather a lot of hands-on exercise for the participants. <br/><br/>During the course participants will learn:<br/>- how to communicate visually<br/>- how to visualize ideas just on the spot<br/>- and how to get over the fear from an empty sheet of paper.<br/><br/>Everybody engaged in the field of human computer interaction is welcome to this course and there are no prerequisites required. The course is most valuable for practitioners such as user experience professionals, requirements engineers or product managers. <br/><br/>The course is given by Stephanie Foehrenbach (M.Sc., Dipl. Inform. (FH)). Stephanie is a usability lead consultant and trainer employed by Zuehlke in Switzerland. She works for clients from various industries.'
			},
			c11: {
				id : "C11",
				short_title: "Child Computer Interaction",
				paper_title: "Research Methods for Child Computer Interaction",
				author: "Read, Janet",
				instructor: "Janet Read , University of Central Lancashire, Preston, United Kingdom <br/>Shuli Gilutz , Tel-Aviv University, Tel - Aviv, Israel",
				candb: "This course introduces participants to ethical and appropriate research with children.  A case study is used to show research methods. The course suits those working with children in HCI.",
				description: 'Attendees  on this course will learn about the uniqueness of HCI research with children. They will become more aware of the common pitfalls in planning, analyzing and reporting research with children. The course is a mixture of presentations and participation.  We will use case studies  to scaffold the learning and attendees will critique pseudo-papers including one that has been specially designed for this course to showcase many of the problems. The course will suit practitioners in CCI  as well as researchers.'
			},
			c12: {
				id : "C12",
				short_title: "Practical UX Methodologies",
				paper_title: "Practical UX Research Methodologies",
				author: "Garcia, Sarah",
				instructor: "Sarah Garcia , Research, UEGroup, San Jose, CA, USA",
				candb: "Walk away from the course with a more complete understanding of the different methodologies and begin to understand when to incorporate each approach to their unique applications.",
				description: 'With so many UX research methodologies and so many questions to answer, it\'s hard to make sense of it all.  During this half day course, Sarah Garcia, lead researcher from UEGroup in Silicon Valley will lead an interactive discussion surrounding when to use which research tools for the most effective results, and tips on how to prepare and recruit for these studies. Sarah will also guide the class through practical suggestions for developing best practice methodologies related to: Ethnography, Out of Box Experiences, Usability Testing and Comparative Benchmark Studies.'
			},
			c13: {
				id : "C13",
				short_title: "Methods for HCI Research",
				paper_title: "Methods for Human-Computer Interaction Research",
				author: "Gould, Sandy",
				instructor: "Sandy Gould , University College London, London, United Kingdom <br/>Duncan Brumby , University College London, London, United Kingdom <br/>Anna Cox , University College London, London, United Kingdom <br/>Geraldine Fitzpatrick , Vienna University of Technology, Vienna, Austria <br/>Jettie Hoonhout , Philips Research, Eindhoven, The Netherlands <br/>David Lamas , Tallinn University, Tallinn, Estonia <br/>Effie Law , Computer Science, University of Leicester, Leicester, United Kingdom",
				candb: "Course participants will gain a new (or improved!) understanding of a range of methods used in the exploration HCI problems.",
				description: 'We warmly welcome you to join our 160-minute CHI 2015 course, “Methods for Human-Computer Interaction”. The course will be run by Duncan Brumby (UCL), Anna Cox (UCL), Geraldine Fitzpatrick (TU Wein), Sandy Gould (UCL), Jettie Hoonhout (Philips Research), David Lamas (Tallinn University) and Effie Law (University of Leicester).<br/><br/>Course participants will gain a new (or improved!) understanding of a range of methods used in the exploration HCI problems. The course will be delivered in a way that will make it accessible to those new to HCI while still being highly informative for those who want to brush up on their research methods knowledge. The course is suitable for students, researchers and practitioners from all backgrounds: there are no prerequisites.<br/><br/>The course will be run by leading HCI researchers with experience of working and teaching in educational and industrial environments around the world. Course attendees will be introduced to both qualitative and quantitative research methods that are used to understand people and interactional contexts. We will also consider some of the major philosophical traditions in HCI as well as contemporary formulations, such as Interaction Science.<br/><br/>To keep things lively over a double-session the course will be a mix of lectures, whole-class activities and panels.<br/><br/>Course overview:<br/>•              Brief history of research approaches in HCI<br/>•              Benefits and difficulties of multi-approach and multi-disciplinary research<br/>•              Ethical considerations in research with human participants<br/>•              History of controlled studies in HCI<br/>•              The purpose and benefits of controlled studies<br/>•              Experimental design<br/>•              Quantitative analysis including inferential statistics<br/>•              Quantitative studies outside the lab (e.g., field experiments)<br/>•              History of qualitative methods in HCI<br/>•              The purpose and benefits of qualitative methods<br/>•              Ethnographic approaches<br/>•              Research techniques including interviews and experience reports<br/>•              Research in the wild<br/><br/>For more course information visit <a href="http://bit.ly/hci-methods-course">http://bit.ly/hci-methods-course</a>'
			},
			c14: {
				id : "C14",
				short_title: "Mobile HCI",
				paper_title: "Mobile Human-Computer Interaction",
				author: "Rukzio, Enrico",
				instructor: "Niels Henze , University of Stuttgart, Stuttgart, Baden-Württemberg, Germany <br/>Enrico Rukzio , Institute of Media Informatics, Ulm, Germany",
				candb: "The objective of this course is to provide newcomers to Mobile Human-Computer Interaction (Mobile HCI) with an overview of the field.",
				description: 'The objective of this course is to provide newcomers to Mobile Human-Computer Interaction (Mobile HCI) with an overview of the field. The course will introduce the four grand challenges of Mobile HCI that set this field apart from others and will discuss seven current Mobile HCI research areas that address those challenges.'
			},
			c15: {
				id : "C15",
				short_title: "HCI Lessons",
				paper_title: "HCI Lessons: From Earth to Outer Space... and Back",
				author: "Boy, Guy",
				instructor: "Guy Boy , Human Centered Design Institute, Florida Institute of Technology, Melbourne, Florida, United States <br/>Jeffrey Bradshaw , Florida Institute for Human and Machine Cognition, Pensacola, Florida, United States <br/>Soyeon Yi , International Space University, Strasbourg, France",
				candb: "This Course goes beyond the regular user interface paradigm toward human-systems integration as a whole, taking into account high-level requirements and lowest grains of detail.",
				description: 'This storytelling course will bring, in meaningful terms, insightful concepts, methods and tools that are used in the air and space domains. HCI for complex engineered systems challenges conventional HCI solutions to propose new kinds of approaches that turn out to be very useful for solving HCI complex problems. Participants will design devices usable on Earth using accumulated knowledge and tips from aerospace experience. Creativity, in the sense of synthesis and integration, and design thinking will be at the center of this course, where participants will learn how to state and solve a complex design problem, and deliver the resulting product.'
			},
			c16: {
				id : "C16",
				short_title: "Sketching User Experiences",
				paper_title: "Sketching User Experiences: The Hands-on Course",
				author: "Marquardt, Nicolai",
				instructor: "Nicolai Marquardt , UCL Interaction Centre, University College London, London, United Kingdom <br/>Saul Greenberg , Department of Computer Science, University of Calgary, Calgary, Alberta, Canada",
				candb: "In this hands-on sketching course participants will learn easy to apply sketching methods for generating and refining ideas for HCI research and design.",
				description: 'When designing novel user interfaces, paper-pencil sketches can support the design thinking process and are ideal for sharing design ideas with others. This hands-on course will demonstrate how to integrate sketching into researchers’ and interaction designers’ everyday practice. Participants will learn essential sketching strategies, apply these in practice during many hands-on exercises, and learn the various ways of using sketches as a tool when working on HCI projects. The demonstrated sketching techniques include, for example:<br/><br/>* Developing your sketching vocabulary<br/>* Rapid sketching of people, emotions, gestures, and objects<br/>* 10 plus 10 design funnel<br/>* Photo tracing and creating hybrid sketches<br/>* Interface sketches and rapid wireframing<br/>* Storyboards for interaction sequences<br/>* Sketch boards, critique, and sharing<br/><br/>We will demonstrate many best practices and sketching shortcuts, and involve all participants in joint sharing and discussion sessions of the sketches created during the different hands-on activities. We will demonstrate how we used sketching techniques in many of our recent projects when designing interactive systems, and highlight how to apply the learned sketching techniques during all stages of the design process. <br/><br/>This course is open for everyone and does not require any previous drawing expertise. Its emphasis is on quick, easy to learn, and easy to apply methods for generating and refining ideas.  We will provide sketching materials, but please bring your own sketches and sketchbooks. <br/><br/>Course instructors: Nicolai Marquardt is a Lecturer in Physical Computing at University College London. Saul Greenberg is a full professor and Industrial Research Chair in the Department of Computer Science at the University of Calgary. They are co-authors (with Sheelagh Carpendale and Bill Buxton) of ‘Sketching User Experiences: The Workbook’ (Morgan-Kaufmann 2012). Some of the presented strategies in this course are based on the material covered in this workbook.<br/><br/>More information available at: <a href="http://sketchbook.cpsc.ucalgary.ca/">http://sketchbook.cpsc.ucalgary.ca/</a>'
			},
			c17: {
				id : "C17",
				short_title: "Creating Musical Interfaces",
				paper_title: "Introduction to Creating Musical Interfaces",
				author: "Lyons, Michael",
				instructor: "Michael Lyons , Ritsumeikan University, Kyoto, Japan <br/>Sidney Fels , University of British Columbia, Vancouver, British Columbia, Canada",
				candb: "This course provides a gentle and fun introduction to the practice of musical interface design. Participants will gain sufficient knowledge of tools and methods to start their own projects.",
				description: 'This course provides an introduction to the theory and practice of musical interface design. Our target audience consists of those who are interested in starting projects relating to music technology. Those with a general interest are also welcome. Participants will learn key aspects of the theory and practice of musical interface design by studying case studies and practical know-how sourced mainly from the leading conference in this area, known as "New Interfaces for Musical Expression" or NIME. Advances in digital audio technologies have led to a situation where computers play a role in most music production and performance. Digital technologies offer unprecedented opportunities for the creation and manipulation of sound, however the flexibility of these new technologies implies a confusing array of choices for musical composers and performers. Some artists have faced this challenge by using computers directly to create music. However, most would agree that the computer is not a musical instrument, in the same sense as traditional instruments, and it is natural to ask "how to play the computer" using interface technology appropriate for human brains and bodies. In two eighty minute sessions we will introduce an approach to the design of musical interfaces. The first session is presented in lecture format with many video demonstrations of musical interfaces. The second session illustrates the design and prototyping process with case studies, and continues with live demonstrations of hardware and software tools used for musical interface projects. The course concludes with a group design exercise in which attendees will sketch their original ideas for new musical interfaces. The course is aimed at beginners but more experienced participants will have plenty to explore. Familiarity with basic aspects of interactive media will be helpful, however there are no specific technical prerequisites. No background in music or computer audio is assumed.'
			},
			c18: {
				id : "C18",
				short_title: "Speech-based Interaction",
				paper_title: "Speech-based Interaction: Myths, Challenges, and Opportunities",
				author: "Munteanu, Cosmin",
				instructor: "Cosmin Munteanu , ICCIT, University of Toronto Mississauga, Mississauga, Ontario, Canada <br/>Gerald Penn , University of Toronto, Toronto, Ontario, Canada",
				candb: "Learn how speech recognition and synthesis works, what are its limitations and usability challenges, how can it enhance interaction paradigms, and what is the current research and commercial state-of-the-art.",
				description: 'Speech remains the "holy grail" of interaction, as this is the most natural form of communication that humans employ. Unfortunately, it is also one of the most difficult modalities to be understood by machines - despite, and perhaps, because it is the highest-bandwidth communication channel we possess. While significant research effort, in engineering, linguistics and psychology, have been spent on improving machines\' ability to understand and synthesize speech, the HCI community has been relatively timid in embracing this modality as a central focus of research. This can be attributed in part to the relatively discouraging levels of accuracy in understanding speech, in contrast with often unfounded claims of success from industry, but also to the intrinsic difficulty of designing and especially evaluating interfaces that use speech and natural language as an input or output modality. While the accuracies of understanding speech input are still discouraging for many applications under less-than-ideal conditions, several interesting areas have yet to be explored that could make speech-based interaction truly hands-free. The goal of this course is to inform the HCI community of the current state of speech and natural language research, to dispel some of the myths surrounding speech-based interaction, as well as to provide an opportunity for HCI researchers and practitioners to learn more about how speech recognition and synthesis work, what are their limitations, and how these could be used to enhance current interaction paradigms. Through this, we hope that HCI researchers and practitioners will learn how to combine recent advances in speech processing with user-centred principles in designing more usable and useful speech-based interactive systems.'
			},
			c19: {
				id : "C19",
				short_title: "Designing Surveys",
				paper_title: "Designing Surveys for HCI Research",
				author: "Müller, Hendrik",
				instructor: "Hendrik Müller , Google Australia, Sydney, NSW, Australia <br/>Aaron Sedley , Google, Inc., Mountain View, California, United States",
				candb: "Through both lecture material and interactive group activities, gain a practical understanding of the survey research lifecycle, including sampling considerations, questionnaire design, questionnaire biases, and evaluation.",
				description: 'Surveys, now commonplace on the Web, allow researchers to make inferences about an entire population by gathering information from a small subset of the larger group. Surveys can gather insights about people’s attitudes, perceptions, intents, habits, awareness, experiences, and characteristics, both at significant moments in time and over time. At a glance, many tools are available and the cost of conducting surveys appears low. However, there is a wide gap between quick-and-dirty surveys, and surveys that are properly planned, constructed, and analyzed. <br/><br/>Course attendees, either new to surveys or somewhat experienced but interested in the latest advances, will gain a practical understanding of the survey research lifecycle, from goals to planning, sampling considerations, questionnaire design, and evaluation. This course will also focus on demonstrating common questionnaire biases while providing best practices on how to minimize them. The role of survey research within HCI will also be discussed by highlighting common applications and by examining frequently used standardized questionnaires to measure usability and other aspects within HCI. The course will combine lecture material with relevant real-world examples; a major portion will be dedicated to interactive group activities during which attendees will apply some of the learned material to reviewing and revising example survey questions. No formal prerequisites are required to attend this course.<br/><br/>This course will be facilitated by two experienced senior user experience researchers from Google who each have a proven track record in using survey research in the field of HCI. They have held several workshops, given talks, and published about survey research at various HCI/UX venues over the past years.'
			},
			c20: {
				id : "C20",
				short_title: "Designing Wearable Interfaces",
				paper_title: "The Glass Class: Designing Wearable Interfaces",
				author: "Billinghurst, Mark",
				instructor: "Mark Billinghurst , Human Interface Technology Laboratory New Zealand, University of Canterbury, Christchurch, New Zealand <br/>Dr. Thad Starner , Georgia Institute of Technology, Atlanta, United States, Atlanta, Georgia, United States",
				candb: "Attendees will learn how to design effective interfaces for head mounted and body worn wearable computers and will enable HCI practitioners to enter the wearable field and explore research applications.",
				description: 'This course will teach how to design and develop effective interfaces for head mounted or wrist worn wearable computers through the application of user-centered design principles. It will enable existing HCI practitioners to enter the fast growing area of wearable computing. Attendees will learn how to rapidly develop prototypes, and the important areas of research and development.<br/><br/>Origin:<br/>This is the second time this course will have been taught at CHI. It was presented at CHI 2014 and elements of it have also been presented in earlier courses at CHI, Siggraph, IEEE VR, and ISMAR, among others.<br/><br/>Features:<br/>The course has the following goals:<br/>•              Provide an introduction to wearable computers<br/>•              Give an understanding of current wearable technology<br/>•              Describe key design principles/interface metaphors<br/>•              Provide an overview of relevant human perceptual principles<br/>•              Present rapid prototyping tools<br/>•              Explain how to evaluate wearable experiences<br/>•              Outline active areas of wearable computing research<br/>•              Hands on demonstrations with wearable computers<br/><br/>Audience<br/>This course is designed for people that would like to learn how to design and develop applications for wearable computers. The course assumes familiarity of the basics of the user-centered design process and interaction design.<br/><br/>Prerequisites<br/>There are no prerequisites.<br/><br/>Presentation<br/>Lectures with slides and videos, and hands-on demonstrations.<br/><br/>Instructors<br/>Mark Billinghurst is the director of the HIT Lab NZ at the University of Canterbury, with nearly 20 years experience of research in wearable and mobile devices. In 2013 he was on sabbatical in the Google Glass team. <br/><br/>Thad Starner is an Assistant Professor in Georgia Tech, where he directs the Contextual Computing Group. Thad is one of the pioneers of wearable computing and also works at Google[x] as Technical Manager of the Google Glass project.'
			},
			c21: {
				id : "C21",
				short_title: "UX Sampling Methodology",
				paper_title: "Using Experience Sampling Methodology to Collect Deep Data About Your Users",
				author: "Baxter, Kathy",
				instructor: "Kathy Baxter , Google, Inc., Mountain View, California, United States <br/>Anna Avrekh , Google Inc, New York City, New York, United States <br/>Bob Evans , User Experience Research Infrastructure, Google, Inc., Mountain View, California, United States",
				candb: "Attendees will obtain the skills to design, conduct, and analyze data from an ESM study in order to capture a deeper, more holistic understanding of their users.",
				description: 'Experience Sampling Methodology (ESM) is a type of longitudinal diary study that allows one to understand a person’s experience in the moment. It combines the qualitative richness of longitudinal diary studies, artifacts of a field study, and quantitative data of a large-scale survey or app tracker. Using a free, open-source mobile app called “PACO (Personal Analytics COmpanion),” we can conduct ESM studies with participants anywhere in the world. This workshop will give attendees the skills to design, conduct, and analyze data from ESM studies. Prior to attending the course, attendees will be invited to participate in a sample ESM study so they can see what the experience is like from a participant’s point of view. After giving a brief overview of what ESM is and the history, we will discuss best practices for study design including when ESM is appropriate, considerations for ensuring validity and reliability, and guidance for signal scheduling. We will introduce the PACO app (www.pacoapp.com) for conducting ESM studies on mobile devices and conduct a demonstration of how to use the tool. To better understand how to conduct a large-scale ESM study, we will discuss one such study the Google Search User Experience Research team conducted with 1200 participants across the US. We will then walk attendees through each step of the process to conduct a successful ESM study, including creating the data collection form, recruiting recommendations, participant instructions, incentive recommendations, participant retention, and participation monitoring. Next will be a discussion of how to analyze data from an ESM study. In the last portion of the class, attendees will pair up to design their own ESM study, build it in PACO, and launch it to themselves to test. This hands-on exercise will ensure everyone has the skills upon leaving the class to build their own studies.'
			},
			c22: {
				id : "C22",
				short_title: "Rapid Design Labs",
				paper_title: "Rapid Design Labs: A Tool to Turbocharge Design-Led Innovation",
				author: "Nieters, Jim",
				instructor: "Jim Nieters, Consumer Travel, Hewlett Packard, Palo Alto, California, United States<br/>Carola Thompson, create, Splunk, Inc, San Francisco, California, United States",
				candb: "",
				description: 'We as researchers and User Experience (UX) designers want to identify and create products that change the world and therefore, we choose to engage in strategic research and design. In the real world though, coming up with a breakthrough idea or transformative design doesn’t mean it will automatically be accepted or get to market. By definition, innovative ideas represent new ways of thinking. Organizations by nature seem to have anti-innovation antibodies that often kill new ideas— even disruptive innovations that could help companies differentiate themselves from their competition. As difficult as coming up with a game-changing idea can be, getting an organization to act on the idea often seems impossible. Perhaps we find ourselves in work routines that do not provide space to think differently. Our experience is that practitioners and academics alike need new tools to meet this challenge—tools that empower UX teams in both business and universities to identify transformative new ideas, and then to get these big ideas and designs accepted. This course proposes rapid design labs—a design-led, facilitative, cross-functional, iterative approach to innovation that aligns organizations and generates value at each step. It provides tools and methods that turn attendees into catalysts, who systemically identify new ideas, and align multi-disciplinary teams around their ideas. Attendees learn how to lead workshops that foster ideation, collaboration, trust, and free expression. These workshops enable intensive brainstorming, purposeful play, design, user testing, and rapid prototyping. Learn how innovative companies and universities, such as Splunk, Deutsche Telekom Laboratories, the Berlin Technical University, Yahoo!, Mindjet, zSpace, HP, and more identify, design, and bring great products to market.'
			},
			c23: {
				id : "C23",
				short_title: "Conceptual Models",
				paper_title: "Conceptual Models: Core to Good Design",
				author: "Johnson, Jeff",
				instructor: "Jeff Johnson , UI Wizards, Inc, San Francisco, California, United States",
				candb: "Teaches the benefits of designing a conceptual model (CM) of apps before designing the UI, the components of CMs and how to create them, and provides experience designing a CM.",
				description: 'A crucial step in designing a UI for a software application is to design a coherent, task-focused conceptual model.  With a CM, designers design better, developers develop better, and users learn and use better.  Unfortunately, this step is often skipped in software design, resulting in incoherent, arbitrary, inconsistent, overly-complex applications that impede design, development, learning, understanding, and use.  Based on the presenter\'s (coauthored) book: Conceptual Models: Core to Good Design.  It covers:<br/>• What CMs are.<br/>• How they improve software design and development.<br/>• Perils of skipping CMs.<br/>• Object/operations analysis.<br/>• Examples of CMs.<br/>• A hands-on exercise designing a CM.<br/><br/>The course presentation consists of lecture, Q&amp;A, and audience exercises. Most of the second segment consists of hands-on exercises and discussion.<br/><br/>The intended audience is designers and developers of all levels, as well as Q/A engineers, usability testers, and managers.<br/><br/>Instructor background:  Jeff Johnson is Principal Consultant at UI Wizards, a product usability consultancy, and co-founder of Wiser Usability, a consultancy focusing on usability and accessibility for seniors.  He has worked in HCI since 1978.  After earning B.A. and Ph.D. degrees in cognitive psychology from Yale and Stanford, he worked at Cromemco, Xerox, US West, Hewlett-Packard, and Sun.  Since 1996 he has been a consultant and author.  He has taught at Stanford, Mills, and the University of Canterbury.  He authored articles and chapters on HCI, as well as the books GUI Bloopers, Web Bloopers, GUI Bloopers 2.0, Designing with the Mind in Mind, and Conceptual Models (with Austin Henderson).<br/><br/>Web: <a href="http://uiwizards.com">http://uiwizards.com</a>,  <a href="http://WiserUsability.com">http://WiserUsability.com</a>'
			},
			c24: {
				id : "C24",
				short_title: "Beyond Tangible Bits",
				paper_title: "Vision-Driven: Beyond Tangible Bits, Towards Radical Atoms",
				author: "Ishii, Hiroshi",
				instructor: "Hiroshi Ishii , Massachusetts Institute of Technology, Cambridge, Massachusetts, United States <br/>Daniel Leithinger , MIT Media Lab, Massachusetts Institute of Technology, Cambridge, Massachusetts, United States <br/>Sean Follmer , MIT Media Lab, Massachusetts Institute of Technology, Cambridge, Massachusetts, United States <br/>Lining Yao , Massachusetts Institute of Technology, Cambridge, Massachusetts, United States <br/>Jifei Ou , MIT Media Lab, Cambridge, Massachusetts, United States",
				candb: "This course introduces the trajectory of our vision-driven research from Tangible Bits towards Radical Atoms, and a variety of design projects presented and exhibited in Arts, Design and HCI communities.",
				description: 'Our vision-driven design research is carried out through an artistic approach. Whereas much of today’s mainstream Human Computer Interaction (HCI) research addresses functional concerns – the needs of users, practical applications, and usability evaluation – Tangible Bits and Radical Atoms (transformable physical materials) are driven by vision. This is because today\'s technologies will become obsolete in one year, and today\'s applications will be replaced in 10 years, but true visions – we believe – can last longer than 100 years. This course introduces the trajectory of our vision-driven design research from Tangible Bits towards Radical Atoms, and a variety of interaction design projects that were presented and exhibited in Media Arts, Design, and HCI communities. Especially, we focus on the recent development in the two streams of Radical Atoms: 1) Dynamic Shape Display, and 2) Programmable Materials.'
			},
			c25: {
				id : "C25",
				short_title: "Design for Reading Devices",
				paper_title: "Interaction Design for Reading Devices and Apps",
				author: "Robinson, Simon",
				instructor: "Jennifer Pearson , Swansea University, Swansea, Wales, United Kingdom <br/>Simon Robinson , Swansea University, Swansea, Wales, United Kingdom",
				candb: "This course presents opportunities for supporting better digital readability and accessibility than at present. From paper history to digital future, attendees will learn how to design better future e-reading systems.",
				description: 'Benefits: This course focuses on the timely subject of digital reading. It surveys many of the issues associated with current digital reading designs on both dedicated e-reading devices and desktop or mobile apps. It explores the key concepts behind digital reading and encourages designing for better reading interfaces in the future, enhancing both readability and accessibility.<br/><br/>Features:<br/>• A brief history of reading through the ages;<br/>• Key concepts behind digital reading, underpinned by core HCI design principles;<br/>• Discussion of issues surrounding the current state- of-the-art;<br/>• Design examples that demonstrate how better digital reading applications are possible (and needed);<br/>• Discussion around the future of digital reading.<br/><br/>Audience: Anyone who is interested in reading will enjoy this course – it covers the background of reading through the ages, describes some of the many ways current digital reading software is inferior to paper, and explores ways to overcome these problems. Note that the answer is not simply to copy paper! Software developers who are interested in digital reading, or simply want to incorporate reading material in any of their designs would also benefit from the guidelines provided in this course. <br/><br/>Presentation: This course will run over one 80-minute session and will be presenter-led with two interactive breakout sessions. These activities include critiquing current reading devices and interactive prototyping of new techniques.<br/><br/>Instructor backgrounds: Jennifer Pearson has been working in the field of information interaction relating to digital reading for seven years, and is primary co-author of a recent book in this area. Simon Robinson is a mobile interaction researcher, with a primary interest in low-attention, engaging mobile interfaces. <br/><br/> Resources: The course is based on a recent book which would be an ideal accompanying resource: “Designing for Digital Reading” (Pearson, Buchanan, Thimbleby; published by Morgan &amp; Claypool).'
			},
			c26: {
				id : "C26",
				short_title: "Positive Computing Technology",
				paper_title: "Introduction to Positive Computing - Technology that fosters wellbeing",
				author: "Calvo, Rafael",
				instructor: "Rafael Calvo , School of Electrical and Information Engineering, The University of Sydney, Sydney, NSW, Australia <br/>Dorian Peters , School of Electrical and Information Engineering, University of Sydney, Sydney, NSW, Australia",
				candb: "If we want technology to increase worldwide wellbeing, we have to design for wellbeing directly. Positive computing – the development of technology to support psychological wellbeing and human potential",
				description: 'A growing number of HCI professionals are asking how we might design technology to foster psychological wellbeing.  Meeting such an aim will involve a crossing of disciplines, of methods, and a new way of thinking about what technology should be doing for us. By turning to well-established research in psychology, education, neuroscience, and HCI, we can begin to cultivate a field dedicated to the development of technology that supports wellbeing and human potential, a field we refer to as positive computing.  Using multidisciplinary approaches, researchers have begun to explore how digital experience can support wellbeing determinants like self-awareness, autonomy, resilience, mindfulness, and altruism.<br/><br/>Features<br/>This course will provide you with:<br/>•              Theoretical foundation - Understanding of the relevant literature from multiple disciplines that can inform technology design & evaluation for wellbeing.<br/>•              A theoretical and practical framework for developing new technologies for wellbeing.<br/>•              A broader, deeper, and multidimensional understanding of the ways technology use scenarios impact wellbeing.<br/>•              Review of the State of the art - Exposure to a range of cutting-edge technologies designed to promote factors of wellbeing.<br/>•              Group-generated design strategies for better supporting wellbeing in your current and future projects.<br/><br/>Audience<br/>Beginning to Advanced HCI professionals interested in design for wellbeing.'
			},
			c27: {
				id : "C27",
				short_title: "Psychological Bases for UI Design",
				paper_title: "Designing with the Mind in Mind: The Psychological Basis for UI Design Guidelines",
				author: "Johnson, Jeff",
				instructor: "Jeff Johnson , UI Wizards, Inc, San Francisco, California, United States",
				candb: "By understanding the underlying psychology for the design rules, designers and evaluators enhance their ability to interpret and apply them.  Explaining that psychology is the focus of this course.",
				description: 'Benefits: UI design rules and guidelines are not simple recipes. Applying them effectively requires determining rule applicability and precedence and balancing trade-offs when rules compete.  By understanding the underlying psychology, designers and evaluators enhance their ability to apply design rules. This one-part (80-minute) course explains that psychology.<br/><br/>Origins:  Presented at CHI 2008, 2009, and 2012.  Revised based on recent 2nd edition of book.<br/><br/>Features:<br/>Introduction<br/>Perception<br/>• Perception is biased by experience, context, goals<br/>• Vision is optimized to perceive structure (Gestalt principles)<br/>• We seek and use structure<br/>• Color vision is limited<br/>• Peripheral vision is poor, and visual search is linear unless target “pops” in periphery Cognition<br/>• Attention is limited; Memory is imperfect<br/>• Limits on attention and memory shape our thought and action, e.g., change-blindness<br/>• Recognition is easier than recall<br/>• Easy: learning from experience and executing learned actions; Hard: novel actions, problem-solving, and calculation<br/><br/>Audience: Designers and developers of all levels, especially those lacking education in recent perceptual and cognitive psychology.  Also: Q/A and usability engineers.<br/><br/>Presentation:  Lecture, brief demonstrations with audience participation, Q&amp;A.<br/><br/>Instructor background:  Jeff Johnson is Principal Consultant at UI Wizards and co-founder of Wiser Usability.  After earning B.A. and Ph.D. degrees in cognitive psychology from Yale and Stanford, he worked at Cromemco, Xerox, US West, Hewlett-Packard, and Sun.  Since 1996 he has been a consultant.  He has taught at Stanford, Mills, and the University of Canterbury.  He is a member of the CHI Academy.  He authored articles and chapters on HCI, as well as the books GUI Bloopers, Web Bloopers, GUI Bloopers 2.0, Designing with the Mind in Mind, and Conceptual Models (with Austin Henderson).<br/><br/>Web: <a href="http://uiwizards.com">http://uiwizards.com</a>,  <a href="http://WiserUsability.com">http://WiserUsability.com</a>'
			},
			c28: {
				id : "C28",
				short_title: "ISO Standards",
				paper_title: "How You Could Benefit from Using ISO Standards",
				author: "Bevan, Nigel",
				instructor: "Nigel Bevan , Professional Usability Services, London, United Kingdom",
				candb: "Learn how international standards can provide a sound basis for educational and training, can provide authority for design and development, and are a rich source of guidance and reference material.",
				description: 'ISO standards for HCI contain an authoritative collation of existing knowledge and good practice that has been contributed by international experts.  The course will clarify the value provided by international standards, and their benefits and limitations.  In many cases the standards are more comprehensive than any textbook.  The course will explain how use of international standards can contribute to:<br/><br/>- Better user interface design: interfaces can be evaluated against the ISO guidelines, which can also provide authoritative evidence to cite if a user interface design decision is challenged.<br/>- How to produce reliable usability test data by following the ISO usability test method and using the ISO format for usability reports.<br/>- Documenting information about usability.  ISO standards define the essential information that should be included in a user needs report and a description of the context of use.<br/>- Broadening then concept of usability to include accessibility, user experience and freedom from unnecessary risk.<br/>- Good practice in user centred design: ISO standards specify all the key elements that need to be included.<br/>- Helping your organisation improve its process.  Projects and organisations can compare their activities with the comprehensive and authoritative ISO definition of the processes that are needed to implement user-centered design.<br/>- Making usability and UX a part of systems engineering: ISO standards show how to integrate usability into the requirements and systems development processes.<br/><br/>The potential value of using these standards will be explained for example situations proposed by the audience. <br/><br/> The course will be useful for anyone interested in using international standards to benefit their professional work or activities in their organization, or to use as a basis for educational or training material. Basic familiarity with HCI and usability is assumed.'
			}
		}

		$scope.schedule = [
			{
				day: "Monday",
				rooms: [
					{
						name: "TBA 1",
						time: {
							t_930: {
								class: "empty_slot",
								time: 930
							},
							t_1130: {
								class: "course_entry",
								time: 1130,
								data: $scope.data.c01
							},
							t_1430: {
								class: "course_entry",
								time: 1430,
								data: $scope.data.c05
							},
							t_1640: {
								class: "course_entry",
								time: 1640,
								data: $scope.data.c05
							}	
						}						
					},
					{
						name: "TBA 2",
						time: {
							t_930: {
							class: "empty_slot",
							time: 930
							},
							t_1130: {
								class: "course_entry",
								time: 1130,
								data: $scope.data.c02
							},
							t_1430: {
								class: "course_entry",
								time: 1430,
								data: $scope.data.c06
							},
							t_1640: {
								class: "course_entry",
								time: 1640,
								data: $scope.data.c06
							}	
						}											
					},
					{
						name: "TBA 3",
						time: {
							t_930: {
							class: "empty_slot",
							time: 930
							},
							t_1130: {
								class: "course_entry",
								data: $scope.data.c03,
								time: 1130
							},
							t_1430: {
								class: "course_entry",
								time: 1430,
								data: $scope.data.c07
							},
							t_1640: {
								class: "course_entry",
								time: 1640,
								data: $scope.data.c07
							}	
						}											
					},
					{
						name: "TBA 4",
						time: {
							t_930: {
								class: "empty_slot",
								time: 930
							},
							t_1130: {
								class: "course_entry",
								time: 1130,
								data: $scope.data.c04
							},
							t_1430: {
								class: "course_entry",
								time: 1430,
								data: $scope.data.c08
							},
							t_1640: {
								class: "course_entry",
								time: 1640,
								data: $scope.data.c08
							}	
						}
												
					}
				]
			},
			{
				day: "Tuesday",
				rooms: [
					{
						name: "TBA 1",
						time: {
							t_930: {
								class: "course_entry",
								time: 930,
								data: $scope.data.c09
							},
							t_1130: {
								class: "course_entry",
								time: 1130,
								data: $scope.data.c09
							},
							t_1430: {
								class: "course_entry",
								time: 1430,
								data: $scope.data.c13
							},
							t_1640: {
								class: "course_entry",
								time: 1640,
								data: $scope.data.c13
							}
						}

					},
					{
						name: "TBA 2",
						time: {
							t_930: {
							class: "course_entry",
							time: 930,
							data: $scope.data.c10
						},
						t_1130: {
							class: "course_entry",
							time: 1130,
							data: $scope.data.c10
						},
						t_1430: {
							class: "course_entry",
							time: 1430,
							data: $scope.data.c14
						},
						t_1640: {
							class: "course_entry",
							time: 1640,
							data: $scope.data.c14
						}	
						}
												
					},
					{
						name: "TBA 3",
						time: {
							t_930: {
								class: "course_entry",
								time: 930,
								data: $scope.data.c11
							},
							t_1130: {
								class: "course_entry",
								time: 1130,
								data: $scope.data.c11
							},
							t_1430: {
								class: "course_entry",
								time: 1430,
								data: $scope.data.c15
							},
							t_1640: {
								class: "course_entry",
								time: 1640,
								data: $scope.data.c15
							}	
						}
												
					},
					{
						name: "TBA 4",
						time: {
							t_930: {
							class: "course_entry",
							time: 930,
							data: $scope.data.c12
						},
						t_1130: {
							class: "course_entry",
							time: 1130,
							data: $scope.data.c12
						},
						t_1430: {
							class: "course_entry",
							time: 1430,
							data: $scope.data.c16
						},
						t_1640: {
							class: "course_entry",
							time: 1640,
							data: $scope.data.c16
						}	
						}
												
					}
				]
			},
			{
				day: "Wednesday",
				rooms: [
					{
						name: "TBA 1",
						time: {
							t_930: {
							class: "course_entry",
							time: 930,
							data: $scope.data.c17
						},
						t_1130: {
							class: "course_entry", time: 1130,
							data: $scope.data.c17
						},
						t_1430: {
							class: "course_entry", time: 1430,
							data: $scope.data.c20
						},
						t_1640: {
							class: "course_entry", time: 1640,
							data: $scope.data.c20
						}	
						}
						

					},
					{
						name: "TBA 2",
						time: {
							t_930: {
							class: "course_entry", time: 930,
							data: $scope.data.c18
						},
						t_1130: {
							class: "course_entry", time: 1130,
							data: $scope.data.c18
						},
						t_1430: {
							class: "course_entry", time: 1430,
							data: $scope.data.c21
						},
						t_1640: {
							class: "course_entry", time: 1640,
							data: $scope.data.c21
						}	
						}
												
					},
					{
						name: "TBA 3",
						time: {
							t_930: {
							class: "course_entry", time: 930,
							data: $scope.data.c19
						},
						t_1130: {
							class: "course_entry", time: 1130,
							data: $scope.data.c19
						},
						t_1430: {
							class: "course_entry", time: 1430,
							data: $scope.data.c22
						},
						t_1640: {
							class: "course_entry", time: 1640,
							data: $scope.data.c22
						}	
						}
												
					},
					{
						name: "TBA 4",
						time: {
							t_930: {
							class: "empty_slot", time: 930
						},
						t_1130: {
							class: "empty_slot", time: 1130
						},
						t_1430: {
							class: "course_entry", time: 1430,
							data: $scope.data.c23
						},
						t_1640: {
							class: "course_entry", time: 1640,
							data: $scope.data.c23
						}	
						}
												
					}
				]
			},
			{
				day: "Thursday",
				rooms: [
					{
						name: "TBA 1",
						time: {
							t_930: {
							class: "course_entry", time: 930,
							data: $scope.data.c24
						},
						t_1130: {
							class: "course_entry", time: 1130,
							data: $scope.data.c27
						},
						t_1430: {
							class: "empty_slot", time: 1430
						},
						t_1640: {
							class: "empty_slot", time: 1640
						}	
						}
						

					},
					{
						name: "TBA 2",
						time: {
							t_930: {
							class: "course_entry", time: 930,
							data: $scope.data.c25
						},
						t_1130: {
							class: "course_entry", time: 1130,
							data: $scope.data.c28
						},
						t_1430: {
							class: "empty_slot", time: 1430
						},
						t_1640: {
							class: "empty_slot", time: 1640
						}	
						}
												
					},
					{
						name: "TBA 3",
						time: {
							t_930: {
							class: "course_entry", time: 930,
							data: $scope.data.c26
						},
						t_1130: {
							class: "empty_slot", time: 1130
						},
						t_1430: {
							class: "empty_slot", time: 1430
						},
						t_1640: {
							class: "empty_slot", time: 1640
						}	
						}
												
					}					
				]
			}
		]


		//console.log($scope.schedule)

	}])