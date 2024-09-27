const cartList = JSON.parse(localStorage.getItem("cart") ?? "[]");
const total = JSON.parse(localStorage.getItem("total") ?? "0");
const productsCont = document.getElementById("products-cont");
const totalElem = document.getElementById("total");

/* ============================================================ */

ShowElems(cartList, productsCont, ProductElement);
totalElem.innerText = "$" + total;
SetCartNumber();
/* ============================== components ============================== */
function ProductElement(obj) {
  const { imgPath, name, price, description, id } = obj;
  return `
  <div class="product">
        <img src="../${imgPath}" alt="">
        <p>${name} *1</p>
        <span>$${price}.00</span>
    </div>`;
}

/* ============================== functions ============================== */
function ShowElems(list, container, Element) {
  container.innerHTML = "";
  list.forEach((element) => {
    container.innerHTML += Element(element);
  });
}

function SetCartNumber() {
  const cartIcon = document.querySelector(".header .container ul li.cart");
  const cartNumberOfItems = JSON.parse(
    localStorage.getItem("cart") ?? "[]"
  ).length;
  cartIcon.style.setProperty("--cartNumber", `"${cartNumberOfItems}"`);
}
