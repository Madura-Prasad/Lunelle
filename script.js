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
        description: "Padded satin • One size"
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
        rating: 4.8,
        quote: "I love how delicate the floral nail designs look. They are feminine without feeling too much."
    },
    {
        name: "Sophia",
        initial: "S",
        rating: 5,
        quote: "The soft pink shades are absolutely beautiful. Perfect for an everyday clean-girl look."
    },
    {
        name: "Olivia",
        initial: "O",
        rating: 4.7,
        quote: "So many pretty ideas in one place. The pearl nail designs are definitely my favorite."
    },
    {
        name: "Ava",
        initial: "A",
        rating: 4.9,
        quote: "The chrome nail inspiration is gorgeous. I saved so many designs for my next appointment."
    },
    {
        name: "Mia",
        initial: "M",
        rating: 4.6,
        quote: "Really pretty collection of nail ideas, especially if you like simple and elegant styles."
    },
    {
        name: "Charlotte",
        initial: "C",
        rating: 5,
        quote: "The French tip ideas are exactly what I was looking for. Simple, classy and so easy to love."
    },
    {
        name: "Amelia",
        initial: "A",
        rating: 4.5,
        quote: "I found so many cute designs for my next manicure. The pastel collection is gorgeous."
    },
    {
        name: "Harper",
        initial: "H",
        rating: 4.8,
        quote: "The minimalist nail designs are beautiful. I especially love the tiny details and neutral colors."
    },
    {
        name: "Evelyn",
        initial: "E",
        rating: 4.9,
        quote: "Such a pretty selection of nail inspiration. The glazed and pearl styles are stunning."
    },
    {
        name: "Lily",
        initial: "L",
        rating: 4.7,
        quote: "I usually go for simple nails, so the nude and blush designs caught my eye immediately."
    },
    {
        name: "Ella",
        initial: "E",
        rating: 5,
        quote: "The bow nail designs are adorable! Definitely saving a few of these for the holidays."
    },
    {
        name: "Scarlett",
        initial: "S",
        rating: 4.6,
        quote: "Beautiful ideas for both short and long nails. The neutral collection is my favorite."
    },
    {
        name: "Grace",
        initial: "G",
        rating: 4.8,
        quote: "The designs feel trendy but still wearable. I found several looks I would actually try."
    },
    {
        name: "Chloe",
        initial: "C",
        rating: 4.9,
        quote: "Love the little floral details. Everything looks so soft, feminine and elegant."
    },
    {
        name: "Isla",
        initial: "I",
        rating: 4.4,
        quote: "Lots of cute inspiration here. I especially liked the simple pink and white combinations."
    },
    {
        name: "Sofia",
        initial: "S",
        rating: 5,
        quote: "The glossy nude nail ideas are gorgeous. They give that clean and polished look I love."
    },
    {
        name: "Aria",
        initial: "A",
        rating: 4.7,
        quote: "I came for nail inspiration and ended up saving almost every chrome design I saw."
    },
    {
        name: "Riley",
        initial: "R",
        rating: 4.5,
        quote: "Really cute collection, especially the shorter nail designs. Very easy to recreate."
    },
    {
        name: "Nora",
        initial: "N",
        rating: 4.8,
        quote: "The tiny heart and pearl details are so cute. Perfect inspiration for a feminine manicure."
    },
    {
        name: "Hannah",
        initial: "H",
        rating: 4.6,
        quote: "I love the variety here. There are simple everyday ideas as well as prettier statement looks."
    },
    {
        name: "Victoria",
        initial: "V",
        rating: 4.9,
        quote: "The elegant French designs are my favorite. They look timeless and work with almost anything."
    },
    {
        name: "Layla",
        initial: "L",
        rating: 5,
        quote: "The pastel nail collection is so pretty and perfect for spring. Absolutely love the color combinations."
    },
    {
        name: "Madison",
        initial: "M",
        rating: 4.7,
        quote: "The simple nail art ideas are exactly my style. Pretty without being overly complicated."
    },
    {
        name: "Ruby",
        initial: "R",
        rating: 4.8,
        quote: "The glossy red and burgundy designs are stunning. Perfect inspiration for a night-out manicure."
    },
    {
        name: "Alice",
        initial: "A",
        rating: 4.5,
        quote: "So many beautiful designs to choose from. I especially liked the minimalist and nude collections."
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
        (reviews.length * 20) + "s";

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
===================================================== */

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
        list.map(product => {

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
                >

                    <div
                        class="product-image
                        ${shapeClass}
                        ${product.images[slide]}"
                    >

                        <img
                            class="product-photo"
                            src="images/products/${product.id}-${slide + 1}.jpg"
                            alt="${product.name}"
                            loading="lazy"
                            onerror="this.style.display='none'"
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


                        <div class="slide-dots">
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

        }).join("");

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


    renderProducts();

}


function setSlide(productId, index) {

    currentSlide[productId] = index;

    renderProducts();

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
                            src="images/products/${product.id}-1.jpg"
                            alt="${product.name}"
                            loading="lazy"
                            onerror="this.style.display='none'"
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


// Countdown keeps running (and looping) in the background
// regardless of whether the popup is open
updatePromoCountdown();

setInterval(updatePromoCountdown, 1000);


// Show the discount popup shortly after the page loads
setTimeout(openPromoModal, 1200);