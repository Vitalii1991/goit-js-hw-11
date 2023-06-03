import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchCollection } from './pixabay-api';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onFormSubmit);

new SimpleLightbox('.gallery');

function onFormSubmit(e) {
  e.preventDefault();

  const { searchQuery } = e.currentTarget.elements;
  const inputValue = searchQuery.value.toLowerCase();
  console.log(inputValue);

  fetchCollection(inputValue);
}

function createMarkup() {
  const markup = `<div class="photo-card">
    <img src="" alt="" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
      </p>
      <p class="info-item">
        <b>Views</b>
      </p>
      <p class="info-item">
        <b>Comments</b>
      </p>
      <p class="info-item">
        <b>Downloads</b>
      </p>
    </div>
  </div>`;

  refs.gallery.innerHTML = markup;
}
