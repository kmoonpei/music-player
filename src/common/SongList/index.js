import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.is_rank = this.props.is_rank ? this.props.is_rank : false;
        this.is_remark = this.props.is_remark ? this.props.is_remark : false;
    }

    render() {
        return (
            <ul className="new_song_wrap">
                {this.props.list.map((item, i) => {
                    return (
                        <li key={i}>
                            <div className="song_item_wrap">
                                {this.is_rank ? <span className="rank_circle">{i + 1}</span> : null}
                                <div className="song_name_wrap">
                                    <p className="song_name">{item.filename}</p>
                                    {this.is_remark ? <p className="song_album">{item.remark}</p> : null}
                                </div>
                                <a />
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}