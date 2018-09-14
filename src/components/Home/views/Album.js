import React, { Component } from 'react';
import API from '../../../utils/API';
import HeadBar from '../../../common/HeadBar';
import SongList from '../../../common/SongList';
import AllAddToPlayList from '../../../common/AllAddToPlayList';
import './style.css';

export class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song_list: [],
            album_info: {},
        }

    }

    componentWillMount() {
        this.getData()
    }
    timeFormat(publishtime) {
        return `${publishtime}`.slice(0, 10);
    }
    async getData() {
        try {
            let result = await fetch(`/kugou${API.song_playlist}${this.props.match.params.id}?json=true`);
            let data = await result.json();
            this.setState({
                song_list: data.list.list.info,
                album_info: data.info.list
            });
        } catch (err) {
            console.log("Error", err);
        }
    }

    render() {
        let { song_list, album_info } = this.state
        let cover_imgurl = `${album_info.imgurl}`.replace(/\{size\}/g, 400)
        return (
            <div>
                <HeadBar title={'歌单'} />
                <div className="album_info_wrap" >
                    <div className="cover_bg" style={{ backgroundImage: `url(${cover_imgurl})` }}></div>
                    <div className="album_info_wrap_top">
                        <img src={cover_imgurl} />
                        <div className="album_info_txt_wrap">
                            <p>{`名称：${album_info.specialname}`}</p>
                            <p>{`创建人：${album_info.nickname}`}</p>
                            <p>{`更新时间：${this.timeFormat(album_info.publishtime)}`}</p>
                        </div>
                    </div>
                    <AllAddToPlayList />
                </div>
                <SongList
                    list={song_list}
                    is_remark={true}
                />
            </div>
        )
    }
}