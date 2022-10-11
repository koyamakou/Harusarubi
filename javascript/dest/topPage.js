(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sliderClick = exports.modalWindowClick = void 0;

/********************************************************************/

/************************** modalWindow *****************************/

/********************************************************************/

/**
 * モジュールパターン
 * @return {[type]} [description]
 */
var modalWindowClick = function () {
  var targetId = document.getElementById('modalWindow');
  var movieId = document.getElementById('modalWindowMovie').children[0];
  return {
    // modalWindowを開く
    open: function open() {
      var triggerId = document.getElementById('modal_3rd');
      triggerId.addEventListener('click', function () {
        var targeCustom = targetId.getAttribute('data-state'); //カスタムデータの検証

        if (targeCustom === 'modeless' || targeCustom === '') {
          movieId.setAttribute('src', 'https://www.youtube.com/embed/zcYMIsHZc7Q');
          targetId.setAttribute('data-state', 'modal');
          return;
        }
      });
    },
    // modalWindowを閉じる
    close: function close() {
      targetId.addEventListener('click', function () {
        var targeCustom = targetId.getAttribute('data-state');

        if (targeCustom === 'modal') {
          movieId.setAttribute('src', '');
          targetId.setAttribute('data-state', 'modeless');
          return;
        }
      });
    }
  };
}();
/***************************************************************/

/************************** slider *****************************/

/***************************************************************/

/**
 * スライダー用
 * @return {[type]} [description]
 */


exports.modalWindowClick = modalWindowClick;

var sliderClick = function () {
  // 自動スライダーの管理変数
  var autoSliderManage = {
    poolID: null,
    autoFlag: false
  };
  var targetItemId; // 子要素(画像)のlistを返す

  var sliderList = document.querySelectorAll('#sliderList')[0].children; // 親要素

  var targetOuterList = document.getElementById('outerSliderList'); // 動画のリンク

  var youtubeMap = [{
    index: 1,
    youTube: 'https://www.youtube.com/embed/yaEIRyLkR_M'
  }, {
    index: 2,
    youTube: 'https://www.youtube.com/embed/fqE19qwpEjM'
  }, {
    index: 3,
    youTube: 'https://www.youtube.com/embed/KIGXxey4WnI'
  }, {
    index: 4,
    youTube: 'https://www.youtube.com/embed/c9P_rz0h9bI'
  }, {
    index: 5,
    youTube: 'https://www.youtube.com/embed/J74fzBbd6rE'
  }, {
    index: 6,
    youTube: 'https://www.youtube.com/embed/ZZldiI-3a7U'
  }, {
    index: 7,
    youTube: 'https://www.youtube.com/embed/wpLOq_728dk'
  }, {
    index: 8,
    youTube: 'https://www.youtube.com/embed/-weEAWMKRdQ'
  }, {
    index: 9,
    youTube: 'https://www.youtube.com/embed/w83rx2V-WaQ'
  }, {
    index: 10,
    youTube: 'https://www.youtube.com/embed/xDjBlXRmhXA'
  }, {
    index: 11,
    youTube: 'https://www.youtube.com/embed/PZgW9ZmB150'
  }, {
    index: 12,
    youTube: 'https://www.youtube.com/embed/aS25QDVlRI8'
  }, {
    index: 13,
    youTube: 'https://www.youtube.com/embed/FUU9jUFyRZM'
  }, {
    index: 14,
    youTube: 'https://www.youtube.com/embed/R2KcDh8TN8o'
  }, {
    index: 15,
    youTube: 'https://www.youtube.com/embed/3MDyGPhxFBo'
  }, {
    index: 16,
    youTube: 'https://www.youtube.com/embed/Jz7wtEWcjlo'
  }];
  return {
    autoSlider: function autoSlider() {
      setAutoSlider();
    },
    // main画像クリック
    mainImg: function mainImg() {
      Array.prototype.forEach.call(sliderList, function (item) {
        item.addEventListener('click', function () {
          // ダブルクリックによって2つ以上のiframeが追加される場合がある。
          // それを防ぐためにすでにiframeがある場合、追加しないようにする。
          if (item.children.length === 1) {
            clearAutoSlider();
            var mainTargetChild = item.children[0];
            var addElement = document.createElement('iframe');
            var index = item.getAttribute('data-index');
            addElement.classList.add('youtube-item');
            addElement.setAttribute('frameborder', '0');
            youtubeMap.forEach(function (item, i) {
              // indexから何番目のMVを追加するか判断
              // indexの一致したMVを連想配列からもってくる
              if (item.index == index) {
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
    drag: function drag() {
      // マウスをクリックしたか判定
      var isDrawing = false;
      var x = 0; // クリック判定

      targetOuterList.addEventListener('mousedown', function (event) {
        // X座標の取得
        x = event.clientX;
        isDrawing = true;

        if (autoSliderManage.autoFlag) {
          // 自動スライダーがonの場合
          clearAutoSlider();
        }
      }); // カーソル移動判定

      targetOuterList.addEventListener('mousemove', function (event) {
        if (isDrawing === true) {
          // クリックしたX座標-ドラックした距離
          var length = event.x - x;

          if (length >= 200) {
            prevSlider(); // ゆっくりスライダーさせる

            x += 200;
          } else if (length < -200) {
            nextSlider(); // ゆっくりスライダーさせる

            x -= 200;
          }
        }
      });
      window.addEventListener('mouseup', function (event) {
        if (isDrawing === true) {
          // 初期化
          x = 0;
          isDrawing = false;
        }

        if (!autoSliderManage.autoFlag) {
          // 自動スライダーがoffの場合
          setAutoSlider();
        }
      });
    },
    // 指のスワイプ
    swipe: function swipe() {
      // スワイプしたか判定
      var isDrawing = false;
      var x = 0; // スワイプ判定

      targetOuterList.addEventListener('touchstart', function (event) {
        // X座標の取得
        x = event.touches[0].clientX;
        isDrawing = true;

        if (autoSliderManage.autoFlag) {
          // 自動スライダーがonの場合
          clearAutoSlider();
        }
      }); // 指の移動判定

      targetOuterList.addEventListener('touchmove', function (event) {
        if (isDrawing === true) {
          // スワイプしたX座標-ドラックした距離
          //console.log('event.clientX：' + event.clientX);
          var length = event.touches[0].clientX - x;

          if (length >= 200) {
            prevSlider(); // ゆっくりスライダーさせる

            x += 200;
          } else if (length < -200) {
            nextSlider(); // ゆっくりスライダーさせる

            x -= 200;
          }
        }
      });
      window.addEventListener('touchend', function (event) {
        if (isDrawing === true) {
          // 初期化
          x = 0;
          isDrawing = false;
        }

        if (!autoSliderManage.autoFlag) {
          // 自動スライダーがoffの場合
          setAutoSlider();
        }
      });
    },

    /****************四角のボタン**********************/
    squareClick: function squareClick() {
      // 親要素を取得
      var sliderNumbersList = document.querySelectorAll('#sliderNumbersList')[0].children; // 親要素を元にどこがクリックされたか判定する。

      Array.prototype.forEach.call(sliderNumbersList, function (item) {
        item.addEventListener('click', function (element) {
          // 135C°回転している正方形を0°に戻す
          document.querySelector('[data-square="rotate"]').setAttribute('data-square', ''); // クリックした正方形を135°回転させる

          element.target.setAttribute('data-square', 'rotate');
          var clickNumvers = element.target.getAttribute('data-numbers'); // スライダーが動かす

          squareClickSlider(clickNumvers);

          if (autoSliderManage.autoFlag) {
            //　時間リセットのためのクリア
            clearAutoSlider(); // 自動スライダーがonの場合

            setAutoSlider();
          } else {
            // 自動スライダーがoffの場合
            setAutoSlider();
          }
        });
      });
    },

    /*************画像のドラッグを有効にするとバグる*************/

    /*******************画像のドラッグを禁止する****************/
    eventNotDrag: function eventNotDrag() {
      targetOuterList.addEventListener('dragstart', function (event) {
        // ドラッグイベントを中断する。
        event.preventDefault();
      });
    }
  };
  /**
   * 前の画像を表示(←用)
   * @return {[type]} [description]
   */

  function prevSlider() {
    // スライダー用の変数
    var prev = document.querySelector('[data-position="prev"]');
    var main = document.querySelector('[data-position="main"]');
    var next = document.querySelector('[data-position="next"]');
    var prevIndex = prev.getAttribute('data-index'); // スライダーがどの位置を表しているか表示する

    var square = document.querySelector('[data-square="rotate"]');
    var rotate = document.querySelector('[data-numbers=' + '"' + prevIndex + '"' + ']');
    Array.prototype.forEach.call(sliderList, function (item) {
      // itemの中から表示予定の前の画像のindexを取得
      if (item.getAttribute('data-index') == getPrevIndex(prevIndex)) {
        // 表示予定のindexと一致するindexを見つけたら、prevとする。
        item.setAttribute('data-position', 'prev');
      }
    });
    /***************DOM操作*******************/

    if (main.children.length === 2) {
      // もしも、画像がクリックされていてyoutubeの動画の要素があった場合削除する。
      // youtubeの動画の要素がある場合、子要素は絶対2個
      main.children[1].remove();
    } // スライダーの位置変更


    prev.setAttribute('data-position', 'main');
    main.setAttribute('data-position', 'next');
    next.setAttribute('data-position', ''); // スライダーがどこを表示しているかの変更

    square.setAttribute('data-square', '');
    rotate.setAttribute('data-square', 'rotate');
  }
  /**
   * 次の画像を表示(→用)
   * @return {[type]} [description]
   */


  function nextSlider() {
    // スライダー用の変数
    var prev = document.querySelector('[data-position="prev"]');
    var main = document.querySelector('[data-position="main"]');
    var next = document.querySelector('[data-position="next"]');
    var nextIndex = next.getAttribute('data-index'); // スライダーがどの位置を表しているか表示する

    var square = document.querySelector('[data-square="rotate"]');
    var rotate = document.querySelector('[data-numbers=' + '"' + nextIndex + '"' + ']');
    Array.prototype.forEach.call(sliderList, function (item) {
      // itemの中から表示予定の次の画像のindexを取得
      if (item.getAttribute('data-index') == getNextIndex(nextIndex)) {
        // 表示予定のindexと一致するindexを見つけたら、nextとする。
        item.setAttribute('data-position', 'next');
      }
    });
    /***************DOM操作*******************/

    if (main.children.length === 2) {
      // もしも、画像がクリックされていてyoutubeの動画の要素があった場合削除する。
      // youtubeの動画の要素がある場合、子要素は絶対2個
      main.children[1].remove();
    } // スライダーの位置変更


    prev.setAttribute('data-position', '');
    main.setAttribute('data-position', 'prev');
    next.setAttribute('data-position', 'main'); // スライダーがどこを表示しているかの変更

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
    var prev = document.querySelector('[data-position="prev"]');
    var main = document.querySelector('[data-position="main"]');
    var next = document.querySelector('[data-position="next"]'); // 初期化

    prev.setAttribute('data-position', '');
    main.setAttribute('data-position', '');
    next.setAttribute('data-position', '');

    if (main.children.length === 2) {
      // もしも、画像がクリックされていてyoutubeの動画の要素があった場合削除する。
      // youtubeの動画の要素がある場合、子要素は絶対2個
      main.children[1].remove();
    }

    Array.prototype.forEach.call(sliderList, function (item, index, array) {
      // itemの中から表示予定の次の画像のindexを取得
      if (item.getAttribute('data-index') == squareIndex) {
        // クリックした正方形の場所を元に画像の位置を変更
        // 配列は0から始まるためそれに合わせる
        array[getPrevIndex(squareIndex) - 1].setAttribute('data-position', 'prev');
        array[getNextIndex(squareIndex) - 1].setAttribute('data-position', 'next');
        item.setAttribute('data-position', 'main');
      }
    });
  }
  /**
   * 次のprevの位置取得
   */


  function getPrevIndex(index) {
    var prevIndex = Number(index) - 1;

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


  function getNextIndex(index) {
    var nextIndex = Number(index) + 1;

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
    autoSliderManage.poolID = setInterval(function () {
      nextSlider();
    }, 3000);
    autoSliderManage.autoFlag = true;
  }
  /**
   * 自動スライダーの停止
   */


  function clearAutoSlider() {
    clearInterval(autoSliderManage.poolID);
    autoSliderManage.autoFlag = false;
  }
}();
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


exports.sliderClick = sliderClick;

},{}],2:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scroll = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Scroll = /*#__PURE__*/function () {
  /**
   * @param {[type]} target       クラス名を追加するエレメント
   * @param {[type]} addClasNeme  追加するクラス名
   * @param {[type]} magnification 倍率が0に近いほど、早く表示する。
   */
  function Scroll(target, addClasNeme, magnification) {
    (0, _classCallCheck2["default"])(this, Scroll);
    this.target = document.querySelector(target);
    this.addClasNeme = addClasNeme;
    this.magnification = magnification; // アニメーションで表示するエレメントのTopの位置
    // 一番最初に表示される位置の取得

    this.rootTop = this.target.getBoundingClientRect().top;
    this.windowHeight = window.innerHeight; // 一度クラスを追加したらもう追加しないように管理するflag

    this.addflag = true;

    this._resize(); // クラスを追加させたいエレメントが既に画面内か判断
    // 画面内の場合、クラスを即追加。画面外の場合、画面内に出るまで待機
    // this.rootTop/10は少しだけ表示していたら発火するためそれを防ぐために使用


    if (this.rootTop + this.rootTop / 10 < this.windowHeight) {
      this._showAlready();
    } else {
      this._scroll();
    }
  }
  /****************プライベートメソッド******************/


  (0, _createClass2["default"])(Scroll, [{
    key: "_scroll",
    value: function _scroll() {
      var _this = this;

      this.rootTop = this.target.getBoundingClientRect().top;
      window.addEventListener('scroll', function () {
        if (_this.addflag) {
          // スクロール量の取得
          var scroll = window.scrollY;
          _this.windowHeight = window.innerHeight; //  画面の一番上からアニメーションさせたい要素までの長さ - 画面の高さ

          if (_this.rootTop - _this.windowHeight * _this.magnification < scroll) {
            _this.target.classList.add(_this.addClasNeme);

            _this.addflag = false;
          }
        }
      });
    }
  }, {
    key: "_showAlready",
    value: function _showAlready() {
      this.target.classList.add(this.addClasNeme);
    }
  }, {
    key: "_resize",
    value: // レスポンシブ対応
    function _resize() {
      var _this2 = this;

      window.addEventListener('resize', function () {
        // クラス追加後は何もしない
        if (_this2.addflag) {
          _this2.rootTop = _this2.target.getBoundingClientRect().top;
        }
      });
    }
  }]);
  return Scroll;
}();
/*
(function() {
  new Scroll('.about_char', 'scroll-js-img', 0.7);
  new Scroll('.about_profile', 'scroll-js-inner', 0.7);
  new Scroll('.movie_area', 'scroll-js-movie', 0.76);
  new Scroll('.store-syamanizumu', 'scroll-js-syamanizumu', 0.7);
  new Scroll('.store-singan', 'scroll-js-singan', 0.7);
}());
*/


exports.Scroll = Scroll;

},{"@babel/runtime/helpers/classCallCheck":5,"@babel/runtime/helpers/createClass":6,"@babel/runtime/helpers/interopRequireDefault":7}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidrbar = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Sidrbar = /*#__PURE__*/function () {
  /**
   * @param {[type]} target       クラス名を追加するエレメント
   * @param {[type]} addClasNeme  追加するクラス名
   */
  function Sidrbar(target) {
    (0, _classCallCheck2["default"])(this, Sidrbar);
    this.target = document.querySelector(target);
    this.clickList = this.target.children; // ボタンを拡大させるか管理するフラグ

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


  (0, _createClass2["default"])(Sidrbar, [{
    key: "_showAlready",
    value: function _showAlready() {
      this._setStatus(this._getArea());
    }
    /****************プライベートメソッド******************/

    /****クリック****/

  }, {
    key: "_click",
    value: function _click() {
      Array.prototype.forEach.call(this.clickList, function (item) {
        var _this = this;

        item.addEventListener('click', function () {
          var className = item.className; // クリック時対象のところまで自動scroll

          window.scrollBy({
            // 移動させたい要素のTopの位置を指定
            top: document.querySelector('#' + className.split('-')[0] + '_area').getBoundingClientRect().top,
            left: 0,
            behavior: 'smooth'
          }); //　カスタムデータの変更

          _this.anctionStop = true;
          var actionData = document.querySelector('[data-status="action"]');

          if (actionData != null) {
            actionData.setAttribute('data-status', '');
          }

          if (className == 'visual-item') {
            _this.target.setAttribute('data-opacity', 'true');
          }

          item.setAttribute('data-status', 'action');
        });
      }, this);
    }
  }, {
    key: "_scroll",
    value:
    /*****スクロール*****/
    function _scroll() {
      var _this2 = this;

      window.addEventListener('scroll', function (e) {
        // ボタンを押したときscrollとclickが同時に動かないように管理
        if (_this2.anctionStop) {
          window.removeEventListener("scroll", _this2);
          setTimeout(function () {
            _this2.anctionStop = false;
          }, 1000);
          return;
        }

        _this2._setStatus(_this2._getArea());
      }); // レスポンシブ対応

      window.addEventListener('resize', function () {
        _this2._setStatus(_this2._getArea());
      });
    }
  }, {
    key: "_getArea",
    value:
    /**
     * 現在いる場所を取得
     * @return {[type]} [description]
     */
    function _getArea() {
      var targetVisual = document.querySelector('#visual_area').getBoundingClientRect();
      var targetAbout = document.querySelector('#about_area').getBoundingClientRect();
      var targetMovie = document.querySelector('#movie_area').getBoundingClientRect();
      var targetStore = document.querySelector('#store_area').getBoundingClientRect();
      var targetOther = document.querySelector('#other_area').getBoundingClientRect();
      var position = [{
        top: targetVisual.top,
        height: targetVisual.height,
        bottom: targetVisual.bottom
      }, {
        top: targetAbout.top,
        height: targetAbout.height,
        bottom: targetAbout.bottom
      }, {
        top: targetMovie.top,
        height: targetMovie.height,
        bottom: targetMovie.bottom
      }, {
        top: targetStore.top,
        height: targetStore.height,
        bottom: targetStore.bottom
      }, {
        top: targetOther.top,
        height: targetOther.height,
        bottom: targetOther.bottom
      }]; // ウィンドウの内部の高さ

      var windowHeight = window.innerHeight; // 各要素の位置が0以上でかつ、要素のtopの位置＋要素の高さがウィンドウの内部の高さより低いかで
      // どこの要素を表示しているのか判定している。
      // また、要素のbootomの位置でも判定可能
      // ボタンの拡大は要素の高さを小さくすることで調整可能

      if (windowHeight / 2 < position[1].top) {
        return 'Visual';
      } else if (0 <= position[1].top + position[1].height / 2 && position[1].top < windowHeight) {
        return 'About';
      } else if (0 <= position[2].top + position[2].height / 1.5 && position[2].top < windowHeight) {
        return 'Movie';
      } else if (windowHeight / 2 < position[4].top < windowHeight && windowHeight < position[4].bottom) {
        return 'Store';
      } else if (position[4].top < windowHeight) {
        return 'Other';
      }
    }
  }, {
    key: "_setStatus",
    value:
    /**
     * ステータスの設定
     * どこにいるのか表示する
     * @param {[type]} area  [description]
     */
    function _setStatus(area) {
      var actionData = document.querySelector('[data-status="action"]');

      if (actionData != null) {
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
    }
  }]);
  return Sidrbar;
}();
/*
(function() {
  new Sidrbar('#sidebarList');
}());
*/


exports.Sidrbar = Sidrbar;

},{"@babel/runtime/helpers/classCallCheck":5,"@babel/runtime/helpers/createClass":6,"@babel/runtime/helpers/interopRequireDefault":7}],4:[function(require,module,exports){
"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

var lp = _interopRequireWildcard(require("./LP/lp.js"));

var scroll = _interopRequireWildcard(require("./LP/scroll.js"));

var sidrbar = _interopRequireWildcard(require("./LP/sidrbar.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// TopPageで使用するJS
(function () {
  lp.modalWindowClick.open();
  lp.modalWindowClick.close();
  lp.sliderClick.autoSlider();
  lp.sliderClick.mainImg();
  lp.sliderClick.drag();
  lp.sliderClick.swipe();
  lp.sliderClick.squareClick();
  lp.sliderClick.eventNotDrag(); // 0.7

  new scroll.Scroll('.about_char', 'scroll-js-img', 0.7);
  new scroll.Scroll('.about_profile', 'scroll-js-inner', 0.7); // 0.76

  new scroll.Scroll('.movie_area', 'scroll-js-movie', 0.76);
  new scroll.Scroll('.store-syamanizumu', 'scroll-js-syamanizumu', 0.7);
  new scroll.Scroll('.store-singan', 'scroll-js-singan', 0.7);
  new sidrbar.Sidrbar('#sidebarList');
})();

},{"./LP/lp.js":1,"./LP/scroll.js":2,"./LP/sidrbar.js":3,"@babel/runtime/helpers/typeof":8}],5:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],6:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],7:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],8:[function(require,module,exports){
function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}]},{},[4]);
