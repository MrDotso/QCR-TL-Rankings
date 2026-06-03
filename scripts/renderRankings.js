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

    const hasScore = (group) => typeof group.score === "number";

    const scoreLabel = (group) => hasScore(group) ? `${group.score}p` : "TBD";

    const gradeClass = (group) => group.gradeClass || "";

    const renderBadges = (tags = []) => {
        if (!tags.length) {
            return "<span class=\"subtle\">No tags yet.</span>";
        }

        return `
            <ul class="badge-list">
                ${tags.map((tag) => `<li class="badge">${escapeHtml(tag)}</li>`).join("")}
            </ul>
        `;
    };

    const renderGroupName = (group) => {
        if (group.profileHref) {
            return `<a href="${escapeHtml(group.profileHref)}"><strong>${escapeHtml(group.name)}</strong></a>`;
        }

        return `<strong>${escapeHtml(group.name)}</strong>`;
    };

    const renderCategoryNav = (activeId) => {
        const navHosts = document.querySelectorAll("[data-ranking-nav]");

        navHosts.forEach((host) => {
            host.innerHTML = `
                <nav class="category-switcher" aria-label="Ranking categories">
                    <a class="${activeId === "hub" ? "active" : ""}" href="Rankings.html">Ranking Hub</a>
                    ${data.rankableCategories().map((category) => `
                        <a class="${activeId === category.id ? "active" : ""}" href="${escapeHtml(category.page)}">${escapeHtml(category.shortLabel)}</a>
                    `).join("")}
                </nav>
            `;
        });
    };

    const renderHub = () => {
        const host = document.querySelector("[data-ranking-hub]");

        if (!host) {
            return;
        }

        renderCategoryNav("hub");

        const categoryCards = data.rankableCategories().map((category) => {
            const groups = data.groupsForCategory(category.id);
            const scoredGroups = groups.filter(hasScore);
            const overviewGroups = groups.filter((group) => !hasScore(group));

            return `
                <article class="ranking-category-card">
                    <p class="eyebrow">${escapeHtml(category.shortLabel)}</p>
                    <h2>${escapeHtml(category.label)}</h2>
                    <p>${escapeHtml(category.summary)}</p>
                    <dl class="ranking-stat-list">
                        <div><dt>Scored</dt><dd>${scoredGroups.length}</dd></div>
                        <div><dt>Overview</dt><dd>${overviewGroups.length}</dd></div>
                    </dl>
                    <a class="secondary-button" href="${escapeHtml(category.page)}">Open ranking</a>
                </article>
            `;
        }).join("");

        const pendingProfiles = data.groupsForCategory("needs-classification");

        host.innerHTML = `
            <section class="section">
                <div class="grid two">
                    ${categoryCards}
                </div>
            </section>

            <section class="section" id="needs-classification">
                <div class="section-header">
                    <div>
                        <h2>Needs Classification</h2>
                        <p>These entries are not ranked in the new split yet because the group size is missing or not confirmed.</p>
                    </div>
                </div>
                <div class="grid two">
                    ${pendingProfiles.map((group) => `
                        <article class="card classification-card">
                            <p class="eyebrow">Profiled, not ranked</p>
                            <h3>${escapeHtml(group.name)}</h3>
                            <p>${escapeHtml(group.classificationNote || group.rankingNote || group.summary)}</p>
                            <div class="button-row">
                                <a class="secondary-button" href="${escapeHtml(group.profileHref)}">Open profile</a>
                            </div>
                        </article>
                    `).join("")}
                </div>
            </section>

            <section class="section">
                <div class="section-header">
                    <div>
                        <h2>Classification Backlog</h2>
                        <p>The old overall list names below need size/category confirmation before they enter the new ranking pages.</p>
                    </div>
                </div>
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
            </section>
        `;
    };

    const renderCategoryPage = () => {
        const host = document.querySelector("[data-size-ranking]");

        if (!host) {
            return;
        }

        const categoryId = host.dataset.sizeRanking;
        const category = data.getCategory(categoryId);

        if (!category) {
            host.innerHTML = `
                <section class="section">
                    <article class="card">
                        <h2>Unknown ranking category</h2>
                        <p>This page does not match a category in the shared ranking data.</p>
                    </article>
                </section>
            `;
            return;
        }

        renderCategoryNav(categoryId);

        const groups = data.groupsForCategory(categoryId);
        const rankedGroups = groups.filter(hasScore);
        const overviewGroups = groups.filter((group) => !hasScore(group));

        const rankingRows = rankedGroups.map((group, index) => `
            <tr>
                <td><strong>${index + 1}</strong></td>
                <td>${renderGroupName(group)}</td>
                <td><span class="grade ${escapeHtml(gradeClass(group))}">${escapeHtml(group.grade)}</span></td>
                <td>${escapeHtml(scoreLabel(group))}</td>
                <td>${escapeHtml(group.rankingNote || group.summary)}</td>
                <td>${renderBadges(group.tags)}</td>
            </tr>
        `).join("");

        const overviewRows = overviewGroups.map((group) => `
            <tr>
                <td>${renderGroupName(group)}</td>
                <td><span class="grade">${escapeHtml(group.grade)}</span></td>
                <td>${escapeHtml(group.rankingNote || group.summary)}</td>
                <td>${renderBadges(group.tags)}</td>
            </tr>
        `).join("");

        host.innerHTML = `
            <section class="section">
                <div class="section-header">
                    <div>
                        <h2>${escapeHtml(category.label)}</h2>
                        <p>${escapeHtml(category.summary)}</p>
                    </div>
                </div>
                <div class="ranking-summary-grid">
                    <article class="card">
                        <h3>Scored Entries</h3>
                        <p>${rankedGroups.length}</p>
                    </article>
                    <article class="card">
                        <h3>Overview Entries</h3>
                        <p>${overviewGroups.length}</p>
                    </article>
                    <article class="card">
                        <h3>Ranking Basis</h3>
                        <p>Only entries with confirmed size category and score data appear in the ranked table.</p>
                    </article>
                </div>
            </section>

            <section class="section">
                <div class="section-header">
                    <div>
                        <h2>Ranked Entries</h2>
                        <p>Sorted by current score within this size category only.</p>
                    </div>
                </div>
                ${rankedGroups.length ? `
                    <div class="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Group</th>
                                    <th>Grade</th>
                                    <th>Score</th>
                                    <th>Why</th>
                                    <th>Tags</th>
                                </tr>
                            </thead>
                            <tbody>${rankingRows}</tbody>
                        </table>
                    </div>
                ` : `
                    <article class="empty-state">
                        <h2>${escapeHtml(category.emptyMessage)}</h2>
                        <p>Add entries to the shared group data once their size category and scoring details are confirmed.</p>
                    </article>
                `}
            </section>

            <section class="section">
                <div class="section-header">
                    <div>
                        <h2>Overview Entries</h2>
                        <p>These entries are assigned to this size category but do not yet have enough score data to rank.</p>
                    </div>
                </div>
                ${overviewGroups.length ? `
                    <div class="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Group</th>
                                    <th>Grade</th>
                                    <th>Current Note</th>
                                    <th>Tags</th>
                                </tr>
                            </thead>
                            <tbody>${overviewRows}</tbody>
                        </table>
                    </div>
                ` : `
                    <article class="card">
                        <h3>No overview-only entries</h3>
                        <p>Every entry currently assigned here either has score data or has not been added yet.</p>
                    </article>
                `}
            </section>
        `;
    };

    const hasHub = Boolean(document.querySelector("[data-ranking-hub]"));
    const hasCategoryPage = Boolean(document.querySelector("[data-size-ranking]"));

    renderHub();
    renderCategoryPage();

    if (!hasHub && !hasCategoryPage && document.querySelector("[data-ranking-nav]")) {
        renderCategoryNav("hub");
    }
})();
