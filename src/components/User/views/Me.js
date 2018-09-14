import React, { Component } from 'react';
import HeadBar from '../../../common/HeadBar';
import './style.css';

export class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <HeadBar title={'个人中心'} />
                <div className="logo_wrap">
                    <img className="logo_icon" src={require("../../../static/img/rechal.jpg")} />
                </div>
                
            </div>
        )
    }
}