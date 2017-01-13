var isSpeechRecognitionSupported = function() {
  window && 'webkitSpeechRecognition' in window;
}

var SpeechRecognition = window && window.webkitSpeechRecognition;

module.exports = {
  isSpeechRecognitionSupported: isSpeechRecognitionSupported,
  SpeechRecognition: SpeechRecognition
}
