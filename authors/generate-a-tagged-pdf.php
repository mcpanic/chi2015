<?php
  $pageTitle = "Generating a Tagged PDF";
  include "../header.php";
?>

<div id="content" class="column" role="main">
<div id="barTitle" class="barColour"><h2>Generating a Tagged PDF</h2></div>
<div id="tst_fw_spacer" class="barColour"></div>

<div id="content-canvas">
  <p>When you export from Word to PDF, you can include accessibility tags. However, the file must be exported correctly. <strong>If a file is created by printing to PDF, it will not be correctly tagged</strong>.</p>
  <p>Word 2000-2003 users must have Acrobat installed, as well as the add-in. Word 2007 users must have either Acrobat or the Microsoft PDF add-in installed. Word 2010 users can create tagged PDF files natively or with the Adobe add-in. It is best to use the Adobe Add-In.</p>
  <ul>
    <li><a href="#Word-2000-2003">Word 2000-2003</a></li>
    <li><a href="#Word-2007-using-the-Adobe-Add-In">Word 2007 using the Adobe Add-In (recommended)</a></li>
    <li><a href="#Word-2007-using-the-Microsoft-Add-In">Word 2007 using the Microsoft Add-In</a></li>
    <li><a href="#Word-2010-using-the-Adobe-Add-In">Word 2010 using the Adobe Add-In (recommended)</a></li>
    <li><a href="#Word-2010-Natively">Word 2010 Natively</a></li>
    <li><a href="#Word-for-Mac">Word for Mac</a></li>
    <li><a href="#LaTeX">LaTeX</a></li>
    <li><a href="#Acrobat">Acrobat</a></li>
  </ul>

  <h3 id="Word-2000-2003">Word 2000-2003</h3>
  <p>When you install Adobe Acrobat, an add-in for Microsoft Office is installed by default. The add-in allows you to convert Office files to PDF without opening Acrobat. This add-in also installs an <strong>Adobe PDF</strong> menu, which should appear in the Menu bar. To convert a Word Document to PDF, Select <strong>Adobe PDF &gt; Convert to Adobe PDF</strong>. If your document is correctly structured, this should automatically create a tagged PDF. To ensure that files are being converted correctly, go to <strong>Adobe PDF &gt; Change Conversion Settings</strong> and ensure <strong>Enable Accessibility and Reflow with tagged Adobe PDF is selected</strong>.</p>
  <p><img src="/img/accessibility/tags-1.png" width="90%"></p>

  <h3 id="Word-2007-using-the-Adobe-Add-In">Word 2007 using the Adobe Add-In (recommended)</h3>
  <p>Click on the <strong>Office Button</strong>, hover over <strong>Save As</strong>, and select <strong>Adobe PDF</strong>.</p>
  <p><img src="/img/accessibility/tags-2.png" width="90%" naptha_cursor="region"></p>
  <p>Or you can select <strong>Create PDF</strong> from the <strong>Acrobat</strong> ribbon.</p>
  <p><img src="/img/accessibility/tags-3.png" width="90%"></p>
  <p>Either one of these options will open the same dialog box. The program should create a tagged PDF file by default. If this is not the case select <strong>Adobe PDF conversion options</strong> and ensure that <strong>Create Accessible (Tagged) PDF file</strong> is selected.</p>
  <p><img src="/img/accessibility/tags-4.png" width="90%"></p>

  <h3 id="Word-2007-using-the-Microsoft-Add-In">Word 2007 using the Microsoft Add-In</h3>
  <p>These instructions should only be used if you do not have the Adobe Add-In. There is a free <a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=4D951911-3E7E-4AE6-B059-A2E79ED87041&amp;displaylang=en" target="_blank">Save as PDF Add-in</a> for Word 2007 that allows you to create tagged PDF files <i>without</i> installing Acrobat. To convert to PDF using the Microsoft add-in, click on the <strong>Office Button</strong>, hover over <strong>Save As</strong>, and select <strong>PDF</strong>.</p>
  <p><img src="/img/accessibility/tags-5.png" width="90%"></p>
  <p>Before you save the file, select <strong>Options</strong> and ensure that the <strong>Document structure tags for accessibility</strong> option is selected.</p>
  <p><img src="/img/accessibility/tags-6.png" width="60%"></p>

  <h3 id="Word-2010-using-the-Adobe-Add-In">Word 2010 using the Adobe Add-In (recommended)</h3>
  <p>The Adobe Add-in, also called PDFMaker, is the best choice to create high-quality tagged PDF files. In Acrobat X, only the 32-bit version of Office is supported. Acrobat XI supports both 32 and 64-bit versions of Office.</p>
  <p>Select <strong>Preferences</strong> from the <strong>Acrobat</strong> ribbon and ensure that <strong>Enable Accessibility and Reflow with tagged Adobe PDF</strong> is selected.</p>
  <p><img src="/img/accessibility/tags-7.png" width="90%"></p>
  <p>Select <strong>Create PDF</strong> from the Acrobat ribbon.</p>
  <p><img src="/img/accessibility/tags-8.png" width="90%"></p>

  <h3 id="Word-2010-Natively">Word 2010 Natively</h3>
  <p>Word 2010 allows you to create tagged PDF files without installing Acrobat. The tagging process may not be quite as good as with the Adobe add-in, but most content, such as heading levels, lists, and alternative text for images is exported.</p>
  <p>To convert to PDF using the Microsoft add-in, Select <strong>File &gt; Save As</strong>, and under <strong>Save as type:</strong> select <strong>PDF</strong>. Before you save the file, select <strong>Options</strong> and ensure that the <strong>Document structure tags for accessibility</strong> option is selected.</p>
  <p><img src="/img/accessibility/tags-9.png" width="60%"></p>

  <h3 id="Word-for-Mac">Word for Mac</h3>
  <p>Unfortunately it is not possible to generate a tagged PDF using Word for Mac. So any accessibility information that had been added, such as alternative text for figures, and marked table headers, will be lost. Authors therefore have two choices for creating a tagged PDF.</p>
  <p>The best choice is for authors to open their completed Word file on a Windows machine. Authors can then carry out <a href="/authors/add-alternative-text-to-all-figures">step 1</a> and <a href="/authors/mark-table-headers">step 2</a> using the Windows version of Word. Then, authors can use the instructions above to generate a tagged PDF using the Windows version of Word.</p>
  <p>The other choice is to create an untagged PDF using Word for Mac. Then, within Acrobat, authors can <a href="/authors/generate-a-tagged-pdf#Acrobat">add tags to the PDF</a> using the instructions below. Finally, within Acrobat, authors can add carry out <a href="/authors/add-alternative-text-to-all-figures#Acrobat">step 1</a> and <a href="/authors/mark-table-headers#acrobat">step 2</a>.</p>

  <h3 id="LaTeX">LaTeX</h3>
  <p>Unfortunately it is not possible to generate a tagged PDF in LaTeX. Authors using LaTeX will need to first create an untagged PDF. Then, within Acrobat, authors can <a href="/authors/generate-a-tagged-pdf#Acrobat">add tags to the PDF</a> using the instructions below. Finally, within Acrobat, authors can add carry out <a href="/authors/add-alternative-text-to-all-figures#Acrobat">step 1</a> and <a href="/authors/mark-table-headers#acrobat">step 2</a>.</p>

  <h3 id="Acrobat">Acrobat</h3>
  <p>If the software you are using is unable to create a tagged PDF, you can still manually add the tags. <strong>Please note:</strong> Using the feature of Acrobat will also introduce a non-embedded Times-Roman font to your PDF, which is used for white space only. For CHI 2014, an exception has been made, and PDFs with this non-embedded font can still be submitted.</p>
  <p>For Acrobat 9 Pro, from the menu select Advanced &gt; Accessibility &gt; <strong>Add Tags to Document</strong>.</p>
  <p>For Acrobat X and XI Pro, go to the accessibility panel, and select <strong>Add Tags to Document</strong>.</p>

  <p><img src="/img/accessibility/tags-x.png"></p>

  <p>This will create a report which can be used to make further correction. For more details, see the Adobe's Best Practices for PDF Accessibility:</p>
  <p><a href="http://www.adobe.com/content/dam/Adobe/en/accessibility/products/acrobat/pdfs/A9-access-best-practices.pdf" target="_blank">Adobe® Acrobat® 9 Pro Accessibility Guide: Best Practices for Accessibility</a><br>
  <a href="http://www.adobe.com/content/dam/Adobe/en/accessibility/products/acrobat/pdfs/acrobat-x-pdf-accessibility-best-practices.pdf" target="_blank">Adobe® Acrobat® X Pro Accessibility Guide: Best Practices for PDF Accessibility</a><br>
  <a href="http://www.adobe.com/content/dam/Adobe/en/accessibility/products/acrobat/pdfs/acrobat-xi-pro-accessibility-best-practice-guide.pdf" target="_blank">Adobe® Acrobat® XI Pro Accessibility Guide: Best Practices for PDF Accessibility</a></p>

  <p><a href="guide-to-an-accessible-submission">← Guide to an Accessible Submission</a></p>

  <hr>

  <p>Sources:</p>
  <p><a href="http://webaim.org/techniques/acrobat/converting" target="_blank">http://webaim.org/techniques/acrobat/converting</a></p>
</div>

       </div>

<?php
  include "../footer.php";
?>