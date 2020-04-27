// Automatically "installs" PerformanceObserverPolyfill as window.PerformanceObserver() if it detects PerformanceObserver isn't supported
// https://github.com/fastly/performance-observer-polyfill
import '@fastly/performance-observer-polyfill/polyfill';

// fetch polyfill
import 'whatwg-fetch';
