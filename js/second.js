document.addEventListener("DOMContentLoaded", function() {

  const sandwich = document.getElementsByClassName('sandwich')[0];
  const nav = document.getElementsByClassName('banner-menu')[0];
  sandwich.addEventListener('click', (e) => {
      nav.classList.toggle('active');
      sandwich.classList.toggle('active');
  });

});