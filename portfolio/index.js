import i18Obj from './translate.js';
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    hamburger = document.querySelector('.hamburger'),
    btnsParent = document.querySelector('.section__portfolio-btns'),
    portfolioBtn = document.querySelectorAll('.section__btn-prtf'),
    portfolioImg = document.querySelectorAll('.image'),
    langParent = document.querySelector('.header__language'),
    langBtn = document.querySelectorAll('.header__language_mod'),
    seasons = ['winter', 'spring', 'summer', 'autumn'],
    sections = document.querySelectorAll('.body, .section__header, .section__title-skills, .section__title-portfolio, .section__title-video, .section__title-price, .section__price-header, .section__skills-title, .section__skills-descr, .section__portfolio-btns, .section__price-descr, .footer'),
    lightBtn = document.querySelector('.light_btn'),
    attr = getDataSeason();

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('hamburger_active');
            menu.classList.remove('menu_active');
        })
    })
    portfolioBtn.forEach(item => {
        item.classList.remove('section__btn-prtf_active');
    })

    function getDataSeason() {
        let arr = [];
        portfolioBtn.forEach(item => {
            arr.push(item.dataset.season);
        })
        return arr;
    }

    function hideBtns() {
        portfolioBtn.forEach(item => {
            item.classList.remove('section__btn-prtf_active');
        })
    }

    function showContent(i) {
        portfolioImg.forEach((img, index) => {
            img.src = `./src/img/${attr[i]}/${index + 1}.jpg`
        })
        portfolioBtn[i].classList.add('section__btn-prtf_active')
    }
    showContent(3)

    btnsParent.addEventListener('click', event => {
        const target = event.target;

        if(target && target.classList.contains('section__btn-prtf')) {
            portfolioBtn.forEach((item, i) => {
                if(target == item) {
                    hideBtns();
                    showContent(i);
                }
            })
        } 
    })

    function preloadSummerImages() {
       seasons.forEach(item => {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./src/img/${item}/${i}.jpg`;
          }
       })
      }
      preloadSummerImages();

    function getTranslate(lang) {
        const dataAll = document.querySelectorAll('[data-i18]');
        dataAll.forEach(item => {
            item.textContent = i18Obj[lang][item.dataset.i18];
            if(item.placeholder) {
                item.placeholder = i18Obj[lang][item.dataset.i18];
                item.textContent = ''
            }
        })
    }
    
    langParent.addEventListener('click', e => {
        const target = e.target;
        langBtn.forEach(item => {
            item.classList.remove('header__language_mod_active');
        })
        if(target && target.classList.contains('header__language_mod')) {
            target.classList.add('header__language_mod_active');
            getTranslate(target.textContent);
        } 
    })

   function lightShow() {
    sections.forEach(item => {
        item.classList.toggle('light-theme')
    })
   }
   

   lightBtn.addEventListener('click', () => {
        lightShow()
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active_light');
        });
    
        menuItem.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('hamburger_active_light');
            })
        })
    })
})
console.log('1. Смена изображений в секции portfolio +25 \n 2. Перевод страницы на два языка +25 \n 3. Переключение светлой и тёмной темы +25')