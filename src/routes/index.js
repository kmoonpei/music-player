import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { view as Home } from '../components/Home';
import { view as Rank } from '../components/Rank';
import { view as New } from '../components/New';
import { view as Artists } from '../components/Artists';
import { SearchBar } from '../components/Search.bar';


const Routes = () => (
    <Router >
        <div>
            <SearchBar />
            <ul className="nav">
                <li>
                    <Link to="/">个性推荐</Link>
                </li>
                <li>
                    <Link to="/new">新歌</Link>
                </li>
                <li>
                    <Link to="/rank">排行榜</Link>
                </li>
                <li>
                    <Link to="/artists">歌手</Link>
                </li>
            </ul>
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