// expectedList; expected list
// [expectedNote, expectedtime];
// noteList; sung list
// [sungNote, actualtime];

//search through the noteList to see if you find a note within
//a tolerance of the expected time



function evalNotes() {
	var score = 0; //maybe hash? so each note's given score.
	for(i=1; i<expectedList.length-4; i++) {
	var ranger = secondsPerBeat * 0.5; //tolerance range
	var upperTime = expectedList[i+4][1] + ranger;
	var lowerTime = expectedList[i+4][1] - ranger;
	var hitNote = false;

		for(j=1; j<noteList.length; j++) {
			if(noteList[j][1] <= upperTime && noteList[j][1] >= lowerTime) {
				if(noteList[j][0]==expectedList[i+4][0]){
					console.log(noteList[j][1]);
					score += 1;
					hitNote = true;
					break;
				};
			};
		};
		if(hitNote==false) {
			console.log("Missed note:" + i); //make the missed note red show the missed notes
			$('#eval').append("Missed note: "+ i + " ");
		};
	};
	console.log(score);
	$('#score').append(" " + score);
	if($.trim($('#eval').text()) != "") {
		$('#eval').addClass("alert alert-info");
	};
};


// to do: push the score up - button? call every 10 frame?

// to do: function to parse test example
function parseTest (testN) {
	var testN2 = testN.replace(/\/4/g, '');
	console.log(testN2);
	var testArr2 = testN2.split(/ \| | |-/);
	console.log(testArr2);
	$.each(testArr2, function(index, value) {
		// go through each item and create note and notes value pairs in an array

		}
	});

};


// to do: chnage expectedList timing increments into note values