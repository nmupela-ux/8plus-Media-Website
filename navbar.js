document.addEventListener("DOMContentLoaded", function () {
    const navPlaceholder = document.getElementById("navbar-placeholder");

    if (navPlaceholder) {
        fetch("./navbar.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Navbar failed to load");
                }
                return response.text();
            })
            .then(data => {
                navPlaceholder.innerHTML = data;

                // Setup mobile toggle menu after navbar loads
                const navToggle = document.getElementById("navToggle");
                const navLinks = document.getElementById("navLinks");

                if (navToggle && navLinks) {
                    navToggle.addEventListener("click", function () {
                        navLinks.classList.toggle("active");
                        const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
                        navToggle.setAttribute("aria-expanded", !isExpanded);
                    });
                }
            })
            .catch(error => console.error("Error loading navbar:", error));
    }
});
