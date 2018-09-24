import React, { Component } from 'react';
import SearchBar from '../../Search.bar';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <SearchBar is_searchPage={true} />
            </div>
        )
    }

}