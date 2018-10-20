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
import * as MusicAction from '../music.action';
import * as localStore from '../../../utils/localStorage';
// import { VolumeAction } from '../music.action';
import LikeSongsListState from './../likeSongs.reducer';


const contral_btn = [
    { tit: 'pre', img: `pre_next.png` },
    { tit: 'pause', img: `pause.png` },
    { tit: 'next', img: `pre_next.png` },
    { tit: 'list', img: `list.png` }]

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_song_list: [],//播放列表
            show_modal_songlist: false,
            show_modal_more: false,
            volume: 0.1,//声量
        }
        this.clearAllPlayList = this.clearAllPlayList.bind(this)
        this.clickLike = this.clickLike.bind(this)
    }

    componentWillMount() {
        this.props.MusicActions.FetchMusic(this.props.location.state.hash,this.props.LikeSongsListState.list)
        this.setState({ modal_song_list: this.props.PlayListState.list,volume:this.props.VolumeState})
        let hash = this.props.location.state.hash
        let { list } = this.props.LikeSongsListState
        
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
        let play_list = this.props.PlayListState.list
        let now_song_hash =  this.props.MusicState.song.hash
        let tag
        switch (i) {
            case 3:
                this.openModalSongList(true);
            break;
            case 0:
                play_list.forEach((ele,i)=>{
                    if(ele.hash === now_song_hash){
                        if(i === 0){
                            tag = play_list.length - 1
                        }else{
                            tag = i - 1
                        }
                        this.props.MusicActions.FetchMusic(play_list[tag].hash,this.props.LikeSongsListState.list)
                    }
                })

            break;
            case 2:
                play_list.forEach((ele,i)=>{
                    if(ele.hash === now_song_hash){
                        if(i === play_list.length - 1){
                            tag = 0
                        }else{
                            tag = i + 1
                        }
                        this.props.MusicActions.FetchMusic(play_list[tag].hash,this.props.LikeSongsListState.list)
                    }
                })

            break;
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
        let song_detail = this.props.MusicState.song
        let is_like = this.props.FavorState
        let { list } = this.props.LikeSongsListState
        let hash = this.props.location.state.hash
        let arr = list
        let tag
        if (!is_like) {
            arr.push({ filename: song_detail.fileName, hash: song_detail.hash })
        } else {
            arr.forEach((element, i) => {
                if (element.hash === hash) {
                    tag = i;
                    return
                }
            });
            arr.splice(tag, 1)
        }
        this.props.LikeSongsActions.LikeSongsAction('LikeSongs', { list: arr })
        this.props.MusicActions.TofavorAction(!is_like)

    }

    handleStart(e) {
        e.preventDefault();
        const touchObj1 = e.changedTouches[0];
        const x = touchObj1.clientX;
        const l = e.target.offsetLeft;
        const leftVal = x - l;
        this.setState({
            leftVal: leftVal,
            sliderWidth: this.refs.slider.offsetWidth,
            barWidth: e.target.offsetWidth,
        })
    }

    handleTouchMove(e) {
        const {leftVal, sliderWidth, barWidth} = this.state;
        const touchObj2 = e.changedTouches[0];
        const thisX = touchObj2.clientX;
        let barLeft = thisX - leftVal;
        if (barLeft < 0) {
            barLeft = 0;
        } else if (barLeft > sliderWidth - barWidth) {
            barLeft = sliderWidth - barWidth
        }
        const currentValue = sliderWidth - barWidth > 0 ? (barLeft / ( sliderWidth - barWidth)).toFixed(2) : 0.5;
        if (currentValue >= 0 && currentValue <= 1) {
            (currentValue) === 0 ? this.setState({volumed: false}) : this.setState({volumed: true});
            this.props.musicInfoActions.volumeControl({volume: parseFloat(currentValue)});
            localStore.setItem('currentVolume', currentValue);
        } else {
            this.props.musicInfoActions.volumeControl({volume: 0.5});
        }
        this.setState({progress: barLeft + 'px'});
    }

    toggleVolume(){
        console.log('props.volume:',this.props.VolumeState)
        let vol = this.state.volume+0.1
        if(vol>=0&&vol<=1){
            this.setState({volume: vol})
            this.props.MusicActions.VolumeAction('volume',vol)
            localStore.setItem('currentVolume', vol);
        }
    }

    PlaySong(item){
        this.props.MusicActions.FetchMusic(item.hash,this.props.LikeSongsListState.list)
    }
    render() {
        let { modal_song_list } = this.state
        let song_detail = this.props.MusicState.song
        let lyrics = this.props.MusicState.lyrics
        let is_like = this.props.FavorState
        let albumImg = `${song_detail?song_detail.imgUrl:null}`.replace(/\{size\}/g, 400)
        if(song_detail){
        return (
            <div className="play_container">
                <div className="container_bg" style={{ backgroundImage: `url(${albumImg})` }}></div>
                <div className="container_play" >
                    <HeadBar only_back={true} />
                    <img className="more_icon" alt={'更多'} src={require('../../../static/img/more_info.png')} onClick={this.openModalMore.bind(this, true)} />
                    {this.state.show_modal_more ? <div className="more_dot_wrap">
                        <div className="more_item_wrap">
                            {song_detail?song_detail.songName:''}
                        </div>
                        <div className="more_item_wrap">
                            <div className="more_dot_icon_wrap">
                                <img className="more_dot_icon_love" onClick={this.clickLike} src={is_like ? require('../../../static/img/love.png') : require('../../../static/img/whitelove.png')} />
                            </div>
                            <div className="more_dot_icon_wrap">
                                <Link to={{ pathname: `/singer`, state: { singerId: song_detail?song_detail.singerId:null } }} >
                                    <img className="more_dot_icon_people" src={require('../../../static/img/people.png')} />
                                </Link>
                            </div>
                        </div>
                        <div className="more_item_wrap">
                            <img className="more_dot_icon_voice" src={require('../../../static/img/voice.png')} onClick={this.toggleVolume.bind(this)} />
                            <div className="more_dot_voice_bar">
                                <div className="more_dot_voice_now" style={{width: `${(this.state.volume*100)}%`}}></div>
                                <div className="more_dot_voice_dot"
                                    // style={{left: this.state.progress}}
                                    // onTouchStart={this.handleStart.bind(this)}
                                    // onTouchMove={this.handleTouchMove.bind(this)}
                                >
                                </div>
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
                                let play_color='#555'
                                let now_song = this.props.MusicState.song
                                if(now_song.hash === item.hash){
                                    play_color = '#f00'
                                }
                                return <li className="modal_song_item_wrap" key={i}>
                                    <span className="modal_song_name" onClick={this.PlaySong.bind(this,item)} style={{color:play_color}}>{item.filename}</span>
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
                                    let img = 'pause.png'
                                    if(this.props.IsPlayState){
                                        img = 'play.png'
                                    }
                                    return <div key={i} className="item_btn_wrap">
                                        <div key={i} className="item_btn" onClick={this.handleClick.bind(this, i)}>
                                            {
                                                i !== 1 ? <img className="item_img" style={{ transform: `rotateY(${rotate}deg)` }} src={require(`../../../static/img/${item.img}`)} />:
                                                <img className="item_img"src={require(`../../../static/img/${img}`)} />
                                            }
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return null
    }
    }
}
const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        PlayListActions: bindActionCreators(PlayListAction, dispatch),
        LikeSongsActions: bindActionCreators(LikeSongsAction, dispatch),
        MusicActions: bindActionCreators(MusicAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Play); 