import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import NavLayout from '@/components/NavLayout';
import Major from './page/Major';
import Post from './page/Post/index';
import Login from './page/Login';
import GlobalStyle from './theme/global';

import { Provider } from 'react-redux';
import { store } from './model/store.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from '@material-ui/styles';
import { materialTheme } from './theme/global';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            fliter: '',
        };
        this.setToken = this.setToken.bind(this);
    }

    setToken(token) {
        Cookies.set('adminToken', token, { expires: 7 });
        const set = new Promise((resolve) => {
            this.setState({ token: token });
            resolve();
        });
        set.then((resolve) => {
            location.href = '/#/admin/major';
        });
    }

    oldRouter() {
        return (
            <>
                {' '}
                <Route exact path="/" component={Home} />
                <Layout
                    onChange={(fliter) => {
                        this.setState({ fliter: fliter });
                    }}
                >
                    <Route
                        path="/comment"
                        render={(props) => <Comment {...props} />}
                    />
                    <Route path="/post" component={PostNew} />
                    <Route
                        path="/QA/:id"
                        render={(props) => (
                            <QANew {...props} fliter={this.state.fliter} />
                        )}
                    />
                    <Route
                        path="/admin/comment"
                        render={(props) => (
                            <Comment {...props} isAdmin={true} />
                        )}
                    />
                    <Route path="/old/post" component={Post} />

                    <Route
                        path="/old/QA/:id"
                        render={(props) => (
                            <QA {...props} fliter={this.state.fliter} />
                        )}
                    />
                    <Route path="/home" component={Home} />
                    <Route path="/test" component={TestPage} />
                    <Route
                        path="/admin/login"
                        render={(props) => (
                            <Admin {...props} setToken={this.setToken} />
                        )}
                    />
                    <Route
                        path="/admin/QA"
                        render={(props) => (
                            <EditQA {...props} token={this.state.token} />
                        )}
                    />
                    <Route
                        path="/admin/major"
                        render={(props) => (
                            <EditMajor {...props} token={this.state.token} />
                        )}
                    />
                    <Route
                        path="/admin/standard"
                        render={(props) => (
                            <EditStandard {...props} token={this.state.token} />
                        )}
                    />
                </Layout>
            </>
        );
    }

    render() {
        return (
            <HashRouter>
                <Provider store={store}>
                    <ThemeProvider theme={materialTheme}>
                        <GlobalStyle />
                        <Switch>
                            <NavLayout>
                                <Route exact path="/" component={Major} />
                                <Route path="/post" component={Post} />
                                <Route
                                    path="/admin/major"
                                    render={(props) => <Major isAdmin={true} />}
                                />
                                <Route
                                    path="/admin/login"
                                    render={(props) => (
                                        <Login setToken={this.setToken} />
                                    )}
                                />
                            </NavLayout>
                        </Switch>
                    </ThemeProvider>
                </Provider>
            </HashRouter>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
