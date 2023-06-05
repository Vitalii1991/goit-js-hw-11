import { fetchCollection } from './fetchCollection';

export { refs };

const refs = {
  form: document.querySelector('.search-form'),
  button: document.querySelector('.form-btn'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.guard'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  refs.button.classList.add('disabled');
  refs.button.disabled = true;

  const { searchQuery } = e.currentTarget.elements;
  const inputValue = searchQuery.value.toLowerCase();

  fetchCollection(inputValue);
}
