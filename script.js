document.addEventListener("keydown", function (e) {
    if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }

    if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "I" || e.key === "J" || e.key === "C" ||
         e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)
    ) {
        e.preventDefault();
        return false;
    }

    if (
        (e.ctrlKey || e.metaKey) &&
        e.altKey &&
        (e.key === "i" || e.key === "j" || e.key === "u" ||
         e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 85)
    ) {
        e.preventDefault();
        return false;
    }

    if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "u" || e.key === "U" || e.keyCode === 85)
    ) {
        e.preventDefault();
        return false;
    }

    if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "s" || e.key === "S" || e.keyCode === 83)
    ) {
        e.preventDefault();
        return false;
    }
});

document.addEventListener("dragstart", function (e) {
    e.preventDefault();
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

function detectEngine() {
    const ua = navigator.userAgent;
    let engine = "";
    let text = "";

    let isBlink = false;
    let isLibWeb = false;

    if (ua.includes("Ladybird")) {
        isLibWeb = true;
    }

    if (navigator.userAgentData && navigator.userAgentData.brands) {
        const brands = navigator.userAgentData.brands.map(b => b.brand);

        if (
            brands.includes("Chromium") &&
            !brands.includes("Google Chrome") &&
            !brands.includes("Microsoft Edge")
        ) {
            isBlink = true;
        }
    }

    if (
        ua.includes("Chromium") &&
        !ua.includes("Edg") &&
        !ua.includes("OPR") &&
        !navigator.brave
    ) {
        isBlink = true;
    }

    if (isLibWeb) {
        engine = "libweb";
        text = 'Your browser is <span class="engine-highlight">LibWeb</span> based.';
    } else if (isBlink) {
        engine = "blink";
        text = 'Your browser is <span class="engine-highlight">Blink</span> based.';
    } else if (ua.includes("Chrome") || ua.includes("Chromium")) {
        engine = "chromium";
        text = 'Your browser is <span class="engine-highlight">Chromium</span> based.';
    } else if (ua.includes("Firefox")) {
        engine = "gecko";
        text = 'Your browser is <span class="engine-highlight">Gecko</span> based.';
    } else if (
        ua.includes("Safari") &&
        !ua.includes("Chrome") &&
        !ua.includes("Chromium")
    ) {
        engine = "webkit";
        text = 'Your browser is <span class="engine-highlight">WebKit</span> based.';
    } else {
        engine = "else";
        text = 'Your browser uses <span class="engine-highlight">another</span> engine.';
    }

    return { engine, text };
}

const result = detectEngine();
const iconContainer = document.getElementById("icon-container");

if (result.engine === "else") {
    iconContainer.innerHTML = '<span class="unknown-icon">?</span>';
} else {
    const imgName = result.engine === "blink"
        ? "chromium.png"
        : `${result.engine}.png`;

    iconContainer.innerHTML =
        `<img src="${imgName}" alt="${result.engine} logo" class="engine-img">`;
}

document.getElementById("browser-info").innerHTML = result.text;
