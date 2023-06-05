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

async function fetchCollection(value, page) {
  return await axios
    .get(`${BASE_URL}?q=${value}&page=${page}`, options)
    .then(resp => {
      console.log(resp.data);

      if (page === 1 && resp.data.totalHits !== 0) {
        Notify.success(`Ok, looking for a "${value}"!`);
      }

      if (resp.data.totalHits === 0) {
        throw new Error(`"${value}" not found! Enter something else!`);
      }

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
