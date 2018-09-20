import React, { Component } from 'react';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import HeadBar from '../../../common/HeadBar';
import Cheerio from 'cheerio';
import SongList from '../../../common/SongList';

export class SingerSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            singer_name: '',
            singer_img: '',
        }
    }
    componentWillMount() {
        this.getData();
    }

    async getData() {
        try {
            let result = await fetch(`/yy_kugou/singer/home/${this.props.match.params.id}.html`);
            let data = await result.text();
            const $ = Cheerio.load(data);
            const list = $('#song_container').children();
            const dataArr = [];
            list.each((index, item) => {
                const link = $(item).find('a').find('input');
                dataArr.push(link.val());
            });
            let arr = dataArr.map((item) => {
                let eleArr = item.split('|');
                return {
                    filename: eleArr[0],
                    hash: eleArr[1]
                }
            })
            this.setState({
                songs: arr,
                singer_img: this.props.location.state.singerimg,
                singer_name: this.props.location.state.singername
            });
        } catch (err) {
            console.log('Error', err);
        }
    }
    render() {
        let { songs, singer_name, singer_img } = this.state
        return (
            <div>
                <HeadBar title={singer_name} />
                <div className="singersongs_cover_wrap" style={{ backgroundImage: `url(${singer_img})` }}>
                    <img className="singersongs_play" src={require('../../../static/img/play.png')}/>
                </div>
                <SongList list={songs} />
            </div>
        )
    }
}