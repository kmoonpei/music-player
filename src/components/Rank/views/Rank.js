import React, { Component } from 'react';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank_data: [],
        }
    }
    componentWillMount() {
        this.getData();
    }

    async getData() {
        try {
            let result = await fetch(`/kugou${API.rank}`);
            let data = await result.json();
            this.setState({ rank_data: data.rank.list });
        } catch (err) {
            console.log('Error', err);
        }
    }
    render() {
        let { rank_data } = this.state
        return (
            <ul className="rank_wrap">
                {rank_data.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link to={`/rank/${item.rankid}`}>
                                <img className="rank_cover" src={item.imgurl.replace(/\{size\}/g, 400)} />
                                <span>{item.rankname}</span>
                                <img className="rank_right_arrow" src={require('../../../static/img/arrow.png')} />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}