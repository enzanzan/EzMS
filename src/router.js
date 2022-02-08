import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Login from './pages/home/login';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import NoMatch from './pages/nomatch';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages';

export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notice} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                </App>
            </HashRouter>
        )
    }
}
