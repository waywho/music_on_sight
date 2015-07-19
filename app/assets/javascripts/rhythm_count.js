 window.requestAnimFrame = (function(){
      return  (window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              	}
              );
    })();


var audioCtx = new AudioContext() || new webkitAudioContext(); //create the audio container

var noteList = [];
var rhythmTest = [];

$(document).ready(function() {
	var wipe;
	var startPos2 = 20;
	var	count = 0;
   	var count2 = 0;

   	window.tempo = parseInt($('#tempa').text(), 10);
   	console.log(tempo);
	window.tempoTime = 60000/tempo;
	// console.log(tempoTime);
	window.secondsPerBeat = 60.0/tempo;
	// console.log(secondsPerBeat);
	window.speed = 76/secondsPerBeat;


	var metro;
	var then;
	var now;
	var delta;
	var pos;

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
        // if(count2<3) {
        // 	// drawStaticTempoLine();
        // 	countDown();
        // } else {
        	// metro = setInterval(function(){
        	// clearTimeout(blink);
        	// clearInterval(wipe);
        	// clearInterval(metro);
   //      	count2 += 1
			// drawPos= 75 * count2;
			// drawTempoLine(drawPos);
			// }, tempoTime);
 			then = Date.now();
 			moveTempoLine = window.requestAnimFrame(drawTempoLine);
        // };
        // count2 += 1;
	};

	function countDown() {
		window.countDownCanvasCtx = $('.count-down')[0].getContext('2d');
		if(beatsPerBar > 0) {
			countDownCanvasCtx.clearRect(0,0, 100, 145);
			countDownCanvasCtx.font = "100px Arial";
			countDownCanvasCtx.fillStyle = '#FF0000';
			countDownCanvasCtx.fillText(beatsPerBar, 0, 100);
			beatsPerBar -= 1;
		} else {
			clearInterval(countIn);
			countDownCanvasCtx.clearRect(0,0, 100, 145);
			// countDownCanvasCtx.font = "60px Arial";
			// countDownCanvasCtx.fillStyle = '#FF0000';
			// countDownCanvasCtx.fillText("go", 0, 100);
			drawTime2();
		}
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
		ctx3.moveTo(pos, 10);
		ctx3.lineTo(pos, 145)
		// ctx2.arc(xtime, 25, 10, 0, 2 * Math.PI, false);
		ctx3.fillStyle = '#009933';
		// ctx2.fill();
		ctx3.stroke();
		ctx3.closePath();
		setDelta();
		drawDis += delta * speed;
		window.requestAnimFrame(drawTempoLine);
	};
	// draw a triangle point on the spot where user tapped
	function drawUserTap() {
		vex.beginPath();
		vex.moveTo(pos-5, 10);
		vex.lineTo(pos+5, 10);
		vex.lineTo(pos, 30);
		vex.fillStyle = '#FF0000';
		vex.fill();
		vex.closePath();
	};
	
	function drawCountOff2() {
		wipe = setInterval(function (){
			ctx3.clearRect(0,0, canvasWidth, canvasHeight);
		}, tempoTime);
	};


	function beep(time) {
		// noteTime = context.currentTime
		// console.log(noteTime);
		// expectedList.push(noteTime);
		osc1 = audioCtx.createOscillator(); //create the sound source
		osc1.type = "square"; //square wave;
		osc1.frequency.value = 261.63;

		gainNode = audioCtx.createGain(); //create a gain note
		gainNode.gain.value = 0.1; //set gain node to 30 percent volume

		osc1.connect(gainNode); //connect sound to gain node
		
		gainNode.connect(audioCtx.destination); //gain connect to speaker

		osc1.start(time); //generate sound instantly
		osc1.stop(time + 0.05);
	};

	function userTap(time) {
		osc2 = audioCtx.createOscillator(); //create the sound source
		osc2.type = "sine"; //square wave;
		osc2.frequency.value = 440;

		gainNode = audioCtx.createGain(); //create a gain note
		gainNode.gain.value = 0.3; //set gain node to 30 percent volume

		osc2.connect(gainNode); //connect sound to gain node
		
		gainNode.connect(audioCtx.destination); //gain connect to speaker

		osc2.start(time); //generate sound instantly
		osc2.stop(time + 0.05);
		};

	function rhythmCanvasRenderer() {
		var canvasW = parseInt($('.vex-canvas').attr('width'));
		var canvasH = parseInt($('.vex-canvas').attr('height'));
		$('.rhythm-canvas').attr('width', canvasW);
		$('.rhythm-canvas').attr('height', canvasH);
	};
	var $rhythmCount = $('.rhythm-canvas');
	if($rhythmCount.length>0) {
		ctx3 = $('.rhythm-canvas')[0].getContext('2d');
		vex = $('.vex-canvas')[0].getContext('2d');
		rhythmCanvasRenderer();
		drawStaticTempoLine();	

		var beatsPerBar = parseInt($('#beats').attr('data-beatsPerBar'));


		var testN = $('.testNotes').text();
		parseTest(testN);


		$('#start').click(function() {
			if(!isPlaying) {
				ctx3.clearRect(0,0, 680, 145);
				drawStaticTempoLine();	
		     	// console.log(secondsPerBeat);
		     	noteTime = audioCtx.currentTime + secondsPerBeat;
		     	tempoActualTime = audioCtx.currentTime + secondsPerBeat;
		     	// console.log(noteTime);
		     	// $('#eval').html("").removeClass("alert alert-info");
		     	// $('#score').html("");

				// blink = setTimeout(drawCountOff2, tempoTime/2);
				// metro = setInterval(drawTime2, tempoTime);
				countIn = setTimeout(setInterval(countDown, tempoTime), tempoTime * 2);


				//setting up 5 counts and the expected time of the exercise notes
					// for(i=0; i<4+testList.length; i++) {
					// 	beep(tempoActualTime);
					// 	tempoActualTime += secondsPerBeat;
					// };

				//sets up 4 beep count-ins & a list of the expected timing of the notes in the exercise
					for(i=0; i<3+testList.length; i++) {
						if(i <= 3) {
						beep(tempoActualTime);
						tempoActualTime += secondsPerBeat;
						noteTime += secondsPerBeat;
						} else {
						beep(tempoActualTime);
						expectedList.push([testList[i-3][0], noteTime]);
						noteTime += secondsPerBeat * testList[i-3][1];
						tempoActualTime += secondsPerBeat;
						};
					};
				isPlaying = true;
			};
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
			var beepTime = audioCtx.currentTime;
			userTap(beepTime);
			noteList.push(["B", beepTime]);
			drawUserTap();
		});
	};
})