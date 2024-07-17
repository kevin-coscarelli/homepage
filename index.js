import { Particles } from './particle.js';

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// window.onload = () => {
//     if (document.getElementById('canvas-container')) {
//         new Particles();
//     }
// };

// =========
// const scrollPoint = 475;
// const headerState = {
//     isSticky: false,
// };
// if (document.body.scrollTop > scrollPoint) {
//     headerState.isSticky = true;
// }
// const headContainerLargeEl = document.getElementById('head-container-l');
// const headContainerSmallEl = document.getElementById('head-container-s');
// const contentEl = document.body;

// const shouldToggleHeaderClasses = (scroll) => (
//     (scroll > scrollPoint && !headerState.isSticky) || 
//     (scroll <= scrollPoint && headerState.isSticky)
// );
// const toggleHeaderClasses = () => {
//     console.log('toggle', headerState.isSticky);
//     headContainerSmallEl.classList.toggle('hidden');
//     headerState.isSticky = !headerState.isSticky;
// }

// document.body.addEventListener('scroll', function() {
//     window.requestAnimationFrame(() => {
//         if (shouldToggleHeaderClasses(contentEl.scrollTop)) {
//             toggleHeaderClasses();
//         }
//     });
// });
// =========

// Dashed lines
const MIN_DASHES = 4;
const MAX_DASHES = 10;
const DASH_ANIMATION_DURATION = 1000;
const dashedLines = document.querySelectorAll('.subline');

const buildLines = () => {
    dashedLines.forEach((subline) => {
        const dashes = getRandomInt(MIN_DASHES, MAX_DASHES);
        const totalWidth = { val: 100 };
        for (let index = 1; index <= dashes; index++) {
            const dash = subline.appendChild(document.createElement('div'));
            dash.style.width = 0;
            createDashLines(index, dashes, totalWidth, dash);
        }
    });
}

const createDashLines = (index, dashes, totalWidth, dash) => {
    if (dashes === 1) {
        const width = getRandomInt(5, 10);
        dash.style.width = `${width}%`;
        totalWidth.val -= width;
        dash.style.marginRight = `${getRandomInt(3, 20)}px`;
    } else if (index < dashes) {
        const width = getRandomInt(5, totalWidth.val);
        dash.style.width = `${width}%`;
        totalWidth.val -= width;
        dash.style.marginRight = `${getRandomInt(3, 20)}px`;
    } else if (index === dashes) {
        dash.style.width = `${totalWidth.val}%`;
    }
}

const animateDashLines = () => {
    dashedLines.forEach((subline) => {
        const dashes = subline.children.length;
        const totalWidth = { val: 100 };
        for (let index = 1; index <= dashes; index++) {
            const dash = subline.children[index - 1];
            createDashLines(index, dashes, totalWidth, dash);
        }
    });
}
buildLines();
dashedLines[0].children[0].addEventListener('transitionend', () => {
    animateDashLines();
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animateDashLines();
    }, 500);
});

// Header scroll
const header = document.getElementById('headerContainer');
const head = document.getElementById('headContainer');

document.body.addEventListener('scroll', () => {
    const rect = head.getBoundingClientRect();

    if (rect.bottom <= 0) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Button scroll behavior
const scrollTopButton = document.getElementById('scrollTop');
const scrollExperienceButton = document.getElementById('scrollExperience');
const scrollContactButton = document.getElementById('scrollContact');

const scrollToTop = () => {
    document.body.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

const scrollToExperience = () => {
    const experienceSection = document.getElementById('experienceContainer');
    const rect = experienceSection.getBoundingClientRect();
    document.body.scrollTo({
        top: experienceSection.offsetTop - header.clientHeight,
        behavior: 'smooth',
    });
}

const scrollToContact = () => {
    const footerSection = document.getElementById('footerContainer');
    const rect = footerSection.getBoundingClientRect();
    document.body.scrollTo({
        top: footerSection.offsetTop - header.clientHeight,
        behavior: 'smooth',
    });
}

scrollTopButton.addEventListener('click', scrollToTop);
scrollExperienceButton.addEventListener('click', scrollToExperience);
scrollContactButton.addEventListener('click', scrollToContact);

const mobileNavButton = document.getElementById('mobileNavButton');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const menuScrollTop = document.getElementById('menuScrollTop');
const menuScrollExperience = document.getElementById('menuScrollExperience');
const menuScrollContact = document.getElementById('menuScrollContact');

mobileNavButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden-menu');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden-menu');
});

menuScrollTop.addEventListener('click', () => {
    scrollToTop();
    mobileMenu.classList.toggle('hidden-menu');
});
menuScrollExperience.addEventListener('click', () => {
    scrollToExperience();
    mobileMenu.classList.toggle('hidden-menu');
});
menuScrollContact.addEventListener('click', () => {
    scrollToContact();
    mobileMenu.classList.toggle('hidden-menu');
});
