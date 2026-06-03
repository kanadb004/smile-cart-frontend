import { Route, Switch, NavLink } from "react-router-dom";

import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Product from "./components/Product";

const App = () => (
  <>
    <div className="flex space-x-2">
      {/* <Link to="/">Home</Link>
      <Link to="/product">Product</Link> */}

      <NavLink exact activeClassName="underline font-bold" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink>
    </div>
    {/* <Route exact component={Home} path="/" />
    <Route exact component={Product} path="/product" /> */}
    <Switch>
      {/* <Route component={Product} path="/product" />
      <Route component={Home} path="/" /> */}

      <Route exact component={Home} path="/" />
      <Route exact component={Product} path="/product" />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
