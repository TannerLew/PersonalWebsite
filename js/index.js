document.addEventListener("DOMContentLoaded", () => {
  const mobile_menu = document.getElementById("mobile_menu");
  const closeBtn = document.getElementById("close-btn");
  const navLinks = document.getElementById("nav-links");
  const overlay = document.getElementById("overlay");

  var typed = new Typed(".auto-type", {
    strings: [
      "Programmer",
      "Front-End Developer",
      "Software Engineer",
      "Game Developer",
      "Web Developer",
    ],
    typeSpeed: 100,
    backSpeed: 150,
    loop: true,
  });

  // Function to open the menu
  const openMenu = () => {
    navLinks.classList.add("active");
    overlay.classList.add("active");
    mobile_menu.setAttribute("aria-expanded", "true");
    navLinks.setAttribute("aria-hidden", "false");
    // Disable scrolling on the body
    document.body.style.overflow = "hidden";
    // Set focus to the first link in the menu
    const firstLink = navLinks.querySelector("a");
    if (firstLink) firstLink.focus();
  };

  // Function to close the menu
  const closeMenu = () => {
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    mobile_menu.setAttribute("aria-expanded", "false");
    navLinks.setAttribute("aria-hidden", "true");
    // Enable scrolling on the body
    document.body.style.overflow = "auto";
    // Return focus to the menu button
    mobile_menu.focus();
  };

  // Event listener for menu button
  mobile_menu.addEventListener("click", openMenu);

  // Event listener for close button
  closeBtn.addEventListener("click", closeMenu);

  // Event listener for overlay click
  overlay.addEventListener("click", closeMenu);

  // Event listener for pressing the Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      closeMenu();
    }
  });

  // Trap focus within the navigation menu when it's open
  navLinks.addEventListener("keydown", (e) => {
    const focusableElements = navLinks.querySelectorAll("a, button");
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey) {
        // If Shift + Tab and focus is on the first element, move to the last
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // If Tab and focus is on the last element, move to the first
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
});
