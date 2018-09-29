import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayListAction from '../../components/Play/action';

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.is_rank = this.props.is_rank ? this.props.is_rank : false;//是否有序号
        this.is_remark = this.props.is_remark ? this.props.is_remark : false;//是否有歌曲专辑信息
    }

    addToPlay(item) {
        let old_list = this.props.PlayListState.list
        let new_data = { filename: item.filename, hash: item.hash }
        old_list.push(new_data)
        this.props.PlayListActions.PlayListAction('SavePlayList', { list: old_list })
    }

    render() {
        return (
            <ul className="new_song_wrap">
                {this.props.list.map((item, i) => {
                    return (
                        <li key={i}>
                            <div className="song_item_wrap">
                                {this.is_rank ? <span className="rank_circle">{i + 1}</span> : null}
                                <Link to={{ pathname: '/play', state: item }} onClick={() => { this.addToPlay(item) }} className="song_name_wrap">
                                    <p className="song_name">{item.filename}</p>
                                    {this.is_remark ? <p className="song_album">{item.remark}</p> : null}
                                </Link>
                                <a className="like" onPress={() => { }} />
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        PlayListActions: bindActionCreators(PlayListAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SongList); 