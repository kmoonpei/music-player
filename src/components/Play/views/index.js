import React, { Component } from 'react';
import API from '../../../utils/API';

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
            this.setState({ song_detail: data })
        } catch (err) {
            console.log('Error', err)
        }
    }
    render() {
        let { song_detail } = this.state
        let albumImg = song_detail.imgUrl.replace(/\{size\}/g, 400)
        return (
            <div className="play_container">
                <div className="container_bg" style={{ backgroundImage: `url(${albumImg})` }}></div>
            </div>
        )
    }
}