import React, { Component } from 'react';
import Login from './Login';
import Me from './Me';
import { connect } from 'react-redux';



class User extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        console.log(this.props.loginState)
        return this.props.loginState.status == 'logIn' ? <Me /> : <Login />
    }
}

const mapStateToProps = (state) => { return state };

export default connect(mapStateToProps)(User);