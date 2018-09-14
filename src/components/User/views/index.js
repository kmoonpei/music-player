import React, { Component } from 'react';
import { Login } from './Login';
import { Me } from './Me';

export class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logined: true,//是否登录
        }
    }

    render() {
        let { logined } = this.state
        return logined ? <Me /> : <Login />
    }
}