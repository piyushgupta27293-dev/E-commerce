const products = [
  { id: 1, name: "Smart Watch", price: 1999 },
  { id: 2, name: "Headphones", price: 2499 },
  { id: 3, name: "Sports Shoes", price: 1499 },
  { id: 4, name: "Backpack", price: 999 },
];

let cart = [];

function addToCart(id) {
  const product = products.find((p) => p.id === id);

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();

  alert(product.name + " added to cart!");
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalElement = document.getElementById("total");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItems.textContent = "Your cart is empty.";
  }

  cart.forEach((item) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    const name = document.createElement("span");
    name.textContent = item.name + " - ₹" + item.price;

    const quantity = document.createElement("span");
    quantity.textContent = "Qty: " + item.quantity;

    const minus = document.createElement("button");
    minus.textContent = "-";
    minus.onclick = () => changeQuantity(item.id, -1);

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.onclick = () => changeQuantity(item.id, 1);

    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.onclick = () => removeItem(item.id);

    div.append(name, minus, quantity, plus, remove);
    cartItems.appendChild(div);
  });

  cartCount.textContent = count;
  totalElement.textContent = total;
}

function changeQuantity(id, amount) {
  const item = cart.find((p) => p.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((p) => p.id !== id);
  }

  updateCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

function showCart() {
  document
    .getElementById("cart-section")
    .scrollIntoView({ behavior: "smooth" });
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Order placed successfully! Thank you for shopping.");

  cart = [];
  updateCart();
}

// Product Search
document.getElementById("search").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();

  document.querySelectorAll(".product-card").forEach((card) => {
    const name = card.dataset.name.toLowerCase();

    card.style.display = name.includes(searchValue) ? "block" : "none";
  });
});
