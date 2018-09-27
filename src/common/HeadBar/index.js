import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    render() {
        return (
            <div className="headbar_wrap" style={{ backgroundColor: this.props.only_back ? 'none' : '#209fe9' }}>
                <img className="back_btn" src={require('../../static/img/left_arrow.png')} onClick={this.goBack} />
                {this.props.only_back ? null : <span>{this.props.title}</span>}
                {this.props.all_in_btn ? <img className="search_all_in" src={require('../../static/img/all_in_0.png')} /> : null}
            </div>
        )
    }

    goBack() {
        window.history.back();
    }
}