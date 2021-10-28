let carts = document.querySelectorAll('.add-cart');

let products =  [
    {
        name : 'Cheese French Fries',
        tag: 'mn1',
        price : 10000,
        inCart : 0
    },
    {
        name : 'Bacon Mushroom Burger',
        tag: 'mn2',
        price : 18000,
        inCart : 0
    },
    {
        name : 'Salad Cheese Burger',
        tag: 'mn3',
        price : 24000,
        inCart : 0
    },
    {
        name : 'Beef Cheese Burger',
        tag: 'mn4',
        price : 24000,
        inCart : 0
    },
    {
        name : 'Ice Coffe Latte',
        tag: 'mn5',
        price : 18000,
        inCart : 0
    },
    {
        name : 'Ice Tea',
        tag: 'mn6',
        price : 12000,
        inCart : 0
    },
    {
        name : 'Waffer Ice Espresso Coffee',
        tag: 'mn7',
        price : 26000,
        inCart : 0
    },
    {
        name : 'Ice Cappucino Coffee',
        tag: 'mn8',
        price : 22000,
        inCart : 0
    }
];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', ()=> {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers()  {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers +1);
        document.querySelector('.cart span').textContent = productNumbers +1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems =localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    // console.log("The Product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("myCartCost", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart(){
    let cartItems =localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr>
                <td class="cart-pic first-row">
                    <img src="vendor/images/menu/${item.tag}.png" style="width:140px;">
                </td>
                <td class="cart-title">
                    ${item.name}
                </td>
                <td class="p-price first-row">
                Rp ${item.price}
                </td>
                <td class="qty-item">
                    ${item.inCart}
                </td>
            </tr>
            `
        });

       
    }
}

onLoadCartNumbers();
displayCart();