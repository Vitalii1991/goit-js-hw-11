import { Notify } from 'notiflix';
import { fetchCollection } from './fetchCollection';

export { refs };

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.form-input'),
  button: document.querySelector('.form-btn'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-btn'),
  guard: document.querySelector('.guard'),
};
let inputValue = '';
let page = 11;

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', onInputChange);
refs.loadBtn.addEventListener('click', onBtnLoadClick);

function onFormSubmit(e) {
  e.preventDefault();

  refs.button.classList.add('disabled');
  refs.button.disabled = true;

  const { searchQuery } = e.currentTarget.elements;
  inputValue = searchQuery.value.toLowerCase();

  fetchCollection(inputValue, page);

  setTimeout(() => {
    refs.loadBtn.hidden = false;
  }, 2000);
}

function onInputChange(e) {
  refs.gallery.innerHTML = '';

  const { value } = e.target;

  if (value === '' || value) {
    refs.button.classList.remove('disabled');
    refs.button.disabled = false;

    refs.loadBtn.hidden = true;
  }
}

function onBtnLoadClick() {
  page += 1;
  fetchCollection(inputValue, page);

  if (page >= 13) {
    refs.loadBtn.hidden = true;
    Notify.info('This is the last page!');
  }
}
