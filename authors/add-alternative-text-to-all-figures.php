<?php
  $pageTitle = "Adding Alternative Text to All Figures";
  include "../header.php";
?>


<div id="content" class="column" role="main">
<div id="barTitle" class="barColour"><h2>Adding Alternative Text to Images</h2></div>
<div id="tst_fw_spacer" class="barColour"></div>

<div id="content-canvas">
  <p>All images in your document should be given appropriate alternative text. This alt text will be read by a screen reader in a Word file and should remain intact when exporting to HTML or PDF. Your alternative text should be considered a replacement to the figure; it should not be the same as the figure caption. Please see <a href="http://webaim.org/techniques/alttext/" target="_blank">Appropriate Use of Alternative Text</a>.</p>
  <ul>
    <li><a href="#Word-2000-2003">Word 2000-2003</a></li>
    <li><a href="#Word-2007">Word 2007</a></li>
    <li><a href="#Word-2010">Word 2010</a></li>
    <li><a href="#Word-for-Mac">Word for Mac</a></li>
    <li><a href="#LaTeX">LaTeX</a></li>
    <li><a href="#Acrobat">Acrobat</a></li>
  </ul>

  <h3 id="Word-2000-2003">Word 2000-2003</h3>
  <p>To provide alternative text, <strong>Right-click</strong> on the image, then select <strong>Format Picture....</strong></p>
  <p><img src="/img/accessibility/alt-1.png" width="50%"></p>
  <p>A dialog box will appear. Select the <strong>Web</strong> tab and then add the appropriate alternative text.</p>
  <p><img src="/img/accessibility/alt-2.png" width="70%"></p>

  <h3 id="Word-2007">Word 2007</h3>
  <p>To add alternative text, <strong>Right-click</strong> on the picture and select <strong>Size....</strong></p>
  <p><img src="/img/accessibility/alt-3.png" width="50%"></p>
  <p>A dialog box will appear. Select the <strong>Alt Text</strong> tab. You will notice that the image filename is entered into the field by default. The filename is never appropriate alternative text. Replace the filename with appropriate alternative text. For this image, it would be something like "WebAIM - Web Accessibility in Mind".</p>
  <p><img src="/img/accessibility/alt-4.png" width="70%"></p>

  <h3 id="Word-2010">Word 2010</h3>
  <p>To add alt text to an image, Select the <strong>Format Picture...</strong> option.</p>
  <p><img src="/img/accessibility/alt-5.png" width="50%"></p>
  <p>With the Format Picture menu open, select the option for <strong>Alt Text</strong> in the sidebar. Two fields will appear, one labeled <strong>Title</strong> and one labeled <strong>Description</strong>. For best results, add appropriate alt text to the <strong>Description</strong> field, <strong>not</strong> the <strong>Title</strong> field. Information in the <strong>Title</strong> field will not be saved as alt text when the file is saved as PDF.</p>
  <p><img src="/img/accessibility/alt-6.png" width="70%"></p>

  <h3 id="Word-for-Mac">Word for Mac</h3>
  <p>Although alternative text can be added in some versions of Word for Mac, there is no way to generate a tagged PDF using Word for Mac. So the information will be lost.</p>
  <p>The best choice is for authors to open their completed Word file on a Windows machine. Authors can then add the alternative text as per the instructions above, and generate a tagged PDF, using the Windows version of Word.</p>

  <h3 id="LaTeX">LaTeX</h3>
  <p>Unfortunately tools do not yet exist to create a tagged PDF. Authors using LaTeX will need to first create an untagged PDF. Then, within Acrobat, authors can <a href="/authors/generate-a-tagged-pdf#Acrobat">add tags to the PDF</a>. Finally, within Acrobat, authors can add alternative text, using the <a href="#Acrobat">instructions below</a>.</p>

  <h3 id="Acrobat">Acrobat</h3>
  <p>If an image or graphic does not have alternative text, you must add this by editing the properties of the associated tag, after the pdf has been created, and <a href="/authors/generate-a-tagged-pdf#Acrobat" target="_blank">tags have been manually added to the PDF using Acrobat</a>.</p>
  <ol>
    <li>Select the TouchUp Reading Order Tool. It may appear in the Advanced Editing menu or in the Accessibility Panel.
      <p><img src="/img/accessibility/alt-7.png" width="55%"><img src="/img/accessibility/alt-8.png" width="45%"></p></li>
    <li>The TouchUp Reading Order dialog will be displayed.</li>
    <li>Right-click on the image and choose Edit Alternate Text.</li>
    <li>Type the text alternative in the Alternate Text text box and click OK.
      <p><img src="/img/accessibility/alt-9.png" width="80%"></p></li>
  </ol>

  <p><a href="/authors/guide-to-an-accessible-submission">← Guide to an Accessible Submission</a></p>

  <hr>

  <p>Sources:</p>
  <ul>
    <li><a href="http://webaim.org/techniques/word/#alttext" target="_blank">http://webaim.org/techniques/word/#alttext</a></li>
    <li><a href="http://www.w3.org/WAI/GL/WCAG20-TECHS/PDF1.html" target="_blank">http://www.w3.org/WAI/GL/WCAG20-TECHS/PDF1.html</a></li>
  </ul>

</div>

       </div>

<?php
  include "../footer.php";
?>