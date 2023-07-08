// Изменение высоты фиксированного меню при скроле страницы
// Получаем элемент меню
let menu = document.querySelector('.header'),
    mobileMenu = document.querySelector('.nav');

// Устанавливаем слушатель события scroll на объекте window
window.addEventListener('scroll', function() {
  // Получаем значение текущего положения скролла
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Изменяем высоту меню в зависимости от значения scrollTop
  if (scrollTop > 0) {
    menu.style.height = '70px';
    menu.style.background = '#fff';
    mobileMenu.style.top = '70px';
  } else if (window.innerWidth <= 380) {
    menu.style.height = '96px';
  } else if (window.innerWidth <= 768) {
    menu.style.height = '117px';
    mobileMenu.style.top = '80px';
  } else {
    menu.style.height = '134px';
    menu.style.background = 'none';
  }
});

//при прокрутке по якарю добавляем отсуп вверх, чтобы меню не наезжало на секцию + плавная прокрутка
// Устанавливаем слушатель события click на элементах с якорными ссылками
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    // Получаем элемент, на который указывает якорная ссылка
    let target = document.querySelector(this.getAttribute('href'));

    // Получаем высоту меню и добавляем ее к положению элемента
    let menuHeight = menu.offsetHeight;
    let targetTop = target.getBoundingClientRect().top + window.pageYOffset - menuHeight;

    // Анимируем переход к элементу
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

const serviceBtn = document.querySelectorAll('.service__btn');
const serviceCards = document.querySelectorAll('.service__item');

for (let i = 0; i < serviceBtn.length; i++) {
  serviceBtn[i].addEventListener('click', function() {
    // Определяем активную кнопку
    let activeBtn = document.querySelector('.service__btn_active');

    // Если текущая кнопка неактивна, то делаем ее активной и скрываем карточки, которые не связаны с данной кнопкой
    if (!this.classList.contains('service__btn_active')) {
      // Если уже есть активная кнопка, то снимаем у нее класс 'service__btn_active' и показываем все карточки
      if (activeBtn) {
        activeBtn.classList.remove('service__btn_active');
        for (let j = 0; j < serviceCards.length; j++) {
          serviceCards[j].classList.remove('hidden');
        }
      }

      // Делаем текущую кнопку активной и скрываем карточки, которые не связаны с данной кнопкой
      this.classList.add('service__btn_active');
      for (let j = 0; j < serviceCards.length; j++) {
        if (serviceCards[j].dataset.btn !== this.dataset.btn) {
          serviceCards[j].classList.add('hidden');
        }
      }
    } else { // Если текущая кнопка активна, то убираем класс активности и у всех кнопок убираем класс .hidden
      this.classList.remove('service__btn_active');
      for (let j = 0; j < serviceCards.length; j++) {
        serviceCards[j].classList.remove('hidden');
      }
    }
  });
}

const burger = document.querySelector('.header__burger'),
    menuItem = document.querySelectorAll('.header__item');

burger.addEventListener('click', () => {
  burger.classList.toggle('header__burger_active');
  mobileMenu.classList.toggle('nav_active');
});

menuItem.forEach(item => {
  item.addEventListener('click', () => {
    burger.classList.toggle('header__burger_active');
    mobileMenu.classList.toggle('nav_active');
  });
});

// При клике вне меню и бургера, меню закрывается
document.addEventListener('click', function(event) {
  if (!mobileMenu.contains(event.target) && !burger.contains(event.target)) {
    mobileMenu.classList.remove('nav_active');
    burger.classList.remove('header__burger_active');
  }
});

let accordion = document.querySelectorAll('.accordion__head');

accordion.forEach(item => {
  item.addEventListener('click', () => {
    accordion.forEach(element => {
      if (element !== item) {
        element.classList.remove('accordion__head_active');
        element.nextElementSibling.classList.remove('accordion__content_active');
      }
    });
    item.classList.toggle('accordion__head_active');
    item.nextElementSibling.classList.toggle('accordion__content_active');
  });
});

const contactsItems = document.querySelectorAll('.contacts__item');
const contactsCards = document.querySelectorAll('.contacts__card');
const contactsCitiesHead = document.querySelector('.contacts__cities-head');
const details = document.querySelector("details");

contactsItems.forEach((item, i) => {
  item.addEventListener('click', function() {
    contactsCards.forEach(card => {
      card.classList.remove('visible');
    });
    contactsCitiesHead.innerHTML = this.innerHTML;
    contactsCards[i].classList.add('visible');
    details.classList.remove("contacts__cities_active");
    details.removeAttribute("open");
    details.classList.add("contacts__cities_active");
  });
});