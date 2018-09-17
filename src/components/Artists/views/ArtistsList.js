import React, { Component } from 'react';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import HeadBar from '../../../common/HeadBar';

export class ArtistsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singer_data: [],
        }
    }
    componentWillMount() {
        this.getData();
    }

    async getData() {
        try {
            let result = await fetch(`/kugou${API.singer_list}${this.props.match.params.id}?json=true`);
            let data = await result.json();
            this.setState({ singer_data: data.singers.list.info });
        } catch (err) {
            console.log('Error', err);
        }
    }
    render() {
        let { singer_data } = this.state
        return (
            <div>
                <HeadBar title={'热门歌手'} />
                <ul className="singers_wrap">
                    {singer_data.map((item, i) => {
                        return (
                            <li key={i} className="singer_item_wrap">
                                {/* <Link to={`/artists/list${item.classid}`}> */}
                                <a>
                                    <img className="singer_img" src={`${item.imgurl.replace(/\{size\}/g, 400)}`} />
                                    <span>{item.singername}</span>
                                    <img className="right_arrow_icon" src={require('../../../static/img/arrow.png')} />
                                </a>
                                {/* </Link> */}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}