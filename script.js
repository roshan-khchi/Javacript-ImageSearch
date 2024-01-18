const key = 'jhbj';
const input = document.getElementById('search-input')
const imagesContainer = document.querySelector('.search-results');
const saerchButton = document.getElementById('search-button');
const showMore = document.getElementById('show-more-button');
let query;
let pageNumber = 1;

function images(pageNumber) {
    fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=12&query=${query}&orientation=landscape&client_id=${key}`)
    .then((value) => {
        return value.json();
    }).then((data) => {
        data.results.forEach((element) => {
            let  html = `<div class="search-result">
                            <img src="${element.urls.regular}" alt="${element.alt_description}">
                            <a href="${element.links.html}" target="_blank">${element.alt_description}</a>
                        </div>`;
                    imagesContainer.innerHTML += html;
        });
    });
}



saerchButton.addEventListener('click', () => {
    imagesContainer.innerHTML = '';
    query = input.value;
    images(pageNumber) 
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        query = input.value;
        if (!(query === '')) {
            imagesContainer.innerHTML = '';
            images(pageNumber)
        }
    }
});
    
showMore.addEventListener('click', () => {
    pageNumber += 1;
    images(pageNumber)
})
    

