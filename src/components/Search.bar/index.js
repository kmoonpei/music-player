import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
        window.history.back();
    }
    render() {
        return (
            <div className="search_bar">
                <Link to={`/user`}>
                    <a className="icon_user" />
                </Link>
                <Link to={`/search`} className="search_wrap">
                    <a className="search_icon" />
                    <input type="text" className="input" placeholder="请输入关键字" />
                </Link>
                <a className="is_play_icon" />
            </div>
        )
    }
}