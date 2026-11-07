
//   Navbar Scroll Effect 
        const header = document.getElementById('cartants-header');

        window.addEventListener('scroll', function () {

            header.classList.toggle('is-scrolled', window.scrollY > 30);

        });


/* ==========================================================
   START: Stats Counter Animation Script
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.stats-item__number');

    counters.forEach(counter => {
        counter.innerText = '0';

        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText;
            const increment = target / 100;

            if (current < target) {
                let nextValue = current + increment;
                
                if (nextValue > target) {
                    nextValue = target;
                }

                if (target % 1 !== 0) {
                    counter.innerText = nextValue.toFixed(1);
                } else {
                    counter.innerText = Math.ceil(nextValue);
                }

                setTimeout(updateCounter, 20);
            } else {
                if (target === 15000) {
                    counter.innerText = '15K+';
                } else if (target === 24) {
                    counter.innerText = '24+';
                } else if (target === 97.5) {
                    counter.innerText = '+97.5%';
                } else {
                    counter.innerText = target;
                }
            }
        };

        updateCounter();
    });
});
/* END: Stats Counter Animation Script */

/* ==========================================================
   START: How It Works Interactive & Auto-Play Script
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll('.how-step');
    let currentIndex = 0;
    let intervalTime = 4000;
    let timer = null;

    const activateStep = (index) => {
        steps.forEach((step, i) => {
            if (i === index) {
                step.classList.add('is-active');
            } else {
                step.classList.remove('is-active');
            }
        });
    };

    // تفعيل العنصر الأول مباشرة كحالة افتراضية عند التحميل
    activateStep(currentIndex);

    const startAutoPlay = () => {
        timer = setInterval(() => {
            currentIndex = (currentIndex + 1) % steps.length;
            activateStep(currentIndex);
        }, intervalTime);
    };

    const resetAutoPlay = () => {
        clearInterval(timer);
        startAutoPlay();
    };

    startAutoPlay();

    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            currentIndex = index;
            activateStep(currentIndex);
            resetAutoPlay();
        });
    });
});
/* END: How It Works Interactive & Auto-Play Script */
/* ==========================================================
   START: Career Planning Packages Script
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.pkg-tab');
    const panels = document.querySelectorAll('.pkg-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetID = tab.getAttribute('data-tab');

            // إزالة كلاس النشط من جميع التابز
            tabs.forEach(t => t.classList.remove('pkg-tab--active'));
            // إضافة كلاس النشط للتاب الحالي المضغط عليه
            tab.classList.add('pkg-tab--active');

            // إخفاء جميع البانلز
            panels.forEach(panel => {
                panel.classList.remove('pkg-panel--active');
            });

            // إظهار البانل المستهدف فقط
            const activePanel = document.getElementById(`pkg-${targetID}`);
            if (activePanel) {
                activePanel.classList.add('pkg-panel--active');
            }
        });
    });
});
/* END: Career Planning Packages Script */

document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("testimonials-track");
    const prevBtn = document.getElementById("tprev");
    const nextBtn = document.getElementById("tnext");

    if (!track || !prevBtn || !nextBtn) return;

    let cards = Array.from(track.querySelectorAll(".tcard"));
    let originalLength = cards.length;
    
    if (originalLength === 0) return;

    function getVisibleCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    let visibleCount = getVisibleCount();

    // إزالة أي نسخ قديمة لمنع التكرار
    track.querySelectorAll(".tcard-clone").forEach(clone => clone.remove());

    // عمل Clone ديناميكي للـ Infinite Loop بسلاسة تامة لأي عدد كروت
    cards.slice(0, visibleCount + 1).forEach(card => {
        let clone = card.cloneNode(true);
        clone.classList.add("tcard-clone");
        track.appendChild(clone);
    });

    for (let i = originalLength - 1; i >= originalLength - (visibleCount + 1); i--) {
        let clone = cards[(i + originalLength) % originalLength].cloneNode(true);
        clone.classList.add("tcard-clone");
        track.insertBefore(clone, track.firstChild);
    }

    let currentIndex = visibleCount + 1;
    let isTransitioning = false;

    function getStepWidth() {
        const firstCard = track.querySelector(".tcard");
        if (!firstCard) return 0;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 24;
        return firstCard.offsetWidth + gap;
    }

    function setPositionInstant(index) {
        track.style.transition = "none";
        const stepWidth = getStepWidth();
        track.style.transform = `translateX(-${index * stepWidth}px)`;
    }

    setPositionInstant(currentIndex);

    function moveTo(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        const stepWidth = getStepWidth();
        track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = `translateX(-${index * stepWidth}px)`;
        currentIndex = index;
    }

    track.addEventListener("transitionend", function () {
        isTransitioning = false;

        if (currentIndex >= originalLength + visibleCount + 1) {
            currentIndex = visibleCount + 1;
            setPositionInstant(currentIndex);
        }
        if (currentIndex <= 0) {
            currentIndex = originalLength;
            setPositionInstant(currentIndex);
        }
    });

    nextBtn.addEventListener("click", function (e) {
        e.preventDefault();
        moveTo(currentIndex + 1);
    });

    prevBtn.addEventListener("click", function (e) {
        e.preventDefault();
        moveTo(currentIndex - 1);
    });

    window.addEventListener("resize", function () {
        visibleCount = getVisibleCount();
        setPositionInstant(currentIndex);
    });
});