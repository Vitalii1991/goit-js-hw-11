// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '36965845-2e0bcc0d1faaf1681619d8a12';

// const options = {
//   headers: {
//     key: API_KEY,
//     q: '',
//     image_type: photo,
//     orientation: horizontal,
//     safesearch: true,
//   },
// };

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCollection(value) {
  return axios
    .get(
      `https://pixabay.com/api/?key=36965845-2e0bcc0d1faaf1681619d8a12&image_type=photo&orientation=horizontal&safesearch=true&q=${value}`
    )
    .then(resp => {
      Notify.success(`Ok, I am looking for a "${value}"!`);
      console.log(resp.data);
    })
    .catch(err => {
      Notify.failure(`${err}`);
    });
}
