// Navbar & menu
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("hidden");
  }

  function closeMobileMenu() {
    mobileMenu.classList.add("hidden");
  }

  function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  window.addEventListener("scroll", handleNavbarScroll);
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");
      smoothScroll(target);
      closeMobileMenu();
    });
  });

  const heroButtons = document.querySelectorAll(".hero-btn-primary, .hero-btn-secondary");
  heroButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        smoothScroll(href);
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target)) {
      closeMobileMenu();
    }
  });

  mobileMenu.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  const buttons = document.querySelectorAll(".booking-btn, .hero-btn-primary, .hero-btn-secondary");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.add("loading");

      setTimeout(() => {
        this.classList.remove("loading");
      }, 1000);
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".service-card, .gallery-item, .testimonial-card");
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-2px)";
    });
  });

  const bookingButtons = document.querySelectorAll(".booking-btn, .hero-btn-primary");
  bookingButtons.forEach((button) => {
    button.classList.add("pulse");
  });

  function handleParallax() {
    if (window.innerWidth > 768) {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector(".hero-section");
      const parallaxSpeed = 0.3;

      if (heroSection && scrolled < heroSection.offsetHeight) {
        const yPos = -(scrolled * parallaxSpeed);
        heroSection.style.backgroundPositionY = `${50 + yPos / 10}%`;
      }
    }
  }

  if (window.innerWidth > 768) {
    window.addEventListener("scroll", handleParallax);
  }

  window.addEventListener("resize", function () {
    closeMobileMenu();

    if (window.innerWidth <= 768) {
      window.removeEventListener("scroll", handleParallax);
    } else {
      window.addEventListener("scroll", handleParallax);
    }
  });

  handleNavbarScroll();

  

  function setupBookingForm() {
    const form = document.getElementById("booking-form");
    const treatmentSelect = document.getElementById("treatment");
    const durationSelect = document.getElementById("duration");
    const priceInput = document.getElementById("price");

    const timeInput = document.getElementById("booking-time");
    const timeButton = document.getElementById("time-dropdown-button");
    const timeButtonLabel = timeButton ? timeButton.querySelector("span") : null;
    const timeMenu = document.getElementById("time-dropdown-menu");

    if (timeButton && timeMenu && timeInput) {
      const closeMenu = () => timeMenu.classList.add("hidden");
      const openMenu = () => timeMenu.classList.remove("hidden");

      const toggleMenu = () => {
        const isOpen = !timeMenu.classList.contains("hidden");
        if (isOpen) {
          closeMenu();
          timeButton.setAttribute("aria-expanded", "false");
        } else {
          openMenu();
          timeButton.setAttribute("aria-expanded", "true");
        }
      };

      ["click", "touchstart"].forEach((evt) => {
        timeButton.addEventListener(evt, function (e) {
          e.preventDefault();
          e.stopPropagation();
          toggleMenu();
        });
      });

      timeButton.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleMenu();
        }
      });

      timeMenu.querySelectorAll("[data-value]").forEach((option) => {
        const selectValue = (value) => {
          timeInput.value = value;
          if (timeButtonLabel) timeButtonLabel.textContent = value;
          timeButton.setAttribute("aria-expanded", "false");
          closeMenu();
        };
        option.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          selectValue(this.getAttribute("data-value"));
        });
        option.addEventListener("touchstart", function (e) {
          e.preventDefault();
          e.stopPropagation();
          selectValue(this.getAttribute("data-value"));
        });
      });

      ["click", "touchstart"].forEach((evt) => {
        document.addEventListener(evt, function (e) {
          if (!timeMenu.contains(e.target) && e.target !== timeButton) {
            closeMenu();
            timeButton && timeButton.setAttribute("aria-expanded", "false");
          }
        });
      });
    }

    const pricing = {
      "Hot Stone Therapy": { 60: 300000, 90: 380000, 120: 450000 },
      "Aromatherapy Massage": { 60: 280000, 90: 360000, 120: 440000 },
      Reflexology: { 60: 200000, 90: 280000, 120: 350000 },
      "Eyelash Extension": { 60: 150000, 90: 220000, 120: 280000 },
      "Facial Treatment": { 60: 180000, 90: 250000, 120: 320000 },
      "Body Scrub": { 60: 200000, 90: 280000, 120: 350000 },
    };

    function updatePrice() {
      const treatment = treatmentSelect.value;
      const duration = parseInt(durationSelect.value);

      if (treatment && duration && pricing[treatment] && pricing[treatment][duration]) {
        const price = pricing[treatment][duration];
        priceInput.value = `Rp ${price.toLocaleString("id-ID")}`;
      } else {
        priceInput.value = "";
      }
    }

    treatmentSelect.addEventListener("change", updatePrice);
    durationSelect.addEventListener("change", updatePrice);

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      const requiredFields = ["name", "email", "phone", "treatment", "duration", "date", "time", "therapist"];
      const missingFields = requiredFields.filter((field) => !data[field]);

      if (missingFields.length > 0) {
        alert("Mohon lengkapi semua field yang diperlukan");
        return;
      }

      const referenceNumber = "MS" + Math.random().toString(36).substr(2, 6).toUpperCase();

      const dateObj = new Date(data.date);
      const formattedDate = dateObj.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const message = `BOOKING MAHALU SPA

Halo Admin, ada booking baru:

💆 Detail Booking:

* Referensi: ${referenceNumber}
* Treatment: ${data.treatment}
* Durasi: ${data.duration} menit
* Harga: ${data.price}
* Tanggal: ${formattedDate}
* Jam: ${data.time}
* Terapis: ${data.therapist}

📋 Data Customer:

* Nama: ${data.name}
* Email: ${data.email}
* No. HP: ${data.phone}

Mohon konfirmasi booking ini. Terima kasih! 🙏`;

      const whatsappNumber = "+6289609094700";
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

      const submitButton = document.getElementById("whatsapp-submit");
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = "Mengirim...";
      submitButton.disabled = true;

      setTimeout(() => {
        window.open(whatsappUrl, "_blank");

        setTimeout(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;

          form.reset();
          priceInput.value = "";
          if (timeInput) {
            timeInput.value = "";
          }
          if (timeButton) {
            timeButton.textContent = "Pilih Waktu (10:00–22:00 WIB)";
            timeButton.setAttribute("aria-expanded", "false");
          }
        }, 1000);
      }, 500);
    });
  }

  setupBookingForm();

  setupWhatsAppBooking();

  // Tombol booking
  function setupWhatsAppBooking() {
    const bookingMessage = `BOOKING MAHALU SPA

Halo Admin, saya tertarik untuk melakukan booking spa.

Mohon informasi lebih lanjut mengenai ketersediaan jadwal dan layanan yang tersedia.

Terima kasih! 🙏`;

    const whatsappNumber = "+6289609094700";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(bookingMessage)}`;

    const bookingButtons = [document.getElementById("booking-btn"), document.getElementById("mobile-booking-btn"), document.getElementById("hero-booking-btn")];

    bookingButtons.forEach((button) => {
      if (button) {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          smoothScroll("#booking");
        });
      }
    });
  }

  const galleryItems = document.querySelectorAll(".gallery-item img");
  galleryItems.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.filter = "brightness(1.1) contrast(1.1)";
    });

    img.addEventListener("mouseleave", function () {
      this.style.filter = "brightness(1) contrast(1)";
    });
  });

  const sections = document.querySelectorAll("section");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      sectionObserver.observe(section);
    });
  } else {
    sections.forEach((section) => {
      section.style.opacity = "1";
      section.style.transform = "none";
    });
  }

  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach((link) => {
    link.addEventListener("click", function () {
      this.style.opacity = "0.7";
      setTimeout(() => {
        this.style.opacity = "1";
      }, 500);
    });
  });

  console.log("Mahalu Spa website loaded successfully! 🌸");
});

// Hero slideshow
const heroSlides = document.querySelectorAll(".hero-slideshow .hero-slide");
if (heroSlides && heroSlides.length > 0) {
  let currentSlide = 0;

  function showSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
  }

  showSlide(0);
  const HERO_INTERVAL_MS = 4000;
  let heroIntervalId = setInterval(nextSlide, HERO_INTERVAL_MS);

  if (typeof document.hidden !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(heroIntervalId);
        heroIntervalId = null;
      } else {
        if (!heroIntervalId) {
          heroIntervalId = setInterval(nextSlide, HERO_INTERVAL_MS);
        }
      }
    });
  }
}
