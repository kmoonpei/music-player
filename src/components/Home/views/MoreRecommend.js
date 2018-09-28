import React, { Component } from 'react';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action as AlbumsAction } from '../index';

class MoreRecommends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommends: [],
        }

    }

    componentWillMount() {
        this.getData();
    }

    async getData() {
        let { list } = this.props.AlbumsList;
        if (list.length == 0) {
            try {
                let result = await fetch(`/kugou${API.recommend}`);//获取推荐专辑
                let data = await result.json();
                let arr = data.plist.list.info;
                let showArr = arr.slice(0, 12);
                this.setState({ recommends: showArr });
                this.props.getAlbumsActions.AlbumsAction({ list: arr })

            } catch (err) {
                console.log('Error', err);
            }
        } else {
            let showArr = list.slice(0, 12);
            this.setState({ recommends: showArr });
        }

    }

    render() {
        let { recommends } = this.state
        return (
            <div>
                <div className="more_wrap">
                    <span className="more_txt">更多推荐</span>
                    <Link to={`/album`}>
                        <a className="arrow_right" />
                    </Link>
                </div>
                <hr />
                <ul className="reconmmed_ul">
                    {recommends.map((item, i) => {
                        return this.renderItem(item, i)
                    })}
                </ul>
            </div >
        )
    }
    renderItem = (item, i) => {
        return (
            <li key={item.specialid} className="recmmend_li">
                <a>
                    <Link to={`/album/${item.specialid}`} >
                        <img src={item.imgurl.replace(/\{size\}/g, 400)} />
                        <p >{item.intro}</p>
                        <div >
                            <img src={require("../../../static/img/headset.png")} />
                            <span >{`${(item.playcount / 10000).toFixed(2)}万`}</span>
                        </div>
                    </Link>
                </a>
            </li>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumsActions: bindActionCreators(AlbumsAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MoreRecommends);