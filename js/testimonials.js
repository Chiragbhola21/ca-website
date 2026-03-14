/* ============================================
   TESTIMONIALS CAROUSEL
   ============================================ */

class TestimonialCarousel {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector('.testimonial-track');
    this.slides = container.querySelectorAll('.testimonial-slide');
    this.dotsContainer = container.querySelector('.testimonial-dots');
    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.createDots();
    this.goToSlide(0);
    this.startAutoPlay();

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => this.startAutoPlay());

    // Touch support
    let startX = 0;
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.stopAutoPlay();
    });

    this.track.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
      this.startAutoPlay();
    });
  }

  createDots() {
    if (!this.dotsContainer) return;
    
    for (let i = 0; i < this.slideCount; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.track.style.transform = `translateX(-${index * 100}%)`;

    // Update dots
    this.dotsContainer?.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  next() {
    this.goToSlide((this.currentIndex + 1) % this.slideCount);
  }

  prev() {
    this.goToSlide((this.currentIndex - 1 + this.slideCount) % this.slideCount);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

// Init all carousels
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.testimonial-carousel').forEach(el => {
    new TestimonialCarousel(el);
  });
});
