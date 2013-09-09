/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function Settings() {

    // Opening options:
    if ((typeof Camera !== "undefined")) {

        this.destinationType = Camera.DestinationType.FILE_URI;     // cameraOptions: destinationType
        this.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;    // cameraOptions: sourceType
        this.mediaType = Camera.MediaType.PICTURE;                  // cameraOptions: mediaType
    }

    // Photo quality and editing options:
    this.quality = 40;                                          // cameraOptions: quality
    this.targetWidth = 500;                                     // cameraOptions: targetWidth
    this.targetHeight = 500;                                    // cameraOptions: targetHeight
    this.allowEdit = true;                                      // cameraOptions: allowEdit
    this.correctOrientation = true;                             // cameraOptions: correctOrientation

    // Saving options:
    this.encodingType = (typeof Camera !== "undefined") ? Camera.EncodingType.JPEG : 0;               // cameraOptions: encodingType
    this.saveToPhotoAlbum = true;                                                                     // cameraOptions: saveToPhotoAlbum

    // iOS-specific (to specify popover location in iPad):
    this.popoverOptions = ((typeof Camera !== "undefined") && (typeof CameraPopoverOptions !== "undefined")) ? new CameraPopoverOptions(220, 600, 320, 480, Camera.PopoverArrowDirection.ARROW_DOWN) : null;    // cameraOptions: popoverOptions
}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
