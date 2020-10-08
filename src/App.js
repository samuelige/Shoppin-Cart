import React, { useState } from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const sortProducts = (e) => {
    console.log(e.target.value);
    const storeSortValue = e.target.value;

    setSort({ sort: storeSortValue });

    // const sortedProduts = (state) {
    //   state.products
    //     .slice()
    //     .sort((a, b) =>
    //       storeSortValue === "lowest"
    //         ? a.price < b.price
    //           ? 1
    //           : -1
    //         : storeSortValue === "hightest"
    //         ? a.price > b.price
    //           ? 1
    //           : -1
    //         : a._id > b._id
    //         ? 1
    //         : -1
    //     );
    // });

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
            <Products products={products} />
          </div>
          <div className='sidebar'>Cart Items</div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
}

export default App;
