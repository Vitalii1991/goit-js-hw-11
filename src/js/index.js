import { fetchCollection } from './fetchCollection';

export { refs };

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.form-input'),
  button: document.querySelector('.form-btn'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.guard'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('change', onInputChange);

function onFormSubmit(e) {
  e.preventDefault();

  refs.button.classList.add('disabled');
  refs.button.disabled = true;

  const { searchQuery } = e.currentTarget.elements;
  const inputValue = searchQuery.value.toLowerCase();

  fetchCollection(inputValue);
}

function onInputChange(e) {
  refs.gallery.innerHTML = '';

  const { value } = e.target;

  if (value === '' || value) {
    refs.button.classList.remove('disabled');
    refs.button.disabled = false;
  }
}
