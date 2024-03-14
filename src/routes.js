// import
import React, { Component }  from 'react';
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import ConfirmSignUp from "views/Pages/ConfirmSignUp.js";
import Roles from "views/Dashboard/Roles.js";
import Capabilities from "views/Dashboard/Capabilities.js";
import Users from "views/Dashboard/Users.js";
import Products from "views/Dashboard/Products.js";
import Invoices from 'views/Dashboard/Invoices';
import InvoiceCreate from 'views/Dashboard/InvoiceCreate';
import Customers from 'views/Dashboard/Customers';

import PrintAps from 'components/Prints/PrintAps';


import { FiPackage,FiFileText } from "react-icons/fi";
import { FaUsersCog } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
  ChakraMenuRoles,
} from "components/Icons/Icons";

import { FiUser } from "react-icons/fi";


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color='inherit' />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color='inherit' />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/rtl-support-page",
    name: "RTL",
    rtlName: "آرتيإل",
    icon: <SupportIcon color='inherit' />,
    component: RTLPage,
    layout: "/rtl",
  },
  {
    menu: "Users",
    icon: <FaUsers />,
    layout: "/admin",
    visibleInNav:true,
    caps:['manage_options'],
    views:[
      {
        path: "/users",
        name: "Users",
        rtlName: "لوحة القيادة",
        icon: <FaUsers/>,
        component: Users,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options']
      },
      {
        path: "/roles",
        name: "Roles",
        rtlName: "لوحة القيادة",
        icon: <FaUsersCog />,
        component: Roles,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options']
      },  
    ]

  },

  {
    path: "/products",
    name: "Products",
    rtlName: "لوحة القيادة",
    icon: <FiPackage />,
    component: Products,
    layout: "/admin",
    visibleInNav:true,
    caps:['manage_options']
  },
  {
    menu: "Invoices",
    icon: <FiFileText />,
    layout: "/admin",
    visibleInNav:true,
    caps:['manage_options'],
    views:[
      {
        path: "/invoices",
        name: "Invoices",
        rtlName: "لوحة القيادة",
        icon: <FiFileText />,
        component: Invoices,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options'],
      },
      {
        path: "/invoice_create",
        name: "Invoice Create",
        rtlName: "لوحة القيادة",
        icon: <FiFileText />,
        component: InvoiceCreate,
        layout: "/admin",
        visibleInNav:false,
        caps:['manage_options']
      },
      {
        path: "/print",
        name: "Invoice Print",
        rtlName: "لوحة القيادة",
        icon: <FiFileText />,
        component: PrintAps,
        layout: "/admin",
        visibleInNav:false,
        caps:['manage_options']
      },
    ]
  },
  {
    path: "/customers",
    name: "Customers",
    rtlName: "لوحة القيادة",
    icon: <FaUserShield />,
    component: Customers,
    layout: "/admin",
    visibleInNav:true,
    caps:['manage_options']
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color='inherit' />,
        component: SignUp,
        layout: "/auth",
      },
      {
        path: "/confirmsignup",
        name: "Confirm Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color='inherit' />,
        component: ConfirmSignUp,
        layout: "/auth",
        visibleInNav:false
      },
    ],
  },
];
export default dashRoutes;
