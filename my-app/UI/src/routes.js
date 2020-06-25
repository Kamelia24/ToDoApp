import React, { Component } from "react";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/SignUp" exact component={SignUp} />
                    <Route path="/SignIn" component={SignIn} />
                    <Route path="/home" component={HomePage} />
                </Switch>
            </Router>
        )
    }
}