<?php
  $pageTitle = "Setting the Tab Order of all Pages to \"Use Document Structure\"";
  include "../header.php";
?>

<div id="content" class="column" role="main">
<div id="barTitle" class="barColour"><h2>Setting the Tab Order of all Pages to "Use Document Structure"</h2></div>
<div id="tst_fw_spacer" class="barColour"></div>

<div id="content-canvas">
  <p>The intent of this technique is to ensure that users can navigate through content in a logical order that is consistent with the meaning of the content. The tab order must be specified in Adobe Acrobat Pro.</p>

  <h3>Adobe Acrobat Pro</h3>
  <ol>
    <li>Open the Pages panel by clicking on the Pages icon
      <p><img src="/img/accessibility/tab-order-1.png" naptha_cursor="region"></p></li>
    <li>Select all of the page thumbnails by selecting the first thumbnail and then typing <strong>CTRL-A</strong>.</li>
    <li>Right click the thumbnails to access the context menu for the selected thumbnails and select Page Properties...
      <p><img src="/img/accessibility/tab-order-3.png"></p></li>
    <li>Select the Tab Order tab in the Page Properties dialog.</li>
    <li>Select the "Use Document Structure" option:
      <p><img src="/img/accessibility/tab-order-5.png" width="90%"></p></li>
  </ol>

  <p><a href="/authors/guide-to-an-accessible-submission">← Guide to an Accessible Submission</a></p>

  <hr>

  <p>Sources:</p>
  <p><a href="http://www.w3.org/WAI/GL/WCAG20-TECHS/pdf.html#PDF3" target="_blank">http://www.w3.org/WAI/GL/WCAG20-TECHS/pdf.html#PDF3</a></p>
</div>

       </div>

<?php
  include "../footer.php";
?>