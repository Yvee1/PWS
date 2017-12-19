function setup() {
	noCanvas();
	let lang = 'nl-NL';
	let speechRec = new p5.SpeechRec(lang, gotSpeech);

	let continuous = true;
	let interim = true;
	speechRec.start(continuous, interim);
	function gotSpeech() {
		if (speechRec.resultValue) {
			createP(speechRec.resultString);
		}
	}
}
