import React, { Component } from 'react';
import API from '../../../utils/API';
import SongList from '../../../common/SongList';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new_songs: [],
        }
    }

    componentWillMount() {
        this.getData();
    }

    async getData() {
        try {
            let result = await fetch(`/kugou${API.new_banner}`);
            let data = await result.json();
            this.setState({ new_songs: data.data });
        } catch (err) {
            console.log('Error', err);
        }
    }

    render() {
        let { new_songs } = this.state
        return (
            <ul className="new_song_wrap">
                {new_songs.map((item, i) => {
                    return (
                        <li key={i}>
                            <SongList item={item} i={i} />
                        </li>
                    )
                })}
            </ul>
        )
    }
}