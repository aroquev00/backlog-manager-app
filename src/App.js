import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes } from "./modules/general/utils/routes";
import AppBar from "./modules/navigation/components/AppBar";
import Dashboard from "./modules/dashboard/modules/Dashboard";
import RegisterCustomer from "./modules/customers/register/modules/RegisterCustomer";
import SearchCustomer from "./modules/customers/search/modules/SearchCustomer";
import CreateOrder from "./modules/orders/create/modules/CreateOrder";
import SearchOrder from "./modules/orders/search/modules/SearchOrder";
import OrderPage from "./modules/orders/modules/OrderPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={Routes.dashboard} exact>
            <AppBar />
            <Dashboard />
          </Route>
          <Route path={Routes.createOrder} exact>
            <AppBar />
            <CreateOrder />
          </Route>
          <Route path={Routes.searchOrder} exact>
            <AppBar />
            <SearchOrder />
          </Route>
          <Route path={Routes.displayOrder}>
            <AppBar />
            <OrderPage />
          </Route>
          <Route path={Routes.registerCustomer} exact>
            <AppBar />
            <RegisterCustomer />
          </Route>
          <Route path={Routes.searchCustomer} exact>
            <AppBar />
            <SearchCustomer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
