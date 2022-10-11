import {countUpAnimetion} from './countUpAnimetion.js';
import {writeAnimetion} from './writeAnimetion.js';
import {cherryBlossomsFalling} from './cherryBlossomsFalling.js';
import {transition} from './transition.js';
import * as topPageCreateReactDOM from '../react/react.js';

/**
 * opアニメーションの全ての始まり。
 * 全てこのクラスで管理
 * @type {[type]}
 */
export class opAnimation {
  constructor(parameterTargetId) {
    this.parentWriteTarget = document.querySelector(parameterTargetId.write);
    this._preloadImg();

    let childrenTargets = new Array();
    for(let i = 0; i < this.parentWriteTarget.children.length; i++) {
      childrenTargets.push(this.parentWriteTarget.children[i]);
    }
    // アニメーションの変数
    let cherryBlossoms = new cherryBlossomsFalling(parameterTargetId.cherryBlossoms).start();
    let countUp = new countUpAnimetion(childrenTargets).coutUpStart();
    let write = new writeAnimetion(childrenTargets[2], '参周年記念非公式サイト');

    countUp.finished.then(function() {
      write.writeStart().finished.then(function() {
        // トップ画面への画面遷移アニメーション発火
        let transitionAnimation = new transition('transitionAnimation');
        let transitionAnimationId = transitionAnimation.setCustomData();

        // 遷移アニメーション終了
        // 先に遷移アニメーション終了を定義しないとカスタムデータをcloseの後に本イベントが動いてしまう
        transitionAnimationId.addEventListener('animationend', () => {
          if (transitionAnimationId.getAttribute('data-transition') == 'close') {
              // 画面遷移アニメーション終了後、使用した画面遷移アニメーションを削除する。
              topPageCreateReactDOM.deleteOuterTransition();
              document.getElementById('outerTransition').setAttribute('data-transitionAnimation', 'complete');
              // 全体のoverflow：hideenをOFF
              document.getElementsByTagName('html')[0].setAttribute('data-overflow', '');
              // TopPageで使用するJSの読み込み
              let jsElement = document.createElement('script');
              jsElement.type = 'module';
              jsElement.src = './javascript/dest/topPage.js';
              document.getElementsByTagName('body')[0].appendChild(jsElement);
          };
        });


        // 遷移アニメーション中にカスタムデータを変更
        transitionAnimationId.addEventListener('animationend', () => {
          // Inkを画面でいっぱいになった段階でカスタムデータの変更。
          // 理由はInkが画面にいっぱい→逆再生後にOpアニメーション関連のDOMやカスタムデータを削除/変更するため。
          transitionAnimationId.setAttribute('data-transition', 'close');
          // opアニメーションが完了したタイミングでopアニメーションで使用したdivの大きさを0%にする。
          document.getElementById('opAnimation').setAttribute('data-animation', 'complete');
          // 指定したaddEventListenerのイベントを削除する。
          window.removeEventListener('resize', transitionAnimation.callbackEventScope);
          // TopPageのDOMを生成
          topPageCreateReactDOM.TopPageCreateReactDOM();
        }, {once: true});


        // 桜が散るのを停止
        for (let i = 0; i < cherryBlossoms.length; i++) {
          cherryBlossoms[i].pause();
        }
        // writeAnimetion内で指定したaddEventListenerのイベントを削除する。
        // addEventListenerが動いたままだとコンソール画面でエラーになる。
        window.removeEventListener('resize', write.callbackEvent);
      });
    });
  }
  // アニメーションしているときに画像をあらかじめプリロードしておく(処理速度向上のため)
  _preloadImg() {
    let imgList = [
      './img/lp/bg.jpg',
      './img/lp/about.png',
      './img/lp/sns/youtube.png',
      './img/lp/sns/twitter.png',
      './img/lp/sns/bilibili.png',
      './img/lp/sns/piapro.png',
      './img/lp/sns/tiktok.png',
      './img/lp/3rd/3rd.jpg',
      './img/lp/3rd/playButton.png',
      './img/lp/my_song/03.jpg',
      './img/lp/my_song/04.jpg',
      './img/lp/my_song/05.jpg',
      './img/lp/my_song/06.jpg',
      './img/lp/my_song/07.jpg',
      './img/lp/my_song/09.jpg',
      './img/lp/my_song/11.jpg',
      './img/lp/my_song/13.jpg',
      './img/lp/my_song/14.jpg',
      './img/lp/my_song/16.jpg',
      './img/lp/my_song/18.jpg',
      './img/lp/my_song/19.jpg',
      './img/lp/my_song/20.jpg',
      './img/lp/my_song/21.jpg',

      './img/lp/store/syamanizumu.jpg',
      './img/lp/store/singan.jpg',

      './img/lp/other/harusaruhi.png',
      './img/lp/other/log.png',
      './img/lp/footer_log.svg'
    ]
    for (let i = 0; i < imgList.length; i++) {
      let img = new Image();
      img.src = imgList[i];
    }
  }
}



(function() {
  new opAnimation({
    write: '#CountUpAnimation',
    cherryBlossoms:  '#cherryBlossoms'
  });
}());
