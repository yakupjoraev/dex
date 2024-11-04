// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.nav')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.nav__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu();




// Аккордеон
const accordionItems = document.querySelectorAll('[data-accordion-item]');
let openAccordion = null; // переменная для хранения ссылки на открытый аккордеон

function toggleAccordion() {
  if (openAccordion && openAccordion !== this) {
    // Если есть открытый аккордеон, который не совпадает с текущим
    openAccordion.classList.remove('active'); // закрыть его
    const openAccordionContent = openAccordion.nextElementSibling;
    if (openAccordionContent) {
      // если у аккордеона есть содержимое
      openAccordionContent.style.maxHeight = null; // сбросить высоту контента
    }
  }

  this.classList.toggle('active'); // открыть или закрыть текущий аккордеон

  const content = this.nextElementSibling;
  if (content) {
    // если у аккордеона есть содержимое
    if (content.style.maxHeight) {
      // Если контент открыт, закрыть его
      content.style.maxHeight = null;
    } else {
      // Если контент закрыт, открыть его
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  openAccordion = this; // запомнить ссылку на открытый аккордеон
}


accordionItems.forEach(item => item.addEventListener('click', toggleAccordion));

function tabs() {
  const container = document.querySelector('.tab');

  if (!container) {
    return null
  }

  const tabButtons = document.querySelectorAll('.tab__btn');
  const tabContents = document.querySelectorAll('.tab__content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab-btn');

      // Удаляем класс active у всех кнопок и контента
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Добавляем класс active к выбранной кнопке и соответствующему контенту
      button.classList.add('active');
      document.querySelector(`.tab__content[data-tab-content="${target}"]`).classList.add('active');
    });
  });
}

tabs();

function subTabs() {
  const container = document.querySelector('.subtabs');

  if (!container) {
    return null
  }

  const tabButtons = document.querySelectorAll('.subtabs__btn');
  const tabContents = document.querySelectorAll('.subtabs__content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-subtabs-btn');

      // Удаляем класс active у всех кнопок и контента
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Добавляем класс active к выбранной кнопке и соответствующему контенту
      button.classList.add('active');
      document.querySelector(`.subtabs__content[data-subtabs-content="${target}"]`).classList.add('active');
    });
  });
}

subTabs();

function customDropdown(dropdown) {
  const toggleDiv = dropdown.querySelector('.dropdown-toggle');
  const hiddenInput = dropdown.querySelector('.dropdown-value');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  const dropdownItems = dropdown.querySelectorAll('.dropdown-menu li');

  if (!toggleDiv || !hiddenInput || !dropdownMenu || dropdownItems.length === 0) {
    return null;
  }

  // Установка выбранного элемента при загрузке страницы
  function setSelectedItem() {
    const selectedItem = dropdown.querySelector('.dropdown-menu li.dropdown-selected');
    if (selectedItem) {
      const imgSrc = selectedItem.querySelector('img')?.src || '';
      const text = selectedItem.textContent.trim();
      toggleDiv.innerHTML = imgSrc ? `<img src="${imgSrc}" width="20" height="20" alt="icon"> ${text}` : text;
      hiddenInput.value = selectedItem.getAttribute('data-value');
    }
  }

  // Обработчик клика на toggleDiv
  toggleDiv.addEventListener('click', function () {
    if (dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';
      dropdown.classList.remove('open');
      toggleDiv.style.borderColor = 'transparent';
    } else {
      dropdownMenu.style.display = 'block';
      dropdown.classList.add('open');
      toggleDiv.style.borderColor = 'var(--green-2)';
    }
  });

  // Обработчик клика на элементы списка
  dropdownItems.forEach(function (item) {
    item.addEventListener('click', function () {
      // Удаляем класс dropdown-selected у всех элементов
      dropdownItems.forEach(function (el) {
        el.classList.remove('dropdown-selected');
      });
      // Добавляем класс dropdown-selected выбранному элементу
      this.classList.add('dropdown-selected');
      // Обновляем значение toggleDiv и hiddenInput
      const imgSrc = this.querySelector('img')?.src || '';
      const text = this.textContent.trim();
      toggleDiv.innerHTML = imgSrc ? `<img src="${imgSrc}" width="20" height="20" alt="icon"> ${text}` : text;
      hiddenInput.value = this.getAttribute('data-value');
      // Скрываем выпадающий список
      dropdownMenu.style.display = 'none';
      dropdown.classList.remove('open');
      toggleDiv.style.borderColor = 'transparent';
    });
  });

  // Закрываем выпадающий список при клике вне его
  document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
      dropdownMenu.style.display = 'none';
      dropdown.classList.remove('open');
      toggleDiv.style.borderColor = 'transparent';
    }
  });

  // Вызываем функцию при загрузке страницы
  setSelectedItem();
}

// Инициализация кастомных выпадающих списков
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.custom-dropdown').forEach(function (dropdown) {
    customDropdown(dropdown);
  });
});


const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const modals = document.querySelectorAll('.modal');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modalId;
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
  });
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.classList.remove('show');
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
  }
});
