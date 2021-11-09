import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes } from "./modules/general/utils/routes";
import AppBar from "./modules/navigation/components/AppBar";
import Tablero from "./modules/tablero/modules/Tablero";
import RegistrarCliente from "./modules/clientes/registrar/modules/RegistrarCliente";
import BuscarCliente from "./modules/clientes/buscar/modules/BuscarCliente";
import CrearPedido from "./modules/pedidos/crear/modules/CrearPedido";
import BuscarPedido from "./modules/pedidos/buscar/modules/BuscarPedido";

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
            <CrearPedido />
          </Route>
          <Route path={Routes.buscarPedido} exact>
            <AppBar />
            <BuscarPedido />
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
