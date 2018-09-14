import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { view as Home } from '../components/Home';
import { view as Rank } from '../components/Rank';
import { view as New } from '../components/New';
import { view as Artists } from '../components/Artists';
import { SearchBar } from '../components/Search.bar';
import { Nav } from '../common/Nav';
import { Album } from '../components/Home/views/Album';
import { AlbumList } from '../components/Home/views/AlbumList';
import { RankList } from '../components/Rank/views/RankList';
import { User } from '../components/User/views';

const Routes = () => (
    <Router >
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/new" component={New} />
                <Route path="/rank" exact component={Rank} />
                <Route path="/rank/:id" component={RankList} />
                <Route path="/artists" component={Artists} />
                <Route path="/album" exact component={AlbumList} />
                <Route path="/album/:id" component={Album} />
                <Route path="/user" component={User} />

            </Switch>
        </div>
    </Router >
)
export default Routes;