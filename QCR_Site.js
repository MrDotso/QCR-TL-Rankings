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
