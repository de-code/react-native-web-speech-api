import {
  SpeechRecognizer,
  RecognizerIntent,
  RecognitionListener
} from 'react-native-android-speech-recognizer';

export const isSpeechRecognitionSupported = () =>
  !!SpeechRecognizer;

export class SpeechRecognition {
  abort() {
    if (this._recognizer) {
      this._recognizer.destroy();
    }
  }

  start() {
    if (this._recognizer) {
      this._recognizer.startListening(RecognizerIntent.ACTION_RECOGNIZE_SPEECH, {});
    }
    else {
      SpeechRecognizer.createSpeechRecognizer().then(recognizer => {
        this._recognizer = recognizer;
        const listeners = {};
        if (this.onspeechstart) {
          listeners.onBeginningOfSpeech = () => this.onspeechstart();
        }
        if (this.onspeechend) {
          listeners.onEndOfSpeech = () => this.onspeechend();
        }
        if (this.onerror) {
          listeners.onError = event => this.onerror({
            error: "Failed with error code: " + event.error
          });
        }
        listeners.onResults = event => {
          const recognition = event.results[SpeechRecognizer.RESULTS_RECOGNITION];
          const bestRecognition = recognition[0];
          const speechRecognitionEvent = {
            resultIndex: 0,
            results: [[{
              transcript: bestRecognition
            }]],
          }
          speechRecognitionEvent.results[0].isFinal = true;
          if (this.onresult) {
            this.onresult(speechRecognitionEvent);
          }
        }
        recognizer.setRecognitionListener(listeners);
        recognizer.startListening(RecognizerIntent.ACTION_RECOGNIZE_SPEECH, {});
      });
    }
  }

  stop() {
    if (this._recognizer) {
      this._recognizer.cancel();
    }
  }
}
