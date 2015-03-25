<?php
  $pageTitle = "Sponsors of CHI 2015";
  include "../header.php";
?>

<h1>Sponsors of CHI 2015</h1>

<div id="content-canvas" ng-controller="main_controller">
  <p>Be a sponsor for CHI 2015! See instructions on <a href="/sponsoring/">sponsorship</a>.</p>

  <h4 id="hero">Hero</h4>
    <div class="sponsor"><a href="http://samsung.com/" target="_blank"><img width="350" alt="Samsung" title="Sponsored by Samsung" src="<?php echo $prefix; ?>/img/sponsors/samsung4.png" border="0"></a></div>
  <h4 id="champions">Champions</h4>

    <div class="sponsor"><a href="http://golfsimulator.golfzon.com/" target="_blank"><img width="240" alt="GolfZon" title="Sponsored by GolfZon" src="<?php echo $prefix; ?>/img/sponsors/golfzon.png" border="0"></a></div>
    <br/>
    <div class="sponsor"><a href="http://www.google.com/" target="_blank"><img width="210" alt="Google" title="Sponsored by Google" src="<?php echo $prefix; ?>/img/sponsors/google.png" border="0"></a></div>

    <div class="sponsor"><a href="http://www.microsoft.com/" target="_blank"><img alt="Microsoft" title="Sponsored by Microsoft" width="320" src="<?php echo $prefix; ?>/img/sponsors/microsoft.png" border="0"></a></div>

    <div class="sponsor"><a href="http://www.naver.com/" target="_blank"><img alt="Naver" title="Sponsored by Naver" width="210" src="<?php echo $prefix; ?>/img/sponsors/naver.png" border="0"></a></div>

    <div class="sponsor"><a href="http://www.skplanet.com/eng/" target="_blank"><img alt="SK Planet" title="Sponsored by SK Planet" width="210" src="<?php echo $prefix; ?>/img/sponsors/skplanet_color.jpg" border="0"></a></div>
<hr>
  <h4 id="contributors">Contributors</h4>
  <div class="row">
    <div class="sponsor col-sm-6 col-md-4"><a href="http://www.autodesk.com/" target="_blank"><img width="160" alt="Autodesk" title="Sponsored by Autodesk" src="<?php echo $prefix; ?>/img/sponsors/autodesk.png" border="0"></a></div>

    <div class="sponsor col-sm-6 col-md-4"><a href="http://www.daumkakao.com/en/main" target="_blank"><img width="160" alt="DaumKakao" title="Sponsored by DaumKakao" src="<?php echo $prefix; ?>/img/sponsors/daumkakao.png" border="0"></a></div>

    <div ng-if="isGeneralSmallWindow()" class="clearfix visible-sm-block"></div>

    <div class="sponsor col-sm-6 col-md-4"><a href="http://www.disneyresearch.com/" target="_blank"><img width="160" alt="Disney Research" title="Sponsored by Disney Research" src="<?php echo $prefix; ?>/img/sponsors/disney.png" border="0"></a></div>

    <div ng-if="isGeneralMediumWindow()" class="clearfix visible-sm-block"></div>
    
    <div class="sponsor col-sm-6 col-md-4"><a href="http://facebook.com/" target="_blank"><img width="160" alt="Facebook" title="Sponsored by Facebook" src="<?php echo $prefix; ?>/img/sponsors/facebook2.png" border="0"></a></div>

    <div ng-if="isGeneralSmallWindow()" class="clearfix visible-sm-block"></div>

    <div class="sponsor col-sm-6 col-md-4"><a href="http://home.futureplay.co/" target="_blank"><img width="160" alt="FuturePlay" title="Sponsored by FuturePlay" src="<?php echo $prefix; ?>/img/sponsors/futureplay.png" border="0"></a></div>


    <div class="sponsor col-sm-6 col-md-4"><a href="http://worldwide.hyundai.com/" target="_blank"><img width="160" alt="Hyundai" title="Sponsored by Hyundai" src="<?php echo $prefix; ?>/img/sponsors/hyundai.png" border="0"></a></div>    

    <div ng-if="isGeneralMediumWindow()" class="clearfix visible-md-block"></div>
    <div class="sponsor col-sm-6 col-md-4"><a href="http://langrid.org/en/index.html" target="_blank"><img width="160" alt="LG" title="Sponsored by Language Grid" src="<?php echo $prefix; ?>/img/sponsors/language_grid.png" border="0"></a></div>

    <div class="sponsor col-sm-6 col-md-4"><a href="http://www.lg.com/" target="_blank"><img width="160" alt="Language Grid" title="Sponsored by LG" src="<?php echo $prefix; ?>/img/sponsors/lg.png" border="0"></a></div>
    
    <div class="sponsor  col-sm-6 col-md-4" ><a href="http://www.nsf.gov/" target="_blank"><img width="220" alt="NSF" title="Sponsored by NSF" src="<?php echo $prefix; ?>/img/sponsors/nsf.png" border="0"></a></div>
  </div>
<hr>
  <h4 id="friends">Friends of CHI</h4>

  <div class="row">
      <div class="sponsor col-xs-6 col-sm-4 ">
       Adobe Systems, Inc.
    </div>
    <div class="sponsor col-xs-6 col-sm-4 ">
       H9Works.com
    </div>
    <div class="sponsor col-xs-6 col-sm-4 ">
       HCI Lab, Yonsei University
    </div>
    <div class="sponsor col-xs-6 col-sm-4 ">
       Institute of Convergence Science, Yonsei University
    </div>
    <div class="sponsor col-xs-6 col-sm-4 ">
       KIPFA
    </div>
    <div class="sponsor col-xs-6 col-sm-4 ">
       Samsung Art and Design Institute
    </div>
  </div>
<hr>  
  <h4 id="friends">Special Support</h4>
  <div class="row">
  <div class="sponsor col-xs-6"><a href="http://english.seoul.go.kr/" target="_blank"><img width="220" alt="Seoul Metropolitan Government" title="Sponsored by Seoul Metropolitan Government" src="<?php echo $prefix; ?>/img/sponsors/kto.jpg" border="0"></a></div>
  <div class="sponsor col-xs-6"><a href="http://www.visitkorea.or.kr/" target="_blank"><img width="220" alt="Korea Tourism Organization" title="Sponsored by Korea Tourism Organization" src="<?php echo $prefix; ?>/img/sponsors/smg.jpg" border="0"></a></div>
</div>





</div>


<?php
  include "../footer.php";
?>