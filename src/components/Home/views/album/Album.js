import React, { Component } from 'react';
import API from '../../../../utils/API';
import HeadBar from '../../../../common/HeadBar';
import SongList from '../../../../common/SongList';
import '../style.css';

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

    async getData() {
        try {
            let result = await fetch(`/kugou${API.song_playlist}${this.props.match.params.id}?json=true`);
            let data = await result.json();
            this.setState({ song_list: data.list.list.info,album_info:data.info.list });
        } catch (err) {
            console.log("Error", err);
        }
    }

    render() {
        let { song_list ,album_info} = this.state
        return (
            <div>
                <HeadBar title={'歌单'} />
                <div className="album_info_wrap">
                    <div calssName="album_info_wrap_top">
                        <img src={album_info.imgurl.replace(/\{size\}/g, 400)}/>
                        <div calssName="album_info_txt_wrap">
                            <span>{`名称：${album_info.specialname}`}</span>
                            <span>{`创建人：${album_info.nickname}`}</span>
                            <span>{`更新时间：${album_info.publishtime}`}</span>
                        </div>
                    </div>
                    <div calssName="all_in_wrap">
                        <p>播放全部</p>
                        <a/>
                    </div>
                </div>
                <SongList
                    list={song_list}
                    is_remark={true}
                />
            </div>
        )
    }
}