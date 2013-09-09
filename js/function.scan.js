
function success(concatResult) {
    var resultArray = concatResult.split("|");
    var name = resultArray[1].split('##')[0];
    var password = resultArray[1].split('##')[1];
    $.mobile.hidePageLoadingMsg();


    function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS USER');
        tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, data)');
        tx.executeSql('INSERT INTO USER (id, data) VALUES (1, "'+ name + '##'+ password + '")');
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err);
    }

    function successCB() {
        $.mobile.changePage( "#main", {
            transition: "pop",
            reverse: false,
            changeHash: false
        });
    }

    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);



    username = name;
    userpassword = password;

}

function failure(error) {
    if (error != "Canceled") {
        alert("Failed to scan, please try again. Error : "+error);
    }
    $.mobile.hidePageLoadingMsg();

}

function scan() {
    $.mobile.showPageLoadingMsg();

	var scanner = cordova.require("cordova/plugin/BarcodeScanner");

    scanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
	// Useless for android
    // See ScanditSDK.h for more available options.
    cordova.exec(success, failure, "ScanditSDK", "scan",
        [ScanditAppID,
            {"beep": true,
                "1DScanning" : true,
                "2DScanning" : true,
                "scanningHotspot" : "0.5/0.5",
                "vibrate" : true,
                "textForInitialScanScreenState" : "Align code with box",
                "textForBarcodePresenceDetected" : "Align code and hold still",
                "textForBarcodeDecodingInProgress" : "Decoding",
                "searchBarActionButtonCaption" : "Go",
                "searchBarCancelButtonCaption" : "Cancel",
                "searchBarPlaceholderText" : "Scan QRCode or enter it here",
                "toolBarButtonCaption" : "Cancel",
                "minSearchBarBarcodeLength" : 8,
                "maxSearchBarBarcodeLength" : 50}]);


}
        

	    
