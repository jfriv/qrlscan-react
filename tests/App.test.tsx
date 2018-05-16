import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as TestUtils from 'react-dom/test-utils';
import App from '../src/App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('App is rendered', () => {
    // Render App in the document
    const appElement: any = TestUtils.renderIntoDocument(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

    const appNode = ReactDOM.findDOMNode(appElement);

    // Verify text content
    expect(appNode.textContent).toEqual('QRLscango');
});
