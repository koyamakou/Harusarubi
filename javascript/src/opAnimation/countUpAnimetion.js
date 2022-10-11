/**
 * カウントアップアニメーション
 * [targets : カウントアップに必要なエレメント]
 * @type {[type]}
 */
export class countUpAnimetion {
  constructor(targetId) {
    this.targets = targetId;
    this.animation = anime.timeline({
      easing: 'linear',
      //direction: 'linear',
      //loop: true,
      autoplay: false
    })
  }

  /**
   * Animationのスタート
   * @return {[type]} [description]
   */
  coutUpStart() {
    // 1を表示
    this.animation.add({
      targets: this.targets[0],
      duration: 500,
      delay: 4000,
      translateY: '-100%',
      opacity:[0, 1],
    })
    // 2と3を上に移動
    .add({
      targets: [this.targets[1], this.targets[2]],
      duration: 600,
      translateY: '-100%',
      rotateX: ['-90deg', '-90deg'],
    }, '-=600')
    // 1をX軸回転しながら上に移動(非表示)
    .add({
      targets: this.targets[0],
      duration: 500,
      delay: 800,
      translateY: '-200%',
      rotateX: ['0deg', '-90deg'],
    })
    // 2をX軸回転しながら上に移動(表示)
    .add({
      targets: this.targets[1],
      duration: 600,
      translateY: '-200%',
      rotateX: ['90deg', '0deg'],
    }, '-=500')
    // 3を上に移動
    .add({
      targets: this.targets[2],
      duration: 600,
      translateY: '-200%',
      rotateX: ['-90deg', '-90deg'],
    }, '-=500')
    // 2をX軸回転しながら上に移動(非表示)
    .add({
      targets: this.targets[1],
      duration: 600,
      translateY: '-300%',
      rotateX: ['0deg', '-90deg'],
    }, '+=650')
    // 3をX軸回転しながら上に移動(表示)
    .add({
      targets: this.targets[2],
      duration: 600,
      translateY: '-300%',
      rotateX: ['90deg', '0deg'],
    }, '-=500')
    .add({
      duration: 800,
    });
    this.animation.play();
    return this.animation;
  }
}
