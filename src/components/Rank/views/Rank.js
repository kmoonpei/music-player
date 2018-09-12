import React, { Component } from 'react';
import API from '../../../utils/API';

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
        console.log('rank', rank_data)
        return (
            <ul className="rank_wrap">
                {rank_data.map((item) => {
                    return (
                        <li key={item.id}>
                            <a>
                                <img className="rank_cover" src={item.imgurl.replace(/\{size\}/g, 400)} />
                                <span>{item.rankname}</span>
                                <img className="rank_right_arrow" src={require('../../../static/img/arrow.png')} />
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }
}