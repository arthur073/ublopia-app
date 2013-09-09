/*jslint browser: true, sloppy: true, white: true, nomen: true, plusplus:true, maxerr: 50, indent: 2 */
/*global jQuery:false, iScroll:false */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true,
 undef:true, curly:true, browser:true, jquery:true, indent:2, maxerr:50,
 white:false, nomen:false */


function getName(values) {
    var type = values.split('##')[1];

    if (type == 'foodL' || type == 'Lunch Notification') {
        return '"img/eat.jpg"';

    } else if (type == 'foodD') {
        return '"img/dinner.jpg"';

    }  else if (type == 'drink') {
        return '"img/drink.jpg"';

    } else if (type == 'cash') {
        return '"img/cash.jpg"';

    } else if (type == 'transport') {
        return '"img/transport.jpg"';

    } else if (type == 'party') {
        return '"img/party.jpg"';

    } else if (type == 'office') {
        return '"img/office.jpg"';

    } else if (type == 'shopping') {
        return '"img/shopping.jpg"';

    } else if (type == 'gift') {
        return '"img/gift.jpg"';

    } else if (type == 'event') {
        return '"img/event.jpg"'
    }
}


//-------------------------------------------------------
// Pull-Up and Pull-Down callbacks for "Pull" page
//-------------------------------------------------------
(function pullPagePullImplementation($) {
    "use strict";
    var listSelector = "div.pull-demo-page ul#thelist";





    // This is the callback that is called when the user has completed the pull-down gesture.
    // Your code should initiate retrieving data from a server, local database, etc.
    // Typically, you will call some function like jQuery.ajax() that will make a callback
    // once data has been retrieved.
    //
    // For demo, we just use timeout to simulate the time required to complete the operation.
    function onPullDown (event, data) {


        promise.get('http://tuple-center.herokuapp.com/take/'+username+'/notifications.json?passwd='+userpassword+'&random='+Math.random()).then(function(error, text, xhr) {


            // todo error and no notification to handle

            if (text == "[]") {
                setTimeout(function() { data.iscrollview.refresh(); }, 500);    // Refresh the iscrollview
                $("#main").trigger('pagecreate');
                return;
            }


            var jsonArray = JSON.parse(text);

            if (jsonArray.length > 0) {
                // We have some notifications
                $(".noNotif").hide();
            } else if (size  < 1) {
                // We should display noNotif
                $(".noNotif").show();
            }

            var newContent = "";
            for (var i=0; i < jsonArray.length; i++){
                size++;
                var values = jsonArray[i].value;
                var imageName = getName(values);
                newContent = '' +
                    '<br><div class="shadow">' +
                    '<a href="#elem" data-transition="slide" onclick="fillVal(this, this.parentNode)" val="'+values+'"><img src='+imageName+' /></a>' +
                    '<span class="caption">' + values.split("##")[0] + '' +
                    '<a href="#elem" data-role="button" data-theme="b" data-corners="false" data-icon="arrow-r" data-inline="true" data-iconpos="right" onclick="fillVal(this, this.parentNode.parentNode)" val="'+values+'" data-transition="slide">More</a>' +
                    '</span>' +
                    '</div>' + newContent;
            }
            //$(listSelector + ' a').buttonMarkup();
            $(listSelector).prepend(newContent);//.listview("refresh");  // Prepend new content and refresh listview

            setTimeout(function() { data.iscrollview.refresh(); }, 500);    // Refresh the iscrollview
            $("#main").trigger('pagecreate');
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
