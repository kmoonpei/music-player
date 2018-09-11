import React, { Component } from 'react';
import './style.css';
import Banner from './Banner';
import MoreRecommend from './MoreRecommend'

export default () => {
    return (
        <div classNmae="img_wrap">
            <Banner />
            <MoreRecommend />
        </div>
    )
}