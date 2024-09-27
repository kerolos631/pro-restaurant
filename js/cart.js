let cartList = JSON.parse(localStorage.getItem("cart") ?? "[]");
let total = 0;

const cartTable = document.getElementById("cartTable");
const totalElem = document.getElementById("total");
/* ============================================================ */

ShowElems(cartList, cartTable, trElement);
ResetTotal();
SetCartNumber();
/* ============================== components ============================== */
function trElement(obj) {
  const { imgPath, name, price, description, id } = obj;
  return `
    <tr>
        <td class="image">
            <i class="fa-sharp-duotone fa-solid fa-xmark" id="${id}" onclick="ClickHandler(this)"></i>
            <img src="../${imgPath}" alt="">
        </td>
        <td>${name}</td>
        <td></td>
        <td>$${price}</td>
        <td class="num"><input type="number" step="1" value="1"></td>
        <td>$${price}</td>
    </tr>
    `;
}

/* ============================== events ============================== */

function ClickHandler(element) {
  const id = element.getAttribute("id");
  const list = cartList.filter((e) => e.id != id);
  cartList = list;
  localStorage.setItem("cart", JSON.stringify(cartList));
  ShowElems(cartList, cartTable, trElement);
  ResetTotal();
  SetCartNumber();
}

/* ============================== functions ============================== */
function ShowElems(list, container, Element) {
  container.innerHTML = "";
  list.forEach((element) => {
    container.innerHTML += Element(element);
  });
}

function ResetTotal() {
  total = 0;
  cartList.forEach((e) => (total += e.price));
  totalElem.innerText = "$" + total;
  localStorage.setItem("total", `${total}`);
}

function SetCartNumber() {
  const cartIcon = document.querySelector(".header .container ul li.cart");
  const cartNumberOfItems = JSON.parse(
    localStorage.getItem("cart") ?? "[]"
  ).length;
  cartIcon.style.setProperty("--cartNumber", `"${cartNumberOfItems}"`);
}
