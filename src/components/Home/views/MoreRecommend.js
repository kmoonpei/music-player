import React, { Component } from 'react';
import API from '../../../utils/API';

export default class MoreRecommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommends: [],
        }

    }

    componentWillMount() {
        this.getData();
    }

    async getData() {
        try {
            let result = await fetch(`/kugou${API.recommend}`);
            let data = await result.json();
            // console.log(data)
            this.setState({ recommends: data.plist.list.info });
        } catch (err) {
            console.log('Error', err);
        }
    }

    format(num) {
        return num / 10000
    }
    render() {
        let { recommends } = this.state
        console.log(recommends)
        return (
            <div>
                <div className="more_wrap">
                    <span className="more_txt">更多推荐</span>
                    <a className="arrow_right" />
                </div>
                <hr />
                <ul className="reconmmed_ul">
                    {recommends.map((item, i) => {
                        return this.renderItem(item, i)
                    })}
                </ul>
            </div >
        )
    }
    renderItem = (item, i) => {
        return (
            <li key={i} className="recmmend_li">
                <a>
                    <img src={item.imgurl} />
                    <p >{item.intro}</p>
                    <div >
                        <img src={require("../../../static/img/headset.png")} />
                        <span >{`${this.format(item.playcount)}万`}</span>
                    </div>
                </a>
            </li>
        )
    }
}