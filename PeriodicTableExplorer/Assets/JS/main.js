const fetchData = () => {
  let elementsDiv = document.getElementById("elements");
  axios
    .get("../Data/PeriodicTable.json")
    .then((response) => {
      parseElements(response.data, elementsDiv);
    })
    .catch((err) => {
      console.log(err);
    });
};

const parseElements = (data, elementsDiv) => {
  console.log(data);

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

    periodic_element.append(
      element_number,
      element_symbol,
      element_name,
      element_mass
    );

    periodic_element.onclick = () => {
      window.location.href = `elementDetail.html?elemSymbol=${elemData.symbol}`;
    };
  });
};

fetchData();
