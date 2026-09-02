/* =====================================================
   LUNELLE NAILS
   CART + FILTERS + STOCK NOTIFICATION + ADS + SLIDER
   HTML / CSS / JAVASCRIPT ONLY
===================================================== */


/* =====================================================
   AD CONFIG
   ---------------------------------------------------
   EDIT ONLY THIS BLOCK to change ads.
   Paste the exact ad code your network (e.g. Adsterra)
   gives you as a string for each slot below. Leave a
   slot as an empty string "" to keep the placeholder
   showing instead. US/UK ad networks generally give you
   one snippet per slot type — paste it here once and it
   will show up everywhere that slot appears on the page.
===================================================== */

const AD_CONFIG = {

    // Native banner, shown right under the hero section
    nativeBanner: ``,

    // 160 x 300 vertical banner, shown beside the shop grid
    sidebarBanner: ``,

    // Social bar, shown above the "Why Lunelle" section
    socialBar: ``,

    // Popunder / interstitial script, fires once on page load
    popunder: ``

};


/* =====================================================
   PROMO CONFIG
   ---------------------------------------------------
   EDIT ONLY THIS BLOCK to change the discount popup.
   "code" is what shoppers type into the cart coupon
   field. countdownHours is how long the timer runs
   before it loops and starts again from the top.
===================================================== */

const PROMO = {

    code: "LUNELLE30",

    discountPercent: 30,

    freeShippingThreshold: 49.99,

    shippingFee: 5.99,

    // 3 days, 4 hours
    countdownHours: (3 * 24) + 4

};


/* =====================================================
   PRODUCT PHOTOS
   ---------------------------------------------------
   Photos are always local — nothing is ever pulled from
   the internet. For a slide to show a real photo, drop a
   file into images/products/ named after the product id
   and the slide number, e.g.

       images/products/1-1.jpg   (product id 1, slide 1)
       images/products/1-2.jpg   (product id 1, slide 2)
       images/products/1-3.jpg   (product id 1, slide 3)

   If a slide's file is missing, that slide just falls
   back to showing the plain swatch color set in the
   product's "images" array below (e.g. "pink") — no photo,
   no broken image, no online link ever loads.

   WANT TO POINT AT AN EXACT FILE NAME INSTEAD?
   Add image1 / image2 / image3 directly on that product
   object down in the PRODUCTS list below, e.g.
     image1: "images/products/my-file.jpg"
   Add just image1 if you only have one photo — the rest
   will fall back automatically. See the "Satin Headband"
   product below for a working example.
===================================================== */


/* =====================================================
   PHOTO SOURCES FOR ONE SLIDE
   ---------------------------------------------------
   Builds the ordered list of image paths to try for a
   given product + slide (0, 1 or 2), from most to least
   specific:

     1. product.image1 / image2 / image3 — set these directly
        on a product below to pin its EXACT pictures. Each one
        should be a local file you added yourself, e.g.
          "images/products/satin-headband-1.jpg"
        The photo just crossfades in, nothing about the card
        re-renders.

     2. images/products/<id>-<slide>.jpg — the old convention:
        drop a file there named after the product id and it's
        picked up automatically, no code change needed.

   If neither exists, the slide just shows the plain swatch
   color from the product's "images" array — nothing is ever
   fetched from the internet.
===================================================== */

function buildPhotoCandidates(product, slideIndex) {

    const candidates = [];


    const ownPhoto =
        product[`image${slideIndex + 1}`];

    if (ownPhoto) {

        candidates.push(ownPhoto);

    }


    candidates.push(
        `images/products/${product.id}-${slideIndex + 1}.jpg`
    );


    return candidates;

}


/* =====================================================
   PHOTO LOADING (no card / DOM re-render)
   ---------------------------------------------------
   setPhotoSrc() is the ONLY thing that changes a product
   photo — on first render AND every time the slider moves.
   It never rebuilds or replaces the <article class="product">
   card, so nothing else on the card (badge, price, rating,
   entrance animation, etc.) ever "refreshes" or flickers.
   It just crossfades the <img> itself via the .photo-ready
   opacity transition in style.css.
===================================================== */

function setPhotoSrc(imgEl, candidateList) {

    if (!imgEl) return;


    imgEl.classList.remove("photo-ready");


    const candidates =
        (candidateList || []).filter(Boolean);

    let attempt = 0;


    const tryNext = () => {

        if (attempt >= candidates.length) {

            // Nothing loaded — leave the swatch color showing
            imgEl.removeAttribute("src");

            return;

        }


        const candidate =
            candidates[attempt];

        attempt++;


        const preloader =
            new Image();

        preloader.onload = () => {

            imgEl.src = candidate;

            // Next frame, so the opacity transition actually runs
            requestAnimationFrame(() => {

                imgEl.classList.add("photo-ready");

            });

        };

        preloader.onerror = tryNext;

        preloader.src = candidate;

    };


    tryNext();

}


/* =====================================================
   AD INJECTION
   Safely injects ad HTML (including <script> tags, which
   .innerHTML alone will not execute) into a given element.
===================================================== */

function injectAd(container, html) {

    if (!container || !html || !html.trim()) return;


    container.innerHTML = html;


    // Re-create any <script> tags so the browser actually runs them
    container.querySelectorAll("script").forEach(oldScript => {

        const newScript = document.createElement("script");


        Array.from(oldScript.attributes).forEach(attr => {

            newScript.setAttribute(attr.name, attr.value);

        });


        newScript.textContent = oldScript.textContent;

        oldScript.replaceWith(newScript);

    });

}


function loadAds() {

    injectAd(
        document.getElementById("adNative"),
        AD_CONFIG.nativeBanner
    );

    injectAd(
        document.getElementById("adSidebar"),
        AD_CONFIG.sidebarBanner
    );

    injectAd(
        document.getElementById("adSocial"),
        AD_CONFIG.socialBar
    );

    injectAd(
        document.getElementById("adPopunder"),
        AD_CONFIG.popunder
    );

}


/* =====================================================
   PRODUCTS
   Categories: press-on, nail-art, care, tools, hair, costumes
   Each product has an "images" array (3 swatches) that the
   product card slides through.

   ADDING A NEW PRODUCT — copy any block below and change:
     id           → a number no other product uses
     name         → shown on the card
     category     → one of the 6 categories above (controls
                     which filter tab shows it)
     price, stock → numbers
     images       → 3 swatch-color names, any of: pink,
                     chrome-product, french-product,
                     rose-product, lilac, peach, gold,
                     mint, berry
     badge        → small pill text, e.g. "NEW"
     rating       → 0–5, shown as stars
     description  → short line under the name
     generic:true → optional, use for non-nail items (hair,
                     costumes) to get a round silhouette
                     instead of the nail shape
     image1/2/3   → optional — your OWN local photos for this
                     exact product, e.g.
                     "images/products/my-photo-1.jpg". Add
                     just image1 if you only have one photo —
                     the rest will fall back automatically.
                     See the "Satin Headband" product below
                     for a working example.
===================================================== */

const products = [

    // ---------- PRESS-ONS ----------

    {
        id: 1,
        name: "Blush Cloud",
        category: "press-on",
        price: 18,
        stock: 8,
        images: ["pink", "rose-product", "lilac"],
        badge: "BEST SELLER",
        rating: 4.9,
        description: "Soft blush • Short almond"
    },

    {
        id: 2,
        name: "Mirror Chrome",
        category: "press-on",
        price: 22,
        stock: 0,
        images: ["chrome-product", "pink", "lilac"],
        badge: "TRENDING",
        rating: 4.8,
        description: "Silver chrome • Medium"
    },

    {
        id: 3,
        name: "Clean French",
        category: "press-on",
        price: 19,
        stock: 12,
        images: ["french-product", "pink", "peach"],
        badge: "FAVOURITE",
        rating: 4.9,
        description: "Milky white • Oval"
    },

    {
        id: 4,
        name: "Rose Glaze",
        category: "press-on",
        price: 20,
        stock: 5,
        images: ["rose-product", "berry", "pink"],
        badge: "NEW",
        rating: 4.9,
        description: "Glossy rose • Almond"
    },

    {
        id: 5,
        name: "Lilac Dream",
        category: "press-on",
        price: 18,
        stock: 7,
        images: ["lilac", "chrome-product", "pink"],
        badge: "NEW",
        rating: 4.8,
        description: "Lilac shimmer • Coffin"
    },

    {
        id: 6,
        name: "Peach Pop",
        category: "press-on",
        price: 17,
        stock: 10,
        images: ["peach", "rose-product", "gold"],
        badge: "POPULAR",
        rating: 4.8,
        description: "Peach gloss • Short"
    },


    // ---------- NAIL ART ----------

    {
        id: 10,
        name: "Marble Swirl Art",
        category: "nail-art",
        price: 24,
        stock: 9,
        images: ["lilac", "chrome-product", "french-product"],
        badge: "HAND-PAINTED",
        rating: 4.9,
        description: "Marble swirl • Hand-painted almond"
    },

    {
        id: 11,
        name: "Butterfly Chrome Art",
        category: "nail-art",
        price: 26,
        stock: 6,
        images: ["chrome-product", "berry", "lilac"],
        badge: "STATEMENT",
        rating: 4.8,
        description: "3D butterfly • Chrome coffin"
    },

    {
        id: 12,
        name: "Glitter Ombre Art",
        category: "nail-art",
        price: 23,
        stock: 8,
        images: ["berry", "gold", "pink"],
        badge: "SPARKLE",
        rating: 4.9,
        description: "Fine glitter ombre • Almond"
    },


    // ---------- NAIL CARE ----------

    {
        id: 8,
        name: "Nail Care Oil",
        category: "care",
        price: 9,
        stock: 15,
        images: ["pink", "peach", "gold"],
        badge: "SELF CARE",
        rating: 4.9,
        description: "Rose oil • 10ml"
    },

    {
        id: 20,
        name: "Cuticle Butter Balm",
        category: "care",
        price: 11,
        stock: 13,
        images: ["gold", "peach", "pink"],
        badge: "HYDRATING",
        rating: 4.7,
        description: "Shea + jojoba • 15ml"
    },

    {
        id: 21,
        name: "Strengthening Base Coat",
        category: "care",
        price: 13,
        stock: 10,
        images: ["french-product", "chrome-product", "pink"],
        badge: "SELF CARE",
        rating: 4.8,
        description: "Keratin infused • 12ml"
    },


    // ---------- TOOLS ----------

    {
        id: 7,
        name: "Prep & Push Kit",
        category: "tools",
        price: 12,
        stock: 9,
        images: ["french-product", "chrome-product", "pink"],
        badge: "ESSENTIAL",
        rating: 4.7,
        description: "Prep & manicure essentials"
    },

    {
        id: 9,
        name: "Glass Nail File",
        category: "tools",
        price: 8,
        stock: 11,
        images: ["chrome-product", "lilac", "pink"],
        badge: "ESSENTIAL",
        rating: 4.7,
        description: "Fine grit • Reusable"
    },

    {
        id: 22,
        name: "Mini LED Lamp",
        category: "tools",
        price: 28,
        stock: 4,
        images: ["chrome-product", "gold", "pink"],
        badge: "PRO",
        rating: 4.6,
        description: "Fast-cure gel lamp • USB-C"
    },


    // ---------- HAIR ----------

    {
        id: 13,
        name: "Silk Scrunchie Set",
        category: "hair",
        price: 14,
        stock: 20,
        images: ["berry", "gold", "mint"],
        badge: "SET OF 3",
        generic: true,
        rating: 4.8,
        description: "Pure silk • Gentle on hair"
    },

    {
        id: 14,
        name: "Pearl Hair Clips",
        category: "hair",
        price: 16,
        stock: 14,
        images: ["gold", "pink", "chrome-product"],
        badge: "TRENDING",
        generic: true,
        rating: 4.9,
        description: "Freshwater pearl • Set of 4"
    },

    {
        id: 15,
        name: "Satin Headband",
        category: "hair",
        price: 15,
        stock: 12,
        images: ["mint", "berry", "lilac"],
        badge: "NEW",
        generic: true,
        rating: 4.7,
        description: "Padded satin • One size",

        // YOUR OWN PHOTOS for this product — local files only.
        // Drop real files into images/products/ and point to
        // them here, e.g. "images/products/satin-headband-1.jpg".
        // Leave them as empty strings ("") to just use the
        // automatic images/products/<id>-<slide>.jpg convention
        // (or the plain swatch color if no file exists there).
        image1: "",
        image2: "",
        image3: ""
    },


    // ---------- COSTUMES ----------

    {
        id: 16,
        name: "Glam Party Jewel Set",
        category: "costumes",
        price: 32,
        stock: 6,
        images: ["gold", "berry", "chrome-product"],
        badge: "PARTY READY",
        generic: true,
        rating: 4.8,
        description: "Statement necklace + earrings"
    },

    {
        id: 17,
        name: "Fairycore Accessory Kit",
        category: "costumes",
        price: 29,
        stock: 5,
        images: ["mint", "lilac", "pink"],
        badge: "LIMITED",
        generic: true,
        rating: 4.9,
        description: "Flower crown + hair vines"
    },

    {
        id: 18,
        name: "Vintage Pin-Up Set",
        category: "costumes",
        price: 27,
        stock: 0,
        images: ["berry", "pink", "gold"],
        badge: "COLLECTOR",
        generic: true,
        rating: 4.7,
        description: "Hair scarf + cat-eye clips"
    }

];


/* =====================================================
   REVIEWS
   ---------------------------------------------------
   Sample testimonials for demonstration. To add a new
   review, just add another object to this array — the
   slider picks it up automatically.
===================================================== */

const reviews = [

    {
        name: "Emma",
        initial: "E",
        rating: 5,
        quote: "The clean French style is exactly the aesthetic I was looking for. So pretty!"
    },

    {
        name: "Sophia",
        initial: "S",
        rating: 5,
        quote: "I absolutely love the soft pink collection. It gives such a beautiful everyday look."
    },

    {
        name: "Mia",
        initial: "M",
        rating: 5,
        quote: "Chrome nails are having a moment and these designs are seriously gorgeous."
    },

    {
        name: "Chloe",
        initial: "C",
        rating: 4.8,
        quote: "The nail art set held up for almost three weeks with zero chipping. Worth every penny."
    },

    {
        name: "Ava",
        initial: "A",
        rating: 5,
        quote: "Ordered the scrunchie set on a whim and now it's my go-to gift for friends."
    },

    {
        name: "Grace",
        initial: "G",
        rating: 4.7,
        quote: "Fast shipping to the US and the packaging alone felt like a treat to open."
    },

    {
        name: "Zara",
        initial: "Z",
        rating: 5,
        quote: "The pearl hair clips are so much sturdier than I expected for the price."
    },

    {
        name: "Lily",
        initial: "L",
        rating: 4.9,
        quote: "My go-to shop before any night out — the party jewel set matches everything."
    }

];


/* =====================================================
   CART + SLIDER STATE
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem(
            "lunelle_cart"
        ) || "[]"
    );


let currentFilter = "all";


// Tracks which image (0, 1 or 2) is showing for each product card
let currentSlide = {};


// Whether the promo coupon has been applied to the cart
let couponApplied =
    localStorage.getItem(
        "lunelle_coupon_applied"
    ) === "true";


/* =====================================================
   ELEMENTS
===================================================== */

const productsContainer =
    document.getElementById("products");

const cartElement =
    document.getElementById("cart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const emptyCart =
    document.getElementById("emptyCart");

const cartFooter =
    document.getElementById("cartFooter");

const subtotal =
    document.getElementById("subtotal");

const stockModal =
    document.getElementById("stockModal");

const promoModal =
    document.getElementById("promoModal");


/* =====================================================
   MONEY
===================================================== */

function money(value) {

    return "$" + value.toFixed(2);

}


/* =====================================================
   STAR RATING
   Renders filled/empty stars that match the numeric
   rating instead of a hardcoded row of 5 stars.
===================================================== */

function renderStars(rating) {

    const filled =
        Math.round(rating);


    let stars = "";


    for (let i = 1; i <= 5; i++) {

        stars += i <= filled
            ? "★"
            : `<span class="star-empty">★</span>`;

    }


    return stars;

}


/* =====================================================
   REVIEWS SLIDER
   The track is rendered twice back-to-back and animated
   with a plain CSS loop (see .review-track in style.css),
   so it auto-slides forever with no timers to manage.
   Hovering the slider pauses it (also handled in CSS).
===================================================== */

function renderReviews() {

    const track =
        document.getElementById("reviewTrack");

    if (!track) return;


    const cardHTML = review => `

        <article class="review">

            <div class="stars">
                ${renderStars(review.rating)}
            </div>

            <p>
                “${review.quote}”
            </p>

            <div class="review-person">
                <div class="avatar">
                    ${review.initial}
                </div>

                <div>
                    <strong>
                        ${review.name}
                    </strong>

                    <span>
                        Sample testimonial
                    </span>
                </div>
            </div>

        </article>

    `;


    // Duplicate the list once so the loop can seamlessly
    // jump from the end of the first copy to the start of
    // the second without a visible gap.
    const doubled =
        [...reviews, ...reviews];


    track.innerHTML =
        doubled.map(cardHTML).join("");


    // Slower scroll for more reviews, faster for fewer
    track.style.animationDuration =
        (reviews.length * 12) + "s";

}


/* =====================================================
   SCROLL REVEAL
   Fades + rises .reveal elements (collection cards, why
   cards, inspiration pins) into place the first time each
   one enters the viewport.
===================================================== */

function initScrollReveal() {

    const targets =
        document.querySelectorAll(".reveal");


    if (!("IntersectionObserver" in window)) {

        targets.forEach(
            el => el.classList.add("in-view")
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            function(entries) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("in-view");

                        observer.unobserve(entry.target);

                    }

                });

            },
            { threshold: 0.15 }
        );


    targets.forEach(
        el => observer.observe(el)
    );

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "lunelle_cart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   RENDER PRODUCTS
   ---------------------------------------------------
   The <img class="product-photo"> starts with NO src —
   setPhotoSrc() (called right after insertion, and again
   whenever the slide changes) is what actually loads and
   crossfades the picture in. This keeps first render and
   slide changes using the exact same code path.
===================================================== */

function productCardHTML(product) {

    const soldOut =
        product.stock <= 0;

    const slide =
        currentSlide[product.id] || 0;

    const shapeClass =
        product.generic
        ? "generic"
        : "";


    const dots =
        product.images
            .map((image, index) => `
                <button
                    class="slide-dot
                    ${index === slide ? "active" : ""}"
                    data-dot="${product.id}"
                    data-index="${index}"
                    aria-label="Show photo ${index + 1}"
                ></button>
            `)
            .join("");


    return `

        <article
            class="product
            ${soldOut ? "sold-out" : ""}"
            data-product-id="${product.id}"
        >

            <div
                class="product-image
                ${shapeClass}
                ${product.images[slide]}"
                data-image-wrap="${product.id}"
            >

                <img
                    class="product-photo"
                    alt="${product.name}"
                    loading="lazy"
                    data-photo="${product.id}"
                >

                <span class="badge">
                    ${product.badge}
                </span>


                <button
                    class="slide-arrow slide-prev"
                    data-slide-prev="${product.id}"
                    aria-label="Previous photo"
                >
                    ‹
                </button>

                <button
                    class="slide-arrow slide-next"
                    data-slide-next="${product.id}"
                    aria-label="Next photo"
                >
                    ›
                </button>


                <div class="slide-dots" data-dots="${product.id}">
                    ${dots}
                </div>

            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>


                <div class="rating">

                    ${renderStars(product.rating)}

                    <span>
                        ${product.rating}
                    </span>

                </div>


                <div class="product-description">

                    ${product.description}

                    ${
                        soldOut
                        ? " • Currently unavailable"
                        : ""
                    }

                </div>


                <div class="price-row">

                    <strong class="price">
                        ${money(product.price)}
                    </strong>


                    <button
                        class="add-button"
                        data-add="${product.id}"
                    >

                        ${
                            soldOut
                            ? "Sold Out"
                            : "Add to bag"
                        }

                    </button>

                </div>

            </div>

        </article>

    `;

}


function renderProducts() {

    let list = products;


    if (currentFilter !== "all") {

        list =
            products.filter(
                product =>
                    product.category ===
                    currentFilter
            );

    }


    productsContainer.innerHTML =
        list.map(productCardHTML).join("");


    // Now that the <img> tags exist in the DOM, load each one's
    // local photo, if one exists.
    list.forEach(product => {

        const slide =
            currentSlide[product.id] || 0;

        const imgEl =
            productsContainer.querySelector(
                `[data-photo="${product.id}"]`
            );

        setPhotoSrc(
            imgEl,
            buildPhotoCandidates(product, slide)
        );

    });

}


/* =====================================================
   UPDATE A CARD'S SLIDE IN PLACE
   ---------------------------------------------------
   Used by the slider arrows/dots. Only touches the photo,
   the swatch-color class and the dots for ONE card — the
   <article> itself is never removed or recreated, so its
   entrance animation never replays and nothing on the rest
   of the card (or the rest of the grid) "refreshes".
===================================================== */

function updateProductSlide(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;


    const slide =
        currentSlide[productId] || 0;


    // Swap the background swatch color behind the photo
    const imageWrap =
        productsContainer.querySelector(
            `[data-image-wrap="${productId}"]`
        );

    if (imageWrap) {

        const swatchClasses =
            ["pink", "chrome-product", "french-product",
             "rose-product", "lilac", "peach", "gold",
             "mint", "berry"];

        imageWrap.classList.remove(...swatchClasses);

        imageWrap.classList.add(product.images[slide]);

    }


    // Crossfade in the new photo (local only, nothing online)
    const imgEl =
        productsContainer.querySelector(
            `[data-photo="${productId}"]`
        );

    setPhotoSrc(
        imgEl,
        buildPhotoCandidates(product, slide)
    );


    // Update which dot is active
    const dotsWrap =
        productsContainer.querySelector(
            `[data-dots="${productId}"]`
        );

    if (dotsWrap) {

        dotsWrap
            .querySelectorAll(".slide-dot")
            .forEach(dot => {

                dot.classList.toggle(
                    "active",
                    Number(dot.dataset.index) === slide
                );

            });

    }

}


/* =====================================================
   SLIDER CONTROLS
===================================================== */

function changeSlide(productId, direction) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    const total =
        product.images.length;

    const current =
        currentSlide[productId] || 0;


    currentSlide[productId] =
        (current + direction + total) % total;


    updateProductSlide(productId);

}


function setSlide(productId, index) {

    currentSlide[productId] = index;

    updateProductSlide(productId);

}


/* =====================================================
   ADD PRODUCT
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    if (product.stock <= 0) {

        openStockModal();

        return;

    }


    let existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        if (
            existing.quantity <
            product.stock
        ) {

            existing.quantity++;

        } else {

            openStockModal();

            return;

        }

    } else {

        cart.push({

            id: productId,
            quantity: 1

        });

    }


    saveCart();

    renderCart();

    openCart();

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;


    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart.style.display =
            "block";

        cartFooter.style.display =
            "none";

        return;

    }


    emptyCart.style.display =
        "none";

    cartFooter.style.display =
        "block";


    cartItems.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );


            return `

                <div class="cart-row">

                    <div
                        class="cart-image
                        ${product.images[0]}"
                    >
                        <img
                            class="product-photo"
                            alt="${product.name}"
                            loading="lazy"
                            data-cart-photo="${product.id}"
                        >
                    </div>


                    <div>

                        <h4>
                            ${product.name}
                        </h4>

                        <p>
                            ${money(product.price)}
                        </p>


                        <div class="quantity">

                            <button
                                data-minus="${product.id}"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                data-plus="${product.id}"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        class="remove"
                        data-remove="${product.id}"
                    >
                        Remove
                    </button>

                </div>

            `;

        }).join("");


    // Same load-after-insert pattern as the product grid
    cart.forEach(item => {

        const product =
            products.find(p => p.id === item.id);

        const imgEl =
            cartItems.querySelector(
                `[data-cart-photo="${item.id}"]`
            );

        setPhotoSrc(
            imgEl,
            buildPhotoCandidates(product, 0)
        );

    });


    const merchandiseSubtotal =
        cart.reduce(
            (sum, item) => {

                const product =
                    products.find(
                        p => p.id === item.id
                    );

                return sum +
                    (
                        product.price *
                        item.quantity
                    );

            },
            0
        );


    const discount =
        couponApplied
            ? merchandiseSubtotal *
              (PROMO.discountPercent / 100)
            : 0;

    const shipping =
        merchandiseSubtotal >=
        PROMO.freeShippingThreshold
            ? 0
            : PROMO.shippingFee;

    const grandTotalValue =
        merchandiseSubtotal -
        discount +
        shipping;


    subtotal.textContent =
        money(merchandiseSubtotal);


    document
        .getElementById("discountRow")
        .classList.toggle(
            "show",
            couponApplied
        );

    document.getElementById(
        "discountAmount"
    ).textContent =
        "−" + money(discount);

    document.getElementById(
        "shippingAmount"
    ).textContent =
        shipping === 0
            ? "FREE"
            : money(shipping);

    document.getElementById(
        "grandTotal"
    ).textContent =
        money(grandTotalValue);

}


/* =====================================================
   COUPON
===================================================== */

function applyCoupon() {

    const input =
        document.getElementById("couponInput");

    const message =
        document.getElementById("couponMessage");

    const entered =
        input.value.trim().toUpperCase();


    if (!entered) {

        message.textContent =
            "Enter a code first.";

        message.classList.remove("success");

        return;

    }


    if (entered === PROMO.code) {

        couponApplied = true;

        localStorage.setItem(
            "lunelle_coupon_applied",
            "true"
        );

        message.textContent =
            `${PROMO.discountPercent}% off applied ♡`;

        message.classList.add("success");

    } else {

        couponApplied = false;

        localStorage.setItem(
            "lunelle_coupon_applied",
            "false"
        );

        message.textContent =
            "That code isn't valid.";

        message.classList.remove("success");

    }


    renderCart();

}


/* =====================================================
   QUANTITY
===================================================== */

function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            x => x.id === productId
        );


    const product =
        products.find(
            x => x.id === productId
        );


    if (!item || !product) return;


    item.quantity += amount;


    if (
        item.quantity >
        product.stock
    ) {

        item.quantity =
            product.stock;

    }


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                x => x.id !== productId
            );

    }


    saveCart();

    renderCart();

}


/* =====================================================
   REMOVE
===================================================== */

function removeProduct(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    renderCart();

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    cartElement.classList.add("open");

    overlay.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    cartElement.classList.remove("open");

    overlay.classList.remove("show");

    document.body.style.overflow =
        "";

}


/* =====================================================
   STOCK MODAL
===================================================== */

function openStockModal() {

    stockModal.classList.add("show");

}


function closeStockModal() {

    stockModal.classList.remove("show");

    document.getElementById(
        "stockMessage"
    ).textContent = "";

}


/* =====================================================
   PROMO POPUP + COUNTDOWN
   ---------------------------------------------------
   The countdown end time is saved to localStorage, so it
   keeps counting down correctly across page reloads. Once
   it hits zero, a fresh countdown (PROMO.countdownHours)
   starts automatically and keeps looping forever.
===================================================== */

function getPromoEndTime() {

    const stored =
        Number(
            localStorage.getItem("lunelle_promo_end")
        );


    if (stored && stored > Date.now()) {

        return stored;

    }


    const newEnd =
        Date.now() +
        (PROMO.countdownHours * 60 * 60 * 1000);

    localStorage.setItem(
        "lunelle_promo_end",
        String(newEnd)
    );

    return newEnd;

}


function updatePromoCountdown() {

    const remaining =
        getPromoEndTime() - Date.now();

    const totalSeconds =
        Math.max(
            0,
            Math.floor(remaining / 1000)
        );

    const days =
        Math.floor(totalSeconds / 86400);

    const hours =
        Math.floor((totalSeconds % 86400) / 3600);

    const minutes =
        Math.floor((totalSeconds % 3600) / 60);

    const seconds =
        totalSeconds % 60;


    const pad =
        value => String(value).padStart(2, "0");


    document.getElementById("promoDays").textContent =
        pad(days);

    document.getElementById("promoHours").textContent =
        pad(hours);

    document.getElementById("promoMinutes").textContent =
        pad(minutes);

    document.getElementById("promoSeconds").textContent =
        pad(seconds);

}


function openPromoModal() {

    document.getElementById(
        "promoCodeDisplay"
    ).textContent = PROMO.code;

    document.getElementById(
        "promoCopyMessage"
    ).textContent = "";

    promoModal.classList.add("show");

}


function closePromoModal() {

    promoModal.classList.remove("show");

}


function copyPromoCode() {

    const message =
        document.getElementById("promoCopyMessage");


    const showCopied = () => {

        message.textContent =
            "Code copied ♡";

    };

    const showFailed = () => {

        message.textContent =
            `Couldn't copy — code is ${PROMO.code}`;

    };


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(PROMO.code)
            .then(showCopied)
            .catch(showFailed);

        return;

    }


    // Fallback for browsers without the Clipboard API
    try {

        const temp =
            document.createElement("textarea");

        temp.value = PROMO.code;

        temp.style.position = "fixed";

        temp.style.opacity = "0";

        document.body.appendChild(temp);

        temp.select();

        document.execCommand("copy");

        temp.remove();

        showCopied();

    } catch (error) {

        showFailed();

    }

}


/* =====================================================
   PRODUCT EVENTS
   (add to bag + slider arrows + slider dots)
===================================================== */

productsContainer.addEventListener(
    "click",
    function(event) {

        const addButton =
            event.target.closest("[data-add]");

        if (addButton) {

            addToCart(
                Number(addButton.dataset.add)
            );

            return;

        }


        const prevButton =
            event.target.closest("[data-slide-prev]");

        if (prevButton) {

            changeSlide(
                Number(prevButton.dataset.slidePrev),
                -1
            );

            return;

        }


        const nextButton =
            event.target.closest("[data-slide-next]");

        if (nextButton) {

            changeSlide(
                Number(nextButton.dataset.slideNext),
                1
            );

            return;

        }


        const dotButton =
            event.target.closest("[data-dot]");

        if (dotButton) {

            setSlide(
                Number(dotButton.dataset.dot),
                Number(dotButton.dataset.index)
            );

        }

    }
);


/* =====================================================
   CART EVENTS
===================================================== */

cartItems.addEventListener(
    "click",
    function(event) {

        if (
            event.target.dataset.plus
        ) {

            changeQuantity(
                Number(
                    event.target.dataset.plus
                ),
                1
            );

        }


        if (
            event.target.dataset.minus
        ) {

            changeQuantity(
                Number(
                    event.target.dataset.minus
                ),
                -1
            );

        }


        if (
            event.target.dataset.remove
        ) {

            removeProduct(
                Number(
                    event.target.dataset.remove
                )
            );

        }

    }
);


/* =====================================================
   FILTERS
===================================================== */

document
    .getElementById("filters")
    .addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    ".filter"
                );


            if (!button) return;


            document
                .querySelectorAll(
                    ".filter"
                )
                .forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


            button.classList.add("active");


            currentFilter =
                button.dataset.filter;


            renderProducts();

        }
    );


/* =====================================================
   CART OPEN/CLOSE
===================================================== */

document
    .getElementById("openCart")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);


document
    .getElementById(
        "continueShopping"
    )
    .addEventListener(
        "click",
        closeCart
    );


/* =====================================================
   COUPON EVENTS
===================================================== */

document
    .getElementById("applyCoupon")
    .addEventListener(
        "click",
        applyCoupon
    );


document
    .getElementById("couponInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                applyCoupon();

            }

        }
    );


/* =====================================================
   CHECKOUT
===================================================== */

document
    .getElementById("checkout")
    .addEventListener(
        "click",
        function() {

            /*
                Demo storefront behavior:
                checkout opens stock notification.
            */

            openStockModal();

        }
    );


/* =====================================================
   MODAL
===================================================== */

document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeStockModal
    );


stockModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            stockModal
        ) {

            closeStockModal();

        }

    }
);


/* =====================================================
   PROMO MODAL
===================================================== */

document
    .getElementById("closePromoModal")
    .addEventListener(
        "click",
        closePromoModal
    );


promoModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            promoModal
        ) {

            closePromoModal();

        }

    }
);


document
    .getElementById("promoGetNow")
    .addEventListener(
        "click",
        function() {

            closePromoModal();

            document
                .getElementById("shop")
                .scrollIntoView({ behavior: "smooth" });

        }
    );


document
    .getElementById("promoCopyButton")
    .addEventListener(
        "click",
        copyPromoCode
    );


/* =====================================================
   STOCK EMAIL
===================================================== */

document
    .getElementById("stockForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "stockEmail"
                    )
                    .value
                    .trim();


            if (!email) return;


            /*
                HTML/JS-only version:
                Save email locally in browser.
            */

            let emails =
                JSON.parse(
                    localStorage.getItem(
                        "lunelle_notify_emails"
                    ) || "[]"
                );


            if (
                !emails.includes(email)
            ) {

                emails.push(email);

            }


            localStorage.setItem(
                "lunelle_notify_emails",
                JSON.stringify(emails)
            );


            document
                .getElementById(
                    "stockMessage"
                )
                .textContent =
                "You're on the list ♡ We'll let you know when it's back.";


            document
                .getElementById(
                    "stockEmail"
                )
                .value = "";

        }
    );


/* =====================================================
   NEWSLETTER
===================================================== */

document
    .getElementById(
        "newsletterForm"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "newsletterEmail"
                    )
                    .value
                    .trim();


            if (!email) return;


            localStorage.setItem(
                "lunelle_newsletter_email",
                email
            );


            document
                .getElementById(
                    "newsletterMessage"
                )
                .textContent =
                "Welcome to the pretty list ♡";


            document
                .getElementById(
                    "newsletterEmail"
                )
                .value = "";

        }
    );


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCart();

            closeStockModal();

            closePromoModal();

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

loadAds();

renderProducts();

renderCart();

renderReviews();

initScrollReveal();


// Countdown keeps running (and looping) in the background
// regardless of whether the popup is open
updatePromoCountdown();

setInterval(updatePromoCountdown, 1000);


// Show the discount popup shortly after the page loads
setTimeout(openPromoModal, 1200);