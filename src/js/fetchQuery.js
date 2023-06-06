import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36965845-2e0bcc0d1faaf1681619d8a12';
const PER_PAGE = 40;

async function fetchQuery(value, page) {
  const options = {
    params: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      q: value,
      page,
    },
  };

  return await axios.get(BASE_URL, options);
}

export { fetchQuery, PER_PAGE };
