import React, { Component } from 'react';
import './style.css';
import API from '../../../utils/API';
import HeadBar from '../../../common/HeadBar';
import { Swiper, Slide } from 'react-dynamic-swiper';


const contral_btn = [
    { tit: 'pre', img: `pre_next.png` },
    { tit: 'pause', img: `pause.png` },
    { tit: 'next', img: `pre_next.png` },
    { tit: 'list', img: `list.png` }]


export class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song_detail: {},//当前播放歌曲信息
            modal_song_list: [],//播放列表
            show_modal_songlist: false,
        }
    }
    componentWillMount() {
        this.getData()
    }

    async getData() {
        let hash = this.props.location.state.hash
        try {
            let res_song = await fetch(`/kugou${API.song_detail}?cmd=playInfo&hash=${hash}`);
            let data_song = await res_song.json();
            let res_lyrics = await fetch(`/kugou${API.song_lyrics}?cmd=100&hash=${hash}&timelength=${data_song.timeLength}`);
            let data_lyrics = await res_lyrics.text();
            // console.log('播放歌曲信息', data_song, data_lyrics)
            this.setState({ song_detail: data_song, lyrics: data_lyrics })
        } catch (err) {
            console.log('Error', err)
        }
    }

    openModalSongList(tag) {
        this.setState({ show_modal_songlist: tag })
    }
    render() {
        let { song_detail, lyrics } = this.state
        let albumImg = `${song_detail.imgUrl}`.replace(/\{size\}/g, 400)

        return (
            <div className="play_container">
                <div className="container_bg" style={{ backgroundImage: `url(${albumImg})` }}></div>
                <div className="container_play" >
                    <HeadBar only_back={true} />
                    <img className="more_icon" src={require('../../../static/img/more_info.png')} />
                    {/* <div className="more_icon">

                    </div> */}
                    {this.state.show_modal_songlist ? <div className="modal_song_wrap">
                        <div className="modal_song_title">
                            <img onClick={this.openModalSongList.bind(this, false)} className="modal_song_close" src={require('../../../static/img/delete.png')} />
                            <span className="modal_song_tit">播放列表({1})首</span>
                            <span className="modal_song_delt">清除</span>
                        </div>
                        <ul className="modal_song_list_wrap">
                            {[1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => {
                                return <li className="modal_song_item_wrap" key={i}>
                                    <span className="modal_song_name">The xx -Intro(纯音乐版)家私电机都是老客户蓝色大海   家扫地机</span>
                                    <img className="modal_song_item_close" src={require('../../../static/img/delete.png')} />
                                </li>
                            })}
                        </ul>
                    </div> : null}
                    <div className="play_inner">
                        <div className="play_title">
                            <p className="play_song_name">{song_detail.songName}</p>
                            <p className="singer_name">{song_detail.singerName}</p>
                        </div>
                        <div className="play_content">
                            <Swiper
                                swiperOptions={{
                                    scrollBar: true,
                                    loop: false,
                                }}
                            >
                                <Slide className="Demo_swiper_slide" >
                                    <div className="rotate_cover">
                                        <div className="img_cover_wrap" style={{ background: `url(${albumImg}) no-repeat center` }}>
                                            <div className="img_cover"></div>
                                        </div>
                                    </div>
                                </Slide>
                                <Slide className="Demo_swiper_slide"  >
                                    <div className="lyric_wrap">{lyrics}</div>
                                </Slide>
                            </Swiper>
                        </div>
                        <div className="play_contral">
                            <div className="profress_bar">
                                <div className="time_left">01:23</div>
                                <div className="time_bar">
                                    <input type="range" step="any" min="0" max="1" value="0.4"
                                        style={{}} />
                                </div>
                                <div className="time_right">03:47</div>
                            </div>
                            <div className="contral_btn">
                                {contral_btn.map((item, i) => {
                                    let rotate = 0
                                    if (i === 0) {
                                        rotate = 180
                                    }
                                    return <div key={i} className="item_btn_wrap">
                                        <div key={i} className="item_btn" onClick={this.openModalSongList.bind(this, true)}>
                                            <img className="item_img" style={{ transform: `rotateY(${rotate}deg)` }} src={require(`../../../static/img/${item.img}`)} />
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}