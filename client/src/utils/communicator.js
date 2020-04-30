import { storage } from './storage';

const _sendWithXHR = data => {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', __API_ADDRESS__, true);
  xhr.send(data);
};

class Communicator {
  // Send the collected data to perfanalyzer server once the user leaves the tab.

  initListener = () => {
    addEventListener(
      'visibilitychange',
      function visibilityHandler() {
        if (document.visibilityState === 'hidden') {
          const stringifiedData = JSON.stringify(storage.get());

          // Check for sendBeacon support:
          if ('sendBeacon' in navigator) {
            if (!navigator.sendBeacon(__API_ADDRESS__, stringifiedData)) {
              // sendBeacon failed! Use XHR instead
              _sendWithXHR(stringifiedData);
            }
          } else {
            // sendBeacon not available! Use XHR instead
            _sendWithXHR(stringifiedData);
          }
          removeEventListener('visibilitychange', visibilityHandler, true);
        }
      },
      true
    );
  };
}

export const communicator = new Communicator();
