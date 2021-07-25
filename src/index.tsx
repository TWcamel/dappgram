import React from "react";
import ReactDOM from "react-dom";
import "./components/scss/index/index.css";
import App from "./App";
import reportWebVitals from "./web-setup/reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
