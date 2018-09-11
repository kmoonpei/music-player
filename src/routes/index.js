import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { view as Home } from '../components/Home';
import { view as Rank } from '../components/Rank';
import { view as New } from '../components/New';
import { view as Artists } from '../components/Artists';
import { SearchBar } from '../components/Search.bar';
import { Nav } from '../common/Nav';

const Routes = () => (
    <Router >
        <div>
            <SearchBar />
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/new" component={New} />
                <Route path="/rank" component={Rank} />
                <Route path="/artists" component={Artists} />
            </Switch>
        </div>
    </Router >
)
export default Routes;