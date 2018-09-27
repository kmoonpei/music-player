import React, { Component } from 'react';
import './style.css';
import API from '../../../utils/API';
import HeadBar from '../../../common/HeadBar';
import Slider from "react-slick";
import classnames from 'classnames';

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
        }
    }
    componentWillMount() {
        this.getData()
    }
    async getData() {
        try {
            let result = await fetch(`/kugou${API.song_detail}?cmd=playInfo&hash=${this.props.location.state.hash}`);
            let data = await result.json();
            console.log('播放歌曲信息', data)
            this.setState({ song_detail: data })
        } catch (err) {
            console.log('Error', err)
        }
    }
    render() {
        let { song_detail } = this.state
        let albumImg = `${song_detail.imgUrl}`.replace(/\{size\}/g, 400)
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="play_container">
                <div className="container_bg" style={{ background: `url(${albumImg})` }}></div>
                <div className="container_play" >
                    <HeadBar only_back={true} />
                    <div className="play_inner">
                        <div className="play_title">
                            <p className="play_song_name">{song_detail.songName}</p>
                            <p className="singer_name">{song_detail.singerName}</p>
                        </div>
                        <div className="play_content">
                            <Slider className="sliderContainer" {...settings} >
                                <div className="content_player">
                                    <div className="components_album">
                                        <div className={classnames('album_pic', true ? 'playing' : 'paused')}
                                            style={{ background: `url(${albumImg}) center center`, backgroundSize: 'cover' }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="lyric">
                                    hello
                                {/* <div className="originLyric" style={{transform: 'translateY(-' + this.props.lyricsUpdate.index * this.props.height + 'px)'}}>
                                            {currentSongLyrics.map((ele, index) => (
                                                <p key={index} id={`line-${index}`} style={{height: this.props.height + 'px'}}
                                                   className={this.props.lyricsUpdate.time === ele[0] ? 'line on' : 'line'}>
                                                    {ele[1]}
                                                </p>
                                            ))}
                                        </div> */}
                                </div>
                            </Slider>
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
                                        <div key={i} className="item_btn">
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