const fetchData = () => {
  let elementsDiv = document.getElementById("elements");
  axios
    .get("../Data/PeriodicTable.json")
    .then((response) => {
      parseElements(response.data, elementsDiv);
      searchElem(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const parseElements = (data, elementsDiv) => {
  let categories = [];

  data.map((elemData, index) => {
    // creating div for single Element
    let periodic_element = document.createElement("div");

    // Append Element to container
    periodic_element.setAttribute("class", "periodic_element");
    periodic_element.setAttribute("id", elemData.symbol);

    // add row and column
    periodic_element.style.gridRow = elemData.ypos;
    periodic_element.style.gridColumn = elemData.xpos;

    // get category and concate it into class
    periodic_element.classList.add(
      "cat_" + elemData.category.split(" ").join("_")
    );

    // Append periodic_element to container
    elementsDiv.append(periodic_element);

    // Creating children of Single Element
    // element number div
    let element_number = document.createElement("div");
    element_number.classList.add("element_number");
    element_number.innerHTML = elemData.number;

    // element symbol div
    let element_symbol = document.createElement("div");
    element_symbol.classList.add("element_symbol");
    element_symbol.innerHTML = elemData.symbol;

    // element name div
    let element_name = document.createElement("div");
    element_name.classList.add("element_name");
    element_name.innerHTML = elemData.name;

    // element atomic mass div
    let element_mass = document.createElement("div");
    element_mass.classList.add("element_mass");
    element_mass.innerHTML = elemData.atomic_mass;

    // add category in to array only if it's not in array.
    if (!categories.includes(elemData.category)) {
      categories.push(elemData.category);
    }

    periodic_element.append(
      element_number,
      element_symbol,
      element_name,
      element_mass
    );

    // Redirect to detail page on click od element
    periodic_element.onclick = () => {
      window.location.href = `elementDetail.html?elemSymbol=${elemData.symbol}`;
    };
  });

  // Categories div
  let categoriesDiv = document.getElementById("categories");

  categories.forEach((element) => {
    let singleCat = document.createElement("div");
    singleCat.classList.add(
      "singleCategory",
      `cat_${element.split(" ").join("_")}`
    );
    singleCat.innerHTML = element;
    categoriesDiv.append(singleCat);

    singleCat.setAttribute("type", "button");
    singleCat.setAttribute(
      "onmouseover",
      `ToggleStyleBlock('${`cat_${element.split(" ").join("_")}`}','show');`
    );
    singleCat.setAttribute(
      "onfocus",
      `ToggleStyleBlock('${`cat_${element.split(" ").join("_")}`}','show');`
    );
    singleCat.setAttribute("onmouseout", "ToggleStyleBlock('','hide');");
    singleCat.setAttribute("onblur", "ToggleStyleBlock('','hide');");
  });

  // console.log(categories);
};

// Searching Functiinality
const searchElem = (data) => {
  let searchInp = document.getElementById("search");

  // add event on search
  searchInp.addEventListener("input", () => {
    let searchVal = searchInp.value.trim().toLowerCase();

    // Create ul element
    let ul = document.getElementById("searchItems");
    ul.innerHTML = "";
    console.log(searchVal);

    // matching search value with JSON data
    data.filter((jsonData) => {
      if (
        jsonData.name.toLowerCase().startsWith(searchVal) &&
        searchVal !== ""
      ) {
        console.log(jsonData.name);

        const resultItemLi = document.createElement("li");
        resultItemLi.classList.add("result-item");

        resultItemLi.innerHTML = jsonData.name;
        document.getElementById("searchItems").append(resultItemLi);

        resultItemLi.onclick = () => {
          window.location.href = `elementDetail.html?elemSymbol=${jsonData.symbol}`;
        };
      }
    });
  });
};

document.addEventListener("mousedown", (event) => {
  let ulElem = document.getElementById("searchItems");
  if (!ulElem.contains(event.target)) {
    ulElem.innerHTML = "";
    // document.getElementById("search").value = "";
  }
});

// function ToggleStyleBlock(strClass, showhide) {
//   try {
//     if (showhide == "show") {
//       console.log(
//         "#Elements li:not(#Key):not(." +
//           strClass +
//           ") { background-color: #999; opacity: .5; }"
//       );
//       // Create a style block
//       var styleBlock = document.createElement("style");
//       styleBlock.setAttribute("id", "ShowCat");
//       document.head.appendChild(styleBlock);
//       styleBlock.sheet.insertRule(
//         ".main_container .elements .periodic_element:not(." +
//           strClass +
//           ") { background-color: #999; opacity: .5; }",
//         0
//       );
//       styleBlock.sheet.insertRule(
//         "@media screen and (prefers-color-scheme: dark) { #Elements li:not(#Key):not(." +
//           strClass +
//           ") { background-color: #333; opacity: .5; } }",
//         1
//       );
//       styleBlock.sheet.insertRule(
//         "@media screen and (-ms-high-contrast: active) { #Elements li:not(#Key):not(." +
//           strClass +
//           ") { opacity: .25; } }",
//         2
//       );
//     } else {
//       // var node = document.getElementById("ShowCat");
//       // node.parentNode.removeChild(node);
//     }
//   } catch (e) {
//     console.log("ToggleStyleBlock(): " + e);
//   }
// }

fetchData();
