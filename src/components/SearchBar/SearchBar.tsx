import * as React from "react"
import { withRouter, BrowserRouter } from 'react-router-dom'
import './SearchBar.scss';

interface SearchProps {}

interface SearchState {
    inputValue?: string
}

class Search extends React.Component<SearchProps, SearchState> {

    private history: any;

    constructor(router, params) {
        super(router, params);

        this.state = {
            inputValue: ''
        };

        this.history = router.history;

        this.onInputChange = this.onInputChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    onInputChange(e) {
        const { value } = e.target;

        this.setState({
            inputValue: value
        });
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.go((this.state.inputValue || '').trim());
        }
    }

    onClick(e) {
        this.go((this.state.inputValue || '').trim())
    }

    go(val) {
        if (val.length === 0) {
            return;
        }
        let firstChar = val.charAt(0);
        let transTo = null;
        if (firstChar && firstChar.toUpperCase() === 'Q') {
            transTo = `/addr/${val}`;
        } else if(val.length === 64) {
            transTo = `/tx/${val}`;
        } else if(parseInt(val) !== 0) {
            transTo = `/block/${val}`;
        }
        if (transTo) {
            this.setState({inputValue: ''});
            return this.history.push(transTo);
        }
        console.log('Not a recognizable search input.');
    }

    render() {
        const { inputValue } = this.state;

        return (
            <div className='search-wrapper'>
                <input
                    onChange={this.onInputChange}
                    onKeyPress={this.onKeyPress}
                    placeholder='Search here by Address, Txhash, or Block'
                    value={this.state.inputValue}
                    spellCheck={false}
                />
                <span className={inputValue.length ? 'search-highlight' : 'search-highlight empty'}>
                    { inputValue.replace(/ /g, "\u00a0") }
                </span>
                <button onClick={this.onClick} type="submit">
                    go
                </button>
            </div>
        );
    }
}

export default withRouter(Search);
