/**
 * 文字表示アニメーション
 * @type {[type]}
 */
export class writeAnimetion {
  constructor(target, write) {
    this.targetElement = target;
    this.write = write;
    this.writeSplit = write.split("");
    this.dispWriteLine = new Array();
    // addEventListenerで使用するためにbindする
    this.callbackEvent = this.setStyle.bind(this);
    this.animetion = anime.timeline({
      easing: 'easeInOutQuad',
      direction: 'normal',
      loop: false,
      autoplay: false
    });
    this._splitWrite();
  }
  _getWidth() {
    if (window.innerWidth <= 520) {
      return  346;
    } else if (520 < window.innerWidth && window.innerWidth <= 960) {
      return  511;
    } else if (960 < window.innerWidth) {
      return  751;
    }
  }
  /**
   * 文字の分割＆前の文字を足しながら配列に入れ込む
   * 例) abcを表示する場合
   * [0]a
   * [1]ab
   * [2]abc
   * @return {[type]} [description]
   */
  _splitWrite() {
    let char = "";
    let tempDispWriteLine = new Array();
    this.writeSplit.forEach(function(element, index) {
      char += element;
      tempDispWriteLine[index] = char;
      index++;
    });
    this.dispWriteLine = tempDispWriteLine;
  }

  /**
   * Animationのスタート
   * @return {[type]} [description]
   */
  writeStart() {
    this.animetion
    // 表示領域の横幅の指定
    .add({
      targets: [this.targetElement, this.targetElement.parentElement.parentElement],
      duration: 500,
      //translateX: '-40%',
      width: this._getWidth(),
      complete: () => {
        // レスポンシブ対応
        window.addEventListener('resize', this.callbackEvent);
      }
    })
    // 一文字ずつ表示
    .add({
      targets: this.targetElement,
      delay: anime.stagger(8),
      innerHTML: this.dispWriteLine,
      complete: () => {
        //this.targetElement.style.textAlign = 'center';
      },
    }, '+=150')
    .add({
      duration: 5000,
    });
    this.animetion.play();
    return this.animetion;
  }
  setStyle() {
    this.targetElement.parentElement.parentElement.style.width = this._getWidth() + 'px';
    this.targetElement.style.width = this._getWidth() + 'px';
  }
}
