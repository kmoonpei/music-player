import React, { Component } from 'react';
import HeadBar from '../../../common/HeadBar';
import API from '../../../utils/API';
import Cheerio from 'cheerio';

export default class SingerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singerInfo: '',
        };

    }
    componentWillMount() {
        this.getData()
    }

    async getData() {
        try {
            let result = await fetch(`/yy_kugou/singer/home/${this.props.location.state.singerId}.html`)
            let data = await result.text()
            const $ = Cheerio.load(data);
            const text = $("#singer_content").text();
            this.setState({
                singerInfo: text,
            });
        } catch (err) {
            console.log('Error', err);
        }
    }
    render() {
        return (
            <div>
                <HeadBar title={'歌手简介'} />
                <p className="singer_info_txt">{this.state.singerInfo}</p>
            </div>
        )
    }
}
