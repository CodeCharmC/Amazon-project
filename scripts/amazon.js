import { renderProductsGrid } from "./amazonHome/productsGrid.js";
import { renderAmazonHeader } from "./amazonHome/amazonHeader.js";
import { renderAmazonTitle } from "./amazonHome/amazonPageTitle.js";
//import { loadProducts } from "../data/products.js";
//import { loadProducts } from "../data/products-from-backend.js";
//import "../data/cart-class.js";
import { loadProductsFetch } from "../data/products-from-backend.js";


renderAmazonTitle();
renderAmazonHeader();
async function loadProducts() {
   await loadProductsFetch();
   renderProductsGrid();  
}
loadProducts();

/**
renderAmazonTitle();
renderAmazonHeader();
loadProducts(() => {
   renderProductsGrid();
});
loadProducts();
 */