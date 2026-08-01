document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const toggle = document.getElementById("theme-toggle");
  const label = document.getElementById("theme-label");

  if (toggle && label) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      toggle.checked = true;
      label.textContent = "Dark Mode";
    } else {
      document.body.classList.remove("dark");
      toggle.checked = false;
      label.textContent = "Light Mode";
    }

    toggle.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
        label.textContent = "Dark Mode";
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
        label.textContent = "Light Mode";
      }
    });
  }

  // Hero search: jump to the full archive, pre-filtered by query
  const heroSearchInput = document.getElementById("hero-search-input");
  const heroSearchBtn = document.getElementById("hero-search-btn");

  function runHeroSearch() {
    const query = heroSearchInput.value.trim();
    if (query) {
      window.location.href = `archive.html?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = "archive.html";
    }
  }

  if (heroSearchInput && heroSearchBtn) {
    heroSearchBtn.addEventListener("click", runHeroSearch);
    heroSearchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") runHeroSearch();
    });
  }

  // Helper functions
  function getRandomItems(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function renderCards(container, items) {
    if (!container) return;
    container.innerHTML = "";
    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "file-card";
      card.innerHTML = `<i class="${item.icon || 'fa-solid fa-cube'} file-card-icon"></i><h3>${item.title}</h3><p>${item.desc}</p><button>Download</button>`;
      container.appendChild(card);
    });
  }

  function renderList(container, items, iconLookup) {
    if (!container) return;
    container.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      const icon = (iconLookup && iconLookup[item]) || "fa-solid fa-cube";
      li.innerHTML = `<i class="${icon} list-icon"></i>${item}`;
      container.appendChild(li);
    });
  }

  // Pools of items
  const featuredItems = [
    { title: "Utility Tool v1.0", desc: "System cleaner and optimizer.", icon: "fa-solid fa-broom" },
    { title: "Graphics Suite 2026", desc: "Vector and raster design tools.", icon: "fa-solid fa-palette" },
    { title: "CryptoSafe Wallet", desc: "Secure crypto wallet.", icon: "fa-solid fa-wallet" },
    { title: "DocManager Pro", desc: "Document management with cloud sync.", icon: "fa-solid fa-folder-open" },
    { title: "VideoForge Studio", desc: "Video editing with cinematic effects.", icon: "fa-solid fa-clapperboard" },
    { title: "DataViz Analyzer", desc: "Interactive dataset visualization.", icon: "fa-solid fa-chart-pie" },
    { title: "SystemCare Plus", desc: "PC maintenance toolkit.", icon: "fa-solid fa-gears" },
    { title: "QuickCalc Pro", desc: "Calculator with unit conversions.", icon: "fa-solid fa-calculator" },
    { title: "NoteMaster", desc: "Organize notes with tagging.", icon: "fa-solid fa-note-sticky" },
    { title: "SecureVault", desc: "Password manager with encryption.", icon: "fa-solid fa-key" },
    { title: "MediaStream Player", desc: "Stream audio and video.", icon: "fa-solid fa-play" },
    { title: "VectorDraw Pro", desc: "Vector graphics editor.", icon: "fa-solid fa-bezier-curve" },
    { title: "PDFTools Suite", desc: "Edit and secure PDFs.", icon: "fa-solid fa-file-pdf" },
    { title: "FontManager", desc: "Preview and organize fonts.", icon: "fa-solid fa-font" },
    { title: "DiskDoctor", desc: "Repair hard drive errors.", icon: "fa-solid fa-hard-drive" },
    { title: "ColorLab", desc: "Palette generator for designers.", icon: "fa-solid fa-fill-drip" },
    { title: "SchedulerX", desc: "Smart calendar and reminders.", icon: "fa-solid fa-calendar-days" },
    { title: "ClipBoard Pro", desc: "Manage multiple clipboards.", icon: "fa-solid fa-clipboard-list" },
    { title: "MacroRunner", desc: "Automate repetitive tasks.", icon: "fa-solid fa-robot" },
    { title: "ScreenCap Studio", desc: "Capture and annotate screenshots.", icon: "fa-solid fa-camera" }
  ];

  const latestItems = [
    { title: "MusicMix Editor", desc: "Audio mixing and editing software.", icon: "fa-solid fa-sliders" },
    { title: "NetShield Firewall", desc: "Firewall with real‑time threat detection.", icon: "fa-solid fa-shield-halved" },
    { title: "ArchivePro", desc: "Compression and extraction utility.", icon: "fa-solid fa-file-zipper" },
    { title: "DevTools Helper", desc: "Developer toolkit with debugging features.", icon: "fa-solid fa-bug" },
    { title: "TaskFlow Manager", desc: "Kanban project organizer.", icon: "fa-solid fa-table-columns" },
    { title: "CloudSync Drive", desc: "Cloud storage with instant sharing.", icon: "fa-solid fa-cloud-arrow-up" },
    { title: "AI Note Assistant", desc: "Smart note‑taking with AI summaries.", icon: "fa-solid fa-wand-magic-sparkles" },
    { title: "PhotoFix Lite", desc: "Quick photo touch‑ups and filters.", icon: "fa-solid fa-image" },
    { title: "GameBooster", desc: "Optimize system performance for gaming.", icon: "fa-solid fa-gamepad" },
    { title: "CodeRunner", desc: "Run snippets in multiple languages.", icon: "fa-solid fa-terminal" },
    { title: "TranslateX", desc: "Fast translation tool with offline support.", icon: "fa-solid fa-language" },
    { title: "MapExplorer", desc: "Interactive maps and route planning.", icon: "fa-solid fa-map-location-dot" },
    { title: "BudgetTracker", desc: "Personal finance management.", icon: "fa-solid fa-sack-dollar" },
    { title: "RecipeBook", desc: "Digital cookbook with smart search.", icon: "fa-solid fa-utensils" },
    { title: "WorkoutPal", desc: "Fitness tracker and planner.", icon: "fa-solid fa-dumbbell" },
    { title: "WeatherPro", desc: "Detailed forecasts and alerts.", icon: "fa-solid fa-cloud-sun" },
    { title: "StockWatch", desc: "Track stock prices and portfolios.", icon: "fa-solid fa-chart-line" },
    { title: "MindFocus", desc: "Pomodoro timer and productivity app.", icon: "fa-solid fa-hourglass-half" },
    { title: "SecureChat", desc: "Encrypted messaging client.", icon: "fa-solid fa-comment-dots" },
    { title: "VRPlay", desc: "Virtual reality media player.", icon: "fa-solid fa-vr-cardboard" }
  ];

  const topRatedItems = [
    { title: "PhotoMaster Studio", desc: "Photo editing suite with AI enhancements.", icon: "fa-solid fa-images" },
    { title: "CodeCraft IDE", desc: "Integrated development environment.", icon: "fa-solid fa-code" },
    { title: "GameForge Engine", desc: "Cross‑platform game engine.", icon: "fa-solid fa-cubes" },
    { title: "SecureMail Client", desc: "Encrypted email client.", icon: "fa-solid fa-envelope-open-text" },
    { title: "MathLab Solver", desc: "Symbolic math solver.", icon: "fa-solid fa-square-root-variable" },
    { title: "DesignFlow UX", desc: "Wireframing and prototyping tool.", icon: "fa-solid fa-pen-ruler" },
    { title: "VidStream Recorder", desc: "Record and stream video.", icon: "fa-solid fa-video" },
    { title: "DataShield Backup", desc: "Automated backup with cloud sync.", icon: "fa-solid fa-database" },
    { title: "SoundForge Studio", desc: "Professional audio editing suite.", icon: "fa-solid fa-headphones" },
    { title: "ProjectPlanner", desc: "Manage projects with timelines.", icon: "fa-solid fa-diagram-project" },
    { title: "CryptoTrack", desc: "Monitor cryptocurrency portfolios.", icon: "fa-solid fa-coins" },
    { title: "RenderMax", desc: "3D rendering software.", icon: "fa-solid fa-cube" },
    { title: "LogicSim", desc: "Digital circuit simulator.", icon: "fa-solid fa-microchip" },
    { title: "BioCalc", desc: "Biology and chemistry calculator.", icon: "fa-solid fa-flask" },
    { title: "EduLearn", desc: "E‑learning platform.", icon: "fa-solid fa-graduation-cap" },
    { title: "LangTutor", desc: "Language learning assistant.", icon: "fa-solid fa-book-open" },
    { title: "ArtSketch", desc: "Digital sketching tool.", icon: "fa-solid fa-pen-nib" },
    { title: "MusicStudio Pro", desc: "Full music production suite.", icon: "fa-solid fa-music" },
    { title: "NetAnalyzer", desc: "Network monitoring tool.", icon: "fa-solid fa-network-wired" },
    { title: "DocTranslate", desc: "Translate documents instantly.", icon: "fa-solid fa-file-word" }
  ];

  const downloadsItems = [
    "Utility Tool v1.0", "Graphics Suite 2026", "CryptoSafe Wallet",
    "DocManager Pro", "VideoForge Studio", "DataViz Analyzer",
    "SystemCare Plus", "QuickCalc Pro", "NoteMaster", "SecureVault",
    "MediaStream Player", "VectorDraw Pro", "PDFTools Suite",
    "FontManager", "DiskDoctor", "ColorLab", "SchedulerX",
    "ClipBoard Pro", "MacroRunner", "ScreenCap Studio"
  ];

  const trendingItems = [
    "AI Note Assistant", "CloudSync Drive", "TaskFlow Manager",
    "GameForge Engine", "PhotoMaster Studio", "CodeCraft IDE",
    "SecureMail Client", "MathLab Solver", "DesignFlow UX",
    "VidStream Recorder", "DataShield Backup", "SoundForge Studio",
    "ProjectPlanner", "CryptoTrack", "RenderMax", "LogicSim",
    "BioCalc", "EduLearn", "LangTutor", "MusicStudio Pro"
  ];

  // Render 15 cards per grid (5 per row × 3 rows)
  renderCards(document.getElementById("featured-grid"), getRandomItems(featuredItems, 15));
  renderCards(document.getElementById("latest-grid"), getRandomItems(latestItems, 15));
  renderCards(document.getElementById("top-rated-grid"), getRandomItems(topRatedItems, 15));

  // Render 10 list items
  const iconLookup = {};
  [...featuredItems, ...latestItems, ...topRatedItems].forEach(item => {
    iconLookup[item.title] = item.icon;
  });
  renderList(document.getElementById("downloads-list"), getRandomItems(downloadsItems, 10), iconLookup);
  renderList(document.getElementById("trending-list"), getRandomItems(trendingItems, 10), iconLookup);
});
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

