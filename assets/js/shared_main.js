// Shared header and navigation for all pages.
// Run the website through a local HTTP server.

async function loadComponent(id, file) {
    const container = document.getElementById(id);
    if (!container) return;
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error("Unable to load " + file);
        }
        container.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
        container.textContent = "Unable to load this section. Run the site using a local HTTP server.";
    }
}

async function initialiseLayout() {
    await loadComponent("header", "/components/header.html");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#header nav a").forEach(link => {
        if (link.getAttribute("href").split("/").pop() === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });
}

initialiseLayout();