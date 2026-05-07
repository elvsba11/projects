// let employees = [
//   { name: 'Juan', salary: 25000 },
//   { name: 'Maria', salary: 45000 },
//   { name: 'Pedro', salary: 18000 },
//   { name: 'Anna', salary: 55000 },
//   { name: 'Mike', salary: 30000 }
// ];

// const aboveTwentyFive = employees.filter(gross => gross.salary > 25000);
// const nameAboveSalary = aboveTwentyFive.map(list => list.name);

// console.log(nameAboveSalary);

// let products = [
//   { name: 'Laptop', price: 45000, category: 'Electronics' },
//   { name: 'Mouse', price: 350, category: 'Electronics' },
//   { name: 'Chair', price: 1500, category: 'Furniture' },
//   { name: 'Desk', price: 3000, category: 'Furniture' },
//   { name: 'Headset', price: 800, category: 'Electronics' }
// ];

// function getExpensive() {
//   return products.filter(product => product.price > 1000);
// }


// function getByCategory(category) {
//   return products.filter(product => product.category === category);
// }

// console.log(getExpensive());
// console.log(getByCategory('Electronics'));


// let scores = [85, 92, 60, 78, 95, 55, 88, 45, 70, 91];

// function getPassers() {
//   return scores.filter( pass => pass >= 75);
// }

// function getAverage() {
//   let sum = scores.reduce( (acc, curr) => {
//     return acc + curr;
//   }, 0);

//   return sum / scores.length;
// }

// console.log(getPassers());
// console.log(getAverage());

// class Person {
//   #age = 0;
//   #name = '';

//   constructor(age, name) {
//     this.#age = age;
//     this.#name = name;
//   }

//   getInfo() {
//     return `My name is ${this.#name}, ${this.#age} years old`;
//   }

//   setAge(age) {
//     if (age < 0) {
//       console.log('Are you a baby?');
//       return;
//     }
//     this.#age = age;
//   }
// }

// const person = new Person(20, 'Mike');
// console.log(person.getInfo());
// const person1 = new Person(0, 'Alberto');
// console.log(person1.getInfo());

// let employees = [
//   { name: 'Juan', salary: 25000, department: 'IT' },
//   { name: 'Maria', salary: 45000, department: 'HR' },
//   { name: 'Pedro', salary: 18000, department: 'IT' },
//   { name: 'Anna', salary: 55000, department: 'IT' },
//   { name: 'Mike', salary: 30000, department: 'HR' }
// ];

// function getITEmployees() {
//   return employees.filter(it => it.department === 'IT');
// }

// console.log(getITEmployees());

// function getAverageSalary() {
//   const total = employees.reduce((sum, emp) => sum + emp.salary, 0);

//   return total / employees.length;
// }

// console.log(getAverageSalary());


// function getHighEarners() {
//   return employees
//   .filter(highEarner => highEarner.salary > 30000)
//   .map(emp => emp.name);
// }

// console.log(getHighEarners());

// let products = [
//   { name: 'Laptop', price: 45000, category: 'Electronics', stock: 5 },
//   { name: 'Mouse', price: 1500, category: 'Electronics', stock: 0 },
//   { name: 'Keyboard', price: 2500, category: 'Electronics', stock: 12 },
//   { name: 'Office Chair', price: 8000, category: 'Furniture', stock: 3 },
//   { name: 'Desk Lamp', price: 1200, category: 'Furniture', stock: 0 },
//   { name: 'Monitor', price: 12000, category: 'Electronics', stock: 8 }
// ];

// function getAvailableProducts() {
//   return products.filter(stocks => stocks.stock > 0);
// }

// console.log(getAvailableProducts());

// function calculateTotalValue() {
//   const total = products.reduce((accum, prices) => accum + prices.price, 0);
//   return total;
// }

// console.log(calculateTotalValue())

// function getElectronicsNames() {
//   return products
//         .filter(category => category.category === 'Electronics')
//         .map(names => names.name);
// }

// console.log(getElectronicsNames());

// class ShoppingCart {
//   #items = [];

//   addItem(name, price) {
//     this.#items.push({ name, price });
//   }

//   removeItem(name) {
//     this.#items = this.#items.filter(item => item.name !== name);
//   }

//   getTotal() {
//     return this.#items.reduce((total, item) => total + item.price, 0);
//   }

//   getItems() {
//     return this.#items;
//   }
// }

// let movies = [
//   { title: 'Inception', rating: 8.8, genre: 'Sci-Fi' },
//   { title: 'The Dark Knight', rating: 9.0, genre: 'Action' },
//   { title: 'Interstellar', rating: 8.6, genre: 'Sci-Fi' },
//   { title: 'Avengers', rating: 8.4, genre: 'Action' },
//   { title: 'Parasite', rating: 8.6, genre: 'Thriller' }
// ];

// function getSciFi() {
//   return movies.filter(movie => movie.genre === 'Sci-Fi');
// }

// function getTopRated() {
//   return movies.filter(topRated => topRated.rating > 8.5);
// }

// function getAverageRating() {
//   const total = movies.reduce((total, rate) => total + rate.rating, 0);
//   const avg = total / movies.length;
//   return avg;
// }
// console.log('');

// console.log(getSciFi());
// console.log('');
// console.log(getTopRated());
// console.log('');
// console.log(getAverageRating());


let products = [
  { name: 'Laptop', price: 45000, category: 'Electronics', stock: 5 },
  { name: 'Mouse', price: 350, category: 'Electronics', stock: 0 },
  { name: 'Chair', price: 1500, category: 'Furniture', stock: 3 },
  { name: 'Desk', price: 3000, category: 'Furniture', stock: 0 },
  { name: 'Headset', price: 800, category: 'Electronics', stock: 10 }
];

class Product{

  constructor(name, price, category, stock) {
    this.name = name
    this.price = price
    this.category = category
    this.stock = stock
  }

  getStatus() {
    return this.stock > 0 ? 'In Stock' : 'Out of Stock';
  }

}

products.forEach(product => {
  const { name, price, category, stock } = product;
  console.log(name, price, category, stock);
});

const product1 = new Product('Laptop', 45000, 'Electronics', 5);
console.log(product1.getStatus());

const inStock = products.filter(product => product.stock > 0);
console.log(inStock)

const newStock = inStock.map(product => ({...product, status: 'In Stock'}));
console.log(newStock);







