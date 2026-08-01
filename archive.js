document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".letters button");
  const items = document.querySelectorAll("#software-items li");
  const resetBtn = document.getElementById("reset-filter");
  const searchInput = document.getElementById("archive-search-input");
  const searchBtn = document.querySelector(".archive-search-section .fa-search");

  // Function to show all items
  function showAllItems() {
    items.forEach(item => item.style.display = "block");
    buttons.forEach(btn => btn.classList.remove("active"));
    if (searchInput) searchInput.value = "";
  }

  // Text search: matches anywhere in the name or description
  function runSearch(rawQuery) {
    const query = rawQuery.trim().toLowerCase();
    buttons.forEach(btn => btn.classList.remove("active"));

    if (!query) {
      items.forEach(item => item.style.display = "block");
      return;
    }

    items.forEach(item => {
      const text = item.textContent.trim().toLowerCase();
      item.style.display = text.includes(query) ? "block" : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => runSearch(searchInput.value));
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") runSearch(searchInput.value);
      if (e.key === "Escape") showAllItems();
    });
  }
  if (searchBtn) {
    searchBtn.addEventListener("click", () => runSearch(searchInput ? searchInput.value : ""));
  }

  // Pick up a search query passed from the home page (archive.html?q=...)
  const params = new URLSearchParams(window.location.search);
  const incomingQuery = params.get("q");
  if (incomingQuery && searchInput) {
    searchInput.value = incomingQuery;
    runSearch(incomingQuery);
  }

  // Letter filter
  buttons.forEach(button => {
    if (button.id !== "reset-filter") {
      button.addEventListener("click", () => {
        const letter = button.textContent.toUpperCase();
        if (searchInput) searchInput.value = "";

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

