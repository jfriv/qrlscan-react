import * as React from "react"
import { Switch, Route, Link } from 'react-router-dom'
import SearchBar from './components/SearchBar/SearchBar'
import Latest from './components/Latest/Latest'
import Status from './components/Status/Status'
import Address from './components/Address/Address'
import Transaction from './components/Transaction/Transaction'
import Block from './components/Block/Block'
import './App.scss';

interface AppProps {}

interface AppState {}


export class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <div className="container">
                        <h1 className="app-logo">
                            <Link to='/'>QRLscan</Link>
                        </h1>
                        <div className="app-search">
                            <SearchBar />
                        </div>
                    </div>
                </header>

                <div className="app-wrap">
                    <div className="container">
                        <div className="app-body-wrap">
                            <div className="app-body">
                                <Switch>
                                    <Route exact path='/' component={Latest}/>
                                    <Route exact path='/status' component={Status}/>
                                    <Route path='/addr/:address' component={Address}/>
                                    <Route path='/tx/:hash' component={Transaction}/>
                                    <Route path='/block/:block' component={Block}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*
                        <nav className="app-menu-wrap">
                            <div className="app-menu">
                                <ul>
                                    <li>
                                        <Link to='/'>Latest</Link>
                                    </li>
                                    <li>
                                        <Link to='/block'>Block</Link>
                                    </li>
                                    <li>
                                        <Link to='/addr'>Address</Link>
                                    </li>
                                    <li>
                                        <Link to='/tx'>Transaction</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>

 */

export default App;
