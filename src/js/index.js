import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

axios
  .get(
    'https://pixabay.com/api/?key=36965845-2e0bcc0d1faaf1681619d8a12&image_type=photo&orientation=horizontal&safesearch=true'
  )
  .then(resp => console.log(resp.data))
  .catch(err => {
    console.log(err);
    Notify.failure('Error');
  });

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
