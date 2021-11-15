import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes } from "./modules/general/utils/routes";
import AppBar from "./modules/navigation/components/AppBar";
import Tablero from "./modules/tablero/modules/Tablero";
import RegistrarCliente from "./modules/clientes/registrar/modules/RegistrarCliente";
import BuscarCliente from "./modules/clientes/buscar/modules/BuscarCliente";
import CreateOrder from "./modules/pedidos/crear/modules/CreateOrder";
import SearchOrder from "./modules/pedidos/buscar/modules/SearchOrder";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={Routes.tablero} exact>
            <AppBar />
            <Tablero />
          </Route>
          <Route path={Routes.crearPedido} exact>
            <AppBar />
            <CreateOrder />
          </Route>
          <Route path={Routes.buscarPedido} exact>
            <AppBar />
            <SearchOrder />
          </Route>
          <Route path={Routes.registrarCliente} exact>
            <AppBar />
            <RegistrarCliente />
          </Route>
          <Route path={Routes.buscarCliente} exact>
            <AppBar />
            <BuscarCliente />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
