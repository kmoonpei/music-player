import React from 'react';
import './style.css';
import New from './New';
import { SearchBar } from '../../../components/Search.bar';
import { Nav } from '../../../common/Nav';

export default () => {
    return (
        <div>
            <SearchBar />
            <Nav />
            <New />
        </div>
    )
}