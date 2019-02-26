import Home from "./components/pages/Home/Home";
import SingleProduct from "./components/pages/SingleProduct/SingleProduct";

const routes = [{ path: "/", component: Home }, { path: "/product/:id", component: SingleProduct }];

export default routes;
