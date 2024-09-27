/* ============================== lists ============================== */
const AllBurgers = [
  {
    id: 1,
    name: "juicy burger",
    price: 18,
    imgPath: "photo/burger1.jpg",
    category: "beef",
    description: "beefpatty,cheddercheese,grilled onions&tomatos",
  },
  {
    id: 8,
    name: "beef bacon",
    price: 20,
    imgPath: "photo/burger2.jpg",
    category: "beef",
    description: "bacone,cheddercheese,grilled onions&tomatos",
  },
  {
    id: 2,
    name: "creamy mushroom",
    price: 22,
    imgPath: "photo/burger3.jpg",
    category: "beef mushroom",
    description:
      "beef patty, cream of mushroom,cheddercheese,grilled onions&tomatos",
  },
  {
    id: 3,
    name: "hawaiian burger",
    price: 12,
    imgPath: "photo/burger4.jpg",
    category: "beef",
    description: "beef patty,cheddercheese,grilled onions&tomatos,mayo",
  },
  {
    id: 4,
    name: "crispy chicken",
    price: 12,
    imgPath: "photo/burger-5.jpeg",
    category: "chicken",
    description:
      "crispy chicken, cream of mushroom,cheddercheese,grilled onions&tomatos",
  },
  {
    id: 5,
    name: "BBQ chicken",
    price: 20,
    imgPath: "photo/burger1.jpg",
    category: "chicken mushroom",
    description:
      "grilled chicken, cream of mushroom,cheddercheese,grilled onions&tomatos",
  },
  {
    id: 6,
    name: "spicy chicken",
    price: 16,
    imgPath: "photo/burger4.jpg",
    category: "chicken",
    description:
      "spicy chicken, cream of mushroom,cheddercheese,grilled onions&tomatos",
  },
  {
    id: 7,
    name: "creamy mushroom",
    price: 16,
    imgPath: "photo/burger-8.jpeg",
    category: "chicken mushroom",
    description:
      "spicy chicken, cream of mushroom,cheddercheese,grilled onions&tomatos",
  },
];

const AllDeserts = [
  {
    id: 101,
    name: "chocolate mix",
    price: 4,
    imgPath: "photo/dessert1.jpg",
    category: "desert",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, incidunt?",
  },
  {
    id: 102,
    name: "strawberry mix",
    price: 8,
    imgPath: "photo/dessert2.jpg",
    category: "desert",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, incidunt?",
  },
  {
    id: 103,
    name: "apple pie",
    price: 8,
    imgPath: "photo/dessert3.jpg",
    category: "desert",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, incidunt?",
  },
  {
    id: 104,
    name: "sunday waffle",
    price: 7,
    imgPath: "photo/dessert4.jpg",
    category: "desert",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, incidunt?",
  },
];

let burgers = [];
let deserts = [];
let categories = [];
/* ============================================================ */

const searchInput = document.querySelector(".search>input");
const searchIcon = document.querySelector("i.fa-search");
const burgersContainer = document.getElementById("burgersID");
const desertContainer = document.getElementById("desertID");
const priceInp = document.getElementById("priceInp");
const priceLabel = document.getElementById("priceLabel");

const urlParams = new URLSearchParams(window.location.search);
const valueParam = urlParams.get("value");
searchInput.value = valueParam;
SetCartNumber();

/* ============================== components ============================== */

const Box = (obj) => {
  const { imgPath, name, price, description, id } = obj;
  return `
    <div class="box" class="beef">
        <img src="../${imgPath}" alt="">
        <h4>${name}</h4>
        <p>${description}</p>
        <div class="price">
            <p class="money">$${price}</p>
            <span class="buy" onclick="ClickHandler(this)" objString='${JSON.stringify(
              obj
            )}'>+ add to cart</span>
        </div>
    </div>`;
};
/* ============================================================ */

ShowBoxElems((burgers = Search(AllBurgers, valueParam)), burgersContainer);
ShowBoxElems((deserts = Search(AllDeserts, valueParam)), desertContainer);

/* ============================== events ============================== */

searchInput.addEventListener("change", (event) => {
  const st = searchInput.value;
  ShowBoxElems((burgers = Search(AllBurgers, st)), burgersContainer);
  ShowBoxElems((deserts = Search(AllDeserts, st)), desertContainer);
});

searchIcon.addEventListener("click", (event) => {
  window.location.replace(`?value=${searchInput.value}`);
});

// window.ChangeHandler = ChangeHandler;
function ChangeHandler(element) {
  if (element.checked) {
    categories.push(element.value);
  } else {
    categories = categories.filter((cat) => cat != element.value);
  }
  if (categories.length == 0) ShowBoxElems(burgers, burgersContainer);
  else ShowBoxElems(FilterItems(burgers), burgersContainer);
}

priceInp.addEventListener("change", (event) => {
  const value = priceInp.value;
  priceLabel.innerText = "$" + value;
  ShowBoxElems(FilterByPrice(value, burgers), burgersContainer);
  ShowBoxElems(FilterByPrice(value, deserts), desertContainer);
});

function ClickHandler(element) {
  obj = JSON.parse(element.getAttribute("objString"));
  const cartList = JSON.parse(localStorage.getItem("cart") ?? "[]");
  cartList.push(obj);
  localStorage.setItem("cart", JSON.stringify(cartList));
  SetCartNumber();
}
/* ============================== functions ============================== */
function ShowBoxElems(list, container) {
  container.innerHTML = "";
  list.forEach((element) => {
    container.innerHTML += Box(element);
  });
}

function Search(arr, searchString) {
  const reg = new RegExp(searchString?.toLowerCase(), "gi"),
    result = [];

  arr.forEach((val) => {
    const label = val.name;
    if (reg.test(label)) {
      result.push(val);
    }
  });
  return result;
}

/*function FilterItems(list) {
  const arr = [];
  categories.forEach((cat) => {
    for (let i = 0; i < list.length; i++) {
      let bool = false;
      if (IsExist(list[i].category.split(" "), cat)) {
        bool = true;
        console.log(list[i].category, cat, bool);
      }
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].id === list[i].id) {
          bool = false;
        }
      }
      if (bool) arr.push(list[i]);
    }
  });
  return arr;
  function IsExist(arr, string) {
    var bool = false;
    arr.forEach((item) => {
      if (item == string) bool = true;
    });
    return bool;
  }
}*/

function FilterItems(list) {
  let n1 = categories.length;
  const arr = [];
  list.forEach((item) => {
    let n2 = 0;
    categories.forEach((cat) => {
      if (IsExist(item.category.split(" "), cat)) n2++;
    });
    if (n1 === n2) arr.push(item);
  });
  return arr;
  function IsExist(arr, string) {
    var bool = false;
    arr.forEach((item) => {
      if (item == string) bool = true;
    });
    return bool;
  }
}

function FilterByPrice(price, list) {
  return list.filter((item) => item.price <= price);
}

function SetCartNumber() {
  const cartIcon = document.querySelector(".header .container ul li.cart");
  const cartNumberOfItems = JSON.parse(
    localStorage.getItem("cart") ?? "[]"
  ).length;
  cartIcon.style.setProperty("--cartNumber", `"${cartNumberOfItems}"`);
}
