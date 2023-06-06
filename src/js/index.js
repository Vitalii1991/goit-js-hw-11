import { Notify } from 'notiflix';
import { fetchCollection } from './fetchCollection';

export { refs };

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.form-input'),
  button: document.querySelector('.form-btn'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
  guard: document.querySelector('.guard'),
};
let inputValue = '';
let page = 1;

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
    page = 1;
  }
}

function onBtnLoadClick() {
  page += 1;
  console.log('Page:', page);
  fetchCollection(inputValue, page);

  if (page >= 13) {
    refs.loadBtn.hidden = true;
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
