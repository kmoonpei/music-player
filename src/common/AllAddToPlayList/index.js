import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayListAction from '../../components/Play/action';

class AllToPlayList extends Component {
    constructor(props) {
        super(props);
        this.addAllToPlayList = this.addAllToPlayList.bind(this);
    }

    addAllToPlayList() {
        let old_list = this.props.PlayListState.list
        let hash_arr = this.props.list.map((item) => {
            return { hash: item.hash, filename: item.filename }
        })
        old_list.forEach(element => {
            hash_arr.forEach(ele => {
                if (element.hash === ele.hash) {
                    hash_arr[ele] = null
                }
            });
        });
        let new_list = hash_arr.map((ele) => {
            if (ele !== null) {
                return ele
            }
        })
        new_list = old_list.concat(new_list)
        this.props.PlayListActions.PlayListAction('SavePlayList', { list: new_list })
    }

    render() {
        return (
            <div className="all_in_wrap">
                <p>播放全部</p>
                <a onClick={this.addAllToPlayList} />
            </div>
        )
    }

}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        PlayListActions: bindActionCreators(PlayListAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AllToPlayList); 