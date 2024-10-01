import { renderProductsGrid } from "./amazonHome/productsGrid.js";
import { renderAmazonHeader } from "./amazonHome/amazonHeader.js";
import { renderAmazonTitle } from "./amazonHome/amazonPageTitle.js";
//import { loadProducts } from "../data/products.js";
import { loadProducts } from "../data/products-from-backend.js";
//import "../data/cart-class.js";

renderAmazonTitle();
renderAmazonHeader();
loadProducts(() => {
   renderProductsGrid();
});