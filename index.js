import { Particles } from './particle.js';



window.onload = () => {
    if (document.getElementById('canvas-container')) {
        new Particles();
    }
};

// =========
const scrollPoint = 475;
const headerState = {
    isSticky: false,
};
if (document.body.scrollTop > scrollPoint) {
    headerState.isSticky = true;
}
const headContainerLargeEl = document.getElementById('head-container-l');
const headContainerSmallEl = document.getElementById('head-container-s');
const contentEl = document.body;

const shouldToggleHeaderClasses = (scroll) => (
    (scroll > scrollPoint && !headerState.isSticky) || 
    (scroll <= scrollPoint && headerState.isSticky)
);
const toggleHeaderClasses = () => {
    console.log('toggle', headerState.isSticky);
    headContainerSmallEl.classList.toggle('hidden');
    headerState.isSticky = !headerState.isSticky;
}

document.body.addEventListener('scroll', function() {
    window.requestAnimationFrame(() => {
        if (shouldToggleHeaderClasses(contentEl.scrollTop)) {
            toggleHeaderClasses();
        }
    });
});

