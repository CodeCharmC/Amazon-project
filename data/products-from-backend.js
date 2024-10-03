import { formateCurrency } from "../scripts/utils/money.js";

export function ismatchingProduct(productId) {
  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    };
  });
  return matchingProduct;
};

class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keyword;
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keyword = productDetails.keyword;
  }
  getStarsUrls() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }
  getFormatedPrice() {
    return `${formateCurrency(this.priceCents)}`
  }
  extraInfoHtml() {
    return ""
  }
}

//inheritance let us reuse code between classes
class Clothing extends Product {
  sizeChartLink;
  
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHtml() {
    return `
      <a class="size-chart-link link-primary" href="${this.sizeChartLink}" target="_blank">
        Size Chart
      </a>
    `
  }
}

class Appliance extends Product {
  instructionLink;
  warrantyLink;
  constructor(productDetails) {
    super(productDetails);
    this.instructionLink = productDetails.instructionLink;
    this.warrantyLink = productDetails.warrantyLink;
  }
  extraInfoHtml() {
    return `
      <a class="instruction-link link-primary" href="${this.instructionLink}" target="_blank">
        Instruction
      </a>
      <a class="warranty-link link-primary" href="${this.warrantyLink}" target="_blank">
        Warranty
      </a>
    `
  }
}

export let products = [];

export function loadProductsFetch() {
  const promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => { return response.json(); })
    .then((productDetails) => {
      products = productDetails.map((productDetails) => {
        if (productDetails.type === "clothing") {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
      return products;
    })
    .catch((error) => {
    console.log("Error, something went wrong");
  });
  return promise;
};
loadProductsFetch();




export function loadProducts(functionCall) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((productDetails) => {

      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      /* Because 'https://supersimplebackend.dev/products' does not contain the products type for appliance
      else if (productDetails.type === "appliance") {
        return new Appliance(productDetails);
      }    */

      return new Product(productDetails);
    });
    functionCall();  
  })

  xhr.addEventListener("error", (error) => {
    console.log("Error, something went wrong");
  })

  xhr.open("GET", "https://supersimplebackend.dev/products");
  //xhr.open("GET", "https://e.supersimplebackend.dev/products");
  xhr.send();
};

//loadProducts();