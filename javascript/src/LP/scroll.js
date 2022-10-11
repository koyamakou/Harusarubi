
export class Scroll {
  /**
   * @param {[type]} target       クラス名を追加するエレメント
   * @param {[type]} addClasNeme  追加するクラス名
   * @param {[type]} magnification 倍率が0に近いほど、早く表示する。
   */
  constructor(target, addClasNeme, magnification) {
      this.target = document.querySelector(target);
      this.addClasNeme = addClasNeme;
      this.magnification = magnification;
      // アニメーションで表示するエレメントのTopの位置
      // 一番最初に表示される位置の取得
      this.rootTop = this.target.getBoundingClientRect().top;
      this.windowHeight = window.innerHeight;
      // 一度クラスを追加したらもう追加しないように管理するflag
      this.addflag = true;
      this._resize();
      // クラスを追加させたいエレメントが既に画面内か判断
      // 画面内の場合、クラスを即追加。画面外の場合、画面内に出るまで待機
      // this.rootTop/10は少しだけ表示していたら発火するためそれを防ぐために使用
      if (this.rootTop + this.rootTop/10 < this.windowHeight) {
        this._showAlready();
      } else {
        this._scroll();
      }
  }
  /****************プライベートメソッド******************/
  _scroll() {
    this.rootTop = this.target.getBoundingClientRect().top;

    window.addEventListener('scroll', () => {
      if (this.addflag) {
        // スクロール量の取得
        const scroll = window.scrollY;
        this.windowHeight = window.innerHeight;
        //  画面の一番上からアニメーションさせたい要素までの長さ - 画面の高さ
        if (this.rootTop - this.windowHeight*this.magnification < scroll ) {
          this.target.classList.add(this.addClasNeme);
          this.addflag = false;
        }
      }
  });
  };
  _showAlready() {
    this.target.classList.add(this.addClasNeme);
  };
  // レスポンシブ対応
  _resize() {
    window.addEventListener('resize', () => {
      // クラス追加後は何もしない
      if(this.addflag) {
        this.rootTop = this.target.getBoundingClientRect().top;
      }
    });
  }
}


/*
(function() {
  new Scroll('.about_char', 'scroll-js-img', 0.7);
  new Scroll('.about_profile', 'scroll-js-inner', 0.7);
  new Scroll('.movie_area', 'scroll-js-movie', 0.76);
  new Scroll('.store-syamanizumu', 'scroll-js-syamanizumu', 0.7);
  new Scroll('.store-singan', 'scroll-js-singan', 0.7);
}());
*/
