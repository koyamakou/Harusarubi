/********************************************************************/
/************************** modalWindow *****************************/
/********************************************************************/
/**
 * モジュールパターン
 * @return {[type]} [description]
 */
export let modalWindowClick = (function() {
  let targetId = document.getElementById('modalWindow');
  let movieId = document.getElementById('modalWindowMovie').children[0];

  return {
    // modalWindowを開く
    // 3周年記念動画か羽累トレーラー動画を表示する。
    open : function () {
      // 参周年記念生配信の場合
      let triggerId_3rd = document.getElementById('modal_3rd');
      triggerId_3rd.addEventListener('click', () => {
        let targeCustom = targetId.getAttribute('data-state');
        //カスタムデータの検証
        if (targeCustom === 'modeless' || targeCustom === '') {
          movieId.setAttribute('src', 'https://www.youtube.com/embed/WLxMK6xKvpA');
          targetId.setAttribute('data-state', 'modal');
          return ;
        }
      })
      // 羽累トレーラー動画
      let triggerId_haru = document.getElementById('haruMovie');
      triggerId_haru.addEventListener('click', () => {
        let targeCustom = targetId.getAttribute('data-state');
        //カスタムデータの検証
        if (targeCustom === 'modeless' || targeCustom === '') {
          movieId.setAttribute('src', 'https://www.youtube.com/embed/5BLicZktcns');
          targetId.setAttribute('data-state', 'modal');
          return ;
        }
      });
    },
    // modalWindowを閉じる
    close : function() {
      targetId.addEventListener('click', () => {
        let targeCustom = targetId.getAttribute('data-state');
        if (targeCustom === 'modal') {
          movieId.setAttribute('src', '');
          targetId.setAttribute('data-state', 'modeless');
          return ;
        }
      });
    }
  }
})();

/***************************************************************/
/************************** slider *****************************/
/***************************************************************/

/**
 * スライダー用
 * @return {[type]} [description]
 */
export let sliderClick = (function() {
  // 自動スライダーの管理変数
  let autoSliderManage = {poolID: null, autoFlag: false};
  let targetItemId;
  // 子要素(画像)のlistを返す
  let sliderList = document.querySelectorAll('#sliderList')[0].children;
  // 親要素
  let targetOuterList = document.getElementById('outerSliderList');
  // 動画のリンク
  let youtubeMap = [
    {index:1, youTube: 'https://www.youtube.com/embed/yaEIRyLkR_M'},
    {index:2, youTube: 'https://www.youtube.com/embed/fqE19qwpEjM'},
    {index:3, youTube: 'https://www.youtube.com/embed/KIGXxey4WnI'},
    {index:4, youTube: 'https://www.youtube.com/embed/c9P_rz0h9bI'},
    {index:5, youTube: 'https://www.youtube.com/embed/J74fzBbd6rE'},
    {index:6, youTube: 'https://www.youtube.com/embed/ZZldiI-3a7U'},
    {index:7, youTube: 'https://www.youtube.com/embed/wpLOq_728dk'},
    {index:8, youTube: 'https://www.youtube.com/embed/-weEAWMKRdQ'},
    {index:9, youTube: 'https://www.youtube.com/embed/w83rx2V-WaQ'},
    {index:10, youTube: 'https://www.youtube.com/embed/xDjBlXRmhXA'},
    {index:11, youTube: 'https://www.youtube.com/embed/PZgW9ZmB150'},
    {index:12, youTube: 'https://www.youtube.com/embed/aS25QDVlRI8'},
    {index:13, youTube: 'https://www.youtube.com/embed/FUU9jUFyRZM'},
    {index:14, youTube: 'https://www.youtube.com/embed/R2KcDh8TN8o'},
    {index:15, youTube: 'https://www.youtube.com/embed/3MDyGPhxFBo'},
    {index:16, youTube: 'https://www.youtube.com/embed/Jz7wtEWcjlo'}
  ];

  return {
    autoSlider: function() {
       setAutoSlider();
    },
    // main画像クリック
    mainImg : function() {
      Array.prototype.forEach.call(sliderList, function(item) {
        item.addEventListener('click', () => {
          // ダブルクリックによって2つ以上のiframeが追加される場合がある。
          // それを防ぐためにすでにiframeがある場合、追加しないようにする。
          if (item.children.length === 1) {
            clearAutoSlider();
            let mainTargetChild = item.children[0];
            let addElement = document.createElement('iframe');
            let index = item.getAttribute('data-index');
            addElement.classList.add('youtube-item');
            addElement.setAttribute('frameborder', '0');

            youtubeMap.forEach((item, i) => {
              // indexから何番目のMVを追加するか判断
              // indexの一致したMVを連想配列からもってくる
              if(item.index == index) {
                addElement.setAttribute('src', item.youTube);
              }
            });
            item.insertBefore(addElement, mainTargetChild.nextElementSibling);
          }
        });
      });
    },

    /***************************************/
    /*********スワイプ＆ドラッグ************/
    /**************************************/

    // カーソルのドラッグ
    drag : function() {
      // マウスをクリックしたか判定
      let isDrawing = false;
      let x = 0
      // クリック判定
      targetOuterList.addEventListener('mousedown', (event) => {
        // X座標の取得
        x = event.clientX;
        isDrawing = true;
        if (autoSliderManage.autoFlag) {
          // 自動スライダーがonの場合
          clearAutoSlider();
        }
      });
      // カーソル移動判定
      targetOuterList.addEventListener('mousemove', (event) => {
        if (isDrawing === true) {
          // クリックしたX座標-ドラックした距離
          let length = event.x - x;
          if (length >= 200 ) {
            prevSlider();
            // ゆっくりスライダーさせる
            x += 200;
          } else if (length < -200) {
            nextSlider();
            // ゆっくりスライダーさせる
            x -= 200;
          }
        }
      });
      window.addEventListener('mouseup', (event) => {
        if (isDrawing === true) {
          // 初期化
          x = 0;
          isDrawing = false;
        }
        if (! autoSliderManage.autoFlag) {
          // 自動スライダーがoffの場合
          setAutoSlider();
        }
      });
    },
    // 指のスワイプ
    swipe : function() {
      // スワイプしたか判定
      let isDrawing = false;
      let x = 0
      // スワイプ判定
      targetOuterList.addEventListener('touchstart', (event) => {
        // X座標の取得
        x = event.touches[0].clientX;
        isDrawing = true;
        if (autoSliderManage.autoFlag) {
          // 自動スライダーがonの場合
          clearAutoSlider();
        }
      });
      // 指の移動判定
      targetOuterList.addEventListener('touchmove', (event) => {
        if (isDrawing === true) {
          // スワイプしたX座標-ドラックした距離
          //console.log('event.clientX：' + event.clientX);
          let length = event.touches[0].clientX - x;
          if (length >= 200 ) {
            prevSlider();
            // ゆっくりスライダーさせる
            x += 200;
          } else if (length < -200) {
            nextSlider();
            // ゆっくりスライダーさせる
            x -= 200;
          }
        }
      });
      window.addEventListener('touchend', (event) => {
        if (isDrawing === true) {
          // 初期化
          x = 0;
          isDrawing = false;
        }
        if (! autoSliderManage.autoFlag) {
          // 自動スライダーがoffの場合
          setAutoSlider();
        }
      });
    },
    /****************四角のボタン**********************/
    squareClick : function () {
      // 親要素を取得
      let sliderNumbersList = document.querySelectorAll('#sliderNumbersList')[0].children;
      // 親要素を元にどこがクリックされたか判定する。
      Array.prototype.forEach.call(sliderNumbersList, function(item) {
        item.addEventListener('click', (element) => {
          // 135C°回転している正方形を0°に戻す
          document.querySelector('[data-square="rotate"]').setAttribute('data-square', '');
          // クリックした正方形を135°回転させる
          element.target.setAttribute('data-square', 'rotate');
          let clickNumvers = element.target.getAttribute('data-numbers');
          // スライダーが動かす
          squareClickSlider(clickNumvers);
          if (autoSliderManage.autoFlag) {
            //　時間リセットのためのクリア
            clearAutoSlider();
            // 自動スライダーがonの場合
            setAutoSlider();
          } else {
            // 自動スライダーがoffの場合
            setAutoSlider();
          }
        })
      })
    },
    /*************画像のドラッグを有効にするとバグる*************/
    /*******************画像のドラッグを禁止する****************/
    eventNotDrag : function() {
      targetOuterList.addEventListener('dragstart', (event) => {
        // ドラッグイベントを中断する。
        event.preventDefault();
      })
    }
  }
  /**
   * 前の画像を表示(←用)
   * @return {[type]} [description]
   */
  function prevSlider() {
    // スライダー用の変数
    let prev = document.querySelector('[data-position="prev"]');
    let main = document.querySelector('[data-position="main"]');
    let next = document.querySelector('[data-position="next"]');
    let prevIndex = prev.getAttribute('data-index');
    // スライダーがどの位置を表しているか表示する
    let square = document.querySelector('[data-square="rotate"]');
    let rotate = document.querySelector('[data-numbers='+'"'+prevIndex+'"'+']');

    Array.prototype.forEach.call(sliderList, function(item) {
      // itemの中から表示予定の前の画像のindexを取得
      if(item.getAttribute('data-index') == getPrevIndex(prevIndex)) {
        // 表示予定のindexと一致するindexを見つけたら、prevとする。
        item.setAttribute('data-position', 'prev');
      }
    });
    /***************DOM操作*******************/
    if (main.children.length === 2) {
      // もしも、画像がクリックされていてyoutubeの動画の要素があった場合削除する。
      // youtubeの動画の要素がある場合、子要素は絶対2個
      main.children[1].remove();
    }
    // スライダーの位置変更
    prev.setAttribute('data-position', 'main');
    main.setAttribute('data-position', 'next');
    next.setAttribute('data-position', '');
    // スライダーがどこを表示しているかの変更
    square.setAttribute('data-square', '');
    rotate.setAttribute('data-square', 'rotate');
  }
  /**
   * 次の画像を表示(→用)
   * @return {[type]} [description]
   */
  function nextSlider() {
    // スライダー用の変数
    let prev = document.querySelector('[data-position="prev"]');
    let main = document.querySelector('[data-position="main"]');
    let next = document.querySelector('[data-position="next"]');
    let nextIndex = next.getAttribute('data-index');
    // スライダーがどの位置を表しているか表示する
    let square = document.querySelector('[data-square="rotate"]');
    let rotate = document.querySelector('[data-numbers='+'"'+nextIndex+'"'+']');

    Array.prototype.forEach.call(sliderList, function(item) {
      // itemの中から表示予定の次の画像のindexを取得
      if(item.getAttribute('data-index') == getNextIndex(nextIndex)) {
        // 表示予定のindexと一致するindexを見つけたら、nextとする。
        item.setAttribute('data-position', 'next');
      }
    });

    /***************DOM操作*******************/
    if (main.children.length === 2) {
      // もしも、画像がクリックされていてyoutubeの動画の要素があった場合削除する。
      // youtubeの動画の要素がある場合、子要素は絶対2個
      main.children[1].remove();
    }

    // スライダーの位置変更
    prev.setAttribute('data-position', '');
    main.setAttribute('data-position', 'prev');
    next.setAttribute('data-position', 'main');
    // スライダーがどこを表示しているかの変更
    square.setAttribute('data-square', '');
    rotate.setAttribute('data-square', 'rotate');
  }

  /**
   * 四角のところを押したときに表示するよう
   * @param  {[type]} squareIndex               [description]
   * @return {[type]}             [description]
   */
  function squareClickSlider(squareIndex) {
    // スライダー用の変数
    let prev = document.querySelector('[data-position="prev"]');
    let main = document.querySelector('[data-position="main"]');
    let next = document.querySelector('[data-position="next"]');
    // 初期化
    prev.setAttribute('data-position', '');
    main.setAttribute('data-position', '');
    next.setAttribute('data-position', '');
    if (main.children.length === 2) {
      // もしも、画像がクリックされていてyoutubeの動画の要素があった場合削除する。
      // youtubeの動画の要素がある場合、子要素は絶対2個
      main.children[1].remove();
    }

    Array.prototype.forEach.call(sliderList, function(item, index, array) {
      // itemの中から表示予定の次の画像のindexを取得
      if(item.getAttribute('data-index') == squareIndex) {
        // クリックした正方形の場所を元に画像の位置を変更
        // 配列は0から始まるためそれに合わせる
        array[getPrevIndex(squareIndex)-1].setAttribute('data-position', 'prev');
        array[getNextIndex(squareIndex)-1].setAttribute('data-position', 'next');
        item.setAttribute('data-position', 'main');
      }
    });
  }

  /**
   * 次のprevの位置取得
   */
  function getPrevIndex(index) {
    let prevIndex = Number(index) - 1;
    if (prevIndex < 1) {
      // prevIndexが1未満の場合、最終番号に移動
      return sliderList.length;
    } else {
      // 引数より1つ前を返す。
      return prevIndex;
    }
  }
  /**
   * 次のnextの位置取得
   */
  function getNextIndex (index) {
    let nextIndex = Number(index) + 1;
    if (nextIndex > sliderList.length) {
      // nextIndexが最終番号より大きい場合、1番目に移動
      return 1;
    } else {
      // 引数より1つ後を返す。
      return nextIndex;
    }
  }
  /**
   * 自動スライダーの開始
   */
  function setAutoSlider() {
    autoSliderManage.poolID = setInterval(() => {nextSlider();}, 3000);
    autoSliderManage.autoFlag = true;
  }
  /**
   * 自動スライダーの停止
   */
  function clearAutoSlider() {
    clearInterval(autoSliderManage.poolID);
    autoSliderManage.autoFlag = false;
  }
})();

/*
  modalWindowClick.open();
  modalWindowClick.close();
  sliderClick.autoSlider();
  sliderClick.mainImg();
  sliderClick.drag();
  sliderClick.swipe();
  sliderClick.squareClick();
  sliderClick.eventNotDrag();
*/
