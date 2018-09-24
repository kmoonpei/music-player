import React from 'react';
import './style.css';
import Banner from './Banner';
import MoreRecommend from './MoreRecommend';
import SearchBar from '../../../components/Search.bar';
import { Nav } from '../../../common/Nav';

export default () => {
    return (
        <div classNmae="img_wrap">
            <SearchBar />
            <Nav active_num={1} />
            <Banner />
            <MoreRecommend />
        </div>
    )
}