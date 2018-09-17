import React, { Component } from 'react';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import { action as RanksAction } from '../index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Rank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank_data: [],
        }
    }
    componentWillMount() {
        this.getData();
    }

    async getData() {
        let { list } = this.props.Ranks
        if (list.length == 0) {
            try {
                let result = await fetch(`/kugou${API.rank}`);
                let data = await result.json();
                let arr = data.rank.list;
                this.setState({ rank_data: arr });
                this.props.RanksActions.RanksAction({ list: arr });
            } catch (err) {
                console.log('Error', err);
            }
        } else {
            this.setState({ rank_data: list });
        }
    }
    render() {
        let { rank_data } = this.state
        return (
            <ul className="rank_wrap">
                {rank_data.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link to={`/rank/${item.rankid}`}>
                                <img className="rank_cover" src={item.imgurl.replace(/\{size\}/g, 400)} />
                                <span>{item.rankname}</span>
                                <img className="rank_right_arrow" src={require('../../../static/img/arrow.png')} />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

const mapStateToProps = (state) => { return state };
const mapDispatchToProps = (dispatch) => {
    return {
        RanksActions: bindActionCreators(RanksAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Rank);