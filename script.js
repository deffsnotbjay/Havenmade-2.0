window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("sticky", window.scrollY > 80);
});

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuToggle = document.getElementById('menuToggle');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  // --- Dynamic Positioning ---
  function setMenuPosition() {
      const navbarHeight = navbar.offsetHeight; 
      
      // Set the navbar height as a CSS variable on the overlay.
      // This variable is used by the CSS transform property to define the active state's final position.
      mobileMenu.style.setProperty('--navbar-height', `${navbarHeight}px`);
  }

  setMenuPosition();
  window.addEventListener('resize', setMenuPosition);

  // --- Toggle Logic ---
  function toggleMenu() {
      const isMenuOpen = mobileMenu.classList.contains('active');

      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      menuToggle.setAttribute('aria-expanded', !isMenuOpen);
      
      // Only lock body scrolling if the menu is NOT content-height scrolling (optional)
      // document.body.style.overflow = isMenuOpen ? '' : 'hidden'; 
  }

  // Event listener for the menu button
  if (menuToggle) {
      menuToggle.addEventListener('click', toggleMenu);
  }
  
  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
          if (mobileMenu.classList.contains('active')) {
              toggleMenu();
          }
      });
  });
  
  // Close menu if screen size changes while open (returning to desktop)
  window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && mobileMenu.classList.contains('active')) {
          toggleMenu(); 
      }
  });
});

const slides = document.querySelectorAll(".slide");
const heroHeading = document.getElementById("hero-heading");

let currentIndex = 0;
let slideInterval = 5000; // 5 seconds

function showSlide(index) {
  // Remove active class from all slides
  slides.forEach(slide => slide.classList.remove("active"));

  // Add to current slide
  slides[index].classList.add("active");
}

// Auto slide
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, slideInterval);

// Initial load
showSlide(currentIndex);

document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      
      document.querySelectorAll('.faq-item.active').forEach(item => {
          if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.display = 'none';
          }
      });

      const faqAnswer = this.nextElementSibling;
      
      faqItem.classList.toggle('active');

      if (faqItem.classList.contains('active')) {
          faqAnswer.style.display = 'block';
      } else {
          faqAnswer.style.display = 'none';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {  
  const revealElements = document.querySelectorAll('.blur-reveal');

  revealElements.forEach((el, index) => {
      el.style.setProperty('--delay', `${index * 0.1}s`);
  });

  const options = {
      root: null, 
      rootMargin: '0px 0px -15% 0px', 
      threshold: 0.1 
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target); 
          }
      });
  }, options);

  revealElements.forEach(element => {
      observer.observe(element);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  
  // Select all elements to be animated
  const revealElements = document.querySelectorAll('.scroll-reveal');

  // --- Intersection Observer Setup ---
  const options = {
      root: null, // relative to the viewport
      // Start animation when 10% of the element is visible
      rootMargin: '0px 0px -10% 0px', 
      threshold: 0.1 
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // When element enters the viewport, make it visible
              entry.target.classList.add('is-visible');
              
              // Stop observing once the element is visible 
              observer.unobserve(entry.target); 
          }
      });
  }, options);

  // Apply the observer to every card
  revealElements.forEach(element => {
      observer.observe(element);
  });
});

// Function for handling the tabs (unchanged)
function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;

    tabcontent = document.getElementsByClassName("tab-content-dark");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    tabbuttons = document.getElementsByClassName("tab-button-dark");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Function for handling the image gallery
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainGalleryImage');
    mainImage.src = thumbnail.src; // Set main image src to thumbnail src

    // Remove active class from all thumbnails
    const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
    thumbnails.forEach(img => img.classList.remove('active-thumbnail'));

    // Add active class to the clicked thumbnail
    thumbnail.classList.add('active-thumbnail');
}


// Ensure the default tab is active and first thumbnail is active when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Activate the first tab
    const firstTabButton = document.querySelector('.tab-button-dark');
    if (firstTabButton) {
        firstTabButton.click();
    }

    // Activate the first gallery thumbnail
    const firstThumbnail = document.querySelector('.gallery-thumbnails img');
    if (firstThumbnail) {
        firstThumbnail.classList.add('active-thumbnail');
        // Also ensure the main image displays the first thumbnail's content
        document.getElementById('mainGalleryImage').src = firstThumbnail.src;
    }
});

function saveScroll() {
    // Save scroll position before navigating
    sessionStorage.setItem('scrollPos', window.scrollY);
}

// Restore scroll when coming back
window.addEventListener('load', () => {
    const scrollPos = sessionStorage.getItem('scrollPos');
    if(scrollPos) {
        window.scrollTo(0, scrollPos);
        sessionStorage.removeItem('scrollPos'); // optional
    }
});

lucide.createIcons();

