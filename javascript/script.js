/* BANNER */

const banner = document.querySelector(".banner");
const reduceBannerMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (banner && !reduceBannerMotion.matches) {
    banner.classList.add("is-waiting");

    const bannerObserver = new IntersectionObserver((entries, observer) => {
        if (entries.some(entry => entry.intersectionRatio >= 0.2)) {
            banner.classList.remove("is-waiting");
            observer.disconnect();
        }
    }, { threshold: 0.2 });

    bannerObserver.observe(banner);
}

/* PROMO VIDEO */

const promoVideo = document.querySelector(".promo-video");

if (promoVideo) {
    const videoObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            promoVideo.play().catch(() => { });
        } else {
            promoVideo.pause();
        }
    }, { threshold: 0.25 });

    videoObserver.observe(promoVideo);
}

/* PRODUCT GALLERY */

window.jQuery?.(function ($) {
    const $productSlider = $(".product-slider");
    const $productNav = $(".product-nav");

    if (!$productSlider.length || !$.fn.slick) return;

    $productSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: false,
        fade: true,
        speed: 300,
        asNavFor: ".product-nav",

        prevArrow: `
            <button class="product-arrow product-prev" type="button"
                aria-label="Previous product image">‹</button>
        `,

        nextArrow: `
            <button class="product-arrow product-next" type="button"
                aria-label="Next product image">›</button>
        `
    });

    $productNav.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".product-slider",
        vertical: true,
        focusOnSelect: true,
        arrows: false,
        dots: false,
        infinite: false
    });
});

/* MOBILE MENU */

const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle) {
    const header = menuToggle.closest("header");
    const mobileLayout = window.matchMedia("(max-width: 767px)");

    function setMenuOpen(isOpen) {
        header.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    }

    menuToggle.addEventListener("click", () => {
        setMenuOpen(menuToggle.getAttribute("aria-expanded") === "false");
    });

    header.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && header.classList.contains("menu-open")) {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    mobileLayout.addEventListener("change", () => setMenuOpen(false));
}

/* MOBILE PRODUCT CARDS */

window.jQuery?.(function ($) {
    if (!$.fn.slick) return;

    const $cardGrids = $(".featured-products .product-grid, .related-products-grid");

    if (!$cardGrids.length) return;

    const mobileLayout = window.matchMedia("(max-width: 767px)");

    function updateCardCarousels() {
        $cardGrids.each(function () {
            const $grid = $(this);
            const isSlider = $grid.hasClass("slick-initialized");
            const arrowClass = $grid.hasClass("related-products-grid")
                ? "related"
                : "featured";

            if (mobileLayout.matches && !isSlider) {
                $grid.slick({
                    rows: 0,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                    infinite: true,
                    speed: 300,

                    prevArrow: `
                        <button class="${arrowClass}-arrow ${arrowClass}-prev"
                            type="button" aria-label="Previous product">&lt;</button>
                    `,

                    nextArrow: `
                        <button class="${arrowClass}-arrow ${arrowClass}-next"
                            type="button" aria-label="Next product">&gt;</button>
                    `
                });
            } else if (!mobileLayout.matches && isSlider) {
                $grid.slick("unslick");
            }
        });
    }

    updateCardCarousels();
    mobileLayout.addEventListener("change", updateCardCarousels);
});