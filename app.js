/* ============================================
   PORTFOLIO KỸ THUẬT SỐ - APP.JS
   ============================================ */

// ---- Navigation ----
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

// Page switching
function switchPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  navLinks.forEach(link => {
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });

  // Close mobile menu
  navLinksEl.classList.remove('open');
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.dataset.page;
    switchPage(pageId);
  });
});

// Handle href navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const pageId = anchor.getAttribute('href').substring(1);
    const page = document.getElementById(pageId);
    if (page && page.classList.contains('page')) {
      switchPage(pageId);
    }
  });
});

// Scroll to section helper
function scrollToSection(pageId) {
  switchPage(pageId);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

// ---- Task Panel Switching ----
function showTask(taskNum) {
  // Hide all panels
  document.querySelectorAll('.task-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.task-btn').forEach(b => b.classList.remove('active'));
  
  // Show selected panel
  const panel = document.getElementById('task' + taskNum);
  const btn = document.getElementById('taskBtn' + taskNum);
  
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
  
  // Animate progress bars in task 4
  if (taskNum === 4) {
    animateProgressBars();
  }
}

// ---- Progress Bar Animation ----
function animateProgressBars() {
  const fills = document.querySelectorAll('.progress-fill');
  fills.forEach(fill => {
    const targetWidth = fill.style.width;
    fill.style.width = '0';
    setTimeout(() => {
      fill.style.width = targetWidth;
    }, 100);
  });
}

// ---- Scroll Animations (Intersection Observer) ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

function initScrollAnimations() {
  const animatableElements = document.querySelectorAll(
    '.content-block, .assess-card, .future-card, .ethics-card, ' +
    '.operator-card, .tool-card, .principle-card, .ai-product-card, ' +
    '.stat-card, .skill-item'
  );
  
  animatableElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
    observer.observe(el);
  });
}

// ---- Typing Effect for Hero Name ----
function typeEffect(element, text, speed = 60) {
  let i = 0;
  element.textContent = '';
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// ---- Counter Animation ----
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const text = counter.textContent;
    const num = parseInt(text);
    if (isNaN(num)) return;
    
    let current = 0;
    const increment = Math.ceil(num / 30);
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        counter.textContent = text; // restore original (may have +)
        clearInterval(timer);
      } else {
        counter.textContent = current;
      }
    }, 50);
  });
}

// ---- Particle Effect (subtle) ----
function createParticles() {
  const heroEl = document.querySelector('.hero-bg');
  if (!heroEl) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(${Math.random() > 0.5 ? '79,142,247' : '139,92,246'}, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    heroEl.appendChild(particle);
  }
  
  // Add CSS for particle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
      25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
      50% { transform: translateY(-10px) translateX(-10px); opacity: 0.6; }
      75% { transform: translateY(-30px) translateX(5px); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// ---- Smooth Hover Cards ----
function initCardTilt() {
  const cards = document.querySelectorAll('.assess-card, .future-card, .tool-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Init scroll animations
  setTimeout(initScrollAnimations, 100);
  
  // Particles
  createParticles();
  
  // Counter animation on home page load
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);
  
  // Card tilt effect (after short delay for DOM)
  setTimeout(initCardTilt, 500);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const taskBtns = document.querySelectorAll('.task-btn');
      const activeBtn = document.querySelector('.task-btn.active');
      if (!activeBtn) return;
      
      const activeIndex = Array.from(taskBtns).indexOf(activeBtn);
      let nextIndex;
      
      if (e.key === 'ArrowRight') {
        nextIndex = (activeIndex + 1) % taskBtns.length;
      } else {
        nextIndex = (activeIndex - 1 + taskBtns.length) % taskBtns.length;
      }
      
      showTask(nextIndex + 1);
    }
  });
  
  console.log('%c✦ Portfolio Kỹ thuật số loaded!', 
    'color: #4f8ef7; font-size: 14px; font-weight: bold;');
});

// Expose functions globally for onclick handlers
window.scrollToSection = scrollToSection;
window.showTask = showTask;
