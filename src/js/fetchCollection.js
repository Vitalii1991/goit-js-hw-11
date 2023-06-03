import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

function fetchCollection(value) {
  return axios
    .get(`${BASE_URL}?q=${value}`, options)
    .then(resp => {
      Notify.success(`Ok, I am looking for a "${value}"!`);
      console.log(resp.data);
    })
    .catch(err => {
      Notify.failure(`${err}`);
    });
}

export { fetchCollection };
