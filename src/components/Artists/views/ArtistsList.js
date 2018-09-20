import React, { Component } from 'react';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import HeadBar from '../../../common/HeadBar';

export class ArtistsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singer_data: [],
            classname: '',
        }
    }
    componentWillMount() {
        this.getData();
    }

    async getData() {
        try {
            let result = await fetch(`/kugou${API.singer_list}${this.props.match.params.id}?json=true`);
            let data = await result.json();
            this.setState({
                singer_data: data.singers.list.info,
                classname: data.classname
            });
        } catch (err) {
            console.log('Error', err);
        }
    }
    render() {
        let { singer_data, classname } = this.state
        return (
            <div>
                <HeadBar title={classname} />
                <ul className="singers_wrap">
                    {singer_data.map((item, i) => {
                        let img_url = item.imgurl.replace(/\{size\}/g, 400)
                        return (
                            <li key={i} className="singer_item_wrap">
                                <Link to={{ pathname: `/artists/list/singersongs/${item.singerid}`, state: { singerimg: img_url, singername: item.singername } }}>
                                    <img className="singer_img" src={img_url} />
                                    <span>{item.singername}</span>
                                    <img className="right_arrow_icon" src={require('../../../static/img/arrow.png')} />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}