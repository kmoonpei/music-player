import React, { Component } from 'react';
import SearchBar from '../../Search.bar';
import './style.css';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action as HotSearchAction } from '../index';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hot_search: [],
        }
    }

    componentWillMount() {
        this.getHotSearch()
    }
    async getHotSearch() {
        let { list } = this.props.HotSearch
        if (list.length == 0) {
            try {
                let result = await fetch(`/mobilecdn${API.searchHot}?format=json`);
                let data = await result.json();
                this.setState({ hot_search: data.data.info });
                this.props.HotSearchActions.HotSearchAction({ list: data.data.info });
            } catch (err) {
                console.log("Error", err);
            }
        } else {
            this.setState({ hot_search: list })
        }
    }
    render() {
        let { hot_search } = this.state
        return (
            <div>
                <SearchBar is_searchPage={true} />
                <div className="tit_txt">热门搜索</div>
                <div className="hot_wrap">
                    {hot_search.map((item, i) => {
                        return <Link to={{ pathname: `/search/result`, state: { searchValue: item.keyword } }}><div key={i} className="hot_word">{item.keyword}</div></Link>
                    })}
                </div>
                <div className="his_wrap">
                    {this._renderSearchHistory('搜索历史', true)}
                </div>

            </div>
        )
    }

    _renderSearchHistory(txt, flag) {
        return <div className="his_txt_wrap">
            <div className="his_txt">{txt}</div>
            {flag ? <span className="clear_all">清除历史</span > : <a className="delete"></a>}
        </div>
    }

}

const mapStateToProps = (state) => { return state };
const mapDispatchToProps = (dispatch) => {
    return {
        HotSearchActions: bindActionCreators(HotSearchAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Search)