import React, { Component } from "react";
import ReactPlayer from "react-player";
import API from "../../../utils/API";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MusicAction from '../music.action';
import * as localStore from '../../../utils/localStorage';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onEnd=this.onEnd.bind(this);
    this.onDuration = this.onDuration.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  componentDidMount() {
    this.props.MusicActions.audioObj({player: this.player});
  }

  onDuration(e) {
    localStore.setItem('duration', e);
  }

  onProgress(state) {
    const currentLyrics = this.props.MusicState.song.lyrics;
    this.props.MusicActions.Progress({currentTime: state.playedSeconds, percentage: state.played});
    if(currentLyrics){
      for (let i = 0, l = currentLyrics.length; i < l; i++) {
        if (state.playedSeconds > currentLyrics[i][0]) {
            //显示到页面
            // lyricContainer.textContent = that.lyric[i][1];
            this.props.MusicActions.UpdataLyric({updateLyrics: currentLyrics[i][1], time: currentLyrics[i][0], index: i});
        }
      }
    }
  }

  onEnd(){
    let now_song = this.props.MusicState.song.hash
    let play_list = this.props.PlayListState.list
    console.log('播放列表：',play_list)
   console.log('需替换歌曲：',now_song)
    
    let tag 
    play_list.forEach((element,i) => {
      if(element.hash==now_song){
        if(i === play_list.length - 1){
          tag = 0
        }else{
          tag = i + 1
        }
      }
    });
    let new_song_hash=play_list[tag].hash
    if (window.location.pathname === '/play/') {
        const reg = new RegExp(window.location.href.split('#')[1]);
        const url = window.location.href.replace(reg, new_song_hash);
        window.location.replace(url);
    }
    this.props.MusicActions.FetchMusic(new_song_hash,this.props.LikeSongsListState.list)
  }

  render() {
  let currentSong = this.props.MusicState.song;
  let volume = this.props.VolumeState
  let is_play = this.props.IsPlayState
  console.log('当前播放歌曲：',currentSong)
	console.log('声量：',volume)
  
    return (
      <div style={{ display: "none" }}>
        <ReactPlayer 
          volume={volume ? volume : 0.5} 
          url={currentSong ? currentSong.url : null}
          controls
          playing={is_play}
          onEnded={this.onEnd}
          ref={player => {
            this.player = player
          }}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => {
    return {
      MusicActions: bindActionCreators(MusicAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Player);
