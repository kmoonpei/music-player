import React, { Component } from 'react';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action as ArtistsAction } from '../index';

class Artists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist_class_data: [],
        }
    }
    componentWillMount() {
        this.getData();
    }

    async getData() {
        let { list } = this.props.Artists
        if (list.length == 0) {
            try {
                let result = await fetch(`/kugou${API.artist_class}`);
                let data = await result.json();
                let arr = data.list;
                this.setState({ artist_class_data: arr });
                this.props.ArtistsActions.ArtistsAction({ list: arr })
            } catch (err) {
                console.log('Error', err);
            }
        } else {
            this.setState({ artist_class_data: list });
        }
    }
    render() {
        let { artist_class_data } = this.state
        return (
            <ul className="artist_class_wrap">
                {artist_class_data.map((item, i) => {
                    return (
                        <li key={i} className="class_li">
                            <Link to={`/artists/list/${item.classid}`}>
                                <span>{item.classname}</span>
                                <img src={require('../../../static/img/arrow.png')} />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        ArtistsActions: bindActionCreators(ArtistsAction, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Artists);