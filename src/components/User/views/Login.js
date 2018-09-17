import React, { Component } from 'react';
import HeadBar from '../../../common/HeadBar';
import './style.css';
import { action as LoginAction } from '../index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pwd: '',
            show_toast: false,
        }
        this.login = this.login.bind(this);
        this.setName = this.setName.bind(this);
        this.setPwd = this.setPwd.bind(this);

    }
    login() {
        let { name, pwd } = this.state;
        if (name || pwd) {
            this.props.loginActions.LoginAction({ status: 'logIn', name: name, pwd: pwd });
        } else {
            this.setState({ show_toast: true });
        }
    }
    setName(e) {
        let value = e.target.value;
        this.setState({ name: value });
    }
    setPwd(e) {
        let value = e.target.value;
        this.setState({ pwd: value });
    }
    render() {
        let { show_toast } = this.state
        return (
            <div>
                <HeadBar title={'登录'} />
                <div className="logo_wrap">
                    <img className="logo_icon" src={require("../../../static/img/logo_large.png")} />
                </div>
                <div className="input_wrap">
                    <img className="input_icon" src={require('../../../static/img/me.png')} />
                    <input type="text" className="input" placeholder="请输入用户名" onChange={this.setName} />
                </div>
                <div className="input_wrap">
                    <img className="input_icon" src={require('../../../static/img/pwd.png')} />
                    <input type="text" className="input" placeholder="请输入密码" onChange={this.setPwd} />
                </div>
                <div className="login" onClick={this.login}>登录</div>
                {show_toast ? <div className="toast" onClick={this.login}>要输入用户名或密码才能登录哦 ☺</div> : null}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginActions: bindActionCreators(LoginAction, dispatch),
    }
};
const mapStateToProps = (state) => (state);

export default connect(mapStateToProps, mapDispatchToProps)(Login);