const toggleButton = document.getElementById('toggleButton');
const userLogo = document.getElementById('userLogo');
const header = document.getElementById('header');
const headerNav = document.getElementById('headerNav');


toggleButton.addEventListener('click', event => {
  event.stopImmediatePropagation();
  event.preventDefault();
  toggleClass(header);
  toggleClass(headerNav);
  toggleElement(userLogo);
});

const toggleElement = element => {
  element.style.display === 'none' 
    ? element.style.display = 'flex'
    : element.style.display = 'none';  
};

const toggleClass = element => {
  element.classList.toggle('responsive');
};