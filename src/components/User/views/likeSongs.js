import React, { Component } from 'react';
import HeadBar from '../../../common/HeadBar';
import { Link } from 'react-router-dom';
import API from '../../../utils/API';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayListAction from '../../../components/Play/action';
import * as LikeSongsAction from '../../../components/Play/likeSongs.action';
class LikeSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like_songs_list: []
        };

    }
    componentWillMount() {
        let { list } = this.props.LikeSongsListState
        this.setState({ like_songs_list: list })
    }
    addToPlay(item) {
        let old_list = this.props.PlayListState.list
        let new_data = { filename: item.filename, hash: item.hash }
        let tag = true
        old_list.forEach(element => {
            if(element.hash==item.hash){
                tag = false;
                return
            }
        });
        if(tag){
            old_list.push(new_data)
            this.props.PlayListActions.PlayListAction('SavePlayList', { list: old_list })
        }
    }
    deleteLikeSong(i) {
        let old_list = this.state.like_songs_list
        old_list.splice(i, 1)
        this.setState({ like_songs_list: old_list })
        this.props.LikeSongsActions.LikeSongsAction('LikeSongs', { list: old_list })
    }
    render() {
        let { like_songs_list } = this.state
        return (
            <div>
                <HeadBar title={`收藏列表（${like_songs_list.length}首）`} />
                <ul className="new_song_wrap">
                    {like_songs_list.map((item, i) => {
                        return (
                            <li key={i}>
                                <div className="song_item_wrap">
                                    <Link to={{ pathname: '/play', state: item }} onClick={this.addToPlay.bind(this, item)} className="song_name_wrap">
                                        <p className="song_name">{item.filename}</p>
                                    </Link>
                                    <img className="delet_like" src={require('../../../static/img/delete.png')} onClick={this.deleteLikeSong.bind(this, i)} />
                                </div>
                            </li>
                        )
                    })}
                </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(LikeSongs); 