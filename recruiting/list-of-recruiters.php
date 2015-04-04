<?php
  $pageTitle = "Recruiting | List of Recruiters";
  include "../header.php";

?>

<div>
    <h2>Recruiting | List of Recruiters</h2>
</div>

<div role="main" id="list-of-exhibitors">

  <h3>Hero Sponsor Recruiters</h3>
  <ul>

    <li>Samsung<span style="float: right; margin-right: 20px">Booths: 1-3</span></li>
  </ul>

  <h3>Champion Sponsor Recruiters</h3>
  <ul>
    <li>Golfzon<span style="float: right; margin-right: 20px">Booth: 17</span></li>
    <li>Google<span style="float: right; margin-right: 20px">Booths: 21 & 22</span></li>
  </ul>

  <h3>Contributing Sponsor Recruiters</h3>
  <ul>
    <li>Disney Research <span style="float: right; margin-right: 20px">Recruiting Board</span></li>
    <li>Facebook <span style="float: right; margin-right: 20px">Booth: 16</span></li>
    <li>FuturePlay<span style="float: right; margin-right: 20px">Booth: 6 & Recruiting Board</span></li>
  </ul>

  <h3>Additional Recruiters</h3>
  <ul>
    <li>Bentley University<span style="float: right; margin-right: 20px">Recruiting Board</span></li>
    <li>Cisco Systems<span style="float: right; margin-right: 20px">Recruiting Board</span></li>
    <li>Robert Bosch<span style="float: right; margin-right: 20px">Recruiting Board</span></li>
    <li>Samsung SDS, CX Team<span style="float: right; margin-right: 20px">Booth: 11</span></li>
    <li>SAP<span style="float: right; margin-right: 20px">Booths 34 & 35</span></li>
    <li>SMART Technologies<span style="float: right; margin-right: 20px">Recruiting Board</span></li>
    <li>Splunk, Inc.<span style="float: right; margin-right: 20px">Recruiting Board</span></li>
  </ul>

  
  <!-- <div ng-repeat="exhibit_group in data">
    <h3 ng-bind="exhibit_group.group"></h3>
    <div class="row">
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 exhibitor-header-row">Company/Product</div>
      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 exhibitor-header-row">Booth</div>
      <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7 exhibitor-header-row">Description</div>
    </div>
    <div class="row data_row" ng-repeat="exhibit in exhibit_group.data">
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"><a ng-href="{{exhibit.link}}" ng-bind="exhibit.name"></a></div>
      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" ng-bind="exhibit.Booth"></div>
      <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7" ng-bind-html="exhibit.Description"></div>
    </div>
  </div> -->

</div>

<?php
  include "../footer.php";
?>