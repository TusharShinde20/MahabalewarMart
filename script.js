"use strict";

// ========================================
// BUSINESS SETTINGS
// ========================================

// Replace with 91 followed by your real ten-digit WhatsApp number.
const WHATSAPP_NUMBER = "919137648543";

// Optional GA4 measurement ID. Leave empty to keep Analytics disabled.
const GA_MEASUREMENT_ID = "";

const STORAGE_KEY = "mahabaleshwarCartV2";
const ORDER_KEY = "mahabaleshwarLastOrder";

// ----------------------------------------
// STORE, PAYMENT AND EMAIL SETTINGS
// ----------------------------------------

const BUSINESS = {
    name: "Mahabaleshwar Mart",
    address: "Mahabaleshwar, Maharashtra, India",
    phone: "",   // optional, shown on the bill
    email: "",   // optional, shown on the bill
    fssai: ""    // optional FSSAI licence number, shown on the bill
};

// Bills for every order are emailed to this address (and to the customer).
const OWNER_EMAIL = "tusharshinde0396@gmail.com";

// Shown to customers who choose Google Pay. Replace with your real UPI ID
// and replace images/gpay-qr.png with your real QR code.
const UPI_ID = "tshinde396-2@okaxis";

const FREE_DELIVERY_MIN = 1000;   // free delivery from this subtotal
const DELIVERY_FEE = 60;          // charged below that amount: change to your rate

// Email sending uses EmailJS. See SETUP.md for the 5-minute setup.
const EMAILJS = {
    publicKey: "A9i3_LgloHtNBCkKK",
    serviceId: "service_q3ykpxp",
    templateId: "template_j0p03gp"
};

// ========================================
// PRODUCTS (image names kept exactly as you supplied)
// ========================================

const IMG = path => [path, path, path];   // 3 photos per product: replace later

const products = [
    {
        id: 1, name: "Dry Fruit Chikki", category: "Dry Fruit Chikki", tag: "Chikki",
        image: "images/dryfruitchikki2.jpeg",
        images: ["images/dryfruitchikki2.jpeg", "images/dryfruitchikki.jpeg", "images/dryfruitchikki3.jpeg"],
        description: "A rich chikki studded with dry fruits. A crunchy, indulgent treat for festivals, gifting and everyday cravings.",
        points: ["Packed with dry fruits", "500g and 1kg packs", "A thoughtful gift"],
        nutrition: { kcal: 490, per: "100 g", serving: "1 piece, 25 g", servingKcal: 123 },
        options: [{ size: "500g", price: 320 }, { size: "1kg", price: 630 }]
    },
    {
        id: 2, name: "Natural Honey", category: "Honey", tag: "Honey",
        image: "images/honey2.jpeg",
        images: ["images/honey2.jpeg", "images/honey.jpeg", "images/honey3.jpeg"],
        description: "Smooth, golden natural honey. Stir it into warm tea, drizzle it over breakfast or enjoy it straight from the spoon.",
        points: ["Natural sweetness", "500g and 1kg jars", "Lovely with tea, toast and desserts"],
        nutrition: { kcal: 304, per: "100 g", serving: "1 tbsp, 20 g", servingKcal: 61 },
        options: [{ size: "500g", price: 600 }, { size: "1kg", price: 600 }]
    },
    {
        id: 3, name: "Strawberry Jam", category: "Strawberry Jam", tag: "Jam",
        image: "images/jam2.jpeg",
        images: ["images/jam2.jpeg", "images/jam.jpeg", "images/jam3.jpeg"],
        description: "Rich, fruity strawberry jam from the strawberry country of Mahabaleshwar. Spread it, swirl it or spoon it over dessert.",
        points: ["Bright strawberry flavour", "1kg and 2kg jars", "Great on toast, with scones or in yoghurt"],
        nutrition: { kcal: 250, per: "100 g", serving: "1 tbsp, 20 g", servingKcal: 50 },
        options: [{ size: "1kg", price: 250 }, { size: "2kg", price: 500 }]
    },
    {
        id: 4, name: "Mix Fruit Crush", category: "Mix Fruit Crush", tag: "Crush",
        image: "images/mixfruitcrush2.jpeg",
        images: ["images/mixfruitcrush2.jpeg", "images/mixfruitcrush.jpeg", "images/mixfruitcrush3.jpeg"],
        description: "A concentrated mixed fruit crush that turns water, soda or chilled milk into a quick, flavourful drink.",
        points: ["Dilute with water or soda", "750ml and 1500ml bottles", "Ideal for family gatherings"],
        nutrition: { kcal: 170, per: "100 ml (undiluted)", serving: "30 ml, diluted", servingKcal: 51 },
        options: [{ size: "750ml", price: 250 }, { size: "1500ml", price: 500 }]
    },
    {
        id: 5, name: "Mix Fruit Jam", category: "Mix Fruit Jam", tag: "Jam",
        image: "images/mixfruitjam2.jpeg",
        images: ["images/mixfruitjam2.jpeg", "images/mixfruitjam.jpeg", "images/mixfruitjam3.jpeg"],
        description: "A blend of fruit flavours in a thick, spreadable jam. Perfect on bread, rotis and desserts.",
        points: ["Mixed fruit flavour", "1kg and 2kg jars", "Great for the whole family"],
        nutrition: { kcal: 250, per: "100 g", serving: "1 tbsp, 20 g", servingKcal: 50 },
        options: [{ size: "1kg", price: 250 }, { size: "2kg", price: 500 }]
    },
    {
        id: 6, name: "Peanut Chikki", category: "Peanut Chikki", tag: "Chikki",
        image: "images/peaunutchikki2.jpeg",
        images: ["images/peaunutchikki2.jpeg", "images/peaunutchikki.jpeg", "images/peaunutchikki3.jpeg"],
        description: "Crunchy peanut and jaggery chikki, a classic Maharashtra sweet. Perfect with evening chai or as a travel snack.",
        points: ["Crunchy, traditional taste", "500g and 1kg packs", "Easy to carry and share"],
        nutrition: { kcal: 500, per: "100 g", serving: "1 piece, 25 g", servingKcal: 125 },
        options: [{ size: "500g", price: 350 }, { size: "1kg", price: 700 }]
    },
    {
        id: 7, name: "Pineapple Mocktail", category: "Pineapple Mocktail", tag: "Mocktail",
        image: "images/pynaplemocktail2.jpeg",
        images: ["images/pynaplemocktail2.jpeg", "images/pynaplemocktail.jpeg", "images/pynaplemocktail3.jpeg"],
        description: "A refreshing pineapple mocktail, ready to serve chilled. Add ice and enjoy at parties, picnics or any warm afternoon.",
        points: ["Serve chilled over ice", "750ml and 1500ml bottles", "A fruity, alcohol-free treat"],
        nutrition: { kcal: 45, per: "100 ml", serving: "250 ml", servingKcal: 113 },
        options: [{ size: "750ml", price: 250 }, { size: "1500ml", price: 500 }]
    },
    {
        id: 8, name: "Strawberry Syrup", category: "Strawberry Syrup", tag: "Syrup",
        image: "images/syrup2.jpeg",
        images: ["images/syrup2.jpeg", "images/syrup.jpeg", "images/syrup3.jpeg"],
        description: "A bright strawberry syrup for milkshakes, soda, ice cream and desserts. A little goes a long way.",
        points: ["Mix with chilled milk or soda", "Pour over ice cream and desserts", "750ml and 1500ml bottles"],
        nutrition: { kcal: 270, per: "100 ml", serving: "30 ml", servingKcal: 81 },
        options: [{ size: "750ml", price: 250 }, { size: "1500ml", price: 500 }]
    }
];

// ========================================
// TRAVEL DESTINATIONS (filenames exactly as supplied)
// ========================================

const destinations = [
    { name: "Mahabaleshwar Temple", description: "A temple visit in Old Mahabaleshwar.", image: "Mahabaleshwar Temple.jpg" },
    { name: "Mapro Garden", description: "A stop for strawberry treats and local products.", image: "Mapro Garden.jpg" },
    { name: "Arthur’s Seat", description: "A viewpoint for valley scenery.", image: "Arthur’s Seat.jpg" },
    { name: "Elephant’s Head Point", description: "A viewpoint known for its distinctive rock formation.", image: "Elephant’s Head Point.jpg" },
    { name: "Lingmala Waterfall", description: "A waterfall destination for nature lovers.", image: "Lingmala Waterfall.jpg" },
    { name: "Venna Lake", description: "A lakeside stop for a relaxed outing.", image: "Venna Lake.jpg" },
    { name: "Panch Ganga Temple", description: "A temple visit in the Old Mahabaleshwar area.", image: "Panch Ganga Temple.jpg" },
    { name: "Krishnabai Temple", description: "A stone temple with valley surroundings.", image: "Krishnabai Temple.jpg" },
    { name: "Pratapgad Fort", description: "A fort visit for history enthusiasts.", image: "Pratapgarh Fort.jpg" },
    { name: "Elphinstone Point", description: "A scenic valley viewpoint.", image: "Elphinstone Point.jpg" },
    { name: "Wilson Point", description: "A viewpoint popular with early visitors.", image: "Wilson Point.jpg" },
    { name: "Bombay Point", description: "A viewpoint for an evening outing.", image: "Bombay Point.jpg" },
    { name: "Chinaman’s Falls", description: "A waterfall destination surrounded by scenery.", image: "Chinaman’s Falls.jpg" },
    { name: "Dhobi Waterfall", description: "A waterfall outing amid greenery.", image: "Dhobi Waterfall.jpg" },
    { name: "Connaught Peak", description: "A hill viewpoint for nature lovers.", image: "Connaught Peak.jpg" },
    { name: "Lodwick Point", description: "A viewpoint with walking opportunities.", image: "Lodwick Point.jpg" },
    { name: "Rajpuri Caves", description: "A religious cave destination near Panchgani.", image: "Rajpuri Caves.jpg" },
    { name: "Babington Point", description: "A quieter viewpoint amid natural surroundings.", image: "Babington Point.jpg" },
    { name: "Tableland", description: "A plateau outing in Panchgani.", image: "Tableland.jpg" },
    { name: "Parsi Point", description: "A viewpoint for valley photography.", image: "Parsi Point.jpg" },
    { name: "Velocity Entertainmentz", description: "An amusement stop for family activities.", image: "Velocity Entertainmentz.jpg" },
    { name: "On Wheelz", description: "A family amusement park.", image: "On Wheelz.jpg" },
    { name: "Kate’s Point", description: "A viewpoint near Elephant’s Head Point.", image: "Kate’s Point.jpg" },
    { name: "Tapola", description: "A lakeside destination for a longer outing.", image: "Tapola.jpg" },
    { name: "Panchgani", description: "A nearby hill town to include in your trip.", image: "Panchgani.jpg" },
    { name: "Helen’s Point", description: "A viewpoint for a peaceful nature stop.", image: "Helen’s Point.jpg" }
];

// ========================================
// FARMER STORY
// ========================================

const farmerStory = `
Welcome to Mahabaleshwar Mart! I am a strawberry farmer from
Mahabaleshwar, and our story begins with the strawberries we grow.
Farming is an important part of our lives, and starting this selling
business alongside it has given us a new way to connect with people
beyond our farm. Mahabaleshwar Mart is a personal journey—a step
towards building a small business that reflects our roots, our work
and our connection to the place we call home. Through this website,
we want to introduce ourselves, share our product collection and
give you a glimpse of the farmer behind the business. We hope to
build lasting relationships with our customers through honest
communication, thoughtful service and a willingness to listen and
improve. As a growing small business, every enquiry, order and word
of encouragement means a great deal to us. Your support gives us
the confidence to keep learning, develop our business and continue
this journey alongside our farming. Whether you are discovering
Mahabaleshwar Mart for the first time, exploring our products or
returning to shop again, we are grateful that you are here.
Thank you for taking an interest in our story and supporting a
strawberry farmer’s small business from Mahabaleshwar.
`;

// ========================================
// HELPERS AND STATE
// ========================================

const $ = id => document.getElementById(id);

let cart = [];
let currentCategory = "All";
let query = "";
let sortMode = "featured";
let lastOrder = null;
try { lastOrder = JSON.parse(sessionStorage.getItem(ORDER_KEY) || "null"); } catch { lastOrder = null; }
let toastTimer;

function money(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency", currency: "INR", maximumFractionDigits: 0
    }).format(value);
}

function toast(message) {
    $("toast").textContent = message;
    $("toast").classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 3000);
}

// ========================================
// NAVIGATION
// ========================================

function route() {
    let id = location.hash.slice(1) || "home";
    if (id === "tourism") id = "travel";

    const page = $(id);
    if (!page || !page.classList.contains("page")) id = "home";
    if (id === "order" && !lastOrder) id = "home";

    document.querySelectorAll(".page").forEach(section => {
        section.hidden = section.id !== id;
    });

    document.querySelectorAll("nav a").forEach(link => {
        link.removeAttribute("aria-current");
        if (link.hash === "#" + id) link.setAttribute("aria-current", "page");
    });

    $("navigation").classList.remove("open");
    $("menu-toggle").setAttribute("aria-expanded", "false");

    const titles = {
        home: "Home", about: "About Us", shop: "Shop", travel: "Travel Guide",
        blog: "Blog", cart: "Your Cart", checkout: "Checkout", order: "Order Placed",
        contact: "Contact", "article-places": "26 Places to Explore",
        "article-farmer": "Our Farmer Story"
    };

    document.title = titles[id] + " | Mahabaleshwar Mart";
    window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);

document.addEventListener("click", event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute("href");
    const target = $(hash.slice(1));
    if (!target || !target.classList.contains("page")) return;

    event.preventDefault();

    if (location.hash === hash) route();
    else location.hash = hash;
});

$("menu-toggle").addEventListener("click", () => {
    const open = $("navigation").classList.toggle("open");
    $("menu-toggle").setAttribute("aria-expanded", String(open));
});

route();

// ========================================
// AUTOMATIC SLIDESHOW
// ========================================

function initialiseFarmSlider() {
    const slider = $("farm-slider");
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll(".farm-slide"));
    if (slides.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentSlide = 0;
    let timer = null;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            const active = i === currentSlide;
            slide.classList.toggle("is-active", active);
            slide.setAttribute("aria-hidden", String(!active));
        });
    }

    function stopSlideshow() { window.clearInterval(timer); timer = null; }

    function startSlideshow() {
        stopSlideshow();
        if (document.hidden || reducedMotion.matches) return;
        timer = window.setInterval(() => {
            if ($("home").hidden) return;
            showSlide(currentSlide + 1);
        }, 4500);
    }

    slider.addEventListener("mouseenter", stopSlideshow);
    slider.addEventListener("mouseleave", startSlideshow);
    document.addEventListener("visibilitychange", startSlideshow);
    reducedMotion.addEventListener("change", startSlideshow);

    showSlide(0);
    startSlideshow();
}

initialiseFarmSlider();

// ========================================
// PRODUCT CARDS
// ========================================

function productCard(product, context) {
    const key = context + "-" + product.id;
    const n = product.nutrition;

    return `
        <article class="product-card" data-view="${product.id}" tabindex="0" aria-label="View details for ${product.name}">
            <div class="product-media">
                <span class="badge">${product.tag}</span>
                <img class="product-image fade-img" src="${product.images[0]}" alt="${product.name}" loading="lazy">
                <span class="quick">View details</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="kcal">🔥 ${n.kcal} kcal per ${n.per}</p>
                <div class="sizes">${product.options.map(o => `<span>${o.size}</span>`).join("")}</div>
                <label for="${key}">Choose size</label>
                <select id="${key}" data-size="${product.id}">
                    ${product.options.map((option, index) => `
                        <option value="${index}">${option.size} — ${money(option.price)}</option>
                    `).join("")}
                </select>
                <div class="buy-row">
                    <div class="price">${money(product.options[0].price)}</div>
                    <button class="btn" type="button" data-add="${product.id}">Add to Cart</button>
                </div>
            </div>
        </article>
    `;
}

function renderProducts() {
    const filtered = products.filter(product => {
        const categoryMatch = currentCategory === "All" || product.category === currentCategory;
        const searchMatch = (product.name + " " + product.category).toLowerCase().includes(query);
        return categoryMatch && searchMatch;
    });

    const sorted = filtered.slice();
    if (sortMode === "low") sorted.sort((a, b) => a.options[0].price - b.options[0].price);
    if (sortMode === "high") sorted.sort((a, b) => b.options[0].price - a.options[0].price);
    if (sortMode === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));

    $("product-list").innerHTML = sorted.map(product => productCard(product, "shop")).join("");
    $("result-count").textContent = filtered.length + " products found";
    $("featured-section").hidden = query !== "" || currentCategory !== "All";

    document.querySelectorAll("[data-category]").forEach(button => {
        button.setAttribute("aria-pressed", String(button.dataset.category === currentCategory));
    });
}

// ========================================
// CART
// ========================================

function saveCart() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
        toast("Cart works for this visit; browser storage is unavailable.");
    }
}

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        if (!Array.isArray(saved)) return;

        cart = saved.filter(item => {
            if (!item || typeof item !== "object") return false;
            const product = products.find(p => p.id === item.id);
            return (
                product &&
                Number.isInteger(item.option) &&
                product.options[item.option] &&
                Number.isInteger(item.qty) &&
                item.qty > 0
            );
        }).map(item => ({ id: item.id, option: item.option, qty: Math.min(item.qty, 99) }));
    } catch {
        cart = [];
    }
}

function subtotal() {
    return cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + product.options[item.option].price * item.qty;
    }, 0);
}

function deliveryFee(sub) {
    return sub === 0 || sub >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
}

function addToCart(id, option, qty) {
    const existing = cart.find(item => item.id === id && item.option === option);

    if (existing) existing.qty = Math.min(existing.qty + qty, 99);
    else cart.push({ id, option, qty: Math.min(qty, 99) });

    saveCart();
    renderCart();
    toast("Product added to your cart.");
}

function renderCheckoutSummary() {
    const sub = subtotal();
    const fee = deliveryFee(sub);

    $("co-items").innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        const option = product.options[item.option];

        return `
            <div class="co-item">
                <img src="${product.images[0]}" alt="">
                <div><b>${product.name}</b><small>${option.size} × ${item.qty}</small></div>
                <span>${money(option.price * item.qty)}</span>
            </div>`;
    }).join("") || '<p class="muted">Your cart is empty.</p>';

    $("co-subtotal").textContent = money(sub);
    $("co-delivery").textContent = sub === 0 ? "—" : (fee === 0 ? "Free" : money(fee));
    $("co-total").textContent = money(sub + fee);

    $("free-note").textContent = sub >= FREE_DELIVERY_MIN
        ? "🎉 Free delivery over " + money(FREE_DELIVERY_MIN) + " unlocked"
        : `🚚 Free delivery over ${money(FREE_DELIVERY_MIN)} · add ${money(FREE_DELIVERY_MIN - sub)} more`;

    $("free-bar").style.width = Math.min(100, (sub / FREE_DELIVERY_MIN) * 100) + "%";
    $("gpay-amount").textContent = money(sub + fee);
    $("place-order").disabled = !cart.length;
}

function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    $("cart-count").textContent = count;

    $("cart-items").innerHTML = cart.length
        ? cart.map((item, index) => {
            const product = products.find(p => p.id === item.id);
            const option = product.options[item.option];

            return `
                <article class="cart-row"><img class="cart-thumb" src="${product.image}" alt="">
                    <div>
                        <h3>${product.name}</h3>
                        <p>${option.size} · ${money(option.price)} each</p>
                        <strong>${money(option.price * item.qty)}</strong>
                    </div>
                    <div class="quantity">
                        <button type="button" data-qty="${index}" data-delta="-1" aria-label="Decrease ${product.name} quantity">−</button>
                        <span>${item.qty}</span>
                        <button type="button" data-qty="${index}" data-delta="1" aria-label="Increase ${product.name} quantity">+</button>
                    </div>
                    <button type="button" class="text-button" data-remove="${index}">Remove</button>
                </article>
            `;
        }).join("")
        : "<p>Your cart is empty. Visit the shop to add products.</p>";

    const sub = subtotal();
    const fee = deliveryFee(sub);

    $("cart-summary").textContent =
        `Items: ${count} · Subtotal: ${money(sub)} · Delivery: ` +
        `${sub === 0 ? "—" : (fee === 0 ? "Free" : money(fee))} · Total: ${money(sub + fee)}`;

    renderCheckoutSummary();

    $("checkout-link").hidden = !cart.length;
    $("clear-cart").hidden = !cart.length;
}

// ========================================
// TRAVEL AND BLOG
// ========================================

function imageHTML(place, className) {
    if (!place.image) return "";
    return `<img class="${className}" src="images/${encodeURIComponent(place.image)}" alt="${place.name}" loading="lazy">`;
}

function mapURL(name) {
    return "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(name + " Mahabaleshwar Maharashtra");
}

function renderPlaces() {
    const search = $("travel-search").value.trim().toLowerCase();

    const filtered = destinations.filter(place =>
        (place.name + " " + place.description).toLowerCase().includes(search)
    );

    $("place-list").innerHTML = filtered.map(place => `
        <article class="place-card">
            ${imageHTML(place, "place-image")}
            <div class="place-info">
                <h2>${place.name}</h2>
                <p>${place.description}</p>
                <a href="${mapURL(place.name)}" target="_blank" rel="noopener noreferrer">View on Google Maps →</a>
            </div>
        </article>
    `).join("") || "<p>No matching destinations.</p>";
}

// ========================================
// WHATSAPP
// ========================================

function openWhatsApp(message) {
    if (!/^91[0-9]{10}$/.test(WHATSAPP_NUMBER)) {
        toast("Please add your real WHATSAPP_NUMBER in script.js.");
        return false;
    }

    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
}

// ========================================
// LEGAL POLICIES (customise to match your business)
// ========================================

const policies = {
    privacy: ["Privacy Policy",
        "We use the details you enter at checkout (name, phone, email and address) to process and deliver your order and to email your bill. Your bill is sent to you and to us through an email service. Cart items are stored in your browser, without your name or address. Contact us with privacy questions."],
    shipping: ["Shipping Policy",
        "We deliver all over India. Delivery is free on orders over ₹1,000; a delivery charge applies below that amount and is shown at checkout. Estimated delivery time is confirmed on request."],
    refund: ["Refund Policy",
        "Contact us if an item arrives damaged, defective or incorrect. Share order details and helpful photographs where available. We will discuss a resolution without limiting applicable consumer rights."],
    terms: ["Terms of Service",
        "Prices and availability are subject to confirmation. The cart excludes unconfirmed delivery charges. Check product labels, ingredients and storage instructions before use. Travel content is informational and access conditions can change."]
};

// ========================================
// EVENTS
// ========================================

document.addEventListener("change", event => {
    if (!event.target.matches("[data-size]")) return;

    const product = products.find(p => p.id === Number(event.target.dataset.size));

    event.target.closest(".product-card").querySelector(".price").textContent =
        money(product.options[Number(event.target.value)].price);
});

document.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.hasAttribute("data-add")) {
        const id = Number(button.dataset.add);

        const option = Number(
            button.closest(".product-card").querySelector("select").value
        );

        addToCart(id, option, 1);
    }

    if (button.hasAttribute("data-category")) {
        currentCategory = button.dataset.category;
        renderProducts();
    }

    if (button.hasAttribute("data-footer-category")) {
        currentCategory = button.dataset.footerCategory;
        query = "";
        $("shop-search").value = "";
        $("header-search").value = "";
        renderProducts();

        if (location.hash === "#shop") route();
        else location.hash = "shop";
    }

    if (button.hasAttribute("data-qty")) {
        const index = Number(button.dataset.qty);
        cart[index].qty = Math.min(99, cart[index].qty + Number(button.dataset.delta));
        if (cart[index].qty <= 0) cart.splice(index, 1);
        saveCart();
        renderCart();
    }

    if (button.hasAttribute("data-remove")) {
        cart.splice(Number(button.dataset.remove), 1);
        saveCart();
        renderCart();
    }

    if (button.hasAttribute("data-whatsapp")) {
        openWhatsApp("Hello Mahabaleshwar Mart! I have a product or delivery enquiry.");
    }

    if (button.hasAttribute("data-policy")) {
        const policy = policies[button.dataset.policy];
        if (!policy) return;
        $("legal-title").textContent = policy[0];
        $("legal-content").textContent = policy[1];
        $("legal-dialog").showModal();
    }
});

$("search-form").addEventListener("submit", event => {
    event.preventDefault();
    query = $("header-search").value.trim().toLowerCase();
    currentCategory = "All";
    $("shop-search").value = $("header-search").value;
    renderProducts();

    if (location.hash === "#shop") route();
    else location.hash = "shop";
});

$("shop-search").addEventListener("input", event => {
    query = event.target.value.trim().toLowerCase();
    $("header-search").value = event.target.value;
    renderProducts();
});

$("sort-products").addEventListener("change", event => {
    sortMode = event.target.value;
    renderProducts();
});

$("travel-search").addEventListener("input", renderPlaces);

$("clear-cart").addEventListener("click", () => {
    if (!confirm("Remove all items from your cart?")) return;
    cart = [];
    saveCart();
    renderCart();
});

// ========================================
// PRODUCT DETAILS DIALOG
// ========================================

let pdProduct = null;
let pdQty = 1;

function openProduct(id) {
    const p = products.find(item => item.id === id);

    if (!p) return;

    pdProduct = p;
    pdQty = 1;

    const n = p.nutrition;

    $("pd-cat").textContent = p.tag;
    $("pd-name").textContent = p.name;
    $("pd-desc").textContent = p.description;
    $("pd-price").textContent = money(p.options[0].price);
    $("pd-qty").textContent = "1";

    $("pd-points").innerHTML = p.points.map(text => `<li>${text}</li>`).join("");

    $("pd-size").innerHTML = p.options.map((option, index) =>
        `<option value="${index}">${option.size} — ${money(option.price)}</option>`
    ).join("");

    $("pd-main").src = p.images[0];
    $("pd-main").alt = p.name;

    $("pd-thumbs").innerHTML = p.images.map((src, index) => `
        <button type="button" class="pd-thumb${index === 0 ? " active" : ""}"
                data-thumb="${index}" aria-label="Show photo ${index + 1}">
            <img src="${src}" alt="">
        </button>`).join("");

    $("pd-nutri").innerHTML = `
        <div class="nutri-title">Calories <small>approximate</small></div>
        <div class="nutri-big"><b>${n.kcal}</b><span>kcal per ${n.per}</span></div>
        <div class="nutri-row"><span>Per serving (${n.serving})</span><b>${n.servingKcal} kcal</b></div>
        <p class="nutri-note">Values are approximate and can vary slightly by batch.</p>`;

    $("product-dialog").showModal();
}

document.addEventListener("click", event => {
    const card = event.target.closest(".product-card[data-view]");

    if (card && !event.target.closest("button, select, option, label, a")) {
        openProduct(Number(card.dataset.view));
        return;
    }

    const thumb = event.target.closest("[data-thumb]");

    if (thumb && pdProduct) {
        $("pd-main").src = pdProduct.images[Number(thumb.dataset.thumb)];

        document.querySelectorAll(".pd-thumb").forEach(button =>
            button.classList.toggle("active", button === thumb)
        );
    }

    const step = event.target.closest("[data-pdq]");

    if (step) {
        pdQty = Math.min(99, Math.max(1, pdQty + Number(step.dataset.pdq)));
        $("pd-qty").textContent = pdQty;
    }
});

document.addEventListener("keydown", event => {
    if (event.key !== "Enter" || event.target.id) return;

    const card = event.target.closest(".product-card[data-view]");

    if (card && card === event.target) openProduct(Number(card.dataset.view));
});

$("pd-size").addEventListener("change", () => {
    $("pd-price").textContent = money(pdProduct.options[Number($("pd-size").value)].price);
});

$("pd-add").addEventListener("click", () => {
    addToCart(pdProduct.id, Number($("pd-size").value), pdQty);
    $("product-dialog").close();
});

$("pd-close").addEventListener("click", () => $("product-dialog").close());

$("product-dialog").addEventListener("click", event => {
    if (event.target === $("product-dialog")) $("product-dialog").close();
});

// ========================================
// CHECKOUT, PAYMENT AND BILL
// ========================================

$("upi-id").textContent = UPI_ID;

document.addEventListener("change", event => {
    if (event.target.name !== "pay") return;

    const gpay = event.target.value === "gpay";

    $("gpay-panel").hidden = !gpay;
    $("upi-ref").required = gpay;

    document.querySelectorAll(".pay-opt").forEach(option => {
        option.classList.toggle("active", option.contains(event.target));
    });
});

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[character]));
}

function billHTML(order, logoSrc) {
    const when = new Date(order.date).toLocaleString("en-IN", {
        dateStyle: "medium", timeStyle: "short"
    });

    const cell = "padding:10px 6px;border-bottom:1px solid #e3ebdd;font-size:14px;";

    const rows = order.items.map(item => `
        <tr>
            <td style="${cell}"><b>${escapeHTML(item.name)}</b><br><span style="font-size:12px;color:#5d7165;">${escapeHTML(item.size)}</span></td>
            <td style="${cell}text-align:center;">${item.qty}</td>
            <td style="${cell}text-align:right;">${money(item.price)}</td>
            <td style="${cell}text-align:right;"><b>${money(item.price * item.qty)}</b></td>
        </tr>`).join("");

    const paymentStatus = order.paymentMode === "cod"
        ? "Amount payable on delivery"
        : "UPI transaction ID: " + escapeHTML(order.paymentRef);

    const contactLine = [BUSINESS.phone, BUSINESS.email].filter(Boolean).map(escapeHTML).join(" · ");

    return `
    <div class="bill" style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #dce7d5;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#1c2a22;">
        <div style="background:#14392b;color:#ffffff;padding:20px 22px;">
            <table role="presentation" cellspacing="0" cellpadding="0"><tr>
                <td style="vertical-align:middle;"><img src="${logoSrc}" alt="${escapeHTML(BUSINESS.name)}" width="56" height="56" style="display:block;border-radius:10px;object-fit:cover;"></td>
                <td style="padding-left:14px;vertical-align:middle;">
                    <div style="font-size:20px;font-weight:bold;letter-spacing:1px;">${escapeHTML(BUSINESS.name).toUpperCase()}</div>
                    <div style="font-size:13px;color:#cfe0d2;">${escapeHTML(BUSINESS.address)}</div>
                    ${contactLine ? `<div style="font-size:13px;color:#cfe0d2;">${contactLine}</div>` : ""}
                    ${BUSINESS.fssai ? `<div style="font-size:13px;color:#cfe0d2;">FSSAI Lic. No. ${escapeHTML(BUSINESS.fssai)}</div>` : ""}
                </td>
            </tr></table>
        </div>
        <div style="background:#0d2a1f;color:#ffffff;padding:12px 22px;font-size:13px;line-height:1.6;">
            <span style="letter-spacing:2px;color:#e9b949;">BILL</span> &nbsp;<b>${escapeHTML(order.id)}</b> &nbsp;·&nbsp; ${when}
        </div>

        <div style="padding:20px 22px;">
            <div style="font-size:12px;letter-spacing:1px;color:#5d7165;">BILLED TO</div>
            <div style="font-size:16px;font-weight:bold;margin-top:2px;">${escapeHTML(order.customer.name)}</div>
            <div style="font-size:14px;color:#44574b;">${escapeHTML(order.customer.phone)} · ${escapeHTML(order.customer.email)}</div>
            <div style="font-size:14px;color:#44574b;">${escapeHTML(order.customer.address)} — ${escapeHTML(order.customer.pin)}</div>
            ${order.customer.notes ? `<div style="font-size:13px;color:#5d7165;margin-top:4px;">Note: ${escapeHTML(order.customer.notes)}</div>` : ""}
        </div>

        <div style="padding:0 14px;overflow-x:auto;">
            <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;min-width:0;">
                <tr style="background:#f3f7ee;">
                    <th style="padding:10px 6px;text-align:left;font-size:11px;letter-spacing:.5px;color:#5d7165;">PRODUCT</th>
                    <th style="padding:10px 6px;text-align:center;font-size:11px;letter-spacing:.5px;color:#5d7165;">QTY</th>
                    <th style="padding:10px 6px;text-align:right;font-size:11px;letter-spacing:.5px;color:#5d7165;">PRICE</th>
                    <th style="padding:10px 6px;text-align:right;font-size:11px;letter-spacing:.5px;color:#5d7165;">AMOUNT</th>
                </tr>
                ${rows}
            </table>
        </div>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:8px 24px 0;">
            <tr><td style="padding:6px 8px;text-align:right;font-size:14px;color:#44574b;">Subtotal</td><td style="padding:6px 20px 6px 0;text-align:right;width:100px;font-size:14px;">${money(order.subtotal)}</td></tr>
            <tr><td style="padding:6px 8px;text-align:right;font-size:14px;color:#44574b;">Delivery</td><td style="padding:6px 20px 6px 0;text-align:right;font-size:14px;">${order.delivery === 0 ? "Free" : money(order.delivery)}</td></tr>
            <tr><td style="padding:10px 8px;text-align:right;font-size:17px;font-weight:bold;">Total</td><td style="padding:10px 20px 10px 0;text-align:right;font-size:20px;font-weight:bold;color:#c9243b;">${money(order.total)}</td></tr>
        </table>

        <div style="margin:8px 16px 20px;padding:14px 16px;background:#f3f7ee;border-radius:12px;font-size:14px;">
            <b>Payment mode:</b> ${escapeHTML(order.payment)}<br>
            <span style="color:#5d7165;">${paymentStatus}</span>
        </div>

        <div style="padding:14px 24px;background:#f3f7ee;text-align:center;font-size:13px;color:#5d7165;">
            Thank you for shopping with ${escapeHTML(BUSINESS.name)}. We deliver all over India.
        </div>
    </div>`;
}

function renderOrderPage(order) {
    $("bill-wrap").innerHTML = billHTML(order, "images/Logo.jpeg");
}

function newOrderId() {
    const now = new Date();
    const stamp = now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0");

    return "MM-" + stamp + "-" + String(Math.floor(1000 + Math.random() * 9000));
}

async function sendBillEmails(order) {
    const status = $("order-status");

    const ready = window.emailjs &&
        EMAILJS.publicKey && EMAILJS.serviceId && EMAILJS.templateId;

    if (!ready) {
        console.warn("Email is not set up yet. Add your EmailJS keys in script.js (see SETUP.md).");

        status.innerHTML = "Your order is placed and your bill is ready below. " +
            "Please print or save it. <a href=\"#contact\">Contact us</a> to confirm your order.";

        return;
    }

    status.textContent = "Sending your bill by email…";

    const logo = new URL("images/Logo.jpeg", location.href).href;
    const html = billHTML(order, logo);

    const common = {
        order_id: order.id,
        bill_html: html,
        customer_name: order.customer.name,
        total: money(order.total),
        payment_mode: order.payment
    };

    const options = { publicKey: EMAILJS.publicKey };

    const results = await Promise.allSettled([
        window.emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
            ...common,
            to_email: order.customer.email,
            to_name: order.customer.name,
            reply_to: OWNER_EMAIL,
            subject: `Your bill from ${BUSINESS.name} (${order.id})`
        }, options),

        window.emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
            ...common,
            to_email: OWNER_EMAIL,
            to_name: BUSINESS.name,
            reply_to: order.customer.email,
            subject: `New order ${order.id} from ${order.customer.name}`
        }, options)
    ]);

    const customerOk = results[0].status === "fulfilled";
    const ownerOk = results[1].status === "fulfilled";

    if (!ownerOk) console.error("Owner email failed:", results[1].reason);
    if (!customerOk) console.error("Customer email failed:", results[0].reason);

    if (customerOk && ownerOk) {
        status.textContent = `Your order is placed. We have emailed your bill to ${order.customer.email}.`;
    } else if (ownerOk) {
        status.textContent = "Your order is placed. We couldn’t email your bill just now, so please print or save it below.";
    } else {
        status.innerHTML = "Your order is placed, but we couldn’t send it to our team automatically. " +
            "Please <a href=\"#contact\">contact us</a> to confirm it.";
    }
}

$("checkout-form").addEventListener("submit", event => {
    event.preventDefault();

    if (!cart.length) {
        toast("Your cart is empty.");
        return;
    }

    const feedback = $("checkout-feedback");

    let phone = $("customer-phone").value.replace(/[\s()+-]/g, "");

    if (phone.startsWith("91") && phone.length === 12) phone = phone.slice(2);

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        feedback.textContent = "Enter a valid 10-digit Indian mobile number.";
        return;
    }

    const mode = document.querySelector('input[name="pay"]:checked').value;
    const reference = $("upi-ref").value.trim();

    if (mode === "gpay" && reference.length < 6) {
        feedback.textContent = "Enter the UPI transaction ID shown in your payment app.";
        return;
    }

    feedback.textContent = "";

    const sub = subtotal();
    const fee = deliveryFee(sub);

    const order = {
        id: newOrderId(),
        date: new Date().toISOString(),
        customer: {
            name: $("customer-name").value.trim(),
            phone: "+91 " + phone,
            email: $("customer-email").value.trim(),
            address: $("customer-address").value.trim(),
            pin: $("customer-pin").value,
            notes: $("customer-notes").value.trim()
        },
        items: cart.map(item => {
            const product = products.find(p => p.id === item.id);
            const option = product.options[item.option];

            return { name: product.name, size: option.size, qty: item.qty, price: option.price };
        }),
        subtotal: sub,
        delivery: fee,
        total: sub + fee,
        paymentMode: mode,
        payment: mode === "cod" ? "Cash on Delivery" : "Google Pay (UPI)",
        paymentRef: reference
    };

    lastOrder = order;

    try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(order)); } catch { /* ignore */ }

    cart = [];
    saveCart();
    renderCart();

    $("checkout-form").reset();
    $("gpay-panel").hidden = true;
    document.querySelectorAll(".pay-opt").forEach((option, index) =>
        option.classList.toggle("active", index === 0)
    );

    renderOrderPage(order);
    $("order-status").textContent = "";

    if (location.hash === "#order") route();
    else location.hash = "order";

    sendBillEmails(order);
});

$("print-bill").addEventListener("click", () => window.print());

// ========================================
// INITIAL CONTENT
// ========================================

const categories = ["All", ...new Set(products.map(product => product.category))];

$("categories").innerHTML = categories.map(category => {
    const count = category === "All"
        ? products.length
        : products.filter(product => product.category === category).length;

    return `
    <button type="button" data-category="${category}" aria-pressed="${category === "All"}">
        ${category === "All" ? "All Products" : category} <span>${count}</span>
    </button>`;
}).join("");

$("footer-categories").innerHTML = categories.slice(1).map(category => `
    <button type="button" class="footer-link" data-footer-category="${category}">${category}</button>
`).join("");

$("featured-products").innerHTML = [2, 3, 6, 8]
    .map(id => productCard(products.find(product => product.id === id), "featured"))
    .join("");

$("home-products").innerHTML = products.map(product => productCard(product, "home")).join("");

$("travel-article").innerHTML = destinations.map((place, index) => `
    <article>
        <h2>${index + 1}. ${place.name}</h2>
        ${imageHTML(place, "article-place-image")}
        <p>${place.description}</p>
        <a href="${mapURL(place.name)}" target="_blank" rel="noopener noreferrer">Find on Map →</a>
    </article>
`).join("");

["about-story", "farmer-story"].forEach(id => {
    const paragraph = document.createElement("p");
    paragraph.textContent = farmerStory.trim();
    $(id).replaceChildren(paragraph);
});

$("year").textContent = new Date().getFullYear();

loadCart();
renderProducts();
renderCart();
renderPlaces();

if (lastOrder) {
    renderOrderPage(lastOrder);
    route();
}

// ========================================
// OPTIONAL GOOGLE ANALYTICS
// ========================================

if (/^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };

    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(analyticsScript);

    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
}
