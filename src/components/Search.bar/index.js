import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
        window.history.back();
    }
    render() {
        let now_song = this.props.MusicState.song
        return (
            <div className="search_bar">
                <Link to={`/user`}>
                    <a className="icon_user" />
                </Link>
                <Link to={`/search`} className="search_wrap">
                    <a className="search_icon" />
                    <input type="text" className="input" placeholder="请输入关键字" />
                </Link>
                <Link to={{ pathname: `/play/#${now_song?now_song.hash:''}`,state: now_song ? now_song : { }}} style={{flex:1}}>
                    <img className="is_play_icon"  src={require('../../static/img/is_play.png')}/>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(SearchBar); 