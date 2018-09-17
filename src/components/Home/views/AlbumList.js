import React, { Component } from 'react';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import HeadBar from '../../../common/HeadBar';
import { connect } from 'react-redux';


class AlbumList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommends: [],
        }

    }

    componentWillMount() {
        this.getData();
    }

    async getData() {
        this.setState({ recommends: this.props.AlbumsList.list })
    }

    render() {
        let { recommends } = this.state
        return (
            <div>
                <HeadBar title={'精选歌单'} />
                <ul className="reconmmed_ul">
                    {recommends.map((item, i) => {
                        return this.renderItem(item, i)
                    })}
                </ul>
            </div >
        )
    }
    renderItem = (item, i) => {
        return (
            <li key={item.specialid} className="recmmend_li">
                <a>
                    <Link to={`/album/${item.specialid}`} >
                        <img src={item.imgurl.replace(/\{size\}/g, 400)} />
                        <p >{item.intro}</p>
                        <div >
                            <img src={require("../../../static/img/headset.png")} />
                            <span >{`${(item.playcount / 10000).toFixed(2)}万`}</span>
                        </div>
                    </Link>
                </a>
            </li>
        )
    }
}

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(AlbumList);