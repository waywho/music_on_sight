 window.requestAnimFrame = (function(){
      return  (window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              	}
              );
    })();


var context = new AudioContext() || new webkitAudioContext(); //create the audio container

	var	tempo = 60;
	var tempoTime = 60000/tempo;
	var secondsPerBeat = 60.0/tempo;
	var speed = 76/secondsPerBeat;
	var metro;
	var then;
	var now;
	var delta;

	var noteLength = 0.05;
    var ctx3;
    var drawDis = 0;
    var drawPos = 0;
    var DotOn = false;
    var blink;

    var isPlaying = false;

    function setDelta() {
    now = Date.now();
    delta = (now - then) / 1000; // seconds since last frame
    then = now;
  	};

	function drawTime2() {
		// var lineTime = new Date();
		// var msec = lineTime.getMilliseconds();

		if(count2 >= 9) {
            drawPos = 20;
            count2 = 0;
        }

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
 			window.requestAnimFrame(drawTempoLine);
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
	
	function drawCountOff2() {
		wipe = setInterval(function (){
			ctx3.clearRect(0,0, canvasWidth, canvasHeight);
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
	var startPos2 = 20;
	var	count = 0;
   	var count2 = 0;


	ctx3 = $('.rhythm-count')[0].getContext('2d');
	drawStaticTempoLine();

	$('#metronome').click(function() {
     	ctx3.clearRect(0,0, 680, 145)
     	noteTime = context.currentTime + secondsPerBeat;
     	// $('#eval').html("").removeClass("alert alert-info");
     	// $('#score').html("");

		blink = setTimeout(drawCountOff2, tempoTime/2);
		metro = setInterval(drawTime2, tempoTime);

		//setting up 5 counts and the expected time of the exercise notes
			for(i=0; i<12; i++) {
				tick(noteTime);
				noteTime += secondsPerBeat;
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
		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
        window.cancelAnimationFrame( rafID );
    } 
	});
})