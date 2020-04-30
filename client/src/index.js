import { communicator, detectSupport, storage } from './utils';

// TTFB, domContentLoadedEvent and load events are handled
const supportsNavigation = detectSupport(['navigation']);
const supportsResource = detectSupport(['resource']);

if (supportsNavigation) {
  const navigationObserver = new PerformanceObserver((list, obs) => {
    for (const entry of list.getEntries()) {
      storage.set({
        TTFB: entry.responseStart,
        DCL: entry.domContentLoadedEventEnd,
        LOAD: entry.duration,
      });
    }
    // Disconnect observer since callback is only triggered once.
    obs.disconnect();
  });

  navigationObserver.observe({ type: 'navigation', buffered: true });
} else {
  // if browser doesn't have Performance observer
  // or navigation entry types in its PerformanceObserver implementation
  if (window.performance) {
    addEventListener(
      'load',
      function loadHandler() {
        // guarantee loadEventEnd is completed just because until load is completed
        // loadEventEnd returns 0
        setTimeout(() => {
          const {
            domContentLoadedEventEnd,
            loadEventEnd,
            navigationStart,
            responseStart,
            requestStart,
          } = window.performance?.timing || {};

          storage.set({
            TTFB: responseStart - requestStart,
            DCL: domContentLoadedEventEnd - navigationStart,
            LOAD: loadEventEnd - navigationStart,
          });
        }, 300);

        // remove the listener after load happens
        removeEventListener('load', loadHandler);
      },
      true
    );
  }
}

// FCP event is handled
const supportsPaint = detectSupport(['paint']);

if (supportsPaint) {
  const paintObserver = new PerformanceObserver((list, obs) => {
    for (const entry of list.getEntriesByName('first-contentful-paint')) {
      storage.set({
        FCP: entry.startTime,
      });
      // Disconnect observer since first-contentful-paint is only triggered once.
      obs.disconnect();
    }
  });

  // Start observing paint entry types.
  paintObserver.observe({
    type: 'paint',
    buffered: true,
  });
}

// handle resource load times
if (supportsResource) {
  let { networkTimings } = storage.get();
  const cssRegex = /\.?css(\?.*)?$/gi;
  const imgRegex = /\.(jpe?g|svg|png|webp|gif|ico|cur)(\?.*)?$/gi;
  const fontRegex = /\.(ttf|eot|woff2?|otf)(\?.*)?$/gi;

  const resourceObserver = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      const type = entry.initiatorType;
      let fileType = null;

      if (cssRegex.test(entry.name)) {
        fileType = 'css';
      }

      if (imgRegex.test(entry.name)) {
        fileType = 'img';
      }

      if (fontRegex.test(entry.name)) {
        fileType = 'font';
      }

      if ([fileType] in networkTimings) {
        networkTimings = {
          ...networkTimings,
          [fileType]: [
            ...networkTimings[fileType],
            entry.responseEnd - entry.requestStart,
          ],
        };
      } // file extension does not match css, image or font, then it should be probably a script or img
      else if ([type] in networkTimings) {
        networkTimings = {
          ...networkTimings,
          [type]: [
            ...networkTimings[type],
            entry.responseEnd - entry.requestStart,
          ],
        };
      }

      storage.set({
        networkTimings,
      });
    }
  });

  try {
    resourceObserver.observe({ type: 'resource', buffered: true });
  } catch {
    // safari wants entryTypes array
    resourceObserver.observe({ entryTypes: ['resource'], buffered: true });
  }
}

// create an eventListener and send the data when it's the right time to send metrics
communicator.initListener();
