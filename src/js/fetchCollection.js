import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36965845-2e0bcc0d1faaf1681619d8a12';

async function fetchCollection(value, page) {
  const options = {
    params: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      q: value,
      page,
    },
  };

  return await axios.get(BASE_URL, options);
}

export { fetchCollection };
