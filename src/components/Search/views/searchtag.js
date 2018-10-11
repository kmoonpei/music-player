import React, { Component } from 'react';
import HeadBar from '../../../common/HeadBar';
import API from '../../../utils/API';
import SongList from '../../../common/SongList';

export class SearchTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songList: [],
        }
    }

    componentWillMount() {
        this.getSong();
    }

    async getSong() {
        let keyword = this.props.location.state.searchValue
        try {
            let result = await fetch(`/mobilecdn/${API.searchResult}?format=json&keyword=${keyword}&page=1&pagesize=20`);
            let data = await result.json();
            this.setState({ songList: data.data.info })
        } catch (err) {
            console.log('Error', err);
        }
    }
    render() {
        let data_arr = this.state.songList.map(item => {
            return {
                filename: `${item.singername} - ${item.songname}`,
                hash: item.hash
            }
        })
        return (
            <div>
                <HeadBar title={this.props.location.state.searchValue} all_in_btn={true} />
                <ul className="new_song_wrap">
                    {data_arr.map((item, i) => {
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