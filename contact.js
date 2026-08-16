/* ==========================================================================
   EIGHTPLUS CONTACT DESK DYNAMIC CONTROLLER
   Handles state transitions, panel toggling, crisis styling, and URL auto-routing.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const enquirySelector = document.getElementById("enquiry-selector");
    const deskCard = document.getElementById("contact-desk-card");
    const panels = document.querySelectorAll(".dynamic-panel");

    if (!enquirySelector || !deskCard) return;

    // 1. URL Query Parameter Mapping
    // Maps incoming URL ?type=... parameters directly to selector values
    const urlParamMap = {
        "work": "work",
        "work-with-us": "work",
        "challenge": "challenge",
        "reputation": "challenge",
        "crisis": "crisis",
        "training": "training",
        "academy": "academy",
        "workshop": "workshop",
        "workshops": "workshop",
        "media": "media",
        "journalist": "journalist",
        "takeover": "takeover",
        "industry-takeover": "takeover",
        "partnership": "partnership",
        "other": "other"
    };

    // 2. Panel Mapping Table
    const panelMap = {
        "work": "panel-work",
        "challenge": "panel-work",
        "crisis": "panel-crisis",
        "training": "panel-training",
        "academy": "panel-training",
        "workshop": "panel-workshop",
        "media": "panel-media",
        "journalist": "panel-media",
        "takeover": "panel-takeover",
        "partnership": "panel-general",
        "other": "panel-general"
    };

    // Core Function: Activates the Form Panel
    function setEnquiryState(selectedValue, scrollIntoView = false) {
        const targetPanelId = panelMap[selectedValue] || "panel-default";

        // Manage Crisis Visual Override
        if (selectedValue === "crisis") {
            deskCard.classList.add("crisis-active");
        } else {
            deskCard.classList.remove("crisis-active");
        }

        // Hide all panels & disable required attributes in hidden panels
        panels.forEach(panel => {
            panel.classList.remove("active");
            const inputs = panel.querySelectorAll("input, textarea, select");
            inputs.forEach(input => {
                input.dataset.wasRequired = input.hasAttribute("required") ? "true" : "false";
                input.removeAttribute("required");
            });
        });

        // Show target panel & restore required attributes
        const activePanel = document.getElementById(targetPanelId);
        if (activePanel) {
            activePanel.classList.add("active");
            const activeInputs = activePanel.querySelectorAll("input, textarea, select");
            activeInputs.forEach(input => {
                if (input.dataset.wasRequired === "true") {
                    input.setAttribute("required", "required");
                }
            });
        }

        // Smooth scroll to the desk card if arriving via contextual CTA link
        if (scrollIntoView) {
            deskCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    // Listener for manual dropdown selection changes
    enquirySelector.addEventListener("change", (e) => {
        setEnquiryState(e.target.value, false);
    });

    // 3. AUTO-ROUTING ON PAGE LOAD
    // Reads ?type= parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const rawType = urlParams.get("type");

    if (rawType) {
        const cleanType = rawType.toLowerCase().trim();
        const mappedSelectorValue = urlParamMap[cleanType];

        if (mappedSelectorValue) {
            enquirySelector.value = mappedSelectorValue;
            setEnquiryState(mappedSelectorValue, true);
        }
    }
});
