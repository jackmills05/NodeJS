var products = []

let navigationActive = false
function navigationBar() {
    navigationActive = !navigationActive
    document.getElementById("toggleable")
    var element = document.getElementById('navBar')
    var body = document.getElementsByTagName('body')[0]
    if (navigationActive) {
        element.innerHTML = `
        <div id="taskbar">
            <a href="/">Home</a>
            <hr>
            <a href="/products">All Products</a>
        </div>
        `;
        document.body.appendChild(element)
        body.style.marginLeft = "10%";
    } else {
        const element = document.getElementById("taskbar")
        element.remove();
        body.style.marginLeft = "0%";
    }
};
let searchActive = false
function searchFunction() {
    searchActive = !searchActive
    const element = document.getElementById('searchBar')
    if (searchActive) {
        element.innerHTML = `<div id="search"><form onSubmit="javascript:searchSubmit(); return false" action="products"><input id="searchInput" type"text" for="productID" name="searchInput"><br><input type="submit" id="submit"></form></div>`
        document.body.appendChild(element)

    } else {
        const element = document.getElementById('search')
        element.remove()
    }
};
function searchSubmit() {
    var searchInput = document.getElementById("searchInput").value;
    for (var i = 0; i < products.length; i++) {
        if (searchInput.toLowerCase() === products[i].productName.toLowerCase()) {
            searchActive = false
            productNavigation(i)
            const element = document.getElementById('search')
            element.remove()
        }
        }
    }

function loadMain() {
    const element = document.getElementById("bestsellers")
    for (var i = 0; i < products.length; i++) {
        if (products[i].keyWords[0] == "bestsellers") {
            var productHTML = `<div id="bestsellingProducts" value="` + [i] + `"><a ><img src="` + products[i].productImage + `"><br><p class="name">` + products[i].brand + ` ` + products[i].productName + `</p><p class="price"><br>£` + products[i].price + `</p><a/> <button onclick="productNavigation(` + [i] + `)">View Product</button></div>`
            element.insertAdjacentHTML("afterbegin", productHTML);
        }
    }
}
function displayProducts() {
    const element = document.getElementById('products')
    for (var i = 0; i < products.length; i++) {
        var productHTML = `<div class="productDisplay" value="` + [i] + `"><a onclick="productNavigation(` + [i] + `)"><img src="` + products[i].productImage + `"><br><p class="name">` + products[i].brand + ` ` + products[i].productName + `</p><p class="price"><br>£` + products[i].price + `</p><a/> <button onClick="addToBasket(` + [i] + `)"></button></div>`
        element.insertAdjacentHTML("afterbegin", productHTML);
    }
    filterSystem()
}

function productNavigation(idOfProduct) {
    if (document.body.contains(document.getElementById('filter'))){
    var node = document.getElementById('filter')
    node.innerHTML='';
    node.style.all="revert"
    }
    var productPage = `<div id="productPage"><p>`+products[idOfProduct].brand+` `+products[idOfProduct].productName + `</p><img src="`+products[idOfProduct].productImage+`" id="displayIMG"><button onClick= addToBasket(`+[idOfProduct]+`) class="productBasket")></button> <button onClick=goBack() class="goBack">Go Back</button></div>`
    if (document.body.contains(document.getElementById('products'))){ 
    var element = document.getElementById('products')
    element.innerHTML= productPage
    element.style.marginLeft="0%"
    }
    if (document.body.contains(document.getElementById('displayBasket'))){
        var element = document.getElementById('displayBasket')
        element.innerHTML= productPage
        var node = document.getElementById('checkout')
        node.innerHTML='';
        node.style.all="revert"
    }
    if (document.body.contains(document.getElementById('bestsellers'))){
        var element = document.getElementById('bestsellers')
        element.innerHTML= productPage
        var node = document.getElementById('soleMate')
        node.innerHTML='';
        node.style.all="revert"
    }
}
function addToBasket(idOfProduct) {
    let basket = JSON.parse(localStorage.getItem(`basket`, "[]"));
    basket.push(idOfProduct)
    localStorage.setItem("basket", JSON.stringify(basket))

    alert("Product has been added into basket")
}
function goBack() {
    if (document.body.contains(document.getElementById('products'))){ 
    const node = document.getElementById('products');
    var element = document.getElementById('productPage')
    node.removeChild(element)
    displayProducts()
    }
    if (document.body.contains(document.getElementById('displayBasket'))){
        const node = document.getElementById('displayBasket').innerHTML=""
        displayBasket()
        displayCheckout()
    }
    if (document.body.contains(document.getElementById('bestsellers'))){
        location.reload()
        
    }
}
function clearFilter() {
    const element = document.getElementById('products');
    element.innerHTML = ``
    displayProducts()
}
function loadBasket() {
    var element = document.getElementById('basket')
    element.innerHTML = `<a href="/basket"><button draggable="false"><img src="/Icons/basketCheckout.svg"></button></a>`
    document.body.appendChild(element)
}
function filterSystem() {
    var element = document.getElementById('filter')
    element.style.all=""
    var body = document.getElementById('products')
    element.innerHTML = `<label onclick="filtration()">Nike<input type=radio name="filter" value="Nike"></input><br></label><label onclick="filtration()">Adidas<input type=radio name="filter" value="Adidas"></input></label><button onClick=clearFilter() id="ClearFilter"> Clear filter</button>`
    document.body.appendChild(element)
    body.style.marginLeft = "5%";
    var button = document.getElementById(`ClearFilter`)
    button.setAttribute('disabled', '');
}
function filtration() {
    var userInput = document.querySelector('input[name="filter"]:checked').value
    document.getElementById("products").innerHTML = "";
    const element = document.getElementById('products')
    for (var i = 0; i < products.length; i++) {
        if (products[i].brand == userInput) {
            var productHTML = `<div class="productDisplay" value="` + [i] + `"><a onclick="productNavigation(` + [i] + `)"><img src="` + products[i].productImage + `"><br><p class="name">` + products[i].brand + ` ` + products[i].productName + `</p><p class="price"><br>£` + products[i].price + `</p><a/> <button onClick="addToBasket(` + [i] + `)"></button></div>`
            element.insertAdjacentHTML("afterbegin", productHTML);
        }
        var button = document.getElementById(`ClearFilter`)
        button.removeAttribute('disabled', '');
    }

}
function displayBasket() {
    var element = document.getElementById('displayBasket')
    var basket = JSON.parse(localStorage.getItem("basket"))
    if (localStorage.length === 0){
        alert("Basket is empty")
    }
    else{
    for (var i = 0; i < JSON.parse(localStorage.getItem("basket")).length; i++) {
        console.log(basket)
        var basketHTML = `<div class="basketDisplay" value="` + basket[i] + `"><a onclick="productNavigation(` + basket[i] + `)"><img src="` + products[basket[i]].productImage + `"draggable="false"><br><p class="name" draggable="false">` + products[basket[i]].brand + ` ` + products[basket[i]].productName + `</p><br><p class="price">£` + products[basket[i]].price + `</p><a/> <button onclick=removeFromBasket(` + [i] + `)>Remove Product<img src="/Icons/delete.svg)</button></div>`
        element.insertAdjacentHTML("afterbegin", basketHTML);
    }
    }
}
function removeFromBasket(index) {
    var array = JSON.parse(localStorage.getItem("basket"))
    array.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(array));
    console.log(array)
    location.reload()
    displayCheckout()
}
function displayCheckout() {
    var array = JSON.parse(localStorage.getItem("basket"))
    let displayVal = 0
    for (var i = 0; i < array.length; i++) {
        displayVal = products[array[i]].price + displayVal;
        console.log(displayVal)
    }
    var element = document.getElementById('checkout')
    var checkoutHTML = `<div><p>Total = £` + displayVal + `</p><button onClick=checkout()>Check Out</button></div>`
    element.insertAdjacentHTML("afterbegin", checkoutHTML);
}
function checkout() {
    var basket = JSON.parse(localStorage.getItem("basket"))
    while (basket.length) {
        basket.pop();
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    window.location.href = "/";
    alert("Basket has been refreshed")
}
async function getData() {
    const url = "http://127.0.0.1:3000/12312312";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      console.log(json.length)
      for (var i = 0; i < json.length; i++) {
        products.push(json[i]);
      }
      if (document.body.contains(document.getElementById('products'))){ 
        displayProducts()
        loadBasket()
    }
      if (document.body.contains(document.getElementById('bestsellers'))){ 
        loadMain()
        loadBasket()
      }
      if (document.body.contains(document.getElementById('checkout'))){ 
        displayBasket()
        displayCheckout()
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  