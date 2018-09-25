import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { view as Home } from '../components/Home';
import { view as Rank } from '../components/Rank';
import { view as New } from '../components/New';
import { view as Artists } from '../components/Artists';
import { SearchBar } from '../components/Search.bar';
import { Nav } from '../common/Nav';
import { Album } from '../components/Home/views/Album';
import AlbumList from '../components/Home/views/AlbumList';
import { RankList } from '../components/Rank/views/RankList';
import { view as User } from '../components/User';
import { ArtistsList } from '../components/Artists/views/ArtistsList';
import { SingerSongs } from '../components/Artists/views/SingerSongs';
import { Search } from '../components/Search/views';
import { SearchTag } from '../components/Search/views/searchtag';
import { Play } from '../components/Play/views';

const Routes = () => (
    <Router >
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/new" component={New} />
                <Route path="/rank" exact component={Rank} />
                <Route path="/rank/:id" component={RankList} />
                <Route path="/artists" exact component={Artists} />
                <Route path='/artists/list/:id' exact component={ArtistsList} />
                <Route path='/artists/list/singersongs/:id' component={SingerSongs} />
                <Route path="/album" exact component={AlbumList} />
                <Route path="/album/:id" component={Album} />
                <Route path="/user" component={User} />
                <Route path="/search" exact component={Search} />
                <Route path="/search/result" component={SearchTag} />
                <Route path="/play" component={Play} />


            </Switch>
        </div>
    </Router >
)
export default Routes;