//XMLHttpRequest is a build-in Class in JS
//It allows you to send HTTP requests
//It returns a promise that you can use to handle the response

const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
   console.log(xhr.response);
})
xhr.open("GET", "https://supersimplebackend.dev/products");
xhr.send();