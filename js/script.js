var last_id='0';
function move_left(id){
    if(last_id!='0'){
        document.getElementById(last_id).style.transform='translateX(0.5vw)';
    }
    document.getElementById(id).style.transform='translateX(-1vw)';
    last_id=id;
}

///We create a buffer to have a smoother nicer transition when switching sections
const TOP_ANIMATION_BUFFER = -250;
const BOTTOM_ANIMATION_BUFFER = 200;

/// ---------- HELPER FUNCTIONS
//The function will build the navigation from the existing sections
function buildNav() {
    let navContainer = document.getElementById('navbar__list');
    //for small content like this LI, it seems it's shorter than
    //populating the createdElement so we use outerHTML
    let li = document.createElement('li');
    navContainer.appendChild(li);
    li.outerHTML = `<li class="menu__number" data-section="home__top">Start</li>`;

    const allSections = document.querySelectorAll('section');
    //we start with i == 1 to avoid having add 1 to the i when paddingString
    for (let i = 1; i <= allSections.length; i++) {
        let numText = i.toString().padStart(2, '0');
        let li = document.createElement('li');
        navContainer.appendChild(li);
        li.outerHTML = `<li class="menu__number" data-section="section${numText}">${numText}</li>`;
    }
}

function addClickHandlers() {
    const navbarMenuSide = document.querySelectorAll('.menu__number');
    navbarMenuSide.forEach(function(item) {
        item.addEventListener('click', function(event) {
            let element = document.getElementById(event.target.dataset.section);
            //we scroll to the center, but due to the position of elements in section, it looks a little
            //offcenter - that's on purpose to create desired effect
            element.scrollIntoView({ behavior: 'smooth', block: "center" });
        });
    });
}

//We use two loops for clarity - it looks nicer to first remove all classes and then
//add when necessary. The same with if, splitting it into two makes it more readable
function activateSection() {
    const allSections = document.querySelectorAll('section');

    for (let i = 0; i < allSections.length; i++) {
        allSections[i].classList.remove('your-active-class');
    }

    for (let i = 0; i < allSections.length; i++) {
        let bBox = allSections[i].getBoundingClientRect();
        if (bBox.top < TOP_ANIMATION_BUFFER) {
            continue;
        }
        if (bBox.top > document.documentElement.clientHeight - BOTTOM_ANIMATION_BUFFER) {
            continue;
        }
        allSections[i].classList.add('your-active-class');
    }

};

function animateBar() {
    let totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let percentScroll = window.scrollY / totalHeight;
    let ul = document.getElementById('navbar__list');
    let progressBar = document.getElementById("progress__bar");
    let progressBarHeight = percentScroll * ul.offsetHeight;
    progressBar.setAttribute('style', `height: ${progressBarHeight}px`);
};

/// ---------- ADD EVENT LISTENERS
window.addEventListener('DOMContentLoaded', function(event) {
    buildNav();
    addClickHandlers();
});

window.addEventListener('scroll', function(event) {
    animateBar();
    activateSection();
});