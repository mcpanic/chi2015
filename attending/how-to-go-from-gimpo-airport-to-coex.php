<?php
  $pageTitle = "How to go from Gimpo Airport to Coex";
  include "../header.php";
?>

<div>
    <h2>Attending | Coming From Gimpo Airport</h2>
</div>

<h3>Pick a Route</h3>
<div>

  <ul>
    <li><a href="##arex">Via Airport Railroad and Subway</a></li>
    <li><a href="##subway">Via Subway Only</a></li>
  </ul>

</div>

<div>

  <a href="<?php echo $prefix; ?>/img/attending/img_direction01.gif">
    <img src="<?php echo $prefix; ?>/img/attending/img_direction01.gif" width="100%" class="incheon_image"/>
  </a>
  <p>
    Coex is located in the World Trade Center Complex in Gangnam District south of the Han River in Seoul. You can find us at Samseong Station on subway line number two or at Cheongdam Station on subway line number seven.
  </p>
</div>

<h3>Airport Railroad and Subway</h3>
<div id="arex">

  <table class="table">
    <thead style="font-weight: bold">
      <tr>
        <td colspan="2">Vehicle</td>
        <td>Station</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-weight: bold" rowspan="2">Airport Railroad</td>
        <td>Departure</td>
        <td>Gimpo Airport</td>
      </tr>
      <tr>
        <td>Arrival</td>
        <td>Hongik University Station</td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: center">
          * Alight at Hongik University Station and transfer to Subway line 2 (Green Line).
        </td>
      </tr>
      <tr>
        <td style="font-weight: bold" rowspan="2">Subway</td>
        <td>Departure</td>
        <td>Hongik University Station (Line 2)</td>
      </tr>
      <tr>
        <td>Arrival</td>
        <td>Samseong station (COEX is at exit number 6)</td>
      </tr>
    </tbody>
  </table>

  <h4>Airport Railroad (AREX)</h4>

  <h5>Incheon Airport Railroad Guide</h5>

  <p>
    Airport Railroad is a means of airport link transportation running 11 stations between Incheon Airport station and Seoul station. You can be guided to Airport Railroad customer information center of Gimpo Airport station.
  </p>

  <a href="<?php echo $prefix; ?>/img/attending/rail_road.jpg">
    <img src="<?php echo $prefix; ?>/img/attending/rail_road.jpg" width="100%" class="incheon_image"/>
  </a>

  <h5>Train Type</h5>

  <p>
    Express train taking 43 min. non-stop running between Incheon Airport station and Seoul station, operation interval: 30 min.)
  </p>

  <p>
    All-stop train (taking 56 min. stop all 11 stations between Incheon Airport station and Seoul station, operation interval: 12 min.)
  </p>

  <p>
    Homepage : <a href="http://english.arex.or.kr">http://english.arex.or.kr</a>
    <br/>&nbsp;
  </p>

  <h5>Notice</h5>

  <p style="padding-bottom: 10px">
    If you need any additional information related to the operation of Airport Railroad, just inquire to Gimpo Airport Railroad or ask to information center. (☎ +82-2-2665-7788)
  </p >

  <h4>Subway</h4>

  <p>
    <a href="<?php echo $prefix; ?>/img/attending/subwaycoex.gif">
      <img src="<?php echo $prefix; ?>/img/attending/subwaycoex.gif" width="100%" class="incheon_image"/>
    </a>
    From Hongik Univ. to Samseong station
  </p>

  <p>
    You can conveniently get to COEX by taking the exit number 6 at Samseong Station on Line 2. Coming from the subway, use exit five or six connected to the Coex Mall. Follow the Coex sign and you will come out at Millennium Plaza with the Coex Mall entrance in the back of the plaza. Hyundai Department Store will be to your left and CoexArtium straight ahead.
  </p>

</div>

<h3>Subway Only</h3>

<div id="subway">

  <table class="table">
    <thead style="font-weight: bold">
      <tr>
        <td colspan="2">Vehicle</td>
        <td>Station</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-weight: bold" rowspan="2">Airport Railroad</td>
        <td>Departure</td>
        <td>Gimpo Airport (Line 5)</td>
      </tr>
      <tr>
        <td>Arrival</td>
        <td>Yeongdeungpo-gu Office Station (Line 5)</td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: center">
          * Alight at Yeongdeungpo-gu Office Station and transfer to Subway line 2 (Green Line).
        </td>
      </tr>
      <tr>
        <td style="font-weight: bold" rowspan="2">Subway</td>
        <td>Departure</td>
        <td>Yeongdeungpo-gu Office Station (Line 2)</td>
      </tr>
      <tr>
        <td>Arrival</td>
        <td>Samseong station (COEX is at exit number 6)</td>
      </tr>
    </tbody>
  </table>

  <h4>Subway Line 5</h4>

  <p>
    You should get to Yeongdeungpo-gu Office station (Line 5) to transfer to Line 2 (green line).
  </p>

  <p>
    More information is available here: <a href="http://www.smrt.co.kr/">http://www.smrt.co.kr/</a>
  </p>

  <a href="<?php echo $prefix; ?>/img/attending/subway-map.gif">
    <img src="<?php echo $prefix; ?>/img/attending/subway-map.gif" width="100%" class="incheon_image"/>
  </a>

  <h4>Subway Line 2</h4>

  <p>
    From Yeongdeungpo-gu Office station, You must go to Samseong station.
  </p>

  <p>
    You can conveniently get to COEX by taking the exit number 6 at Samseong Station on Line 2. Coming from the subway, use exit five or six connected to the Coex Mall. Follow the Coex sign and you will come out at Millennium Plaza with the Coex Mall entrance in the back of the plaza. Hyundai Department Store will be to your left and CoexArtium straight ahead.
  </p>

</div>


<a href="javascript:history.back()">Go back</a>
<?php
  include "../footer.php";
?>