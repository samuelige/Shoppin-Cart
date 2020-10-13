import React, { useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

function App() {
  const [products, setProducts] = useState(data.products);
  const [cartItems, setCartItems] = useState([]);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const removeFromCart =(product) => {
  
    const cartProduct = cartItems.slice();
    let delItem = cartProduct.filter(item => item._id !== product._id);
    
    setCartItems( delItem );
  }
 
  const addToCart = (product) => {
    const cartProduct = cartItems.slice();
    let alreadyInCart = false;
    cartProduct.forEach((item) => {
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart){
      cartProduct.push({...product, count: 1})
    }
    setCartItems(cartProduct)
  }

  const sortProducts = (e) => {
    console.log(e.target.value);
    const storeSortValue = e.target.value;

    setSort({ sort: storeSortValue });

    const sortedProducts = data.products
      .slice()
      .sort((a, b) =>
        storeSortValue === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : storeSortValue === "hightest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id < b._id
          ? 1
          : -1
      );

    setProducts(sortedProducts);
    console.log(products);
  };

  const filterProducts = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setSize({ size: e.target.value, products: data.products });
      setProducts({ products: data.products });
    } else {
      setSize({ size: e.target.value });
      const filteredProducts = data.products.filter(
        (product) => product.availableSizes.indexOf(e.target.value) >= 0
      );
      setProducts(filteredProducts);
    }
  };

  return (
    <div className='grid-container'>
      <header className='App-header'>
        <a href='/'>React Shopping Cart</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className='sidebar'>
            <Cart cartItems={cartItems} removeFromCart={removeFromCart}/>
          </div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
}

export default App;
