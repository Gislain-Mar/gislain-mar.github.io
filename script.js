const experience = [["CEGID", "Oct 2023 - now", "IT Apprentice", "I’m working on various analysis topics at user level. And I’m helping to develop new functionalities and modernize."],
                    ["SDIS 26", "May 2021 - July 2021", "IT intern", "test"],
                    ["E.Leclerc", "May 2021 - September 2022", "Student Job", "Aside my studies, I worked at E.Leclerc"],
                    ["Amblard", "July 2017 - JULY 2022", "Summer Job", "Aside my studies, I worked as seasonnal"]]

var companyButtons = document.querySelectorAll('.company');
var companyName = document.getElementById('company');
var role = document.getElementById('role');
var date = document.getElementById('date');
var descriptif = document.getElementById('descriptif');

function loadData(index) {
    companyName.innerHTML = experience[index][0];   
    role.innerHTML = experience[index][2];   
    date.innerHTML = experience[index][1];   
    descriptif.innerHTML = experience[index][3];   
}

var activeCompanyButton = companyButtons[0];
companyButtons.forEach(companyButton => {
    companyButton.addEventListener('click', function() {
       activeCompanyButton.classList.remove('active');
        companyButton.classList.add('active');
        loadData(Array.from(companyButtons).indexOf(companyButton));
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
