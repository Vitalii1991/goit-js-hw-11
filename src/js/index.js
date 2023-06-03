import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchCollection } from './fetchCollection';

const refs = {
  form: document.querySelector('.search-form'),
  button: document.querySelector('.form-btn'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  refs.button.classList.add('disabled');
  refs.button.disabled = true;

  const { searchQuery } = e.currentTarget.elements;
  const inputValue = searchQuery.value.toLowerCase();

  fetchCollection(inputValue);
}

new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: '250' });

function createMarkup(arr) {
  return arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
}

export { createMarkup };
export { refs };
