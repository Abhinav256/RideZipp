// Smooth Scrolling Functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Scroll Animations
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

const checkVisibility = () => {
    const windowHeight = window.innerHeight;
    elementsToAnimate.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Form Validation
const contactForm = document.querySelector('.contact-form');
const contactFormInputs = contactForm.querySelectorAll('input, textarea');
const contactFormButton = contactForm.querySelector('button');

contactFormButton.addEventListener('click', function (e) {
    e.preventDefault();

    let valid = true;

    contactFormInputs.forEach(input => {
        if (input.value === '') {
            valid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (valid) {
        alert('Form submitted successfully!');
        contactForm.reset();
    } else {
        alert('Please fill in all fields!');
    }
});

// Error handling for inputs
contactFormInputs.forEach(input => {
    input.addEventListener('focus', function () {
        input.classList.remove('error');
    });
});

// Testimonial Slider
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.style.display = 'block';
        } else {
            testimonial.style.display = 'none';
        }
    });
}

function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
    showTestimonial(currentTestimonialIndex);
}

function prevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonialIndex);
}

document.querySelector('.testimonial-next').addEventListener('click', nextTestimonial);
document.querySelector('.testimonial-prev').addEventListener('click', prevTestimonial);

showTestimonial(currentTestimonialIndex);

// Create Ride Modal
const createRideModal = document.querySelector('.create-ride-modal');
const createRideButton = document.querySelector('.cta-button-create-ride');
const closeModalButton = createRideModal.querySelector('.close-modal');

createRideButton.addEventListener('click', function () {
    createRideModal.classList.add('open');
});

closeModalButton.addEventListener('click', function () {
    createRideModal.classList.remove('open');
});

// Dynamic Pricing Slider
const pricingSlider = document.querySelector('.pricing-slider');
const pricingValue = document.querySelector('.pricing-value');

pricingSlider.addEventListener('input', function () {
    pricingValue.textContent = `$${pricingSlider.value}`;
});

// Vehicle Type Selector
const vehicleTypeSelect = document.querySelector('.vehicle-type-select');
const vehicleTypeDisplay = document.querySelector('.vehicle-type-display');

vehicleTypeSelect.addEventListener('change', function () {
    vehicleTypeDisplay.textContent = vehicleTypeSelect.value;
});

// Search Ride Filtering
const searchRideForm = document.querySelector('.search-ride-form');
const rideResults = document.querySelector('.ride-results');

searchRideForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const rideData = new FormData(searchRideForm);
    const filters = Object.fromEntries(rideData);

    // Simulate fetching results based on filters (hardcoded example)
    const filteredRides = getFilteredRides(filters);

    displayRides(filteredRides);
});

function getFilteredRides(filters) {
    const allRides = [
        { vehicle: 'Car', start: 'New York', end: 'Boston', time: '8:00 AM' },
        { vehicle: 'Bus', start: 'Los Angeles', end: 'San Francisco', time: '10:00 AM' },
        { vehicle: 'Bike', start: 'Miami', end: 'Orlando', time: '12:00 PM' }
    ];

    return allRides.filter(ride => {
        return ride.start.includes(filters.start) && ride.end.includes(filters.end);
    });
}

function displayRides(rides) {
    rideResults.innerHTML = '';
    rides.forEach(ride => {
        const rideElement = document.createElement('div');
        rideElement.classList.add('ride');
        rideElement.innerHTML = `
            <p>${ride.vehicle} - ${ride.start} to ${ride.end} at ${ride.time}</p>
        `;
        rideResults.appendChild(rideElement);
    });
}

// Navbar Sticky
const navbar = document.querySelector('.navbar');
const stickyOffset = navbar.offsetTop;

window.onscroll = function () {
    if (window.pageYOffset > stickyOffset) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
};

// Modal Open and Close Logic
const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('.open-modal');
const closeModalButtonInModal = modal.querySelector('.close');

openModalButton.addEventListener('click', function () {
    modal.classList.add('open');
});

closeModalButtonInModal.addEventListener('click', function () {
    modal.classList.remove('open');
});

// Toggle Navigation on Mobile
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileNavToggle.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
});

// Preload Image Gallery
const preloadImages = [
    'https://via.placeholder.com/500x300',
    'https://via.placeholder.com/500x300',
    'https://via.placeholder.com/500x300'
];

const preloadGallery = () => {
    preloadImages.forEach(imgSrc => {
        const img = new Image();
        img.src = imgSrc;
    });
};

preloadGallery();

// Custom Tooltip
const tooltipTriggers = document.querySelectorAll('[data-tooltip]');

tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('mouseover', function () {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);

        const rect = this.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight}px`;
    });

    trigger.addEventListener('mouseout', function () {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    });
});

// Add Event Listener to Handle Modal Close on Outside Click
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.classList.remove('open');
    }
});

// Animation on Scroll
const animElements = document.querySelectorAll('.animate');

const revealElement = (element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 150) {
        element.classList.add('active');
    }
};

window.addEventListener('scroll', function () {
    animElements.forEach(element => {
        revealElement(element);
    });
});

// Image Lazy Loading
const lazyLoadImages = document.querySelectorAll('img[data-src]');

const loadImage = (image) => {
    image.src = image.getAttribute('data-src');
    image.removeAttribute('data-src');
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadImage(entry.target);
            observer.unobserve(entry.target);
        }
    });
});

lazyLoadImages.forEach(image => {
    imageObserver.observe(image);
});
