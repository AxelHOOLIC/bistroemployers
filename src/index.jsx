/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from "@solidjs/router";
import './index.css'

import App from './App'
import PageEmployers from "./pages/employers/PageEmployers";
import PageKitchen from "./pages/kitchen/PageKitchen";


const root = document.getElementById('root')

render(() => (
    <Router>
      <Route path="/" component={App} />
      <Route path="/crearpedido" component={PageEmployers} />
      <Route path="/cocina" component={PageKitchen} />
    </Router>
), document.getElementById("root"));
