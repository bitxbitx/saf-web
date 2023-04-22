import React from 'react';
import ContentTopBar from '../../../components/ContentTopBar/ContentTopBar';
// import styles from './CustomerAccounts.module.css';
import { Route, Switch } from 'react-router-dom';
import CreateCustomerAccount from './CreateCustomerAccount/CreateCustomerAccount';
import CustomerAccountDetails from './CustomerAccountDetails/CustomerAccountDetails';
import CustomerAccountList from './CustomerAccountList/CustomerAccountList';

export default function CustomerAccounts() {

    return (
        <>
            <ContentTopBar title="Customer Accounts" redirectLink="/admin/customer-accounts/create" />

            <Switch>
                <Route path="/admin/customer-accounts/create"> <CreateCustomerAccount /> </Route>
                <Route path="/admin/customer-accounts/:id"> <CustomerAccountDetails /> </Route>
                <Route path="/admin/customer-accounts" exact> <CustomerAccountList /> </Route>
            </Switch>
        </>
    )
}