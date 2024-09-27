const searchInput = document.querySelector(".search>input");
const searchIcon = document.querySelector("i.fa-search");

searchInput.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 13) {
    window.location.replace(`pages/products.html?value=${searchInput.value}`);
  }
  // do something
});

SetCartNumber();

/* ============================== events ============================== */
searchIcon.addEventListener("click", (event) => {
  window.location.replace(`pages/products.html?value=${searchInput.value}`);
});

function SetCartNumber() {
  const cartIcon = document.querySelector(".header .container ul li.cart");
  const cartNumberOfItems = JSON.parse(
    localStorage.getItem("cart") ?? "[]"
  ).length;
  cartIcon.style.setProperty("--cartNumber", `"${cartNumberOfItems}"`);
}
