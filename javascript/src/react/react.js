import React from "react"
import ReactDom from "react-dom"
import * as TopPageDOM from "./topPageDOM.js";

/**
 * 仮想DOM生成の口
 * 画面遷移アニメーション中に生成するDOM
 *
 * reactは関数コンポーネントとクラスコンポーネントがあるが関数コンポーネントを採用
 * 色々理由はあるが、関数コンポーネントが今後主流になると考えられるため
 *
 * @param  {[type]} phase                 [description]
 * @return {[type]}         [description]
 */
export function TopPageCreateReactDOM(){

  createTopPageDOM();
  /**
   * react実行の大本(口)
   * @return {[type]} [description]
   */
  function createTopPageDOM() {
    deleteOpAnimationDOM();
    createSidebarDON();
    createVisualAreaDOM();
    createAboutAreaDOM();
    createMovieAreaDOM();
    createStoreAreaDOM();
    createOtherAreaDOM();
    createFooterDOM();
    createModalWindowDOM();
  }

  function deleteOpAnimationDOM() {
    ReactDom.render(
      <TopPageDOM.opAnimationDOM />,
      document.getElementById('opAnimation')
    );
  }

  function createSidebarDON() {
    ReactDom.render(
      <TopPageDOM.sidebarDON />,
      document.getElementById('sidebar')
    );
  }

  function createVisualAreaDOM() {
    ReactDom.render(
      <TopPageDOM.visualAreaDOM />,
      document.getElementById('visual_area')
    );
  }

  function createAboutAreaDOM() {
    ReactDom.render(
      <TopPageDOM.aboutAreaDOM />,
      document.getElementById('about_area')
    );
  }

  function createMovieAreaDOM() {
    ReactDom.render(
      <TopPageDOM.movieAreaDOM />,
      document.getElementById('movie_area')
    );
  }

  function createStoreAreaDOM() {
    ReactDom.render(
      <TopPageDOM.storeAreaDOM />,
      document.getElementById('store_area')
    );
  }

  function createOtherAreaDOM() {
    ReactDom.render(
      <TopPageDOM.otherAreaDOM />,
      document.getElementById('other_area')
    );
  }

  function createFooterDOM() {
    ReactDom.render(
      <TopPageDOM.footerDOM />,
      document.getElementById('footer')
    );
  }

  function createModalWindowDOM() {
    ReactDom.render(
      <TopPageDOM.modalWindowDOM />,
      document.getElementById('modalWindow')
    );
  }
}

/**
 * 画面遷移アニメーション終了後、画面遷移アニメーションで使用したDOMを削除するために使用
 * 
 * @return {[type]} [description]
 */
export function deleteOuterTransition() {
  ReactDom.render(
    <TopPageDOM.outerTransitionDOM />,
    document.getElementById('outerTransition')
  );
}
