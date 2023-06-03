import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
  console.log(inputValue);

  fetchCollection(inputValue);
}

function fetchCollection(value) {
  return axios
    .get(
      `https://pixabay.com/api/?key=36965845-2e0bcc0d1faaf1681619d8a12&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&q=${value}`
    )
    .then(resp => {
      Notify.success(`Ok, I am looking for a "${value}"!`);
      console.log(resp.data);
    })
    .catch(err => {
      Notify.failure(`${err}`);
    });
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
