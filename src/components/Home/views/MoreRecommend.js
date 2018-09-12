import React, { Component } from 'react';
import API from '../../../utils/API';
import {Link} from 'react-router-dom';

export default class extends Component {
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
            let showArr = data.plist.list.info.slice(0, 12);
            this.setState({ recommends: showArr });
        } catch (err) {
            console.log('Error', err);
        }
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
            <li key={item.specialid} className="recmmend_li">
                <a>
                    <Link to={`/album/${item.specialid}`} >
                        <img src={item.imgurl.replace(/\{size\}/g, 400)} />
                        <p >{item.intro}</p>
                        <div >
                            <img src={require("../../../static/img/headset.png")} />
                            <span >{`${(item.playcount / 10000).toFixed(2)}万`}</span>
                        </div>
                    </Link>
                </a>
            </li>
        )
    }
}