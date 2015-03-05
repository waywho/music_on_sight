 window.requestAnimFrame = (function(){
      return  (window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              	}
              );
    })();


// var audioContext = new AudioContext() || new webkitAudioContext(); //create the audio container

var noteList = [];
var rhythmTest = [];

$(document).ready(function() {
	var wipe;
	var startPos2 = 20;
	var	count = 0;
   	var count2 = 0;

   	tempo = parseInt($('#tempo').text(), 10);
   	console.log(tempo);
	window.tempoTime = 60000/tempo;
	window.secondsPerBeat = 60.0/tempo;
	window.speed = 76/secondsPerBeat;


	var metro;
	var then;
	var now;
	var delta;
	var pos;

	var noteLength = 0.05;

    window.ctx3;
    window.vex;
    var drawDis = 0;
    var drawPos = 0;
    var DotOn = false;
    var blink;

    var isPlaying = false;
    var moveTempoLine;

    function setDelta() {
    now = Date.now();
    delta = (now - then) / 1000; // seconds since last frame
    then = now;
  	};

	function drawTime2() {
		// var lineTime = new Date();
		// var msec = lineTime.getMilliseconds();

        if(count2<3) {
        	drawStaticTempoLine();
        } else {
        	// metro = setInterval(function(){
        	clearTimeout(blink);
        	clearInterval(wipe);
        	clearInterval(metro);
   //      	count2 += 1
			// drawPos= 75 * count2;
			// drawTempoLine(drawPos);
			// }, tempoTime);
 			then = Date.now();
 			moveTempoLine = window.requestAnimFrame(drawTempoLine);
        };
        count2 += 1;
	};

	function drawStaticTempoLine() {
		ctx3.clearRect(0,0, 680, 145)
		ctx3.beginPath();
		ctx3.moveTo(0, 10);
		ctx3.lineTo(0, 145)
		// ctx2.arc(xtime, 25, 10, 0, 2 * Math.PI, false);
		ctx3.fillStyle = '#009933';
		// ctx2.fill();
		ctx3.stroke();
		ctx3.closePath();
	};

	function drawTempoLine() {
		ctx3.clearRect(0,0, 680, 145)
		ctx3.beginPath();
		pos = drawPos + drawDis
		ctx3.moveTo(drawPos + drawDis, 10);
		ctx3.lineTo(drawPos + drawDis, 145)
		// ctx2.arc(xtime, 25, 10, 0, 2 * Math.PI, false);
		ctx3.fillStyle = '#009933';
		// ctx2.fill();
		ctx3.stroke();
		ctx3.closePath();
		setDelta();
		drawDis += delta * speed;
		window.requestAnimFrame(drawTempoLine);
	};

	function drawTempoLine2() {
		vex.beginPath();
		vex.moveTo(pos, 10);
		vex.lineTo(pos, 40)
		// ctx2.arc(xtime, 25, 10, 0, 2 * Math.PI, false);
		vex.strokeStyle = '#FF0000';
		vex.lineWidth = 10;
		// ctx2.fill();
		vex.stroke();
		vex.closePath();
	};
	
	function drawCountOff2() {
		wipe = setInterval(function (){
			ctx3.clearRect(0,0, canvasWidth, canvasHeight);
		}, tempoTime);
	};


	function tick(time) {

		// noteTime = context.currentTime
		// console.log(noteTime);
		// expectedList.push(noteTime);

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

	function tick2(time) {
		osc2 = audioContext.createOscillator(); //create the sound source
		osc2.type = "sine"; //square wave;
		osc2.frequency.value = 440;

		gainNode = audioContext.createGain(); //create a gain note
		gainNode.gain.value = 0.3; //set gain node to 30 percent volume

		osc2.connect(gainNode); //connect sound to gain node
		
		gainNode.connect(audioContext.destination); //gain connect to speaker

		osc2.start(time); //generate sound instantly
		osc2.stop(time + noteLength);
		};

	var $rhythmCount = $('.rhythm-count');
	if($rhythmCount.length>0) {
		ctx3 = $('.rhythm-count')[0].getContext('2d');
		vex = $('.vex-canvas')[0].getContext('2d');
		drawStaticTempoLine();	


	var testN = $('.testNotes').text();
	parseTest(testN);

	$('#metronome').click(function() {
     	ctx3.clearRect(0,0, 680, 145)
     	noteTime = audioContext.currentTime + secondsPerBeat;
     	noteTime2 = audioContext.currentTime + secondsPerBeat;
     	// $('#eval').html("").removeClass("alert alert-info");
     	// $('#score').html("");

		blink = setTimeout(drawCountOff2, tempoTime/2);
		metro = setInterval(drawTime2, tempoTime);

		//setting up 5 counts and the expected time of the exercise notes
			for(i=0; i<4+testList.length; i++) {
				tick(noteTime2);
				noteTime2 += secondsPerBeat;
			};

			for(i=0; i<4+testList.length; i++) {
				if(i <= 3) {
				noteTime += secondsPerBeat;
				} else {
				expectedList.push([testList[i-4][0], noteTime]);
				noteTime += secondsPerBeat * testList[i-4][1];
				};
			};

		isPlaying = true;
	});

	$('#stop').click(function() {
		if(isPlaying) {
        //stop playing and return
        clearInterval(metro);
        // sourceNode.disconnect();
        // sourceNode = null;
        // analyser = null;
        isPlaying = false;
        // clearCanvas();
		if(!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
			};
        window.cancelAnimationFrame( moveTempoLine );
    	}
    	evalNotes(); 
	});

	$(document).keypress(function() {
		var beepTime = audioContext.currentTime
		tick2(beepTime);
		noteList.push(["B", beepTime]);

		drawTempoLine2();
	});
	}
})