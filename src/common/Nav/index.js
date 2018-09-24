import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const types = [
    { title: '个性推荐', id: 1, to: '/' },
    { title: '新歌', id: 2, to: '/new' },
    { title: '排行榜', id: 3, to: '/rank' },
    { title: '歌手', id: 4, to: '/artists' }
]
export class Nav extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let { active_num } = this.props
        return (
            <ul className="nav">
                {types.map((item) => {
                    return <li key={item.id} className={this.props.active_num === item.id ? "active" : ' '} >
                        <Link to={item.to}>{item.title}</Link>
                    </li>
                })}
            </ul >
        )
    }
}