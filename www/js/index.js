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
var lon;
var lat;
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
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
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
function onSuccess(position){
	var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />';
	
	lon = position.coords.longitude;
	console.log(lon);
	lat = position.coords.latitude;
	console.log(lat);
	var button = document.getElementById('button');
		button.addEventListener("click", boop);
}
function onError(){
	alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
}

function boop(){
	var request = new XMLHttpRequest();
	console.log(request.readyState);
	console.log("http://open.mapquestapi.com/geocoding/v1/reverse?" + "key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" + lat + "," + lon);
	request.open("GET", "http://open.mapquestapi.com/geocoding/v1/reverse?" + "key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" + lat + "," + lon, true);
	request.onreadystatechange = function() {
	console.log(request.readyState);
	//alert("TESTING");
	if (request.readyState === 4){
				if (request.status === 200 || request.status === 0) {
					console.log("IT IS WORKING!?");
					//console.log("response: " + request.responseText);
					alert("try now");
					console.log(request.responseText);
					var location = JSON.parse(request.responseText);
					console.log(location.results[0].locations[0].adminArea5);
				}
			}
			else{
				console.log(request.readyState);
				console.log("This isn't working.");
			}
	};	
	request.send();
	
	
	alert("CRACK");
}