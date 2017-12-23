function setup() {
	noCanvas();
	let lang = navigator.language || 'en_US';
	let speechRec = new p5.SpeechRec(lang, gotSpeech);
	let continuous = true;
	let interim = true;
	speechRec.start(continuous, interim);
	function gotSpeech() {
		if (speechRec.resultValue) {
			console.log(speechRec);
			createP(speechRec.resultString);
		}
	}
}
