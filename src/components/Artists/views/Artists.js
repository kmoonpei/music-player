import React, { Component } from 'react';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';

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
                {artist_class_data.map((item, i) => {
                    return (
                        <li className="class_li">
                            <Link to={`/artists/list${item.classid}`}>
                                <span>{item.classname}</span>
                                <img src={require('../../../static/img/arrow.png')} />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}