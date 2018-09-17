import React, { Component } from 'react';
import HeadBar from '../../../common/HeadBar';
import './style.css';
import { connect } from 'react-redux';

class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <HeadBar title={'个人中心'} />
                <div className="avatar_wrap">
                    <img className="logo_icon" src={require("../../../static/img/rechal.jpg")} />
                    <p>{`当前用户：${this.props.loginState.name}`}</p>
                </div>
                <div className="item_wrap">
                    <span>我的收藏列表</span>
                    <img src={require('../../../static/img/arrow.png')} />
                </div>
                <div className="item_wrap">
                    <span>开发者：kmoonpei</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => { return state };

export default connect(mapStateToProps)(Me);