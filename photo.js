

// (function () {
    

// const model = await downloadModel();
// const inputImage = webcam.capture();

// const boxes = await yolo(inputImage, model);

// // Display detected boxes
// boxes.forEach(box => {
//   const {
//     top, left, bottom, right, classProb, className,
//   } = box;

//   drawRect(left, top, right-left, bottom-top, `${className} ${classProb}`)
// });
// })();
(function () {
  let classifier;
	var video = document.getElementById('video'),

        venderUrl = window.URL || window.webkitURL;
	
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    navigator.getMedia({
        video: true,
        audio: false
    }, function (stream) {
        video.src = venderUrl.createObjectURL(stream);
    video.play();
    classifier = ml5.imageClassifier('MobileNet', video, modelReady);
		//JsQRScannerReady();
    }, function (error) {
        //An error occured
    });
document.getElementById('predict').addEventListener('click', function(){
  classifyVideo();
})

	function onQRCodeScanned(scannedText)
    {
      
    	var scannedTextMemo = document.getElementById("video");
    	if(scannedTextMemo)
    	{
			scannedTextMemo.value = scannedText;
			SendToBackend(scannedTextMemo.value);
    	}
    }
  
    //this function will be called when JsQRScanner is ready to use
    function JsQRScannerReady()
    {
        //create a new scanner passing to it a callback function that will be invoked when
        //the scanner succesfully scan a QR code
        var jbScanner = new JsQRScanner(onQRCodeScanned);
        //reduce the size of analyzed images to increase performance on mobile devices
        jbScanner.setSnapImageMaxSize(300);
    	var scannerParentElement = document.getElementById("video");
    	if(scannerParentElement)
    	{
    	    //append the jbScanner to an existing DOM element
    		jbScanner.appendTo(scannerParentElement);
    	}        
	}
	
// 	function SendToBackend(param){
// 		var data = null;
 
// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("POST", "http://localhost:40338/api/QrCode?value="+param);
// xhr.setRequestHeader("cache-control", "no-cache");


//  xhr.send(data);
//   }
  

  function modelReady() {
    // Change the status of the model once its ready
    console.log('Model Loaded');
    // Call the classifyVideo function to start classifying the video
    classifyVideo();
  }
  


  function classifyVideo() {
    classifier.predict(gotResult);
  }

  function gotResult(err, results) {
    // The results are in an array ordered by probability.
    console.log('Result: ' + results[0].className);
    console.log('probability: ' + results[0].probability);
    //SendToBackend(results[0].className);
    classifyVideo();
  }
})();