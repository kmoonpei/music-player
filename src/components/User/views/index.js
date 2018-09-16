import React, { Component } from 'react';
import { Login } from './Login';
import { Me } from './Me';
import { connect } from 'react-redux';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logined: false,//是否登录
        }
    }
    componentWillReceiveProps(props){
        alert(`登录状态：${props.login_status}`)
        
    }

    render() {
        // alert(`登录状态：${this.props.login_status}`)
        let { logined } = this.state
        return this.props.login_status == "logIn" ? <Me /> : <Login />
    }
}

const mapStateTopProps = (state) => ({
    login_status: state.loginState.status,
})

export default connect(mapStateTopProps)(User);