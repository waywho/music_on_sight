
	var metro;
	var expectedList = [];
	var noteTime;

	var noteLength = 0.05;

    var tempoLineDrawPos = 0;
    var DotOn = false;
    var blink;

    var startPos = 75;
    var ctx2;


	function drawTempoDot(xtime) {
		ctx2.clearRect(0,0, canvasWidth, canvasHeight);
		ctx2.beginPath();
		ctx2.moveTo(xtime, 10);
		ctx2.lineTo(xtime, 290);
		// ctx2.arc(xtime, 25, 10, 0, 2 * Math.PI, false);
		ctx2.fillStyle = '#009933';
		// ctx2.fill();
		ctx2.stroke();
		ctx2.closePath();
		DotOn = true;
	};

	function drawCountOff() {
		wipe = setInterval(function (){
			ctx2.clearRect(0,0, canvasWidth, canvasHeight);
			DotOn = false;
		}, tempoTime);
	};


	function tick(time) {
		osc1 = audioContext.createOscillator(); //create the sound source
		osc1.type = "square"; //square wave;
		osc1.frequency.value = 261.63;

		gainNode = audioContext.createGain(); //create a gain note
		gainNode.gain.value = 0.1; //set gain node to 30 percent volume

		osc1.connect(gainNode); //connect sound to gain node
		
		gainNode.connect(audioContext.destination); //gain connect to speaker

		osc1.start(time); //generate sound instantly
		osc1.stop(time + noteLength);
	};

$(window).ready(function() {
	// var context = new AudioContext() || new webkitAudioContext(); //create the audio container
	var wipe;
	var tempoLinePosIncrement = 0;
	var	metronomeBeatCount = 0;
	window.clearTempoLinePosIncrement = function () {
		tempoLinePosIncrement = 0;
	}

	window.incrementDrawLinePosBy = function (amount) {
		tempoLineDrawPos += amount;
	}


	// tempo = parseInt($('#tempo').text(), 10);
 //   	console.log(tempo);
	window.tempoTime = 60000/tempo;
	window.secondsPerBeat = 60.0/tempo;

	function drawTime() {
		// var lineTime = new Date();
		// var msec = lineTime.getMilliseconds();
		if(tempoLinePosIncrement >= 9) {
			clearCanvas();
            tempoLineDrawPos = startPos;
			window.clearTempoLinePosIncrement();
        }
        if(metronomeBeatCount <4) {
        	drawTempoDot(startPos);
        } else {
        	// metro = setInterval(function(){
        	clearTimeout(blink);
        	clearInterval(wipe);
        	tempoLinePosIncrement += 1
			tempoLineDrawPos= 75 * tempoLinePosIncrement;
			drawTempoDot(tempoLineDrawPos);
			// }, tempoTime);
        };
        metronomeBeatCount += 1;
		};

    ctx2 = $('#canvas2')[0].getContext('2d');
    console.log(ctx2);
	drawTempoDot(startPos);

	$('#metronome').click(function() {
     	clearCanvas();
     	noteList = [];
     	$('#eval').html("").removeClass("alert alert-info");
     	$('#score').html("");

		if(isPlaying) {
			noteTime = audioContext.currentTime + secondsPerBeat;

			setTimeout(updatePitch, tempoTime*5); //start after 5 counts
			// blink = setInterval(drawCountInDot, tempoTime/2);
			// setTimeout(drawTime, tempoTime*4);
			blink = setTimeout(drawCountOff, tempoTime/2);
			metro = setInterval(drawTime, tempoTime);
			
			//parsing the challenge test
			var testN = $('.testNotes').text();
	    	parseTest(testN);


			//setting up 5 counts and the expected time of the exercise notes
				for(i=0; i<4+testList.length; i++) {
					if(i <= 3) {
					tick(noteTime);
					noteTime += secondsPerBeat;
					} else {
					expectedList.push([testList[i-4][0], noteTime]);
					noteTime += secondsPerBeat * testList[i-4][1];
					};
				};
		} else { alert("Please turn on your microphone.");
		};
	});
	$('#stop').click(function() {
		if(isPlaying) {
        //stop playing and return
        clearInterval(metro);
        window.cancelAnimationFrame(rafID);
        sourceNode.disconnect();
        sourceNode = null;
        analyser = null;
        isPlaying = false;
        // clearCanvas();
    	};
		evalNotes();
	// function() {
	// 	// oscillator1.disconnect();
	});
})