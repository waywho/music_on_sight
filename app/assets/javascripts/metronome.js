	var context = new AudioContext() || new webkitAudioContext(); //create the audio container

	var	tempo = 40;
	var tempoTime = 60000/tempo;
	var secondsPerBeat = 60.0/tempo;
	var metro;
	var expectedList = [];
	var noteTime;
	var example = ["C", "C", "G", "G", "A", "A", "G"]

	var noteLength = 0.05;
    var ctx2;
    var xtime = 0;
    var DotOn = false;
    var blink;
    var	count = 0;

	function drawTime() {
		// var lineTime = new Date();
		// var msec = lineTime.getMilliseconds();
		if(xtime >= canvasWidth) {
            xtime = 10;
            clearCanvas();
        };
			metro = setInterval(function(){
				count += 1;
				xtime += 70;
				column = 70 * count;
				drawTempoDot(xtime);
				}, tempoTime);
		};

	function drawTempoDot(xtime) {
		ctx2.clearRect(0,0, 650, 50)
		ctx2.beginPath();
		ctx2.arc(xtime, 25, 10, 0, 2 * Math.PI, false);
		ctx2.fillStyle = '#009933';
		ctx2.fill();
		ctx2.closePath();

	};
	
	function drawCountInDot() {
			if(DotOn==false) {
				ctx2.clearRect(0,0, 50, 50);
				ctx2.beginPath();
				ctx2.arc(25, 25, 10, 0, 2 * Math.PI, false);
				ctx2.fillStyle = 'red';
				ctx2.fill();
				ctx2.closePath();
				DotOn = true;
			} else {
				ctx2.clearRect(0,0, 50, 50);
				DotOn = false;
			};
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
	ctx2 = $('#canvas2')[0].getContext('2d');
	drawTempoDot(10);

	$('#metronome').click(function() {
     	clearCanvas();
		if(isPlaying) {
			noteTime = context.currentTime + secondsPerBeat;

		setTimeout(updatePitch, tempoTime*5); //start after 5 counts
		// blink = setInterval(drawCountInDot, tempoTime/2);
		setTimeout(drawTime, tempoTime*4);
		


		//setting up 5 counts and the expected time of the exercise notes
			for(i=0; i<3+example.length+1; i++) {
				if(i <= 3) {
				tick(noteTime);
				expectedList.push(["prep", noteTime]);
				noteTime += secondsPerBeat;
				} else {
				expectedList.push([example[i-4], noteTime]);
				noteTime += secondsPerBeat;
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