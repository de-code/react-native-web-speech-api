Web Speech API for React Native
===============================

This module attempts to provide the Web Speech API for React Native.

The main purpose of the module is allow common web and pre-existing code to use the Web Speech API.

This is currently in a very early stage:

* Only Android supported at present
* Only [SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) is mostly implemented

Installation
============
`npm install react-native-web-speech-api`

Dependencies
============
[react-native-android-speech-recognizer](https://www.npmjs.com/package/react-native-android-speech-recognizer)
is used to provide the Android React Native module.

Please follow its installation instructions.

Usage
=====

```javascript
import {
  isSpeechRecognitionSupported,
  SpeechRecognition
} from 'react-native-web-speech-api';

if (isSpeechRecognitionSupported()) {
  const recognition = new SpeechRecognition();
  recognition.onerror = event =>
    console.log("Error:", event.error);
  recognition.onresult = event =>
    console.log("Result:", event.results[0][0].transcript);
  recognition.start();
}
```
