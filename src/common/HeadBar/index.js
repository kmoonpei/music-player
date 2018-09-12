import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="headbar_wrap">
                <img src={require('../../static/img/left_arrow.png')} />
                <span>{this.props.title}</span>
            </div>
        )
    }
}