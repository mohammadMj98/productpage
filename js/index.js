import cart from "./template.js";
import product from "./product.js";
let app = document.getElementById('app');
let temporaryContent =document.getElementById('temporaryContent');


// load template file

const loadTemplate =()=>{
    fetch('./template.html')
    .then(Response => Response.text())
    .then(html =>{
        app.innerHTML = html;
        let contentTab = document.getElementById('contentTab');
        contentTab.innerHTML = temporaryContent.innerHTML;
        temporaryContent.innerHTML = null;
        cart();
        initApp();
    })
}
loadTemplate();

const initApp = ()=>{
   
    let productList = document.querySelector('.listProduct');
    productList.innerHTML = null;
    product.forEach((item)=>{
        let newProduct = document.createElement('div')
        newProduct.classList.add('item')
        newProduct.innerHTML = 
        `
        <a href='/detail.html?id=${item.id}'>
        <img src='${item.image}'>
        </a>
        <h2>${item.name}</h2>
        <div class='price'>${item.price}$</div>
        <botton class='addCart' data-id='${item.id}'>
        add to cart
        </botton>
        `
        productList.appendChild(newProduct)
    })
    
}