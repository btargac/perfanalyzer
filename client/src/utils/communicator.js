import { storage } from './storage';

const _sendWithFetch = data => {
  fetch(__API_ADDRESS__, {
    method: 'POST',
    body: data,
  });
};

class Communicator {
  // Send the collected data to perfanalyzer server once the user leaves the tab.

  initListener = () => {
    addEventListener(
      'visibilitychange',
      function fn() {
        if (document.visibilityState === 'hidden') {
          const perfData = new FormData();

          perfData.append('entries', JSON.stringify(storage.get()));

          // Check for sendBeacon support:
          if ('sendBeacon' in navigator) {
            if (!navigator.sendBeacon(__API_ADDRESS__, perfData)) {
              // sendBeacon failed! Use fetch instead
              _sendWithFetch(perfData);
            }
          } else {
            // sendBeacon not available! Use fetch instead
            _sendWithFetch(perfData);
          }
          removeEventListener('visibilitychange', fn, true);
        }
      },
      true
    );
  };
}

export const communicator = new Communicator();
