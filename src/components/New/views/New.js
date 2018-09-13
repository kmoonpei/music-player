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
            <SongList
                list={new_songs} />
        )
    }
}