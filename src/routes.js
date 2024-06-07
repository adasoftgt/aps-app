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
import ProductDashboard from 'views/Dashboard/ProductDashboard';
// STATS
import VentasXVendedor from 'views/Stats/VentasXVendedor';
import VentasXsector from 'views/Stats/VentasXsector';
import ClientesXsector from 'views/Stats/ClientesXsector';
import VentasXProducto from 'views/Stats/VentasXProducto';
import UnidadesXPlaforma from 'views/Stats/UnidadesXPlaforma';
import DocsXVendedor from 'views/Stats/DocsXVendedor';
import CobrosXVendedor from 'views/Stats/CobrosXVendedor';

import Document from 'views/Dashboard/Document';

import PrintAps from 'components/Prints/PrintAps';

import Payments from 'views/Dashboard/Payments';

import CreatePayment from 'components/Payments/CreatePayment';

import NoInvoice from 'components/errors/NoInvoice';


import { FiPackage,FiFileText, FiDollarSign } from "react-icons/fi";
import { FaUsersCog } from "react-icons/fa";
import { FaUserShield,FaPlus } from "react-icons/fa";
import { FaUsers, FaFileInvoiceDollar } from "react-icons/fa6";
import { CiCircleList } from "react-icons/ci";
import { BiStats } from "react-icons/bi";


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
    path: "/document/:id/:type",
    name: "Document",
    rtlName: "لوحة القيادة",
    icon: <FiPackage />,
    component: Document,
    layout: "/admin",
    visibleInNav:false,
    caps:['manage_options']
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
    path: "/product/:productId",
    name: "Product Dashbord",
    rtlName: "لوحة القيادة",
    icon: <FiPackage />,
    component: ProductDashboard,
    layout: "/admin",
    visibleInNav:false,
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
        icon: <CiCircleList />,
        component: Invoices,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options'],
      },
      {
        path: "/invoice_create",
        name: "Invoice Create",
        rtlName: "لوحة القيادة",
        icon: <FaPlus />,
        component: InvoiceCreate,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options']
      },
      {
        path: "/print",
        name: "Invoice Print",
        rtlName: "لوحة القيادة",
        icon: <FaPlus />,
        component: PrintAps,
        layout: "/admin",
        visibleInNav:false,
        caps:['manage_options']
      },
    ]
  },

  {
    menu: "Estadística",
    icon: <BiStats />,
    layout: "/admin",
    visibleInNav:true,
    caps:['manage_options'],
    views:[
      {
        path: "/ventasxvendedor",
        name: "Ventas X Vendedor",
        rtlName: "لوحة القيادة",
        icon: <BiStats />,
        component: VentasXVendedor,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options'],
      },
      {
        path: "/vendedorxsector",
        name: "Venta X Sector",
        rtlName: "لوحة القيادة",
        icon: <BiStats />,
        component: VentasXsector,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options'],
      },
      {
        path: "/clientesxsector",
        name: "Clientes X Sector",
        rtlName: "لوحة القيادة",
        icon: <BiStats />,
        component: ClientesXsector,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options'],
      },
      {
        path: "/ventasxproducto",
        name: "Ventas por Producto",
        rtlName: "لوحة القيادة",
        icon: <BiStats />,
        component: VentasXProducto,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options'],
      },
      {
        path: "/unidadesxvendedor",
        name: "Unidades x plataforma",
        rtlName: "لوحة القيادة",
        icon: <BiStats />,
        component: UnidadesXPlaforma,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options'],
      },
      {
        path: "/docsxvendedor",
        name: "Docs x Vendedor",
        rtlName: "لوحة القيادة",
        icon: <BiStats />,
        component: DocsXVendedor,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options'],
      },
      {
        path: "/cobrosxvendedor",
        name: "Cobros x Vendedor",
        rtlName: "لوحة القيادة",
        icon: <BiStats />,
        component: CobrosXVendedor,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options'],
      },
    ]
  },
  {
    menu: "Payments",
    icon: <FiDollarSign />,
    layout: "/admin",
    visibleInNav:true,
    caps:['manage_options'],
    views:[
      {
        path: "/payments",
        name: "Payments",
        rtlName: "لوحة القيادة",
        icon: <CiCircleList />,
        component: Payments,
        layout: "/admin",
        visibleInNav:true,
        caps:['manage_options']
      },
      {
        path: "/createpayment",
        name: "Create Payment",
        rtlName: "لوحة القيادة",
        icon: <FaPlus />,
        component: CreatePayment,
        layout: "/admin",
        visibleInNav:true,
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
  {
    path: "/noinvoice",
    name: "NoInvoice",
    rtlName: "لوحة القيادة",
    icon: <FaUserShield />,
    component: NoInvoice,
    layout: "/admin",
    visibleInNav:false,
    caps:['manage_options']
  },
];
export default dashRoutes;
