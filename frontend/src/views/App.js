import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';  
import AdminLayout from "../layouts/Admin.js";

// import "bootstrap/dist/css/bootstrap.css";
 import "assets/scss/paper-dashboard.scss?v=1.3.0";
 import "assets/demo/demo.css";
 import "perfect-scrollbar/css/perfect-scrollbar.css";


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import Header from 'components/Navbars/DemoNavbar';

import { path } from '../utils'


import Login from './Auth/Login';
import './App.scss';
import Home from './Home'
import System from './System'

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        {this.props.isLoggedIn  }

                        <span className="content-container">
                        <BrowserRouter>

                            <Switch>
                                <Route path="/" exact component={(Home)} />
                                <Route path="/login" component={userIsNotAuthenticated(Login)} />
                                <Route path="/admin" component={userIsAuthenticated(System)} />
                                {/* <Route path="/admin" render={userIsAuthenticated((props) => <AdminLayout {...props} />)} /> */}

                            </Switch>
                        </BrowserRouter>

                        </span>

                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
