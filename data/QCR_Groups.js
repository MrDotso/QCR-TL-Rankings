window.QCRData = (() => {
    const groupSizeCategories = [
        {
            id: "individual",
            label: "Individual Translators",
            shortLabel: "Individuals",
            page: "Individual_Rankings.html",
            summary: "Solo translators and one-person operations are ranked separately because their output constraints are fundamentally different from group or company releases.",
            emptyMessage: "No individual translator entries have been finalized for the structure prototype yet."
        },
        {
            id: "official-company",
            label: "Official / Company Platforms",
            shortLabel: "Official / Companies",
            page: "Official_Company_Rankings.html",
            summary: "Official publishers, licensed platforms, and company-backed translation sources are ranked against other official or company-backed sources.",
            emptyMessage: "No official/company entries have been scored yet."
        },
        {
            id: "unofficial-small",
            label: "Unofficial Small Groups",
            shortLabel: "Small Groups",
            page: "Unofficial_Small_Group_Rankings.html",
            summary: "Small unofficial groups are ranked against other smaller operations so staffing limits and release capacity do not distort the comparison.",
            emptyMessage: "No unofficial small group entries have been finalized for the structure prototype yet."
        },
        {
            id: "unofficial-large",
            label: "Unofficial Large Groups",
            shortLabel: "Large Groups",
            page: "Unofficial_Large_Group_Rankings.html",
            summary: "Large unofficial groups are ranked together because their scale, release volume, and role specialization are closer to each other than to solo or small-team releases.",
            emptyMessage: "No unofficial large group entries have been scored yet."
        },
        {
            id: "needs-classification",
            label: "Needs Size Classification",
            shortLabel: "Needs Classification",
            page: "Translation_Groups.html#needs-classification",
            summary: "Profiles in this holding category need their group size confirmed before entering one of the four ranking pages.",
            emptyMessage: "No profiles are waiting for classification.",
            rankable: false
        }
    ];

    const groups = [
        {
            id: "webtoon",
            name: "Webtoon",
            initials: "WT",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: 98,
            grade: "S",
            gradeClass: "grade-s",
            profileStatus: "profiled",
            profileHref: "Translation_Groups.html#webtoon",
            summary: "Webtoon is the current official-quality reference point for the ranking framework.",
            rankReason: "Webtoon earns the top current profile grade through excellent readability, very strong translation quality, consistent official standards, and very high picture quality.",
            statusNote: "Company. Official translator. High-activity platform.",
            rankingNote: "Current official-quality reference point.",
            tags: ["Official", "Company", "Gold Standard", "Latest Chapters Paywalled", "Cheap", "Consistent", "High-Activity", "Official-Quality"],
            scores: [
                { label: "Readability", result: "S+ / 40p" },
                { label: "Consistency", result: "S- / 18p" },
                { label: "Translation", result: "S+ / 30p" },
                { label: "Localization", result: "S / 10p" },
                { label: "Picture", result: "S / Very High" }
            ],
            notes: [
                "The Canvas and Original series can be inconsistent, but only on rare occasion."
            ]
        },
        {
            id: "tapas",
            name: "Tapas",
            initials: "TP",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Gold standard. Paywalled.",
            rankingNote: "Gold standard. Paywalled.",
            tags: ["Official", "Company", "Gold Standard", "Paywalled"]
        },
        {
            id: "manga-plus",
            name: "MANGA Plus",
            initials: "MP",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Consistent. Gold standard.",
            rankingNote: "Consistent. Gold standard.",
            tags: ["Official", "Company", "Gold Standard", "Consistent"]
        },
        {
            id: "alphamanga",
            name: "AlphaManga",
            initials: "AM",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Consistent. Paywalled. Very expensive.",
            rankingNote: "Consistent. Paywalled. Very expensive.",
            tags: ["Official", "Company", "Consistent", "Paywalled", "Very Expensive"]
        },
        {
            id: "manta",
            name: "Manta",
            initials: "MA",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Consistent. Subscription service. Paywalled.",
            rankingNote: "Consistent. Subscription service. Paywalled.",
            tags: ["Official", "Company", "Consistent", "Subscription Service", "Paywalled"]
        },
        {
            id: "lezhin-comics",
            name: "Lezhin Comics",
            initials: "LC",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Defunct. Consistent.",
            rankingNote: "Defunct. Consistent.",
            tags: ["Official", "Company", "Consistent", "Defunct"]
        },
        {
            id: "billi-billi",
            name: "Billi-Billi",
            initials: "BB",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Defunct. Series-dependent.",
            rankingNote: "Defunct. Series-dependent.",
            tags: ["Official", "Company", "Series-Dependent", "Defunct"]
        },
        {
            id: "pocket-comics",
            name: "Pocket Comics",
            initials: "PC",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Defunct. Consistent.",
            rankingNote: "Defunct. Consistent.",
            tags: ["Official", "Company", "Consistent", "Defunct"]
        },
        {
            id: "webnovel",
            name: "WebNovel",
            initials: "WN",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Series-dependent. Paywalled.",
            rankingNote: "Series-dependent. Paywalled.",
            tags: ["Official", "Company", "Series-Dependent", "Paywalled"]
        },
        {
            id: "manga-up",
            name: "Manga UP!",
            initials: "MU",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Paywalled. Ridiculously expensive. Breaks chapters into parts.",
            rankingNote: "Paywalled. Ridiculously expensive. Breaks chapters into parts.",
            tags: ["Official", "Company", "Paywalled", "Ridiculously Expensive", "Split Chapters"]
        },
        {
            id: "tappytoon",
            name: "TappyToon",
            initials: "TT",
            sizeCategoryId: "official-company",
            identity: "Official Platform",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Declined recently.",
            rankingNote: "Declined recently.",
            tags: ["Official", "Company", "Declined Recently"]
        },
        {
            id: "book-walker",
            name: "Book Walker",
            initials: "BW",
            sizeCategoryId: "official-company",
            identity: "Official Source",
            score: null,
            grade: "TBD",
            profileStatus: "overview",
            summary: "Sells chapters and volumes.",
            rankingNote: "Official source. Sells chapters and volumes.",
            tags: ["Official", "Source", "Paid Access"]
        },
        {
            id: "valir-scans",
            name: "Valir Scans",
            initials: "VS",
            sizeCategoryId: "unofficial-large",
            identity: "Unofficial Large Group",
            score: 56,
            grade: "C-",
            gradeClass: "grade-c",
            profileStatus: "profiled",
            profileHref: "Translation_Groups.html#valir-scans",
            summary: "Valir Scans is the current pivot reference for readable but flawed translations.",
            rankReason: "Valir Scans is technically readable and useful as a reference point, but unusual grammar and weak localization often obscure context.",
            statusNote: "Large group. Active. Unofficial paid translator.",
            rankingNote: "Readable but flawed pivot reference.",
            tags: ["MTL-Light", "Active", "Unofficial-Paid Translator", "Good in a Pinch", "Consistently-Inconsistent", "Okay", "Large Group"],
            scores: [
                { label: "Readability", result: "B- / 25p" },
                { label: "Consistency", result: "C / 10p" },
                { label: "Translation", result: "C+ / 18p" },
                { label: "Localization", result: "D / 3p" },
                { label: "Picture", result: "C / Average" }
            ],
            notes: [
                "Readability was challenging to rank because the translations are technically readable, but unusual grammar often obscures or erases context.",
                "Consistency was difficult to pin down because the group is consistently inconsistent, but not in one particular way.",
                "Translation quality is poor objectively, but acceptable as a reference point.",
                "Localization suffers because unusual and often nonsensical grammar breaks context in confusing ways.",
                "Picture quality is average relative to competitors."
            ]
        },
        {
            id: "nyx-scans",
            name: "Nyx Scans",
            initials: "NYX",
            sizeCategoryId: "unofficial-large",
            identity: "Unofficial Large Group",
            score: 10,
            grade: "F-",
            gradeClass: "grade-f",
            profileStatus: "profiled",
            profileHref: "Translation_Groups.html#nyx-scans",
            summary: "Nyx Scans is the current lower-bound reference point for the overall grading system.",
            rankReason: "The group looks readable at a glance, but the translation falls apart under comparison because of consistency, grammar, pronoun, and localization issues.",
            statusNote: "Large group. High-activity. Unofficial paid translator.",
            rankingNote: "Current lower-bound reference point.",
            tags: ["MTL", "Inconsistent", "Poor", "\"Readable\"", "Avoid at all costs", "High-Activity", "Large Group", "Unofficial-Paid Translator"],
            scores: [
                { label: "Readability", result: "F / 5p" },
                { label: "Consistency", result: "F- / 0p" },
                { label: "Translation", result: "F / 5p" },
                { label: "Localization", result: "F / 0p" },
                { label: "Picture", result: "D / Poor" }
            ],
            notes: [
                "Looks readable at first glance, but falls apart once compared to competent translations.",
                "Incredibly inconsistent in almost every metric that matters.",
                "Frequently uses incorrect pronouns, making it difficult to figure out who is talking or who is being referenced.",
                "Frequently uses incorrect, unsuitable, or nonsensical grammar.",
                "Frequently mistranslates concepts and situations, causing confusion.",
                "Makes almost no attempt to use proper localization.",
                "Picture quality is low and sometimes grainy."
            ]
        },
        {
            id: "magusmanga",
            name: "MagusManga",
            initials: "MM",
            sizeCategoryId: "unofficial-large",
            identity: "Unofficial Large Group",
            score: 41,
            grade: "D-",
            gradeClass: "grade-d",
            profileStatus: "profiled",
            profileHref: "Translation_Groups.html#magusmanga",
            summary: "MagusManga has improved recently, but the improvement is not established enough to raise the profile higher yet.",
            rankReason: "The current grade reflects recent improvements, inconsistent results, missing content issues, and awkward phrasing across evaluated work.",
            statusNote: "Active. Inconsistent. Genre-dependent and series-dependent. Size category still needs confirmation before this profile can enter a ranking page.",
            rankingNote: "Recently improved, but overall inconsistent and still has significant issues.",
            tags: ["Recently Improved", "Inconsistent", "Schrodinger's Translation", "MTL", "Active", "Read at own Risk", "Genre-Dependent", "Series-Dependent", "Large Group"],
            scores: [
                { label: "Readability", result: "C / 20p" },
                { label: "Consistency", result: "F- / 0p" },
                { label: "Translation", result: "C / 15p" },
                { label: "Localization", result: "B / 6p" },
                { label: "Picture", result: "C / Average" }
            ],
            notes: [
                "Readability is affected by frequently missing panels and/or pages.",
                "Recently improved, but the improvement appears too recent to justify a higher overall ranking yet.",
                "Translation quality includes awkward phrasing, grammar, and sentence structure.",
                "Translation Quality and Localization were overcorrected due to a misunderstanding on my part, which has since been fixed."
            ]
        }
    ];

    const classificationBacklog = [
        { name: "BoredCoronaKids", source: "Former Tier 5", note: "Excellent.", needed: "Confirm group size before ranking." },
        { name: "Leslie and the Victims", source: "Former Tier 5", note: "Excellent.", needed: "Confirm group size before ranking." },
        { name: "KS Group", source: "Former Tier 4", note: "Good quality with decent translations.", needed: "Confirm group size before ranking." },
        { name: "LHTranslation", source: "Former Tier 4", note: "Series-dependent.", needed: "Confirm group size before ranking." },
        { name: "Asurascans", source: "Former Tier 4", note: "Fairly consistent, but can be series-dependent.", needed: "Confirm group size before ranking." },
        { name: "Flamecomics", source: "Former Tier 4", note: "Similar to Asura.", needed: "Confirm group size before ranking." },
        { name: "DivaScans", source: "Former Tier 3", note: "Most readable.", needed: "Confirm group size before ranking." },
        { name: "thunderscans", source: "Former Tier 3", note: "Usually pretty decent, but can be series-dependent.", needed: "Confirm group size before ranking." },
        { name: "QI Scans", source: "Former Tier 3", note: "Fairly consistent.", needed: "Confirm group size before ranking." },
        { name: "StoneScape", source: "Former Tier 3", note: "Consistent.", needed: "Confirm group size before ranking." },
        { name: "RinkoComics", source: "Former Tier 3", note: "Weird grammar and broken context, but readable.", needed: "Confirm group size before ranking." },
        { name: "Violet Scans", source: "Former Tier 3", note: "Overview-only entry.", needed: "Confirm group size before ranking." },
        { name: "Siren Scans", source: "Former Tier 3", note: "Overview-only entry.", needed: "Confirm group size before ranking." },
        { name: "ROKARI COMICS", source: "Former Tier 3", note: "Similar to Rinko, but more formal than awkward.", needed: "Confirm group size before ranking." },
        { name: "SnowyPuffx", source: "Former Tier 3", note: "Similar to Rinko, with less weird grammar and more context breaking.", needed: "Confirm group size before ranking." },
        { name: "EZMANGA", source: "Former Tier 3", note: "Good enough when there is no other option from tiers 3, 4, or 5.", needed: "Confirm group size before ranking." },
        { name: "UTOON", source: "Former Tier 2", note: "Declined recently.", needed: "Confirm group size before ranking." },
        { name: "Lua Comic", source: "Former Tier 2", note: "Improved recently; inconsistent overall.", needed: "Confirm group size before ranking." },
        { name: "RESET SCANS", source: "Former Tier 2", note: "Usually very good, but can be inconsistent on occasion.", needed: "Confirm group size before ranking." },
        { name: "XNutScans", source: "Former Tier 2", note: "Very inconsistent and usually pretty bad, but readable on occasion.", needed: "Confirm group size before ranking." },
        { name: "Vortexscans", source: "Former Tier 2", note: "Series-dependent and very hit or miss.", needed: "Confirm group size before ranking." },
        { name: "GenzToons", source: "Former Tier 2", note: "Sometimes decent, sometimes terrible.", needed: "Confirm group size before ranking." },
        { name: "Necro Scans", source: "Former Tier 1", note: "Slightly better than UTOON, still terrible.", needed: "Confirm group size before ranking." },
        { name: "Fairy Scans", source: "Former Tier 1", note: "Slightly above Necro, still bad.", needed: "Confirm group size before ranking." },
        { name: "Luna Toons", source: "Former Tier 1", note: "Inconsistent; occasionally decent, usually unreadable.", needed: "Confirm group size before ranking." },
        { name: "Eris Scans", source: "Former Tier 1", note: "Modern UTOON-tier MTL.", needed: "Confirm group size before ranking." },
        { name: "Timeless Toons", source: "Former Tier 1", note: "Not worth mentioning beyond this.", needed: "Confirm group size before ranking." },
        { name: "Eva Scans", source: "Former Tier 1", note: "Another Modern UTOON-tier group.", needed: "Confirm group size before ranking." },
        { name: "Philliascans", source: "Former Tier 1", note: "Overall terrible, but has some outliers.", needed: "Confirm group size before ranking." }
    ];

    const categoryById = Object.fromEntries(groupSizeCategories.map((category) => [category.id, category]));

    const sortByScore = (a, b) => {
        if (a.score === b.score) {
            return a.name.localeCompare(b.name);
        }

        if (a.score === null) {
            return 1;
        }

        if (b.score === null) {
            return -1;
        }

        return b.score - a.score;
    };

    return {
        groupSizeCategories,
        groups,
        classificationBacklog,
        categoryById,
        getCategory(id) {
            return categoryById[id];
        },
        rankableCategories() {
            return groupSizeCategories.filter((category) => category.rankable !== false);
        },
        groupsForCategory(categoryId) {
            return groups.filter((group) => group.sizeCategoryId === categoryId).sort(sortByScore);
        },
        profiledGroups() {
            return groups.filter((group) => group.profileStatus === "profiled").sort(sortByScore);
        },
        overviewGroups() {
            return groups.filter((group) => group.profileStatus !== "profiled").sort((a, b) => a.name.localeCompare(b.name));
        }
    };
})();
