
const global = {
    currentPage: window.location.pathname,
};

async function displayEventDetails() {
    const eventID = document.location.search.split('=')[1];
    const events = await fetching();
    events.forEach((event) => { 
        if (event.id == eventID) {
            showSpinner();
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="details-top">
                <div>
                    <img
                    src="${event.imglink}"
                    class="card-img-top"
                    alt="${event.title}"
                    />
                </a>
                </div>
                <div>
                    <h2>${event.title}</h2>
                    <p class="text-muted">Date: ${event.date}</p>
                    <p>
                    ${event.info}
                    </p>
                </div>
                </div> `
            document.querySelector('#event-details').appendChild(div);
        }
        hideSpinner();
    });   
} 

// Highlight Active Link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    })
}

async function displaySlider() {
    const events = await fetching();
    events.forEach((event) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
            <a href="event-details.html?id=${event.id}">
              <img src="${event.imglink}" alt="${event.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${event.title}
            </h4>`;    
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    })
}

async function fetching() {
    showSpinner();
    const response = await fetch("events.json");
    const data = await response.json();
    hideSpinner();
    return data;
}

async function displayEvents() {
    document.querySelector('.home-nav').classList.add('active');
    const events  = await fetching();
    events.forEach((event) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML =
        `<a href="event-details.html?id=${event.id}">
            <img
              src="${event.imglink}"
              class="card-img-top"
              alt="${event.title}"
            />
        </a>
        <div class="card-body">
            <h5 class="card-title">${event.title}</h5>
            <p class="card-text">
                <small class="text-muted">Date:  ${event.date}</small>
            </p>
        </div>`
        document.querySelector('#club-activites').appendChild(div);
    })
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

function showAlert(message, className) {
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);
    setTimeout(()=>alertEl.remove(), 3000);
}
// init app

function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            },
        }
    });
}



const goToTopButton = document.getElementById("go-to-top-button");



function scrollFunction() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    goToTopButton.style.display = "block";
  } else {
    goToTopButton.style.display = "none";
  }
}
goToTopButton.addEventListener("click", () => {
  goToTopButton.style.display = "none";
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

const header = document.querySelector('.main-header');
window.onscroll = function () {
    scrollFunction();
    var top = window.scrollY;
    if (top >= 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayEvents();
            displaySlider();
            break;
        case '/event-details.html':
            displayEventDetails();
            break;
    }
    highlightActiveLink();
}


document.addEventListener('DOMContentLoaded', init);

