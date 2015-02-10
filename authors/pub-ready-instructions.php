<?php
  $pageTitle = "Authors | Pub Ready Instructions";
  include "../header.php";
?>

<div id="content" class="column" role="main">
<div id="barTitle" class="barColour"><h2>Authors | Pub Ready Instructions</h2></div>
<div id="tst_fw_spacer" class="barColour"></div>

<div id="content-canvas">
  <h3>Camera Publication Ready Instructions - Papers and Notes</h3>
  <p>This page contains instructions for submitting the final version of your paper or note to print publications and the ACM DL. For all other venues, please see the please read the Camera Ready Instructions for Extended Abstracts (link coming soon). All content and metadata will be submitted via <a href="http://precisionconference.com/~sigchi" target="_blank">Precision Conference System (PCS)</a>.</p>
  <p>You must submit the final version of your paper to the PCS system by <strong>January 7th, 2015</strong> (5pm Pacific Time). This will be checked by the Associate Chair and also by the publisher and there may be some additional corrections to do. The Camera-Ready final deadline is <strong>January 15th, 2015</strong> (5pm Pacific Time).</p>
  <p><strong>Please read the whole page.</strong> Submissions that do not conform to the ACM SIGCHI standards, specifications, guidelines, and formats will be returned to the author for corrections and/or alterations. Please follow the instructions as carefully as possible to save everyone time.</p>
  <p><strong>Video previews</strong> - All authors may provide a 30-second video preview presenting their contribution to the conference. Further details are available on the <a href="http://chi2015.acm.org/authors/video-previews" target="_blank">Video Previews</a> page.</p>

  <h4>Official ACM Template Files</h4>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td><strong>LaTeX users</strong> - I have used the <strong>latest version</strong> of the <a href="http://www.sigchi.org/publications/chipubform/sigchi-papers-latex-template/view" target="_blank">SIGCHI LaTeX template</a></td>
      <td class="pub-ready-check"><input id="pn1" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Word users</strong> - I have used the <strong>latest version</strong> of the <a href="http://www.sigchi.org/publications/chipubform/sigchi-papers-word-template/view" target="_blank">SIGCHI Word template</a></td>
      <td class="pub-ready-check"><input id="pn2" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>Review ACM's Rightsreview, Authors, &amp; Permissions Policies</h4>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td>I have read through the ACM rightsreview, authors rights, and permissions policies:<br>
          <a href="http://authors.acm.org/main.html" target="_blank">ACM Information for Authors: Author Rights &amp; FAQ</a><br>
          <a href="http://www.acm.org/publications/policies/copyright_policy" target="_blank">ACM Author Rights &amp; Publishing Policy</a><br>
          <a href="http://www.acm.org/news/featured/author-rights-management" target="_blank">New Options for ACM Authors to Manage Rights and Permissions</a><br>
          <a href="http://www.acm.org/publications/third-party-material" target="_blank">Using Third Party Material &amp; Proper Permission</a></td>
      <td class="pub-ready-check"><input id="pn3" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>Copyright notices for your manuscript</h4>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td><strong>LaTeX users</strong> - See <a href="http://www.sheridanprinting.com/sigchi/chi.htm#L" target="_blank">Sheridan's copyright instructions for LaTeX</a></td>
      <td class="pub-ready-check"><input id="pn5" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Word users</strong> - See <a href="http://www.sheridanprinting.com/sigchi/chi.htm#W" target="_blank">Sheridan's copyright instructions for Word</a></td>
      <td class="pub-ready-check"><input id="pn6" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>Verify Authors' PCS Accounts</h4>
  <p><strong>Note:</strong> All author information is linked to the author's PCS account.</p>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td><strong>Author full names</strong> - I have verified that each author's full name, including middle initial is correct in PCS</td>
      <td class="pub-ready-check"><input id="pn7" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Author affiliations</strong> - I have verified that each author's affiliation(s) and location(s) is updated and correct in PCS</td>
      <td class="pub-ready-check"><input id="pn8" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td><strong>Author notification</strong> - I have notified all my co-authors of their responsibility to be sure their name is consistent on all submissions (if they have multiple submissions to CHI 2015)</td>
      <td class="pub-ready-check"><input id="pn8-1" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>Formatting</h4>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td><strong>Paper size</strong> - My document's paper size is <strong>US Letter (8.5x11 in.)</strong> - not A4</td>
      <td class="pub-ready-check"><input id="pn9" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Title</strong> - The First Letter of the Main Words in Your Title are Capitalized</td>
      <td class="pub-ready-check"><input id="pn10" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td><strong>Authors' Line</strong> - All authors' names and affiliations match their entries in PCS</td>
      <td class="pub-ready-check"><input id="pn11" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Abstract</strong> - My abstract appears at the beginning of my submission</td>
      <td class="pub-ready-check"><input id="pn12" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td><strong>References</strong> - All citations are listed in a References section at the end of my submission and are the same font size as other body text</td>
      <td class="pub-ready-check"><input id="pn13" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Author Keywords</strong> - My Author Keywords are included in my document and the keywords are separated with semicolons</td>
      <td class="pub-ready-check"><input id="pn14" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td><strong>ACM Classification</strong> - The primary and additional <a href="http://www.acm.org/about/class/how-to-use" target="_blank">ACM Classifiers</a> I have selected are appropriate and appear in my document, separated by semicolons with the primary classifier listed first</td>
      <td class="pub-ready-check"><input id="pn15" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Acknowledgements</strong> - I have included any funding/special contribution acknowledgements required by any research, financial, or other grants received. (e.g., <a href="http://chi2015.acm.org/templates/SIGCHIpaperformat.pdf#page=4" target="_blank">See example page 4</a>)</td>
      <td class="pub-ready-check"><input id="pn16" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td><strong>Bad Breaks</strong> - I have checked my submission to avoid bad breaks, <a href="http://en.wikipedia.org/wiki/Widows_and_orphans" target="_blank">widows, and orphans</a></td>
      <td class="pub-ready-check"><input id="pn17" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Text following headings</strong> - Section and Sub-section heads have at least 2 lines of body text below them when they appear at the end of a page or column</td>
      <td class="pub-ready-check"><input id="pn18" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td><strong>No page numbers</strong> - There are no numbers at the bottom of pages</td>
      <td class="pub-ready-check"><input id="pn19" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>No headers nor footers</strong> - There are no headers or footers at the top/bottom of pages</td>
      <td class="pub-ready-check"><input id="pn20" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td><strong>Even columns on the last page</strong> - The two columns of my last page are equally long</td>
      <td class="pub-ready-check"><input id="pn21" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Captions are typeset in centered, bold, Times New Roman</strong> - not in Helvetica/Arial as used by some outdated UIST or CSCW templates</td>
      <td class="pub-ready-check"><input id="pn22" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>Images and Figures</h4>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td><strong>B&amp;W appearance</strong> - Figures are properly legible in black and white</td>
      <td class="pub-ready-check"><input id="pn23" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Resolution</strong> - Figures are at least 300dpi</td>
      <td class="pub-ready-check"><input id="pn24" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td><strong>Image file format</strong> - I have used lossless image formats (e.g., TIFF, PNG) instead of lossy ones (e.g., JPEG) where possible</td>
      <td class="pub-ready-check"><input id="pn25" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Line width</strong> - All lines in Figures are at least 0.5pt+ thick to ensure visibility</td>
      <td class="pub-ready-check"><input id="pn26" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>PDF Generation</h4>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td><strong>LaTeX users: No Type 3 fonts</strong> - I have verified that no Type 3 fonts are included</td>
      <td class="pub-ready-check"><input id="pn27" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Fonts Embedded</strong> - I have verified that all fonts are <strong>embedded</strong></td>
      <td class="pub-ready-check"><input id="pn28" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td><strong>PDF settings</strong> - I have verified that all other PDF settings conform to <a href="http://www.sheridanprinting.com/typedept/acm.joboptions" target="_blank">ACM's requirements</a></td>
      <td class="pub-ready-check"><input id="pn29" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>PDF Accessibility</h4>
  <p><strong>Note:</strong> For CHI 2015, ensuring that your paper is accessible is not required. However, we strongly encourage all authors to familiarize themselves with existing guidelines, and to submit an accessible PDF to CHI 2015.</p>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td><strong>PDF Accessibility</strong> - I have considered the <a href="http://chi2015.acm.org/authors/guide-to-an-accessible-submission" target="_blank">Guide to an Accessible Submission</a></td>
      <td class="pub-ready-check"><input id="pn30" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>Additional Material</h4>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td><strong>Thumbnail image (Optional)</strong> - If I supply a thumbnail image, it is in the appropriate format (72dpi+, 100 pixels wide, .jpg format)</td>
      <td class="pub-ready-check"><input id="pn31" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td style="padding-left: 25px;"><strong><i>Thumbnail image caption (Mandatory if providing a thumbnail image)</i></strong> - If I provide a thumbnail image, I have prepared a short caption (20-30 words) for it</td>
      <td class="pub-ready-check"><input id="pn32" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td><strong>Video figure (Optional)</strong> - If I provide a video figure, it conforms to the <a href="http://chi2015.acm.org/authors/guide-to-submitting-a-video-as-supplementary-material" target="_blank">requirements for accompanying videos</a></td>
      <td class="pub-ready-check"><input id="pn33" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Auxiliary material (Optional)</strong> - If I am providing auxiliary material (e.g., data files), I have created a single ZIP file of all material as required by ACM for the DL</td>
      <td class="pub-ready-check"><input id="pn34" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="odd">
      <td style="padding-left: 25px"><strong><i>Description of Auxiliary material (Mandatory if providing auxiliary material)</i></strong> - If I provide auxiliary material, I have prepared a short description of the files included in my auxiliary material ZIP file</td>
      <td class="pub-ready-check"><input id="pn35" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>Video Preview</h4>
  <p>All submissions may have an accompanying 30-second video preview. The deadline for the video previews is <strong>February 16, 2015</strong>. Note this is after your papers' or abstracts' publication ready deadline. Do not delay your publication ready submission.</p><table class="pub-ready">

    <tbody><tr class="odd">
      <td><strong>Video requirements</strong> - My Video Preview conforms to the <a href="http://chi2015.acm.org/authors/video-previews" target="_blank">requirements for video previews</a></td>
      <td class="pub-ready-check"><input id="pn36" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>Additional Final Submission Information</h4>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td><strong>Contribution &amp; Benefits Statement</strong> - I have prepared a short (30 words or less) description of my work for the Conference Program</td>
      <td class="pub-ready-check"><input id="pn37" onclick="setCB(this)" type="checkbox"></td>
    </tr>
    <tr class="even">
      <td><strong>Summary of Changes</strong> - I have prepared the list of changes I have made to comply with the Conditional Acceptance requirements of my submission</td>
      <td class="pub-ready-check"><input id="pn38" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>

  <h4>What to Expect After You Submit</h4>
  <p>When you submit your final version, you will receive a confirmation screen from the submission system.</p>
  <p>The submissions will be checked and processed, the contact author or all authors will be contacted by Sheridan Communications, and will inform you of the following:</p>
  <table class="pub-ready">
    <tbody><tr class="odd">
      <td>(i) That everything is in order with your submission and that your completed ACM eform has been verified.
          <br><br>--AND/OR--<br><br>
          (ii) That you must revise or repair the issues that exist with your submission. Included in this email message will be specific information about how to revise/fix your submission to meet ACM &amp; SIGCHI requirements. Please respond to any such requests promptly, because your paper cannot be placed into the ACM DL until it meets all requirements.</td>
      <td class="pub-ready-check"><input id="pn39" onclick="setCB(this)" type="checkbox"></td>
    </tr>
  </tbody></table>
</div>

       </div>

<?php
  include "../footer.php";
?>