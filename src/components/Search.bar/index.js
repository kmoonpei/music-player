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
                {this.props.is_searchPage ?
                    <img className="back_img" src={require('../../static/img/left_arrow.png')} onClick={this.goBack} /> :
                    <Link to={`/user`}>
                        <a className="icon_user" />
                    </Link>}
                <Link to={`/Search`} className="search_wrap">
                    <a className="search_icon" />
                    <input type="text" className="input" placeholder="请输入关键字" />
                </Link>
                {this.props.is_searchPage ?
                    <div className="search_txt">搜索</div> :
                    <a className="is_play_icon" />
                }
            </div>
        )
    }
}