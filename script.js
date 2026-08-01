/* ==========================================================================
   AURA — script.js
   Nav scroll state, mobile menu, animated counters, testimonial carousel,
   FAQ accordion, pricing toggle, form validation + handoff to thankyou.html
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     NAV: scroll state + mobile menu toggle + close-on-link-click
     --------------------------------------------------------------------- */
  var nav = document.getElementById("siteNav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function onScroll() {
    if (window.scrollY > 12) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------------------
     REVEAL ON SCROLL
     --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------------------------------------------------------------
     HERO PARALLAX GLOW (subtle, desktop only, respects reduced motion)
     --------------------------------------------------------------------- */
  var heroGlow = document.getElementById("heroGlowV");
  if (heroGlow && !reduceMotion && window.matchMedia("(min-width: 900px)").matches) {
    window.addEventListener("mousemove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 24;
      var y = (e.clientY / window.innerHeight - 0.5) * 24;
      heroGlow.style.transform = "translate(" + x + "px," + y + "px)";
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------
     LIVE HERO COUNTERS
     Animate up to a target value once visible, then keep a light "live" tick.
     --------------------------------------------------------------------- */
  function animateCount(el, target, opts) {
    opts = opts || {};
    var duration = opts.duration || 1400;
    var suffix = opts.suffix || "";
    var decimals = opts.decimals || 0;
    var start = 0;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = start + (target - start) * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
        if (opts.onDone) opts.onDone();
      }
    }
    requestAnimationFrame(step);
  }

  var heroPanel = document.querySelector(".hero-panel");
  var countersStarted = false;

  function startHeroCounters() {
    if (countersStarted) return;
    countersStarted = true;

    var systemsEl = document.getElementById("statSystems");
    var responseEl = document.getElementById("statResponse");
    var uptimeEl = document.getElementById("statUptime");
    var threatsEl = document.getElementById("statThreats");

    var systemsTarget = 12480;
    animateCount(systemsEl, systemsTarget, {
      duration: 1600,
      onDone: function () {
        // gentle live ticking after initial count-up
        if (reduceMotion) return;
        setInterval(function () {
          systemsTarget += Math.floor(Math.random() * 3) - 1;
          systemsEl.textContent = systemsTarget.toLocaleString();
        }, 2600);
      }
    });

    if (responseEl) responseEl.textContent = "4m 12s";

    animateCount(uptimeEl, 99.98, { duration: 1600, decimals: 2, suffix: "%" });

    var threatsTarget = 316;
    animateCount(threatsEl, threatsTarget, {
      duration: 1600,
      onDone: function () {
        if (reduceMotion) return;
        setInterval(function () {
          threatsTarget += Math.floor(Math.random() * 2);
          threatsEl.textContent = threatsTarget.toLocaleString();
        }, 5200);
      }
    });
  }

  if (heroPanel) {
    if ("IntersectionObserver" in window) {
      var heroIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startHeroCounters();
            heroIo.disconnect();
          }
        });
      }, { threshold: 0.3 });
      heroIo.observe(heroPanel);
    } else {
      startHeroCounters();
    }
  }

  /* ---------------------------------------------------------------------
     TESTIMONIAL CAROUSEL
     --------------------------------------------------------------------- */
  var track = document.getElementById("testimonialTrack");
  if (track) {
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = document.getElementById("tDots");
    var prevBtn = document.getElementById("tPrev");
    var nextBtn = document.getElementById("tNext");
    var index = 0;
    var autoTimer = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "t-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === index); });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
      restartAuto();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    function restartAuto() {
      if (reduceMotion) return;
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 6500);
    }
    restartAuto();
    render();
  }

  /* ---------------------------------------------------------------------
     FAQ ACCORDION
     --------------------------------------------------------------------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");

    function setState(open) {
      if (open) {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        item.classList.remove("is-open");
        answer.style.maxHeight = "0px";
      }
    }
    setState(item.classList.contains("is-open"));

    btn.addEventListener("click", function () {
      var willOpen = !item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach(function (openItem) {
        if (openItem !== item) setState.call(openItem, false);
      });
      setState(willOpen);
    });
  });
  // re-measure open answer on resize
  window.addEventListener("resize", function () {
    document.querySelectorAll(".faq-item.is-open .faq-a").forEach(function (a) {
      a.style.maxHeight = a.scrollHeight + "px";
    });
  });

  /* ---------------------------------------------------------------------
     PRICING TOGGLE (monthly / annual)
     --------------------------------------------------------------------- */
  var pricingToggle = document.getElementById("pricingToggle");
  if (pricingToggle) {
    var toggleBtns = pricingToggle.querySelectorAll("button");
    var amounts = document.querySelectorAll(".amount[data-monthly]");

    toggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        toggleBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var cycle = btn.getAttribute("data-cycle");
        amounts.forEach(function (el) {
          var val = el.getAttribute("data-" + cycle);
          if (val) el.textContent = "$" + val;
        });
      });
    });
  }

  // Pre-select a plan on the signup form when a pricing CTA is clicked
  document.querySelectorAll("[data-plan]").forEach(function (link) {
    link.addEventListener("click", function () {
      var plan = link.getAttribute("data-plan");
      window.setTimeout(function () {
        var select = document.getElementById("planInterest");
        if (select) select.value = plan;
      }, 300);
    });
  });

  /* ---------------------------------------------------------------------
     SIGNUP FORM VALIDATION + HANDOFF TO thankyou.html
     --------------------------------------------------------------------- */
  var form = document.getElementById("signupForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var required = [
        { id: "fullName", test: function (v) { return v.trim().length > 1; } },
        { id: "workEmail", test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); } },
        { id: "company", test: function (v) { return v.trim().length > 1; } },
        { id: "teamSize", test: function (v) { return v.trim().length > 0; } }
      ];

      required.forEach(function (rule) {
        var input = document.getElementById(rule.id);
        var field = input.closest(".field");
        if (!rule.test(input.value)) {
          field.classList.add("has-error");
          valid = false;
        } else {
          field.classList.remove("has-error");
        }
      });

      if (!valid) return;

      var submitBtn = document.getElementById("submitBtn");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      var name = document.getElementById("fullName").value.trim();
      var company = document.getElementById("company").value.trim();
      var plan = document.getElementById("planInterest").value;

      // Simulate a brief submit delay, then hand off to the confirmation page.
      window.setTimeout(function () {
        var params = new URLSearchParams({ name: name, company: company, plan: plan });
        window.location.href = "thankyou.html?" + params.toString();
      }, 550);
    });

    // clear error state as the visitor fixes a field
    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        var field = input.closest(".field");
        if (field) field.classList.remove("has-error");
      });
    });
  }

  /* ---------------------------------------------------------------------
     NEWSLETTER MINI-FORM
     --------------------------------------------------------------------- */
  var newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("newsletterMsg");
      msg.textContent = "You're on the list — welcome aboard.";
      newsletterForm.reset();
    });
  }

  /* ---------------------------------------------------------------------
     STATUS WIDGET: hide once the signup section is reached
     --------------------------------------------------------------------- */
  var statusWidget = document.getElementById("statusWidget");
  var signupSection = document.getElementById("signup");
  if (statusWidget && signupSection && "IntersectionObserver" in window) {
    var widgetIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        statusWidget.classList.toggle("is-hidden", entry.isIntersecting);
      });
    }, { threshold: 0.15 });
    widgetIo.observe(signupSection);
  }

  /* ---------------------------------------------------------------------
     FOOTER YEAR
     --------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
