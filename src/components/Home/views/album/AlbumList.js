import React, { Component } from 'react';
import API from '../../../../utils/API';
import HeadBar from '../../../../common/HeadBar';

export class AlbumList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommends: [],
        }

    }

    render() {
        let { recommends } = this.state
        console.log(recommends)
        return (
            // <ul className="reconmmed_ul">
            //     {recommends.map((item, i) => {
            //         return (
            //             <li key={item.specialid} className="recmmend_li">
            //                 <a>
            //                     <img src={item.imgurl.replace(/\{size\}/g, 400)} />
            //                     <p >{item.intro}</p>
            //                     <div >
            //                         <img src={require("../../../static/img/headset.png")} />
            //                         <span >{`${(item.playcount / 10000).toFixed(2)}万`}</span>
            //                     </div>
            //                 </a>
            //             </li>
            //         )
            //     })}
            // </ul>
            <div>
                <HeadBar title={'歌单'}/>
            </div>
        )
    }
}