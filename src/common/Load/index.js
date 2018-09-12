import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="nav">
                <li>
                    <Link to="/">个性推荐</Link>
                </li>
                <li>
                    <Link to="/new">新歌</Link>
                </li>
                <li>
                    <Link to="/rank">排行榜</Link>
                </li>
                <li>
                    <Link to="/artists">歌手</Link>
                </li>
            </ul>
        )
    }
}