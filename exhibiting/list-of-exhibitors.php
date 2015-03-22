<?php
  $pageTitle = "Exhibiting | List of Exhibitors";
  $ng_app = "exhibits";
  include "../header.php";

?>

<div>
    <h2>Exhibiting | List of Exhibitors</h2>
</div>

<div role="main" id="list-of-exhibitors" ng-controller="list_of_exhibitors_controller">

  
  <div ng-repeat="exhibit_group in data">
    <h3 ng-bind="exhibit_group.group"></h3>
    <div class="row">
      <div class="col-xs-4 exhibitor-header-row">Company/Product</div>
      <div class="col-xs-2 exhibitor-header-row">Booth</div>
      <div class="col-xs-6 exhibitor-header-row">Description</div>
    </div>
    <div class="row data_row" ng-repeat="exhibit in exhibit_group.data">
      <div class="col-xs-4"><a ng-href="{{exhibit.link}}" ng-bind="exhibit.name"></a></div>
      <div class="col-xs-2" ng-bind="exhibit.Booth"></div>
      <div class="col-xs-6" ng-bind-html="exhibit.Description"></div>
    </div>
  </div>

</div>

<?php
  include "../footer.php";
?>