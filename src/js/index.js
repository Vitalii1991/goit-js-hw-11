import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchCollection } from './fetchCollection';

const refs = {
  form: document.querySelector('.search-form'),
  button: document.querySelector('.form-btn'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onFormSubmit);

new SimpleLightbox('.gallery');

function onFormSubmit(e) {
  e.preventDefault();

  refs.button.classList.add('disabled');
  refs.button.disabled = true;

  const { searchQuery } = e.currentTarget.elements;
  const inputValue = searchQuery.value.toLowerCase();

  fetchCollection(inputValue);
}

function createMarkup(arr) {
  return arr
    .map(({ largeImageURL, tags, likes, views, comments, downloads }) => {
      const markup = `<div class="photo-card">
      <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>${likes}</b>
        </p>
        <p class="info-item">
          <b>${views}</b>
        </p>
        <p class="info-item">
          <b>${comments}</b>
        </p>
        <p class="info-item">
          <b>${downloads}</b>
        </p>
      </div>
    </div>`;
    })
    .join('');
}
