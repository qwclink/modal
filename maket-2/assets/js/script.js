const modals = document.querySelectorAll('.modal'),
      cardBtns = document.querySelectorAll('.card__product'),
      modalCloses = document.querySelectorAll('.modal__close');

let activeModal = (index) => {
  modals[index].classList.add('active-modal');

  // При открытии модального окна сбрасываем вкладку на "Вход" (если есть переключатели)
  const tabs = modals[index].querySelectorAll('.modal__tab');
  const forms = modals[index].querySelectorAll('.modal__form');

  if(tabs.length && forms.length) {
    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.classList.remove('modal__form--active'));

    // Активируем вкладку "Вход" по умолчанию
    const loginTab = modals[index].querySelector('.modal__tab[data-tab="login"]');
    const loginForm = modals[index].querySelector('.modal__form[data-content="login"]');
    if(loginTab && loginForm) {
      loginTab.classList.add('active');
      loginForm.classList.add('modal__form--active');
    }
  }
}

/* Show modal */
cardBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    activeModal(i);
  });
});

/* Hide modal */
modalCloses.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    modals.forEach(modal => {
      modal.classList.remove('active-modal');
    });
  });
});

/* Hide modal on background click */
modals.forEach(modal => {
  modal.addEventListener('click', () => {
    modal.classList.remove('active-modal');
  });
});

/* Don't hide modal on card click (by event propagation) */
const modalCards = document.querySelectorAll('.modal__card');
modalCards.forEach(modalCard => {
  modalCard.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

/* Tabs switching logic */
modals.forEach(modal => {
  const tabs = modal.querySelectorAll('.modal__tab');
  const forms = modal.querySelectorAll('.modal__form');

  if(tabs.length && forms.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        // Убираем активность у всех вкладок и форм
        tabs.forEach(t => t.classList.remove('active'));
        forms.forEach(f => f.classList.remove('modal__form--active'));

        // Активируем выбранную вкладку и форму
        tab.classList.add('active');
        const activeForm = modal.querySelector(`.modal__form[data-content="${target}"]`);
        if(activeForm) activeForm.classList.add('modal__form--active');
      });
    });
  }
});