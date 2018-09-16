import React, { Component } from 'react';
import HeadBar from '../../../common/HeadBar';
import './style.css';
import { action as LoginAction } from '../index';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.login = this.login.bind(this);
    }
    login() {
        this.props.dispatch(LoginAction('LOGIN', 'logIn'));
    }
    render() {
        return (
            <div>
                <HeadBar title={'登录'} />
                <div className="logo_wrap">
                    <img className="logo_icon" src={require("../../../static/img/logo_large.png")} />
                </div>
                <div className="input_wrap">
                    <img className="input_icon" src={require('../../../static/img/me.png')} />
                    <input type="text" className="input" placeholder="请输入用户名" />
                </div>
                <div className="input_wrap">
                    <img className="input_icon" src={require('../../../static/img/pwd.png')} />
                    <input type="text" className="input" placeholder="请输入密码" />
                </div>
                <div className="login" onPress={this.login}>登录</div>
            </div>
        )
    }
}

