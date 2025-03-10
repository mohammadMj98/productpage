import product from "./product.js";

const cart = () => {
    let Cart = document.querySelector('.cart')
    let closeCart  = document.querySelector('#close-cart');
    let shopingIcon = document.querySelector('.shoping-icon img');
    let menu =document.querySelector('.menu')
    let navbar = document.querySelector('header nav')
    let cart = [];

    // menu header

    menu.addEventListener('click', ()=>{
        navbar.classList.toggle('open-menu')
    })

    closeCart.addEventListener('click', () => {
        Cart.classList.toggle('close-cart');
    });

    shopingIcon.addEventListener('click', () => {
        Cart.classList.toggle('close-cart');
    });

    const setProductInCart = (idProduct, quantity, position) => {
        if (quantity > 0) {
            if (position < 0) {
                cart.push({
                    product_id: idProduct,
                    quantity: quantity
                });
            } else {
                cart[position].quantity = quantity;
            }
        }else{
            cart.splice(position,1);
        }
        localStorage.setItem('cart',JSON.stringify(cart));
        refreshCartHtml();
    };

    const refreshCartHtml = () => {
        let listHTML = document.querySelector('.list-item');
        let totalHTML = document.querySelector('.shoping-icon span');
        let totalQuantity = 0;
        listHTML.innerHTML = '';

        cart.forEach(item => {
            totalQuantity += item.quantity;
            let position = product.findIndex(value => value.id == item.product_id);
            let info = product[position];

            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML = `
                <div class='image'>
                    <img src='${info.image}'/>
                </div>
                <div class='name'>${info.name}</div>
                <div class='totalPrice'>${info.price * item.quantity}</div>
                <div class='quantity'>
                    <span class='minus' data-id='${info.id}'>-</span>
                    <span>${item.quantity}</span>
                    <span class='plus' data-id='${info.id}'>+</span>
                </div>
            `;

            listHTML.appendChild(newItem);
        });

        totalHTML.textContent = totalQuantity;
    };

    document.addEventListener('click', (event) => {
        let buttonClick = event.target;
        let idProduct = buttonClick.dataset.id;
        let position = cart.findIndex(value => value.product_id == idProduct);
        let quantity = position < 0 ? 0 : cart[position].quantity;

        if (buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')) {
            quantity++;
            setProductInCart(idProduct, quantity, position);
        }else if(buttonClick.classList.contains('minus')){
            quantity--;
            setProductInCart(idProduct, quantity, position);
        }
    });
    const initApp =()=>{
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        refreshCartHtml();
    }
    initApp();
};

export default cart;
