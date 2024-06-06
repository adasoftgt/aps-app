/*!

=========================================================
* Argon Dashboard Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-chakra/blob/master/LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

process.env.AWS_COGNITO_USER_POOL_ID = process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID
process.env.AWS_COGNITO_USER_POOL_CLIENT_ID = process.env.REACT_APP_AWS_COGNITO_USER_POOL_CLIENT_ID
process.env.AWS_REGION = process.env.REACT_APP_AWS_REGION

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js"; // Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import theme from "theme/theme.js";

// Amplify
//import { Amplify} from '@aws-amplify/core';
import { Amplify} from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

// Habilita la sincronización (opcional)
DataStore.configure({
  sync: {
    syncEnabled: true, // Habilita la sincronización automática
  },
});

import { AuthProvider } from "./contexts/AuthContext";
import { ApsHanderProvider } from "contexts/ApsHandlerContext";
import { TableProvider } from "./contexts/TableContext";
import { UsersProvider } from "./contexts/UsersContext";
import { ApsUserProvider } from "contexts/ApsUserContext";



ReactDOM.render(
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <AuthProvider>
        <ApsHanderProvider>
          <UsersProvider>
            <TableProvider>
              <ApsUserProvider>
                <HashRouter>
                  <Switch>
                    <Route path={`/auth`} component={AuthLayout} />
                    <Route path={`/admin`} component={AdminLayout} />
                    <Route path={`/rtl`} component={RTLLayout} />
                    <Redirect from={`/`} to="/admin/dashboard" />
                  </Switch>
                </HashRouter>
              </ApsUserProvider>
                
            </TableProvider>
          </UsersProvider>
        </ApsHanderProvider>
      </AuthProvider>
    </ChakraProvider>,
    document.getElementById("root")
     
  

);
