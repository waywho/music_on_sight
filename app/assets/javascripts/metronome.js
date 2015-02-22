	var context = new AudioContext() || new webkitAudioContext(); //create the audio container

	var	tempo = 60;
	var tempoTime = 60000/tempo;
	var secondsPerBeat = 60.0/tempo;
	var metro;
	var expectedList = [];
	var noteTime;
	var example = ["C", "C", "G", "G", "A", "A", "G"];

	var noteLength = 0.05;
    var ctx2;
    var drawPos = 0;
    var DotOn = false;
    var blink;
    var	count = 0;
    var count2 = 0;
    var startPos = 75;

	function drawTime() {
		// var lineTime = new Date();
		// var msec = lineTime.getMilliseconds();

		if(count2 >= 9) {
			clearCanvas();
            drawPos = startPos;
            count2 = 0;
        }

        if(count<4) {
        	drawTempoDot(startPos);
        } else {
        	// metro = setInterval(function(){
        	clearTimeout(blink);
        	clearInterval(wipe);
        	count2 += 1
			drawPos= 75 * count2;
			drawTempoDot(drawPos);
			// }, tempoTime);
        };
        count += 1;

		};

	function drawTempoDot(xtime) {
		ctx2.clearRect(0,0, canvasWidth, canvasHeight)
		ctx2.beginPath();
		ctx2.moveTo(xtime, 10);
		ctx2.lineTo(xtime, 290)
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

		// noteTime = context.currentTime
		// console.log(noteTime);
		// expectedList.push(noteTime);

		osc1 = context.createOscillator(); //create the sound source
		osc1.type = "square"; //square wave;
		osc1.frequency.value = 261.63;

		gainNode = context.createGain(); //create a gain note
		gainNode.gain.value = 0.1; //set gain node to 30 percent volume

		osc1.connect(gainNode); //connect sound to gain node
		
		gainNode.connect(context.destination); //gain connect to speaker

		osc1.start(time); //generate sound instantly
		osc1.stop(time + noteLength);

	};


$(document).ready(function() {
	var wipe;

	ctx2 = $('#canvas2')[0].getContext('2d');
	drawTempoDot(startPos);

	$('#metronome').click(function() {
     	clearCanvas();
     	expectedList = [];
     	noteList = [];
     	$('#eval').html("").removeClass("alert alert-info");
     	$('#score').html("");

		if(isPlaying) {
			noteTime = context.currentTime + secondsPerBeat;

		setTimeout(updatePitch, tempoTime*5); //start after 5 counts
		// blink = setInterval(drawCountInDot, tempoTime/2);
		// setTimeout(drawTime, tempoTime*4);
		blink = setTimeout(drawCountOff, tempoTime/2);
		metro = setInterval(drawTime, tempoTime);
		
		//parsing the challenge test
		var testN = $('.testNotes').text();
    	parseTest(testN);


		//setting up 5 counts and the expected time of the exercise notes
			for(i=0; i<3+testList.length+1; i++) {
				if(i <= 3) {
				tick(noteTime);
				expectedList.push(["prep", noteTime]);
				noteTime += secondsPerBeat;
				} else {
				expectedList.push([testList[i-4][0], noteTime]);
				noteTime += secondsPerBeat * testList[i-4][1];
				};
			};
		} else { alert("Please turn on your microphone.");
	};


		// clearInterval(metro);
		// metro = setInterval(tick, tempoTime);

		// setInterval(tick(noteTime), tempoTime);
		// function beatSoundStart() {
		
		// oscillator1.stop();
		// time = 60000 / tempo;
		// setTimeout(beatSoundStart, time );
	});
	$('#stop').click(function() {
		if(isPlaying) {
        //stop playing and return
        clearInterval(metro);
        sourceNode.disconnect();
        sourceNode = null;
        analyser = null;
        isPlaying = false;
        // clearCanvas();
		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
        window.cancelAnimationFrame( rafID );
    } 
		evalNotes();
	// function() {
	// 	// oscillator1.disconnect();
	});
})