import React, { Component } from 'react';
import SearchBar from '../../Search.bar';
import './style.css';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action as HotSearchAction } from '../index';
import * as localStore from '../../../utils/localStorage';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hot_search: [],
            edit_word: '',//搜索的内容
            history: localStorage.getItem('Search_words_history') ? localStorage.getItem('Search_words_history').split(',') : [],
        }
        this.setEditValue = this.setEditValue.bind(this)
        this.handleKeydown = this.handleKeydown.bind(this)
        this.search = this.search.bind(this)
        this.saveToHistory = this.saveToHistory.bind(this)
        this.clearOne = this.clearOne.bind(this)
        this.clearAll = this.clearAll.bind(this)
    }

    componentWillMount() {
        this.getHotSearch()
    }

    goBack() {
        window.history.back();
    }

    setEditValue(e) {
        this.setState({ edit_word: e.target.value });
    }
    //删除单个历史记录
    clearOne(i) {
        let local_words = localStorage.getItem('Search_words_history').split(',');
        local_words.splice(i, 1);
        this.props.HotSearchActions.HotSearchAction('SEARCHWORD', { search_words: local_words });
        localStore.setItem('Search_words_history', local_words);
        this.setState({ history: local_words });
    }

    //清楚所有历史记录
    clearAll() {
        this.props.HotSearchActions.HotSearchAction('SEARCHWORD', { search_words: [] });
        localStore.setItem('Search_words_history', []);
        this.setState({ history: [] });
    }

    handleKeydown(e) {
        e.keyCode === 13 && this.search();
    }

    //搜索
    search() {
        let edit_word = this.state.edit_word.trim();
        if (edit_word) {
            console.log('history', this.props.history)
            this.props.history.push({ pathname: '/search/result', state: { searchValue: edit_word } });
            this.saveToHistory(edit_word)
        }
    }

    //再次搜索
    searchAgin(word) {
        this.props.history.push({ pathname: '/search/result', state: { searchValue: word } });
    }
    //刷新本地存储和sate数据
    saveToHistory(edit_word) {
        let { history } = this.state
        if (!history.includes(edit_word)) {
            history.push(edit_word);
            this.props.HotSearchActions.HotSearchAction('SEARCHWORD', { search_words: history });
            // setTimeout(() => {
            localStore.setItem('Search_words_history', history);
            // }, 0)
        }

    }


    async getHotSearch() {
        let { list } = this.props.HotSearch
        if (list.length == 0) {
            try {
                let result = await fetch(`/mobilecdn${API.searchHot}?format=json`);
                let data = await result.json();
                this.setState({ hot_search: data.data.info });
                this.props.HotSearchActions.HotSearchAction('HOTWORD', { list: data.data.info });
            } catch (err) {
                console.log("Error", err);
            }
        } else {
            this.setState({ hot_search: list })
        }
    }

    render() {
        let { hot_search, history } = this.state
        return (
            <div>
                <div className="search_bar">
                    <img className="back_img"
                        src={require('../../../static/img/left_arrow.png')}
                        onClick={this.goBack} />
                    <div className="search_wrap">
                        <a className="search_icon" />
                        <input type="text" className="input" placeholder="请输入关键字"
                            onChange={this.setEditValue}
                            onKeyDown={this.handleKeydown} />
                    </div>
                    <div className="search_txt" onClick={this.search}>搜索</div>
                </div>
                <div className="tit_txt">热门搜索</div>
                <div className="hot_wrap">
                    {hot_search.map((item, i) => {
                        return <Link to={{ pathname: `/search/result`, state: { searchValue: item.keyword } }}>
                            <div key={i} className="hot_word" onClick={() => this.saveToHistory(item.keyword)}>{item.keyword}</div>
                        </Link>
                    })}
                </div>
                <div className="his_wrap">
                    {this._renderSearchHistory('搜索历史', true)}
                    {history.map((item, i) => {
                        return this._renderSearchHistory(item, false, i)
                    })}
                </div>

            </div>
        )
    }

    _renderSearchHistory(txt, flag, i) {
        return <div key={i} className="his_txt_wrap">
            <div className="his_txt" onClick={() => this.searchAgin(txt)}>{txt}</div>
            {flag ? <span className="clear_all" onClick={this.clearAll}>清除历史</span > :
                <a onClick={() => this.clearOne(i)} className="delete"></a>}
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