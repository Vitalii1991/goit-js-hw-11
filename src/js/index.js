import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchCollection } from './fetchCollection';
import { createMarkup } from './createMarkup';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.form-input'),
  button: document.querySelector('.form-btn'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};
let page = 1;

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', onInputChange);
refs.loadBtn.addEventListener('click', onBtnLoadClick);

function onFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  refs.button.classList.add('disabled');
  refs.button.disabled = true;

  const value = refs.input.value;

  fetchCollection(value, page)
    .then(resp => {
      if (page === 1 && resp.data.totalHits > 0) {
        Notify.success(`Ok, looking for a "${value}"!`);

        refs.gallery.insertAdjacentHTML(
          'beforeend',
          createMarkup(resp.data.hits)
        );
      } else {
        Notify.warning(`"${value}" not found! Enter something else!`);
      }

      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: '250',
      });
    })
    .catch(err => {
      Notify.failure(`${err}`);
    });
  setTimeout(() => {
    refs.loadBtn.hidden = false;
  }, 2000);
}

function onInputChange(e) {
  refs.gallery.innerHTML = '';
  const { value } = e.target;

  if (value === '' || value) {
    refs.button.classList.remove('disabled');
    refs.button.disabled = false;

    refs.loadBtn.hidden = true;
    page = 1;
  }
}

function onBtnLoadClick() {
  page += 1;
  console.log('Page:', page);
  fetchCollection(inputValue, page);

  if (page >= 13) {
    refs.loadBtn.hidden = true;
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
