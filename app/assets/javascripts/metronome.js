	var context = new AudioContext() || new webkitAudioContext(); //create the audio container

	var	tempo = 60
	var tempoTime = 60000/tempo
	var secondsPerBeat = 60.0/tempo
	var metro;
	var timeList = [];
	var noteTime;
	var example = ["C", "C", "G", "G", "A", "A", "G"]

	var noteLength = 0.05;

	// function drawTime() {
	// 	var lineTime = new Date();
	// 	var msec = lineTime.getMilliseconds();
	// 	drawTempoLine(msec);
	// 	};

	// function drawTempoLine(xtime) {
	// 		ctx.beginPath();
	// 		ctx.moveTo(xtime/60, 10);
	// 		ctx.lineTo(xtime/60, 290);
	// 		ctx.stroke();
	// };
	

	function tick(time) {

		// noteTime = context.currentTime
		// console.log(noteTime);
		// timeList.push(noteTime);

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

	
	$('#metronome').click(function() {
     	clearCanvas();
		if(isPlaying) {
			noteTime = context.currentTime + secondsPerBeat;
			
		// drawTempoLine(600);

		setTimeout(updatePitch, tempoTime*5); //start after 5 counts
		// setTimeout(setInterval(drawTempoLine(msec), 1000), tempoTime*5);
		// setInterval(drawTime, 1000/60);

		//setting up 5 counts and the expected time of the exercise notes
			for(i=0; i<4+example.length+1; i++) {
				if(i < 4) {
				tick(noteTime);
				timeList.push(["prep", noteTime]);
				noteTime += secondsPerBeat;
				} else {
				timeList.push([example[i-5], noteTime]);
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
		clearInterval(metro);
		if (isPlaying) {
        //stop playing and return
        sourceNode.disconnect();
        sourceNode = null;
        analyser = null;
        isPlaying = false;
        // clearCanvas();
		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
        window.cancelAnimationFrame( rafID );
    } 
	// function() {
	// 	// oscillator1.disconnect();
	});
})