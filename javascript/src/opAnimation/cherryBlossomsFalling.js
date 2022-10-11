/**
 * 桜の花びらアニメーション
 * @type {[type]}
 */
export class cherryBlossomsFalling {
  constructor(targetId) {
    this.targets = document.querySelector(targetId).children;
    this.animation = new Array();
  }
  start(){
    for(let i=0; i<this.targets.length; i++) {
      let element = this.targets[i];
      this._setStyle(element);
      this.animation[i] = anime({
        easing: 'linear',
        loop: true,
        targets: element,
        duration: 7300,
        delay: () =>  {
          return i * 140;
        },
        right: () => {
          return [this._getRandomInt(0, 30).toString()+'%',
                  this._getRandomInt(20, 99).toString()+'%'];
        },
        top: ['-15px', '100%'],
        rotateX: () => {
          return [this._getRandomInt(0, 45).toString()+'deg', this._getRandomInt(180, 540).toString()+'deg'];
        },
        rotateY: () => {
          return [this._getRandomInt(0, 30).toString()+'deg', this._getRandomInt(180, 540).toString()+'deg'];
        },
        rotateZ: () => {
          return [this._getRandomInt(0, 30).toString()+'deg', this._getRandomInt(180, 540).toString()+'deg'];
        },
      });
    }
    return this.animation;
  }
  /**
   * 桜の花びらの作成
   * 指定する内容は以下の通り
   * ・横幅：width
   * ・縦幅:hight
   * ・フィルター:filter
   * ・不透明度:opacity
   * @param {[type]} element  [description]
   */
  _setStyle(element) {
    element.style.width = this._getRandomFloot(10, 14) + 'px';
    element.style.height = this._getRandomFloot(10, 14) + 'px';
    element.style.filter = 'blur(' + this._getRandomFloot(1, 5) + 'px)';
    element.style.opacity = this._getRandomFloot(0.4, 0.95);
  }

  /**
   * min～maxの間でランダムの整数値を返す
   * @param  {[type]} min   最小値
   * @param  {[type]} max   最大値
   * @return {[type]}     ランダム数
   */
  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  /**
   * min～maxの間でランダムの浮動小数点数値を返す
   * @param  {[type]} min   最小値
   * @param  {[type]} max   最大値
   * @return {[type]}     ランダム数
   */
  _getRandomFloot(min, max) {
    return Math.random() * (max - min) + min;
  }
}
