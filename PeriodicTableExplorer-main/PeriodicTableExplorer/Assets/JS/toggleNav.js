const nav_mobile = document.querySelector(".navbar-mobile");
const header = document.querySelector(".header");

const toggleNavbar = () => {
  header.classList.toggle("active");
};

nav_mobile.addEventListener("click", () => toggleNavbar());
