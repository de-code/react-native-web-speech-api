import {
  SpeechRecognizer,
  RecognizerIntent,
  RecognitionListener
} from 'react-native-android-speech-recognizer';

export const isSpeechRecognitionSupported = () =>
  !!SpeechRecognizer;

export class SpeechRecognition {
  _getOrCreateSpeechRecognizer() {
    if (this._recognizer) {
      return Promise.resolve(this._recognizer);
    }
    return SpeechRecognizer.createSpeechRecognizer().then(recognizer => {
      this._recognizer = recognizer;
      return recognizer;
    });
  }

  abort() {
    if (this._recognizer) {
      this._recognizer.destroy();
    }
  }

  start() {
    this._getOrCreateSpeechRecognizer().then(recognizer => {
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

  stop() {
    if (this._recognizer) {
      this._recognizer.cancel();
    }
  }
}
