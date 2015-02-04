<?php
include "production.php";
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" ng-app="chi2015_app"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" ng-app="chi2015_app"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" ng-app="chi2015_app"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" ng-app="chi2015_app"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <?php if (isset($isIndex)) : ?>
            <title><?php echo $pageTitle; ?></title>
        <?php else : ?>
            <title><?php echo $pageTitle . " | CHI2015"; ?></title>
        <?php endif ?>
        <meta name="description" content="The ACM CHI conference is the world's premiere conference on Human Factors in Computing Systems. The CHI2015 conference will be held in Seoul, Korea from April 18 to April 23, 2015.">
        <meta name="keywords" content="HCI, conference, seoul, korea">
        <meta name="author" content="Juho Kim">
        <meta name="owner" content="Association for Computing Machinery">
        <meta name="viewport" content="width=device-width">

        <!-- for Facebook -->
        <meta property="og:title" content="CHI 2015 | Crossings" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="http://chi2015.acm.org/img/animate2.gif" />
        <meta property="og:url" content="http://chi2015.acm.org/" />
        <meta property="og:description" content="The ACM CHI conference is the world's premiere conference on Human Factors in Computing Systems. The CHI2015 conference will be held in Seoul, Korea from April 18 to April 23, 2015." />

        <!-- for Twitter -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="CHI 2015 | Crossings" />
        <meta name="twitter:description" content="official website for the CHI2015 conference in Seoul, Korea from April 18 to April 23, 2015" />
        <meta name="twitter:image" content="http://chi2015.acm.org/img/animate2.gif" />

        <link rel="icon" type="image/png" href="<?php echo $prefix; ?>/chi_favicon.png">
        <link rel="stylesheet" href="<?php echo $prefix; ?>/css/bootstrap.min.css">
        <link rel="stylesheet" href="<?php echo $prefix; ?>/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="<?php echo $prefix; ?>/css/main.css">
        <!--[if lte IE 8]>
            <link rel = "stylesheet" href="css/ie.css" />
        <![endif]-->
        <!--[if !IE]><!--><link rel="stylesheet" href="<?php echo $prefix; ?>/css/responsive.css" /><!--<![endif]-->
        <script src="<?php echo $prefix; ?>/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>

        <script src="<?php echo $prefix; ?>/js/angular/angular.min.js"></script>
        <script src="<?php echo $prefix; ?>/js/angular/angular-sanitize.min.js"></script>
        <script src="<?php echo $prefix; ?>/js/angular/angular-resource.min.js"></script>

        <script src="<?php echo $prefix; ?>/js/data/link.js"></script>
        <script src="<?php echo $prefix; ?>/js/angular/modules/main_app.js"></script>

        <?php if (isset($ng_app)) :?>

            <script src="<?php echo $prefix; ?>/js/angular/modules/<?php echo $ng_app; ?>.js"></script>
        <?php endif ?>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
    <div class="navbar" role="navigation">  <!-- navbar-fixed-top -->
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <!-- <span class="sr-only">Toggle navigation</span> -->
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">CHI 2015</a>
        </div>

        <div class="navbar-collapse collapse" ng-controller="link_controller">
          <ul class="nav navbar-nav">
            <!--<li><a href="<?php echo $prefix; ?>/" class="menu-home">CHI 2015</a></li>
            <li><a href="<?php echo $prefix; ?>/impact" class="menu-impact">CHI'S IMPACT</a></li>
            <li><a href="<?php echo $prefix; ?>/program" class="menu-program">PROGRAM</a></li>
            <li><a href="<?php echo $prefix; ?>/attending" class="menu-attending">ATTENDING</a></li>
            <li><a href="<?php echo $prefix; ?>/authors" class="menu-authors">AUTHORS</a></li>
            <li><a href="<?php echo $prefix; ?>/organizers" class="menu-organizers">ORGANIZERS</a></li>
            <li><a href="<?php echo $prefix; ?>/sponsoring" class="menu-sponsoring">SPONSORING</a></li>
            <li><a href="<?php echo $prefix; ?>/exhibiting" class="menu-exhibiting">EXHIBITING</a></li>
            <li><a href="<?php echo $prefix; ?>/recruiting" class="menu-recruiting">RECRUITING</a></li>
            <li><a href="<?php echo $prefix; ?>/spotlights" class="menu-spotlights">SPOTLIGHTS</a></li>
            -->

             <li ng-repeat="link in data" ng-class="is_dropdown(link.sub_links_count)">
                <a ng-if="link.sub_links_count==0" ng-href="<?php echo $prefix; ?>{{link.link}}" ng-class="is_selected(link.title.toLowerCase())" ng-bind="link.title.toUpperCase()"></a>
                <a ng-if="link.sub_links_count!=0" href="#" data-toggle="dropdown" role="button" aria-expanded="false" ng-class="is_selected_dropdown(link.title.toLowerCase())" ><span ng-bind="link.title.toUpperCase()"></span> <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu" ng-if="link.sub_links_count!=0">
                    <li class="sub_link"><a ng-href="<?php echo $prefix; ?>{{link.link}}" ng-bind="link.title"></a></li>
                    <li class="sub_link" ng-repeat="sub_links in link.sub_links"><a ng-href="<?php echo $prefix; ?>{{sub_links.link}}" ng-bind="sub_links.title"> </a></li>
                </ul>
             </li>

          </ul>
        </div><!--/.navbar-collapse -->


      </div>
    </div>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
<!--         <h1>CHI 2015</h1>
        <h2>Crossings</h2>
 -->
        <div class="jumbotron-left">

            <img class="animation" src="<?php echo $prefix; ?>/img/animate2.gif" alt="CHI 2015 | Crossings | Seoul, Korea">
        </div>
        <div class="jumbotron-right">
            <p class="date">April 18 - 23, 2015</p>
            <div class="register-button"><a href="https://www.regonline.com/CHI2015AttendeeRegistration">REGISTER NOW</a></div>
            <p class="about-crossings">About Crossings &#187;</p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="column-wrapper">
        <div class="column-main">
        <!-- <div class="col-lg-8 col-md-8">     -->
