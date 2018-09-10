import React, { Component } from 'react';
import './style.css';

export class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search_bar">
                <a className="icon_user" />
                <div className="search_wrap">
                <a className="search_icon"/>
                    <input type="text" className="input" placeholder="请输入关键字" />
                </div>
                <a className="is_play_icon"/>
            </div>
        )
    }
}