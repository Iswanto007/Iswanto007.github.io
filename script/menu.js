// ambil data dari semua class
let Chart = document.querySelectorAll('.add-chart');
//deklarasi variabel arrya dari item menu
let basket = [
 {
  nama:'Jus jeruk',
  tag:'Orange',
  harga:'20000',
  keranjang: 0
},
{
 nama:'Jus Mangga',
 tag:'mango',
 harga:'20000',
 keranjang: 0
},
{
 nama:'Jus Melon',
 tag:'Melon',
 harga:'18000',
 keranjang: 0
},
{
 nama:'Jus Buah Naga',
 tag:'Naga',
 harga:'18000',
 keranjang: 0
},
{
 nama:'Jus Kiwi',
 tag:'Kiwi',
 harga:'20000',
 keranjang: 0
},
{
 nama:'jus Stoberi',
 tag:'Stoberi',
 harga:'25000',
 keranjang: 0
},
{
 nama:'Jus Nanas',
 tag:'Nanas',
 harga:'18000',
 keranjang: 0
},
{
 nama:'Jus Wortel',
 tag:'Wortel',
 harga:'18000',
 keranjang: 0
}
];

for(let i = 0;i < Chart.length; i++){
 Chart[i].addEventListener('click',()=>{
    cartNumbers(basket[i]);
    totalCost(basket[i])
 })
}

function onLoadCartNumbers()  {
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
      document.querySelector('.Chart span').textContent = productNumbers;
  }
}

function cartNumbers(produk){
  let productNumbers = localStorage.getItem('cartNumbers');
  
  productNumbers = parseInt(productNumbers);

  if (productNumbers){
      localStorage.setItem('cartNumbers', productNumbers +1);
      document.querySelector('.Chart span').textContent = productNumbers +1;
  } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.Chart span').textContent = 1;
  }
  setItems(produk);
}

function setItems(produk){
  let cartItems =localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null){
      
      if(cartItems[basket.tag] == undefined){
          cartItems = {
              ...cartItems,
              [produk.tag]: produk
          }
      }
      cartItems[produk.tag].keranjang += 1;
  } else {
      produk.keranjang = 1;
      cartItems = {
          [produk.tag]: produk
      }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(produk) {
  // console.log("The Product price is", product.price);
  let cartCost = localStorage.getItem('totalCost');

  console.log("myCartCost", cartCost);
  console.log(typeof cartCost);

  if(cartCost != null){
      cartCost = parseInt(cartCost);
      localStorage.setItem('totalCost', cartCost + produk.harga);
  } else {
      localStorage.setItem("totalCost", produk.harga);
  }

}

function displayCart(){
  let cartItems =localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');
    let Tampilan = document.querySelector(".form")
  console.log(cartItems);
  if(cartItems && productContainer){
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
          productContainer.innerHTML += `
          <tr>
              <td class="cart-pic first-row">
                  <img src="images/${item.tag}.png" style="width:140px;">
              </td>
              <td class="cart-title">
                  ${item.nama}
              </td>
              <td class="p-price first-row">
              Rp ${item.harga}
              </td>
              <td class="qty-item">
                  ${item.keranjang}
              </td>
          </tr>
          `
          
      });
      
     
  }
  if(cartItems && Tampilan){
    Tampilan.innerHTML = '';
    Object.values(cartItems).map(item => {
        Tampilan.innerHTML += `
        <tr>
        <td> 
        Total Bayar
        </td>
        <td>
        ${cartCost};
        </td>
        </tr>
        `
        
    });
    
   
}
let VariabelClassNampil = document.querySelector('.form');
}

onLoadCartNumbers();
displayCart();