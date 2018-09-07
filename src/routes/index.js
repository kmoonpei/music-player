import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { view as Home } from '../components/Home';
import { view as Rank } from '../components/Rank';

const Routes = () => (
    <div>
        <Router>
            <div>
                <ul className="nav">
                    <li>
                        <Link to="/">个性推荐</Link>
                    </li>
                    <li>
                        <Link to="/rank">排行榜</Link>
                    </li>
                </ul>

                <hr />

                <Route exact path="/" component={Home} />
                <Route path="/rank" component={Rank} />
            </div>
        </Router>
    </div>
)
export default Routes;