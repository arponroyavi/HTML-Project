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
      card.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p><button>Download</button>`;
      container.appendChild(card);
    });
  }

  function renderList(container, items) {
    if (!container) return;
    container.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      container.appendChild(li);
    });
  }

  // Pools of items
  const featuredItems = [
    { title: "Utility Tool v1.0", desc: "System cleaner and optimizer." },
    { title: "Graphics Suite 2026", desc: "Vector and raster design tools." },
    { title: "CryptoSafe Wallet", desc: "Secure crypto wallet." },
    { title: "DocManager Pro", desc: "Document management with cloud sync." },
    { title: "VideoForge Studio", desc: "Video editing with cinematic effects." },
    { title: "DataViz Analyzer", desc: "Interactive dataset visualization." },
    { title: "SystemCare Plus", desc: "PC maintenance toolkit." },
    { title: "QuickCalc Pro", desc: "Calculator with unit conversions." },
    { title: "NoteMaster", desc: "Organize notes with tagging." },
    { title: "SecureVault", desc: "Password manager with encryption." },
    { title: "MediaStream Player", desc: "Stream audio and video." },
    { title: "VectorDraw Pro", desc: "Vector graphics editor." },
    { title: "PDFTools Suite", desc: "Edit and secure PDFs." },
    { title: "FontManager", desc: "Preview and organize fonts." },
    { title: "DiskDoctor", desc: "Repair hard drive errors." },
    { title: "ColorLab", desc: "Palette generator for designers." },
    { title: "SchedulerX", desc: "Smart calendar and reminders." },
    { title: "ClipBoard Pro", desc: "Manage multiple clipboards." },
    { title: "MacroRunner", desc: "Automate repetitive tasks." },
    { title: "ScreenCap Studio", desc: "Capture and annotate screenshots." }
  ];

  const latestItems = [
    { title: "MusicMix Editor", desc: "Audio mixing and editing software." },
    { title: "NetShield Firewall", desc: "Firewall with real‑time threat detection." },
    { title: "ArchivePro", desc: "Compression and extraction utility." },
    { title: "DevTools Helper", desc: "Developer toolkit with debugging features." },
    { title: "TaskFlow Manager", desc: "Kanban project organizer." },
    { title: "CloudSync Drive", desc: "Cloud storage with instant sharing." },
    { title: "AI Note Assistant", desc: "Smart note‑taking with AI summaries." },
    { title: "PhotoFix Lite", desc: "Quick photo touch‑ups and filters." },
    { title: "GameBooster", desc: "Optimize system performance for gaming." },
    { title: "CodeRunner", desc: "Run snippets in multiple languages." },
    { title: "TranslateX", desc: "Fast translation tool with offline support." },
    { title: "MapExplorer", desc: "Interactive maps and route planning." },
    { title: "BudgetTracker", desc: "Personal finance management." },
    { title: "RecipeBook", desc: "Digital cookbook with smart search." },
    { title: "WorkoutPal", desc: "Fitness tracker and planner." },
    { title: "WeatherPro", desc: "Detailed forecasts and alerts." },
    { title: "StockWatch", desc: "Track stock prices and portfolios." },
    { title: "MindFocus", desc: "Pomodoro timer and productivity app." },
    { title: "SecureChat", desc: "Encrypted messaging client." },
    { title: "VRPlay", desc: "Virtual reality media player." }
  ];

  const topRatedItems = [
    { title: "PhotoMaster Studio", desc: "Photo editing suite with AI enhancements." },
    { title: "CodeCraft IDE", desc: "Integrated development environment." },
    { title: "GameForge Engine", desc: "Cross‑platform game engine." },
    { title: "SecureMail Client", desc: "Encrypted email client." },
    { title: "MathLab Solver", desc: "Symbolic math solver." },
    { title: "DesignFlow UX", desc: "Wireframing and prototyping tool." },
    { title: "VidStream Recorder", desc: "Record and stream video." },
    { title: "DataShield Backup", desc: "Automated backup with cloud sync." },
    { title: "SoundForge Studio", desc: "Professional audio editing suite." },
    { title: "ProjectPlanner", desc: "Manage projects with timelines." },
    { title: "CryptoTrack", desc: "Monitor cryptocurrency portfolios." },
    { title: "RenderMax", desc: "3D rendering software." },
    { title: "LogicSim", desc: "Digital circuit simulator." },
    { title: "BioCalc", desc: "Biology and chemistry calculator." },
    { title: "EduLearn", desc: "E‑learning platform." },
    { title: "LangTutor", desc: "Language learning assistant." },
    { title: "ArtSketch", desc: "Digital sketching tool." },
    { title: "MusicStudio Pro", desc: "Full music production suite." },
    { title: "NetAnalyzer", desc: "Network monitoring tool." },
    { title: "DocTranslate", desc: "Translate documents instantly." }
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
  renderList(document.getElementById("downloads-list"), getRandomItems(downloadsItems, 10));
  renderList(document.getElementById("trending-list"), getRandomItems(trendingItems, 10));
});
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

