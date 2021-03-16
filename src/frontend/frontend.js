/**
 * insert user page to show sth
 */
import ReactDOM from "react-dom";
import React from "react";

import "./frontend.scss";

class App extends React.Component {
  render() {
    return (<div className="frontend-container">
      {/** do sth here */}
      hello
    </div>);
  }
}

const readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);

    const container = document.createElement("div");

    document.body.appendChild(container);

    ReactDOM.render(<App />, container);
  }
}, 200);

chrome.extension.sendMessage(
  {
    cmd: "changeUserLocation",
    value: location.href
  },
);