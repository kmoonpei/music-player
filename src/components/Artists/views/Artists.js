import React, { Component } from 'react';
import API from '../../../utils/API';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist_class_data: [],
        }
    }
    componentWillMount() {
        this.getData();
    }

    async getData() {
        try {
            let result = await fetch(`/kugou${API.artist_class}`);
            let data = await result.json();
            this.setState({ artist_class_data: data.list });
        } catch (err) {
            console.log('Error', err);
        }
    }
    render() {
        let { artist_class_data } = this.state
        return (
            <ul className="artist_class_wrap">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => {
                    return (
                        <li className="class_li">
                            <a>
                                <span>热门歌手</span>
                                <img src={require('../../../static/img/arrow.png')} />
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }
}