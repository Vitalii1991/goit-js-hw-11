import { fetchCollection } from './fetchCollection';
// import { fetchCollectionMore } from './fetchCollection';

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
refs.input.addEventListener('change', onInputChange);
refs.loadBtn.addEventListener('click', onBtnLoadClick);

function onFormSubmit(e) {
  e.preventDefault();

  refs.button.classList.add('disabled');
  refs.button.disabled = true;

  const { searchQuery } = e.currentTarget.elements;
  inputValue = searchQuery.value.toLowerCase();

  fetchCollection(inputValue, page);
}

function onInputChange(e) {
  refs.gallery.innerHTML = '';

  const { value } = e.target;

  if (value === '' || value) {
    refs.button.classList.remove('disabled');
    refs.button.disabled = false;
  }
}

function onBtnLoadClick() {
  if (page === 12) {
    refs.loadBtn.hidden = true;
  }

  page += 1;
  fetchCollection(inputValue, page);
}
