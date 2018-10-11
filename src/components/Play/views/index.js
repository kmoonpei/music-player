import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import API from '../../../utils/API';
import HeadBar from '../../../common/HeadBar';
import { Swiper, Slide } from 'react-dynamic-swiper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action as PlayListAction } from '../index';
import * as LikeSongsAction from '../likeSongs.action';


const contral_btn = [
    { tit: 'pre', img: `pre_next.png` },
    { tit: 'pause', img: `pause.png` },
    { tit: 'next', img: `pre_next.png` },
    { tit: 'list', img: `list.png` }]

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song_detail: {},//当前播放歌曲信息
            modal_song_list: [],//播放列表
            show_modal_songlist: false,
            show_modal_more: false,
            is_like: false,//是否喜欢
        }
        this.clearAllPlayList = this.clearAllPlayList.bind(this)
        this.clickLike = this.clickLike.bind(this)
    }

    componentWillMount() {
        this.getData()
        this.setState({ modal_song_list: this.props.PlayListState.list })
        console.log('播放列表：', this.props.PlayListState.list)
        let hash = this.props.location.state.hash
        let { list } = this.props.LikeSongsListState
        let tag = false
        list.forEach(element => {
            if (element.hash == hash) {
                tag = true
                return
            }
        });
        this.setState({ is_like: tag })
    }

    //获取当前播放歌曲信息和歌词
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

    //清空播放列表
    clearAllPlayList() {
        this.setState({ modal_song_list: [] })
        this.props.PlayListActions.PlayListAction('SavePlayList', { list: [] })
    }

    //在播放列表中删除某首歌
    deleteOneSong(i) {
        let arr = this.props.PlayListState.list
        arr.splice(i, 1);
        this.props.PlayListActions.PlayListAction('SavePlayList', { list: arr })
    }

    handleClick(i) {
        if (i === 3) {
            this.openModalSongList(true)
        }
    }
    //打开播放列表
    openModalSongList(tag) {
        this.setState({ show_modal_songlist: tag })
    }
    //打开更多
    openModalMore(tag) {
        this.setState({ show_modal_more: tag })
    }
    //添加喜欢列表
    clickLike() {
        let { is_like, song_detail } = this.state
        let { list } = this.props.LikeSongsListState
        let hash = this.props.location.state.hash
        this.setState({ is_like: !is_like })
        let arr = list
        if (!is_like) {
            arr.push({ filename: song_detail.fileName, hash: song_detail.hash })
        } else {
            arr = list.map((item) => {
                if (item.hash !== hash) {
                    return item
                }
            })
        }
        this.props.LikeSongsActions.LikeSongsAction('LikeSongs', { list: arr })
    }
    render() {
        let { song_detail, lyrics, modal_song_list, is_like } = this.state
        let albumImg = `${song_detail.imgUrl}`.replace(/\{size\}/g, 400)

        return (
            <div className="play_container">
                <div className="container_bg" style={{ backgroundImage: `url(${albumImg})` }}></div>
                <div className="container_play" >
                    <HeadBar only_back={true} />
                    <img className="more_icon" alt={'更多'} src={require('../../../static/img/more_info.png')} onClick={this.openModalMore.bind(this, true)} />
                    {this.state.show_modal_more ? <div className="more_dot_wrap">
                        <div className="more_item_wrap">
                            {song_detail.songName}
                        </div>
                        <div className="more_item_wrap">
                            <div className="more_dot_icon_wrap">
                                <img className="more_dot_icon_love" onClick={this.clickLike} src={is_like ? require('../../../static/img/love.png') : require('../../../static/img/whitelove.png')} />
                            </div>
                            <div className="more_dot_icon_wrap">
                                <Link to={{ pathname: `/play/singer`, state: { singerId: song_detail.singerId } }} >
                                    <img className="more_dot_icon_people" src={require('../../../static/img/people.png')} />
                                </Link>
                            </div>
                        </div>
                        <div className="more_item_wrap">
                            <img className="more_dot_icon_voice" src={require('../../../static/img/voice.png')} />
                            <div className="more_dot_voice_bar">
                                <div className="more_dot_voice_now"></div>
                                <div className="more_dot_voice_dot"></div>
                            </div>
                        </div>
                        <div className="more_item_wrap" style={{ justifyContent: 'center' }} onClick={this.openModalMore.bind(this, false)}>取消</div>
                    </div> : null}
                    {this.state.show_modal_songlist ? <div className="modal_song_wrap">
                        <div className="modal_song_title">
                            <img onClick={this.openModalSongList.bind(this, false)} className="modal_song_close" src={require('../../../static/img/delete.png')} />
                            <span className="modal_song_tit">播放列表({modal_song_list.length})首</span>
                            <span className="modal_song_delt" onClick={this.clearAllPlayList}>清除</span>
                        </div>
                        <ul className="modal_song_list_wrap">
                            {modal_song_list.map((item, i) => {
                                return <li className="modal_song_item_wrap" key={i}>
                                    <span className="modal_song_name">{item.filename}</span>
                                    <img className="modal_song_item_close" onClick={() => { this.deleteOneSong(i) }} src={require('../../../static/img/delete.png')} />
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
                                        <div className="img_cover_wrap" style={{ background: `url(${albumImg}) center / cover` }}>
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
                                        <div key={i} className="item_btn" onClick={this.handleClick.bind(this, i)}>
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
const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        PlayListActions: bindActionCreators(PlayListAction, dispatch),
        LikeSongsActions: bindActionCreators(LikeSongsAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Play); 