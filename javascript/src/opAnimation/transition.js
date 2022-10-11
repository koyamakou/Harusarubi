/**
 * 画面遷移アニメーション
 * @type {[type]}
 */
export class transition {
  constructor(target) {
    this.targeId = target;
    // addEventListenerで使用するためにbindする(this対策)
    // _setAspectRatio()内のthisをdocument.getElementById(target)に設定
    this.callbackEvent = this._setAspectRatio.bind(document.getElementById(target));
    // レスポンシブ対応
    this.callbackEvent();
    window.addEventListener('resize', this.callbackEvent);
  }
  /**
   * カスタムデータの設定
   */
  setCustomData() {
    let transitionTargetId = document.getElementById(this.targeId);
    // カスタムデータの変更
    transitionTargetId.setAttribute('data-transition', 'open');
    return transitionTargetId;
  }

  /**
   * 表示画像の比率を再計算
   */
  _setAspectRatio() {
    // imgのアスペクト比率
    let imgAspectRatio = 640/360;
    // スプライト画像のフレートが26
    let frames = 26
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let imgWidth;
    let imgHeight;

    if(windowWidth/windowHeight > imgAspectRatio) {
      imgWidth = windowWidth;
      imgHeight = imgWidth / imgAspectRatio;
    } else {
      imgHeight = windowHeight;
      imgWidth = imgHeight * imgAspectRatio;
    }
    // thisはbind()により、elementとなっている。
    this.style.width = (imgWidth*frames) + 'px';
    this.style.height = imgHeight + 'px';
  }
}
