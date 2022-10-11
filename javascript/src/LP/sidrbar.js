export class Sidrbar {

  /**
   * @param {[type]} target       クラス名を追加するエレメント
   * @param {[type]} addClasNeme  追加するクラス名
   */
  constructor(target) {
    this.target = document.querySelector(target);
    this.clickList = this.target.children;
    // ボタンを拡大させるか管理するフラグ
    this.anctionStop = false;

    this._showAlready();
    this._click();
    this._scroll();
  }

  /**
   * 一番最初に表示したときの処理
   * 表示位置によって拡大させるボタンは異なる
   * @return {[type]} [description]
   */
  _showAlready() {
    this._setStatus(this._getArea());
  }
  /****************プライベートメソッド******************/
  /****クリック****/
  _click() {
    Array.prototype.forEach.call(this.clickList, function(item) {
      item.addEventListener('click', () => {
        let className = item.className;
        // クリック時対象のところまで自動scroll
        window.scrollBy({
          // 移動させたい要素のTopの位置を指定
          top: document.querySelector('#' + className.split('-')[0] + '_area').getBoundingClientRect().top,
          left: 0,
          behavior: 'smooth'
        });

        //　カスタムデータの変更
        this.anctionStop = true;
        let actionData = document.querySelector('[data-status="action"]');
        if(actionData != null) {
          actionData.setAttribute('data-status', '');
        }
        if (className == 'visual-item') {
          this.target.setAttribute('data-opacity', 'true');
        }
        item.setAttribute('data-status', 'action');
      })
    }, this)
  };

  /*****スクロール*****/
  _scroll() {
    window.addEventListener('scroll', (e) =>  {
      // ボタンを押したときscrollとclickが同時に動かないように管理
      if (this.anctionStop) {
        window.removeEventListener("scroll", this);
        setTimeout( () =>{this.anctionStop = false}, 1000)
        return;
      }
      this._setStatus(this._getArea());
    });
    // レスポンシブ対応
    window.addEventListener('resize', () => {
      this._setStatus(this._getArea());
    })
  };
  /**
   * 現在いる場所を取得
   * @return {[type]} [description]
   */
  _getArea() {
    let targetVisual = document.querySelector('#visual_area').getBoundingClientRect();
    let targetAbout = document.querySelector('#about_area').getBoundingClientRect();
    let targetMovie = document.querySelector('#movie_area').getBoundingClientRect();
    let targetStore = document.querySelector('#store_area').getBoundingClientRect();
    let targetOther = document.querySelector('#other_area').getBoundingClientRect();
    let position = [
      {top: targetVisual.top, height: targetVisual.height, bottom: targetVisual.bottom},
      {top: targetAbout.top, height: targetAbout.height, bottom: targetAbout.bottom},
      {top: targetMovie.top, height: targetMovie.height, bottom: targetMovie.bottom},
      {top: targetStore.top, height: targetStore.height, bottom: targetStore.bottom},
      {top: targetOther.top, height: targetOther.height, bottom: targetOther.bottom}
    ]
    // ウィンドウの内部の高さ
    const windowHeight = window.innerHeight;
    // 各要素の位置が0以上でかつ、要素のtopの位置＋要素の高さがウィンドウの内部の高さより低いかで
    // どこの要素を表示しているのか判定している。
    // また、要素のbootomの位置でも判定可能
    // ボタンの拡大は要素の高さを小さくすることで調整可能
    if (windowHeight/2 < position[1].top) {
      return 'Visual';
    } else if (0 <=  position[1].top + position[1].height/2 && position[1].top < windowHeight) {
      return 'About';
    } else if (0 <=  position[2].top + position[2].height/1.5 && position[2].top < windowHeight) {
      return 'Movie';
    } else if (windowHeight/2 < position[4].top < windowHeight &&  windowHeight < position[4].bottom) {
      return 'Store';
    } else if (position[4].top < windowHeight) {
      return 'Other';
    }
  };

  /**
   * ステータスの設定
   * どこにいるのか表示する
   * @param {[type]} area  [description]
   */
  _setStatus(area) {
    let actionData = document.querySelector('[data-status="action"]');
    if(actionData != null) {
      actionData.setAttribute('data-status', '');
    }
    switch (area) {
      case 'Visual':
        this.target.setAttribute('data-opacity', 'true');
        document.querySelector('.visual-item').setAttribute('data-status', 'action');
        break;
      case 'About':
        this.target.setAttribute('data-opacity', 'false');
        document.querySelector('.about-item').setAttribute('data-status', 'action');
        break;
      case 'Movie':
        this.target.setAttribute('data-opacity', 'false');
        document.querySelector('.movie-item').setAttribute('data-status', 'action');
        break;
      case 'Store':
        this.target.setAttribute('data-opacity', 'false');
        document.querySelector('.store-item').setAttribute('data-status', 'action');
        break;
      case 'Other':
        this.target.setAttribute('data-opacity', 'false');
        document.querySelector('.other-item').setAttribute('data-status', 'action');
        break;
    }
  };
}

/*
(function() {
  new Sidrbar('#sidebarList');
}());
*/
