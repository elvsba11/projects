const store = {
  laptop: {
    price: 50000,
    stock: 4
  },
  mouse: {
    price: 500,
    stock: 10
  },
  keyboard: {
    price: 1500,
    stock: 6
  }
};

function getProduct(productName, quantity) {

  const product = store[productName];
  
  if (!product) {
    return "Product not found!"
  }
  const updateStock = product.stock - quantity;
  if (product.stock >= quantity) {
    product.stock = updateStock;
    return `\nThank you for buying ${productName}!\n
            Stock: ${product.stock}`;
  } else {
    return "Not Enough Stock Please Restock";
  }
}
    

console.log(getProduct("keyboard", 5));