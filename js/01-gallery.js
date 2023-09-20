import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('.gallery');

const imageHtml = galleryItems.map((img) => {
    return `
    <li class="gallery__item">
        <a class="gallery__link" href="${img.original}">
            <img
                class="gallery__image"
                src="${img.preview}"
                data-source="${img.original}"
                alt="${img.description}"
            />
        </a>
    </li>
    `;
  });

galleryEl.insertAdjacentHTML("beforeend", imageHtml.join(''));

galleryEl.addEventListener('click', onImageClick);

function onImageClick(event){
    event.preventDefault();
    if(event.target.nodeName !== 'IMG') return;

    const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" alt="${event.target.dataset.description}">`);

    instance.show();

    galleryEl.addEventListener('keydown', closeModalEscape)

    function closeModalEscape(event){
        if(event.code === "Escape"){
            instance.close();
            galleryEl.removeEventListener('keydown', closeModalEscape);
        }
    }
}
