const { JSDOM } = require('jsdom');
const http = require('http');

(async () => {
  try {
    const res = await fetch("http://localhost:5174/");
    const html = await res.text();
    
    const dom = new JSDOM(html, {
      url: "http://localhost:5174/",
      runScripts: "dangerously",
      resources: "usable"
    });

    dom.window.console.error = function(...args) {
      console.error('JSDOM ERROR:', ...args);
    };

    dom.window.console.warn = function(...args) {
      console.warn('JSDOM WARN:', ...args);
    };

    dom.window.onerror = function(message, source, lineno, colno, error) {
      console.error('JSDOM WINDOW ERROR:', message, error);
    };

    dom.window.addEventListener("unhandledrejection", (event) => {
      console.error('JSDOM UNHANDLED REJECTION:', event.reason);
    });

    console.log("Loading...");
    await new Promise(r => setTimeout(r, 5000));
    console.log("Done waiting");
  } catch (err) {
    console.error("Script error:", err);
  }
})();
