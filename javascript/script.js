const promoVideo = document.querySelector(".promo-video");

const videoObserver = new IntersectionObserver(
    ([entry]) => {
        if (entry.isIntersecting) {
            promoVideo.play().catch(() => {
            });
        } else {
            promoVideo.pause();
        }
    },
    {
        threshold: 0.25
    }
);

videoObserver.observe(promoVideo);