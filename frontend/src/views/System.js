import React, { Component } from 'react';
import { connect } from "react-redux";

import { BrowserRouter, Redirect,Route, Switch } from 'react-router-dom';


import AdminLayout from "../layouts/Admin.js";

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        const json = JSON.parse(localStorage.getItem("user"));
        const role = json.role;
        console.log(role);
        return (
            <div className="system-container">
                <div className="system-list">
                <BrowserRouter>
                    <Switch>
                        <Route path="/admin" render={(props) => <AdminLayout {...props}/>} />
                        {/* <Route path="/system/book-manage" component={role=="admin"? BookManage:null} />
                        <Route path="/system/home-page" component={HomePage} />
                        <Route path="/system/cart" component={Cart} />
                        <Route path="/system/order" component={Order} />
                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} /> */}
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </BrowserRouter>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
