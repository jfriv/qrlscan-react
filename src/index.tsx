import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from "react-hot-loader";
import { unregister } from './registerServiceWorker';
import ReactGA from "react-ga";
import './index.scss';
import App from "./App";

const rootEl = document.getElementById("root");

render(
    <AppContainer>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </AppContainer>,
    rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

unregister();

ReactGA.initialize('UA-115171615-1');
ReactGA.pageview(window.location.pathname + window.location.search);

if (module.hot) {
    module.hot.accept("./App", () => {
        const NewApp = require("./App").default;

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>,
            rootEl
        );
    });
}
