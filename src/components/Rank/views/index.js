import React from 'react';
import './style.css';
import Rank from './Rank';
import SearchBar from '../../../components/Search.bar';
import { Nav } from '../../../common/Nav';


export default () => {
    return (
        <div>
            <SearchBar />
            <Nav active_num={3} />
            <Rank />
        </div>
    )
}