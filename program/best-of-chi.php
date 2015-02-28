<?php
  $pageTitle = "Best of CHI";
  $ng_app = "best_of_chi";
  include "../header.php";

?>

<div>
    <h2>Program | Best of CHI</h2>
</div>

<div role="main" id="best-of-chi" ng-controller="best_of_chi_controller">
  <ul>
    <li><a href="#best-papers">Best Papers (<span>{{bp_papers.length}}</span>)</a></li>
    <li><a href="#best-papers">Honorable Mentions (<span>{{hm_papers.length}}</span>)</a></li>
  </ul>

  <a name="best-papers"></a>
  <h3>CHI 2015 Best Papers</h3>
  <div ng-repeat="paper in bp_papers" class="best-of-chi-entry">
    <table>
      <tr>
        <td class="icon"><img style="float:left" src="<?php echo $prefix; ?>/img/program/best.png" ng-if="paper.award"/></td>
        <td class="">
          <a ng-href="<?php echo $prefix; ?>/program/full-schedule/?id={{paper.id}}">
            <h4 style="float:left" ng-bind="paper.title" id="{{paper.id}}"></h4>
          </a>
        </td>
      </tr>
    </table>
    <!-- <div style="clear:both"></div> -->
    <div>
      <div class="authors">
        <span ng-repeat="author in paper.authors">
          {{author.name}}&nbsp;
        </span>
      </div>
      <!-- <div><a href="http://confer.csail.mit.edu/chi2015/paper#!{{paper.id}}">Confer</a></div> -->

<!--       <ul>
        <li ng-repeat="author in paper.authors">
          <span ng-bind="author.name"></span>,
          <span ng-bind="author.affiliation"></span>,
          <span ng-bind="author.location"></span>
        </li>
      </ul>
 -->
      <div class="abstract" ng-if="paper.abstract.trim()!='' && paper.abstract_toggle">
        <b><i>Abstract: </i></b>
        <span ng-bind-html="''+paper.abstract"></span>
        <span><a ng-click="abstract_toggle(paper.id)" ng-if="paper.cAndB.trim()!=''" style="cursor:pointer"><i>&nbsp;&nbsp;(shorter)</i></a></span>
      </div>
      <div class="abstract" ng-if="paper.cAndB.trim()!='' && !paper.abstract_toggle">
        <b><i>Abstract: </i></b>
        <span ng-bind-html="''+paper.cAndB"></span>
        <span><a ng-click="abstract_toggle(paper.id)" ng-if="paper.abstract.trim()!=''" style="cursor:pointer"><i>&nbsp;&nbsp;(longer)</i></a></span>
      </div>
      <hr>
    </div>
  </div>

  <a name="honorable-mentions"></a>
  <h3>CHI 2015 Honorable Mentions</h3>
  <div ng-repeat="paper in hm_papers" class="best-of-chi-entry">
    <table>
      <tr>
        <td class="icon"><img style="float:left" src="<?php echo $prefix; ?>/img/program/honorable.png" ng-if="paper.hm"/></td>
        <td class="">
          <a ng-href="<?php echo $prefix; ?>/program/full-schedule/?id={{paper.id}}">
            <h4 style="float:left" ng-bind="paper.title" id="{{paper.id}}"></h4>
          </a>
        </td>
      </tr>
    </table>
    <!-- <div style="clear:both"></div> -->
    <div>
      <div class="authors">
        <span ng-repeat="author in paper.authors">
          {{author.name}}&nbsp;
        </span>
      </div>
      <!-- <div><a href="http://confer.csail.mit.edu/chi2015/paper#!{{paper.id}}">Confer</a></div> -->

<!--       <ul>
        <li ng-repeat="author in paper.authors">
          <span ng-bind="author.name"></span>,
          <span ng-bind="author.affiliation"></span>,
          <span ng-bind="author.location"></span>
        </li>
      </ul>
 -->
      <div class="abstract" ng-if="paper.abstract.trim()!='' && paper.abstract_toggle">
        <b><i>Abstract: </i></b>
        <span ng-bind-html="''+paper.abstract"></span>
        <span><a ng-click="abstract_toggle(paper.id)" ng-if="paper.cAndB.trim()!=''" style="cursor:pointer"><i>&nbsp;&nbsp;(shorter)</i></a></span>
      </div>
      <div class="abstract" ng-if="paper.cAndB.trim()!='' && !paper.abstract_toggle">
        <b><i>Abstract: </i></b>
        <span ng-bind-html="''+paper.cAndB"></span>
        <span><a ng-click="abstract_toggle(paper.id)" ng-if="paper.abstract.trim()!=''" style="cursor:pointer"><i>&nbsp;&nbsp;(longer)</i></a></span>
      </div>
    </div>
    <hr>
  </div>



</div>

<?php
  include "../footer.php";
?>