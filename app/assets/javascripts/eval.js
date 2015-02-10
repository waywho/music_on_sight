// timeList; expected list
// [expectedNote, expectedtime];
// noteList; sung list
// [sungNote, actualtime];

//search through the noteList to see if you find a note within
//a tolerance of the expected time

var score;

function evalNotes() {
	for(i=0; i<timeList.length-4; i++) {
	var ranger = secondsPerBeat * 0.2 //tolerance range
	var upperTime = timeList[i+4][1] + ranger
	var lowerTime = timeList[i+4][1] - ranger
	
		for(j=0; j<noteList.length; j++) {
				if(noteList[j][1] <= upperTime && noteList[j][1] >= lowerTime) {
					if(noteList[j][1]==timeList[i+4][1]){
						console.log(noteList[j][1]);
				score += 1;
				};
			};
		};
	};
};
