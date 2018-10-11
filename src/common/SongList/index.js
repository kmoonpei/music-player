import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayListAction from '../../components/Play/action';
import * as LikeSongsAction from '../../components/Play/likeSongs.action';


class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_like: false,
        }
        this.is_rank = this.props.is_rank ? this.props.is_rank : false;//是否有序号
        this.is_remark = this.props.is_remark ? this.props.is_remark : false;//是否有歌曲专辑信息
    }

    componentWillMount() {
        let { item } = this.props
        let { list } = this.props.LikeSongsListState
        let tag = false
        list.forEach(element => {
            if (element.hash == item.hash) {
                tag = true
                return
            }
        });
        this.setState({ is_like: tag })
    }
    addToPlay(item) {
        let old_list = this.props.PlayListState.list
        let new_data = { filename: item.filename, hash: item.hash }
        old_list.push(new_data)
        this.props.PlayListActions.PlayListAction('SavePlayList', { list: old_list })
    }
    addLikeSongList(item) {
        let { is_like } = this.state
        let { list } = this.props.LikeSongsListState
        let arr = list
        this.setState({ is_like: !is_like })
        if (is_like) {
            arr = list.map((it) => {
                if (item.hash !== it.hash) {
                    return it
                }
            })
        } else {
            arr.push({ filename: item.filename, hash: item.hash })
        }
        this.props.LikeSongsActions.LikeSongsAction('LikeSongs', { list: arr })
    }
    render() {
        let { item, i } = this.props
        let { is_like } = this.state
        return (
            <div className="song_item_wrap">
                {this.is_rank ? <span className="rank_circle">{i + 1}</span> : null}
                <Link to={{ pathname: '/play', state: item }} onClick={this.addToPlay.bind(this, item)} className="song_name_wrap">
                    <p className="song_name">{item.filename}</p>
                    {this.is_remark ? <p className="song_album">{item.remark}</p> : null}
                </Link>
                <img className="like" onClick={this.addLikeSongList.bind(this, item)} src={is_like ? require('../../static/img/love.png') : require('../../static/img/notlove.png')} />
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
export default connect(mapStateToProps, mapDispatchToProps)(SongList); 