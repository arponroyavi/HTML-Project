document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".letters button");
  const items = document.querySelectorAll("#software-items li");
  const resetBtn = document.getElementById("reset-filter");

  // Function to show all items
  function showAllItems() {
    items.forEach(item => item.style.display = "block");
    buttons.forEach(btn => btn.classList.remove("active"));
  }

  // Letter filter
  buttons.forEach(button => {
    if (button.id !== "reset-filter") {
      button.addEventListener("click", () => {
        const letter = button.textContent.toUpperCase();

        items.forEach(item => {
          const name = item.querySelector("strong").textContent.trim();
          if (name.startsWith(letter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });

        // Highlight active button
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
      });
    }
  });

  // Reset filter button
  resetBtn.addEventListener("click", () => {
    showAllItems();
  });

  // Optional: reset filter with Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      showAllItems();
    }
  });
});

// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");

if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark", themeToggle.checked);
    themeLabel.textContent = themeToggle.checked ? "Dark Mode" : "Light Mode";
  });
}
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

