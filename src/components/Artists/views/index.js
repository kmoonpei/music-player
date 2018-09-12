import React, { Component } from 'react';
import './style.css';
import Artists from './Artists';
import { SearchBar } from '../../../components/Search.bar';
import { Nav } from '../../../common/Nav';

export default () => {
    return (
        <div>
            <SearchBar />
            <Nav />
            <Artists />
        </div>
    )
}