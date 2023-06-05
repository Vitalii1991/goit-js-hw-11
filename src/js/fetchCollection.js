import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './createMarkup';
import { refs } from './index';

export { fetchCollection };

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36965845-2e0bcc0d1faaf1681619d8a12';
const options = {
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
};
// const parameters = {
//   root: null,
//   rootMargin: '300px',
//   threshold: 0,
// };
// let page = 1;
// let observer = new IntersectionObserver(callback, parameters);

// function callback(entries, observer) {
//   console.log(entries);

//   entries.forEach(entry => {
//     console.log(entry);

//     fetchCollection();
//   });
// }

function fetchCollection(value) {
  return axios
    .get(`${BASE_URL}?q=${value}`, options)
    .then(resp => {
      Notify.success(`Ok, I am looking for a "${value}"!`);
      console.log(resp.data);

      refs.gallery.insertAdjacentHTML(
        'beforeend',
        createMarkup(resp.data.hits)
      );

      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: '250',
      });
    })
    .catch(err => {
      Notify.failure(`${err}`);
    });
}
