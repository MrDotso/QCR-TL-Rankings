(() => {
    const data = window.QCRData;

    if (!data) {
        return;
    }

    const escapeHtml = (value) => String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

    const renderBadges = (tags = []) => `
        <ul class="badge-list">
            ${tags.map((tag) => `<li class="badge">${escapeHtml(tag)}</li>`).join("")}
        </ul>
    `;

    const renderScoreGrid = (scores = []) => {
        if (!scores.length) {
            return "";
        }

        return `
            <div class="score-grid">
                ${scores.map((score) => `
                    <div>
                        <strong>${escapeHtml(score.label)}</strong>
                        <span>${escapeHtml(score.result)}</span>
                    </div>
                `).join("")}
            </div>
        `;
    };

    const renderNotes = (notes = []) => {
        if (!notes.length) {
            return "<p>No detailed notes have been added yet.</p>";
        }

        return `
            <ul class="notes-list">
                ${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
            </ul>
        `;
    };

    const renderProfile = (group) => {
        const category = data.getCategory(group.sizeCategoryId);
        const categoryLink = category && category.rankable !== false
            ? `<a href="${escapeHtml(category.page)}">Size ranking</a>`
            : `<a href="Rankings.html#needs-classification">Classification queue</a>`;
        const classificationNote = group.classificationNote
            ? `<p class="classification-note">${escapeHtml(group.classificationNote)}</p>`
            : "";

        return `
            <article class="group-profile" id="${escapeHtml(group.id)}">
                <div class="group-logo-cell">
                    <div class="group-logo-mark">${escapeHtml(group.initials)}</div>
                    <p class="eyebrow">${escapeHtml(group.identity)}</p>
                </div>
                <div class="group-rank-cell">
                    <h3>Rank</h3>
                    <span class="grade ${escapeHtml(group.gradeClass || "")}">${escapeHtml(group.grade)}</span>
                    <p>${typeof group.score === "number" ? `${group.score}p overall` : "Score TBD"}</p>
                </div>
                <div class="group-tags-cell">
                    <h3>Tags</h3>
                    ${renderBadges(group.tags)}
                </div>
                <header class="group-name-cell">
                    <p class="eyebrow">${escapeHtml(category?.label || "Unclassified")}</p>
                    <h2>${escapeHtml(group.name)}</h2>
                    <p>${escapeHtml(group.summary)}</p>
                    ${classificationNote}
                </header>
                <section class="group-main-cell">
                    <h3>Why This Rank</h3>
                    <p>${escapeHtml(group.rankReason || group.rankingNote || "Ranking explanation pending.")}</p>
                    ${renderScoreGrid(group.scores)}
                </section>
                <aside class="group-link-cell">
                    <h3>Links</h3>
                    ${categoryLink}
                    <a href="Evaluation_Criteria.html">Criteria</a>
                    <a href="Tag_Groups.html">Tags</a>
                </aside>
                <aside class="group-members-cell">
                    <h3>Status</h3>
                    <p>${escapeHtml(group.statusNote || group.identity)}</p>
                </aside>
                <section class="group-about-cell">
                    <h3>About This Evaluation</h3>
                    ${renderNotes(group.notes)}
                </section>
            </article>
        `;
    };

    const renderProfiles = () => {
        const host = document.querySelector("[data-group-profiles]");

        if (!host) {
            return;
        }

        host.innerHTML = data.profiledGroups().map(renderProfile).join("");
    };

    const renderOverviewGroups = () => {
        const host = document.querySelector("[data-overview-groups]");

        if (!host) {
            return;
        }

        const overviewGroups = data.overviewGroups();

        host.innerHTML = `
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th>Category</th>
                            <th>Current Note</th>
                            <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${overviewGroups.map((group) => {
                            const category = data.getCategory(group.sizeCategoryId);

                            return `
                                <tr>
                                    <td><strong>${escapeHtml(group.name)}</strong></td>
                                    <td>${escapeHtml(category?.label || "Unclassified")}</td>
                                    <td>${escapeHtml(group.rankingNote || group.summary)}</td>
                                    <td>${renderBadges(group.tags)}</td>
                                </tr>
                            `;
                        }).join("")}
                    </tbody>
                </table>
            </div>
        `;
    };

    const renderBacklog = () => {
        const host = document.querySelector("[data-classification-backlog]");

        if (!host) {
            return;
        }

        host.innerHTML = `
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th>Previous Source</th>
                            <th>Current Note</th>
                            <th>Needed</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.classificationBacklog.map((entry) => `
                            <tr>
                                <td><strong>${escapeHtml(entry.name)}</strong></td>
                                <td>${escapeHtml(entry.source)}</td>
                                <td>${escapeHtml(entry.note)}</td>
                                <td>${escapeHtml(entry.needed)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    };

    renderProfiles();
    renderOverviewGroups();
    renderBacklog();
})();
