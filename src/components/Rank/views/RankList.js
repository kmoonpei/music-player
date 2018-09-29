import React, { Component } from 'react';
import API from '../../../utils/API';
import HeadBar from '../../../common/HeadBar';
import SongList from '../../../common/SongList';
import AllAddToPlayList from '../../../common/AllAddToPlayList';
import './style.css';

export class RankList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song_list: [],
            rank_info: {},
            update_time: null,
        }

    }

    componentWillMount() {
        this.getData()
    }
    timeFormat(timestamp) {
        let a = new Date(timestamp * 1000);
        return `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
    }
    async getData() {
        try {
            let result = await fetch(`/kugou${API.rank_list}?rankid=${this.props.match.params.id}&page=1&json=true`);
            let data = await result.json();
            this.setState({
                song_list: data.songs.list,
                rank_info: data.info,
                update_time: data.songs.timestamp
            });
        } catch (err) {
            console.log("Error", err);
        }
    }

    render() {
        let { song_list, rank_info, update_time } = this.state
        let cover_imgurl = `${rank_info.banner7url}`.replace(/\{size\}/g, 400)
        return (
            <div>
                <HeadBar title={rank_info.rankname} />
                <div className="rank_info_wrap_top" style={{ backgroundImage: `url(${cover_imgurl})` }}>
                    <p>{`更新时间：${this.timeFormat(update_time)}`}</p>
                </div>
                <AllAddToPlayList list={song_list}/>
                <SongList
                    list={song_list}
                    is_rank={true}
                />
            </div>
        )
    }
}