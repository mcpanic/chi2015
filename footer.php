        </div> <!-- column-main -->
        <div class="column-left">
        <!-- <div class="col-lg-2 col-md-2"> -->
<?php
  include "leftbar.php";
?>
        </div> <!-- column-left -->
        <!-- <div class="col-lg-2 col-md-2"> -->
        <div class="column-right">
<?php
  include "rightbar.php";
?>
        </div> <!-- column-right -->


        </div> <!-- column-wrapper -->
      </div> <!-- container -->

      <hr>

        <footer id="footer" role="contentinfo">
            &copy; copyright 2014 | <a href="http://www.sigchi.org/">ACM SIGCHI</a>
        </footer>
    </div> <!-- /container -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="<?php echo $prefix; ?>/js/vendor/jquery-1.10.1.min.js"><\/script>')</script>

    <script src="<?php echo $prefix; ?>/js/vendor/bootstrap.min.js"></script>

    <script src="<?php echo $prefix; ?>/js/main.js"></script>

    <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-48768494-1']);
      _gaq.push(['_trackPageview']);
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    </script>

    </body>
</html>