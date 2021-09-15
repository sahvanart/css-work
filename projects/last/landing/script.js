const btnHamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');

btnHamburger.addEventListener('click', function(){
  console.log('click hamburger');

  if(header.classList.contains('open')){ // Close Hamburger Menu
    body.classList.remove('noscroll');
    header.classList.remove('open');    
    fadeElems.forEach(function(element){
      element.classList.remove('fade-in');
      element.classList.add('fade-out');
    });
    
  }
  else { // Open Hamburger Menu
    body.classList.add('noscroll');
    header.classList.add('open');
    fadeElems.forEach(function(element){
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    });

  }  
});

/* 
The first time the page is loaded, the color mode set on the preference 
is used and set as 'default' in the local storage. 
Changing the default preferences works the same way as changing the 
color mode using the buttons, if the page is loaded.
When the page is reloaded, whatever is the value set on the local storage
has precedence over the values in the preference. If the preference
changed after the page was visited - and the page is not loaded - 
the last value saved on the local storage is loaded. 
*/


const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');


const setDarkMode = () => {
  document.querySelector('header').classList.remove('light');
  document.querySelector('header').classList.add('dark');
  document.querySelector('section.features').classList.remove('light');
  document.querySelector('section.features').classList.add('dark');
  document.querySelector('section.hero').classList.remove('light');
  document.querySelector('section.hero').classList.add('dark');
  document.querySelector('section.articles').classList.remove('light');
  document.querySelector('section.articles').classList.add('dark');
  localStorage.setItem('colorMode', 'dark');
};

const setLightMode = () => {
  document.querySelector('header').classList.remove('dark');
  document.querySelector('header').classList.add('light');
  document.querySelector('section.features').classList.remove('dark');
  document.querySelector('section.features').classList.add('light');
  document.querySelector('section.hero').classList.remove('dark');
  document.querySelector('section.hero').classList.add('light');
  document.querySelector('section.articles').classList.remove('light');
  document.querySelector('section.articles').classList.add('dark');
  localStorage.setItem('colorMode', 'light');
};

const colorModeFromLocalStorage = () => {
  return localStorage.getItem('colorMode');
};

const colorModeFromPreferences = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
              ? 'dark'
              : 'light' // If preference is set or does not match anything (light is default)
};

// when the inputs are clicked, check which radio button is checked and change the color
const radioButtons = document.querySelectorAll('.toggle__wrapper input');
radioButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    darkButton.checked ? setDarkMode() : setLightMode();
  });
});

// when the prefers-color-scheme changes, this event will be emitted
// event reflects the media query, if it matches, the new color is dark, else it is light
window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        event.matches ? darkButton.click() : lightButton.click();
      });
      
const loadAndUpdateColor = () => {
  // local storage has precendence over the prefers-color-scheme
  const color = colorModeFromLocalStorage() || colorModeFromPreferences();
  color == 'dark' ? darkButton.click() : lightButton.click();
}; 
     
// Load the right color on startup - localStorage has precedence
loadAndUpdateColor();
