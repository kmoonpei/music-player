import React, { Component } from 'react';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import HeadBar from '../../../common/HeadBar';
import Cheerio from 'cheerio';
import SongList from '../../../common/SongList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action as PlayListAction } from '../../Play';

class SingerSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            singer_name: '',
            singer_img: '',
        }
        this.addToList = this.addToList.bind(this)
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
    //全部添加到播放列表并跳转播放页
    addToList() {
        let { songs } = this.state
        let list = songs.map((item) => {
            return { filename: item.filename, hash: item.hash }
        });
        this.props.PlayListActions.PlayListAction('SavePlayList', { list: list })
        this.props.history.push({ pathname: '/play', state: songs[0] })
    }
    render() {
        let { songs, singer_name, singer_img } = this.state
        return (
            <div>
                <HeadBar title={singer_name} />
                <div onClick={this.addToList} className="singersongs_cover_wrap" style={{ backgroundImage: `url(${singer_img})` }}>
                    <img className="singersongs_play" src={require('../../../static/img/play.png')} />
                </div>
                <ul className="new_song_wrap">
                    {songs.map((item, i) => {
                        return (
                            <li key={i}>
                                <SongList item={item} i={i} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        PlayListActions: bindActionCreators(PlayListAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SingerSongs); 