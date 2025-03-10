import product from "./product.js";
import cart from "./template.js";

let app = document.getElementById('app');
let temporaryContent =document.getElementById('temporatyContent');

console.log(temporaryContent);

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
    let idProduct = new URLSearchParams(window.location.search).get('id');
    let info = product.filter((value)=>value.id == idProduct)[0];
   if(!info){
        window.location.hrefe ='/'
   }
   let detail = document.querySelector('.detail');
   detail.querySelector('.image img').src = info.image;
   detail.querySelector('.name').innerText = info.name;
   detail.querySelector('.price').innerText = '$ '+info.price;
   detail.querySelector('.description span').innerText = info.description;
   detail.querySelector('.addCart').dataset.id = idProduct ;


   //similar product

    
   let productList = document.querySelector('.listProduct');
   productList.innerHTML = null;
   product.filter((value)=> value.id !=idProduct).forEach((item)=>{
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
