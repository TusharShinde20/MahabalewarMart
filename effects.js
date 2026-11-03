"use strict";

// ========================================
// EFFECTS: animations and visual polish.
// Works alongside script.js without changing its logic.
// ========================================

(function () {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const byId = id => document.getElementById(id);
    const rnd = (min, max) => min + Math.random() * (max - min);

    // ---------- Scroll progress, sticky header, parallax, back-to-top ----------

    const bar = document.createElement("div");
    bar.id = "progress";
    document.body.prepend(bar);

    const header = document.querySelector(".header");
    const toTop = byId("to-top");
    const layers = Array.from(document.querySelectorAll("[data-speed]"));
    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;

            bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
            header.classList.toggle("scrolled", y > 40);
            toTop.classList.toggle("show", y > 700);

            if (!reduce && !byId("home").hidden && y < 1400) {
                layers.forEach(layer => {
                    layer.style.transform =
                        "translate3d(0," + (y * layer.dataset.speed) + "px,0)";
                });
            }

            ticking = false;
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
    onScroll();

    // ---------- Hero: strawberry plants and falling petals ----------

    const row = document.querySelector(".berry-row");

    if (row) {
        for (let i = 0; i < 18; i++) {
            const berry = document.createElement("span");
            berry.className = "berry";
            berry.textContent = "🍓";
            berry.style.cssText =
                "left:" + ((i / 18) * 100 + rnd(-2, 2)) + "%;" +
                "bottom:" + rnd(2, 40) + "%;" +
                "font-size:" + rnd(18, 34) + "px;" +
                "animation-delay:-" + rnd(0, 4) + "s";
            row.appendChild(berry);
        }
    }

    const particles = document.querySelector(".hero-particles");

    if (particles && !reduce) {
        const icons = ["🍓", "🍃", "🌿", "🍃"];

        for (let i = 0; i < 14; i++) {
            const petal = document.createElement("span");
            petal.className = "petal";
            petal.textContent = icons[i % icons.length];
            petal.style.cssText =
                "left:" + rnd(0, 100) + "%;" +
                "font-size:" + rnd(14, 26) + "px;" +
                "animation-duration:" + rnd(14, 26) + "s;" +
                "animation-delay:-" + rnd(0, 24) + "s";
            particles.appendChild(petal);
        }
    }

    // ---------- Scroll reveal ----------

    const targets = [
        ".page-hero .wrap > *", ".sec-head", ".spot > *", ".stat", ".step",
        ".story > *", ".about-layout > *", ".intro-card", ".farm-slider",
        ".product-card", ".place-card", ".blog-card", ".contact-card",
        ".cart-row", ".featured", ".summary", ".checkout-form",
        ".article .page-body > article", ".deliver-strip", ".filters", ".co-card", ".co-summary", ".bill"
    ].join(",");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("in");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });

    function scan() {
        document.querySelectorAll(targets).forEach(el => {
            if (el.dataset.reveal) return;

            el.dataset.reveal = "1";
            el.classList.add("reveal");

            const index = Array.from(el.parentNode.children).indexOf(el);
            el.style.setProperty("--d", Math.min(index, 6) * 70 + "ms");

            observer.observe(el);
        });

        // Fade images in once they have loaded.
        document.querySelectorAll("img.fade-img:not([data-img])").forEach(img => {
            img.dataset.img = "1";

            const done = () => img.classList.add("loaded");

            if (img.complete) done();
            else {
                img.addEventListener("load", done, { once: true });
                img.addEventListener("error", done, { once: true });
            }
        });
    }

    scan();

    // Safety net: if anything is still hidden shortly after a page opens, show it.
    function revealAll() {
        setTimeout(() => {
            document.querySelectorAll(".page:not([hidden]) .reveal:not(.in)").forEach(el => {
                el.classList.add("in");
                observer.unobserve(el);
            });
        }, 2500);
    }

    window.addEventListener("hashchange", revealAll);
    revealAll();

    new MutationObserver(scan).observe(
        document.querySelector("main"),
        { childList: true, subtree: true }
    );

    // ---------- Count-up numbers (values come from your own data) ----------

    const values = {
        products: () => (typeof products !== "undefined" ? products.length : 0),
        categories: () => (typeof products !== "undefined"
            ? new Set(products.map(p => p.category)).size : 0),
        places: () => (typeof destinations !== "undefined" ? destinations.length : 0)
    };

    const counter = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const end = values[el.dataset.count] ? values[el.dataset.count]() : 0;

            counter.unobserve(el);

            if (reduce || end === 0) {
                el.textContent = end;
                return;
            }

            const start = performance.now();
            const duration = 1400;

            function tick(now) {
                const t = Math.min((now - start) / duration, 1);
                el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));

                if (t < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
        });
    }, { threshold: 0.4 });

    document.querySelectorAll("[data-count]").forEach(el => {
        // Show the real number straight away if animation never runs.
        el.textContent = values[el.dataset.count] ? values[el.dataset.count]() : 0;
        if (!reduce) {
            el.textContent = 0;
            counter.observe(el);
        }
    });

    // ---------- Subtle 3D tilt on product cards (mouse devices only) ----------

    if (canHover && !reduce) {
        document.addEventListener("mousemove", event => {
            const card = event.target.closest(".product-card");

            document.querySelectorAll(".product-card.tilting").forEach(c => {
                if (c !== card) {
                    c.classList.remove("tilting");
                    c.style.transform = "";
                }
            });

            if (!card) return;

            const box = card.getBoundingClientRect();
            const x = (event.clientX - box.left) / box.width - 0.5;
            const y = (event.clientY - box.top) / box.height - 0.5;

            card.classList.add("tilting");
            card.style.transform =
                "perspective(900px) rotateX(" + (-y * 5) + "deg) rotateY(" + (x * 6) +
                "deg) translateY(-8px)";
        });

        document.addEventListener("mouseleave", () => {
            document.querySelectorAll(".product-card.tilting").forEach(c => {
                c.classList.remove("tilting");
                c.style.transform = "";
            });
        });
    }

    // ---------- Cart: badge bounce and flying strawberry ----------

    const cartLink = document.querySelector(".cart-link");
    let ready = false;

    setTimeout(() => { ready = true; }, 800);

    new MutationObserver(() => {
        if (!ready) return;

        cartLink.classList.remove("bump");
        void cartLink.offsetWidth;
        cartLink.classList.add("bump");
    }).observe(byId("cart-count"), {
        childList: true,
        characterData: true,
        subtree: true
    });

    document.addEventListener("click", event => {
        const button = event.target.closest("[data-add]");

        if (!button || reduce) return;

        const from = button.getBoundingClientRect();
        const to = cartLink.getBoundingClientRect();

        const fly = document.createElement("span");
        fly.className = "fly";
        fly.textContent = "🍓";
        document.body.appendChild(fly);

        fly.animate([
            {
                transform: "translate(" + (from.left + from.width / 2) + "px," +
                    from.top + "px) scale(1.3)",
                opacity: 1
            },
            {
                transform: "translate(" + (to.left + to.width / 2) + "px," +
                    to.top + "px) scale(.4)",
                opacity: 0.2
            }
        ], {
            duration: 750,
            easing: "cubic-bezier(.5,-.3,.7,.4)"
        }).onfinish = () => fly.remove();
    });
})();
