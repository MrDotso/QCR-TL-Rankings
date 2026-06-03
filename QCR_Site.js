const rankingLinks = [
    { href: "Rankings.html", label: "Ranking Hub" },
    { href: "Individual_Rankings.html", label: "Individual Translators" },
    { href: "Official_Company_Rankings.html", label: "Official / Company Platforms" },
    { href: "Unofficial_Small_Group_Rankings.html", label: "Unofficial Small Groups" },
    { href: "Unofficial_Large_Group_Rankings.html", label: "Unofficial Large Groups" }
];

document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const trigger = dropdown.querySelector(".dropbtn");
    const menu = dropdown.querySelector(".dropdown-content");

    if (!trigger || !menu || !trigger.textContent.includes("Rankings")) {
        return;
    }

    menu.innerHTML = rankingLinks
        .map((link) => `<a href="${link.href}">${link.label}</a>`)
        .join("");
});

const localForms = document.querySelectorAll("[data-local-form]");

localForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formName = form.dataset.localForm;
        const storageKey = `qcr-${formName}-drafts`;
        const formData = Object.fromEntries(new FormData(form).entries());
        const existingDrafts = JSON.parse(localStorage.getItem(storageKey) || "[]");

        existingDrafts.push({
            ...formData,
            savedAt: new Date().toISOString()
        });

        localStorage.setItem(storageKey, JSON.stringify(existingDrafts));

        const status = form.querySelector("[data-form-status]");
        if (status) {
            status.textContent = "Saved in this browser.";
        }

        form.reset();
    });
});
