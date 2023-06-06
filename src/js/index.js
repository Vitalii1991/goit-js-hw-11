import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import { fetchQuery, PER_PAGE } from './fetchQuery';
import { createMarkup } from './createMarkup';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.form-input'),
  button: document.querySelector('.form-btn'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
});
let value = '';
let page = 1;

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', onInputChange);
refs.loadBtn.addEventListener('click', onBtnLoadClick);

function onFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  refs.button.classList.add('disabled');
  refs.button.disabled = true;

  value = refs.input.value.trim();
  console.log(value);

  if (value === '') {
    Notify.info(`You didn't write enything!`);
  } else {
    fetchCollection();
  }
}

function onInputChange(e) {
  refs.gallery.innerHTML = '';
  refs.loadBtn.hidden = true;

  const { value } = e.target;

  if (value === '' || value) {
    refs.button.classList.remove('disabled');
    refs.button.disabled = false;

    page = 1;
  }
}

function onBtnLoadClick() {
  page += 1;
  console.log('Page:', page);

  fetchCollection();
}

function fetchCollection() {
  return fetchQuery(value, page)
    .then(resp => {
      console.log(resp.data);
      const lastPage = Math.ceil(resp.data.totalHits / PER_PAGE);

      if (resp.data.totalHits > 0) {
        if (page === 1) {
          Notify.success(`Ok, looking for a "${value}"!`);
        }

        refs.gallery.insertAdjacentHTML(
          'beforeend',
          createMarkup(resp.data.hits)
        );

        setTimeout(() => {
          refs.loadBtn.hidden = false;
        }, 2000);
      } else {
        Notify.warning(`"${value}" not found! Enter something else!`);

        refs.loadBtn.hidden = true;
      }

      lightbox.refresh();

      if (page === lastPage) {
        refs.loadBtn.hidden = true;
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => {
      Notify.failure(`${err}`);
    });
}
