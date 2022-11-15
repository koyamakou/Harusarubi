// TopPageで使用するJS
import * as lp from './LP/lp.js';
import * as scroll from './LP/scroll.js';
import * as sidrbar from './LP/sidrbar.js';

(function() {
  lp.modalWindowClick.open();
  lp.modalWindowClick.close();
  lp.sliderClick.autoSlider();
  lp.sliderClick.mainImg();
  lp.sliderClick.drag();
  lp.sliderClick.swipe();
  lp.sliderClick.squareClick();
  lp.sliderClick.eventNotDrag();

  new scroll.Scroll('.about_char', 'scroll-js-img', 0.7);
  new scroll.Scroll('.about_profile', 'scroll-js-inner', 0.7);
  new scroll.Scroll('.movie_area', 'scroll-js-movie', 0.76);
  new scroll.Scroll('.store-syamanizumu', 'scroll-js-syamanizumu', 0.7);
  new scroll.Scroll('.store-singan', 'scroll-js-singan', 0.7);
  new scroll.Scroll('.outher_haru', 'scroll-js-haru', 0.7);

  new sidrbar.Sidrbar('#sidebarList');
}());
