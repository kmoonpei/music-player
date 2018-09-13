import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    render() {
        return (
            <div className="headbar_wrap">
                <img src={require('../../static/img/left_arrow.png')} onClick={this.goBack} />
                <span>{this.props.title}</span>
            </div>
        )
    }

    goBack() {
        window.history.back();
    }
}