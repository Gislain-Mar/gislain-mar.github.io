// cursor
var cursor = document.getElementById('cursor')
document.addEventListener('mousemove', (e) => {
  const height = cursor.offsetHeight;
  const width = cursor.offsetWidth;

  cursor.style.left = (e.pageX - width/2) + 'px';
  cursor.style.top = (e.pageY - height/2) + 'px';
})
// experience
const experiences = [["Oct 2023 - now", "Software Developer Apprentice", "During this apprenticeship, I completed different tasks. The first one was to manage the resolivng of security vulnerabilities due to denpendencies in different projects. Indeed, during this task, I planified their updates and did them. Moreover, I managed the updates in other teams in order to ensure the proper functioning of our product. My second task was to develop the buttons of our product as web components. This task allowed to unify our development, to meet our expectations and meet the accessibility expectations who play an essantial role in the interface development."],
                    ["May 2021 - July 2021", "Network Administrator Intern", "test"],
                    ["May 2021 - September 2022", "Cashier as Student Job", "Aside my studies, I worked at E.Leclerc"],
                    ["July 2017 - JULY 2022", "Seasonnal picker", "Aside my studies, I worked as seasonnal"]]

var companyButtons = document.querySelectorAll('.company');
var role = document.getElementById('role');
var date = document.getElementById('date');
var description = document.getElementById('description');

function loadExperienceData(index) {
    role.innerHTML = experiences[index][1];   
    date.innerHTML = experiences[index][0];   
    description.innerHTML = experiences[index][2];   
}

var activeCompanyButton = companyButtons[0];
loadExperienceData(Array.from(companyButtons).indexOf(activeCompanyButton));

companyButtons.forEach(companyButton => {
    companyButton.addEventListener('click', function() {
       activeCompanyButton.classList.remove('active');
        companyButton.classList.add('active');
        loadExperienceData(Array.from(companyButtons).indexOf(companyButton));
        activeCompanyButton = companyButton;
    })
});

const wrapper = document.querySelector('.wrapper');
const carousel = document.querySelector('.carousel');
const firstCardWidth = carousel.querySelector('.card').offsetWidth;
const arrowBtns = document.querySelectorAll('.wrapper i');
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => { 
  carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

carousel.classList.add('no-transition');
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove('no-transition');

arrowBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    carousel.scrollLeft += btn.id == 'left' ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add('dragging');
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return;

  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove('dragging');
}

const infiniteScroll = () => {
  if(carousel.scrollLeft === 0) {
    carousel.classList.add('no-transition');
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove('no-transition');
  } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add('no-transition');
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove('no-transition');
  }

  clearTimeout(timeoutId);
  if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
  if(window.innerWidth < 800 || !isAutoPlay) return;

  timeoutId = setTimeout(() => { carousel.scrollLeft += firstCardWidth }, 2500);
}

autoPlay();

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
carousel.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
wrapper.addEventListener('mouseleave', autoPlay);  
