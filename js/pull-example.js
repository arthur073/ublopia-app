/*jslint browser: true, sloppy: true, white: true, nomen: true, plusplus:true, maxerr: 50, indent: 2 */
/*global jQuery:false, iScroll:false */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true,
 undef:true, curly:true, browser:true, jquery:true, indent:2, maxerr:50,
 white:false, nomen:false */

//-------------------------------------------------------
// Pull-Up and Pull-Down callbacks for "Pull" page
//-------------------------------------------------------
(function pullPagePullImplementation($) {
    "use strict";
    var pullDownGeneratedCount = 0,
        listSelector = "div.pull-demo-page ul#thelist";


    // This is the callback that is called when the user has completed the pull-down gesture.
    // Your code should initiate retrieving data from a server, local database, etc.
    // Typically, you will call some function like jQuery.ajax() that will make a callback
    // once data has been retrieved.
    //
    // For demo, we just use timeout to simulate the time required to complete the operation.
    function onPullDown (event, data) {


        //$.support.cors = true;
        //promise.ajaxTimeout = 20000;
        promise.get('http://tuple-center.herokuapp.com/take/user1/notifications.json?passwd=356a192b7913b04c54574d18c28d46e6395428ab&random='+Math.random()).then(function(error, text, xhr) {


            // todo error and no notification to handle

            //     if (error) {
//                $("#debug").html('ERROR');
//                document.getElementById("loader").style.display = 'none';
//                document.getElementById("issueNetwork").style.display = 'inline';
//                return;
//            }

            var jsonArray = JSON.parse(text);
            var newContent = "";
            for (var i=1; i < jsonArray.length; i++){
                //var values = jsonArray[i].value.split('##');
                newContent = '<a href="#elem" data-transition="slide"><img src="img/eat2.jpg" class="shadow" /></a>' + newContent;
            }
            //alert("he"+ listSelector);

            $(listSelector).prepend(newContent);//.listview("refresh");  // Prepend new content and refresh listview
            data.iscrollview.refresh();    // Refresh the iscrollview
        });




    }



    // Set-up jQuery event callbacks
    $(document).delegate("div#main", "pageinit",
        function bindPullPagePullCallbacks(event) {
            $(".iscroll-wrapper", this).bind( {
                iscroll_onpulldown : onPullDown
            } );
        } );

}(jQuery));
