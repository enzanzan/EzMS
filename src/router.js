import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Login from './pages/home/login';
import Buttons from './pages/ui/buttons';
import NoMatch from './pages/nomatch';

export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Route path="/admin/ui/buttons" component={Buttons} />
                            <Route component={NoMatch} />
                        </Admin>
                    } />
                </App>
            </HashRouter>
        )
    }
}
