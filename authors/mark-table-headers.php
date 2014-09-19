<?php
  $pageTitle = "Marking Table Headers";
  include "../header.php";
?>


<div id="content" class="column" role="main">
<div id="barTitle" class="barColour"><h2>Marking Table Headers</h2></div>
<div id="tst_fw_spacer" class="barColour"></div>

<div id="content-canvas">
  <p>All header rows of tables should be marked, so that the relationships are preserved when the presentation format is changed.</p>
  <ul>
    <li><a href="#word">Word</a></li>
    <li><a href="#Word-for-Mac">Word for Mac</a></li>
    <li><a href="#latex">LaTeX</a></li>
    <li><a href="#acrobat">Acrobat</a></li>
  </ul>

  <h3 id="word">Word</h3>
  <p>These instructions were created using Word 2007. The instructions are very similar for other versions of Word.</p>
  <ol>
    <li>Access the table header row's context menu and select Table Properties...</li>
    <li>Select the Row tab.</li>
    <li>Check "Repeat as header at the top of each page" as shown in the following image.
      <p><img src="/img/accessibility/mark-word-3.png" width="90%"></p></li>
  </ol>

  <h3 id="Word-for-Mac">Word for Mac</h3>
  <p>Although table headers can be added in some versions of Word for Mac, there is no way to generate a tagged PDF using Word for Mac. So the information will be lost.</p>
  <p>The best choice is for authors to open their completed Word file on a Windows machine. Authors can then mark table headers as per the instructions above, and generate a tagged PDF, using the Windows version of Word.</p>

  <h3 id="latex">LaTeX</h3>
  <p>Unfortunately tools do not yet exist to create a tagged PDF. Authors using LaTeX will need to first create an untagged PDF. Then, within Acrobat, authors can <a href="/authors/generate-a-tagged-pdf#Acrobat">add tags to the PDF</a>. Finally, within Acrobat, authors can mark table headers, using the <a href="#acrobat">instructions below</a>.</p>

  <h3 id="acrobat">Acrobat</h3>
  <p>If you cannot mark the table headers before creating the PDF, then they can be marked using Acrobat, after the PDF has been created, and <a href="http://chi2014.acm.org/authors/generate-a-tagged-pdf#Acrobat" target="_blank">tags have been manually added to the PDF using Acrobat</a>.</p>
  <ol>
    <li>In the View menu, select Navigation Panel, then select Tags.
      <p><img src="/img/accessibility/mark-acrobat-1.png" width="90%"></p>
      Note that in this case, the table headers were not formatted as illustrated in Examples 1 and 2, and are marked as data cells (<i>TD</i>). To change these to <i>TH tags</i>:</li>
    <li>On the Tags tab, open the table row that contains the header cells, as shown on the image above.</li>
    <li>Select on the first data cell and select Properties...</li>
    <li>On the Tags tab in the Properties dialog, use the Type dropdown to change Table Data Cell to Table Header Cell.</li>
    <li>Repeat for all the table header cells in the first table row.</li>
  </ol>

  <p><a href="guide-to-an-accessible-submission">← Guide to an Accessible Submission</a></p>

  <hr>

  <p>Sources:</p>
  <p><a href="http://www.w3.org/WAI/GL/WCAG20-TECHS/PDF.html#PDF6" target="_blank">http://www.w3.org/WAI/GL/WCAG20-TECHS/PDF.html#PDF6</a></p>
</div>

       </div>

<?php
  include "../footer.php";
?>