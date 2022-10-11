import React from "react"
import ReactDom from "react-dom"


export function opAnimationDOM() {
  return(
    <div></div>
  );
}

export function sidebarDON() {
  return(
    <ul id = "sidebarList" className = "sidebar-list" data-opacity = "true">
      <li data-status = "initial" className = "visual-item"></li>
      <li data-status = "initial" className = "about-item"></li>
      <li data-status = "initial" className = "movie-item"></li>
      <li data-status = "initial" className = "store-item"></li>
      <li data-status = "initial" className = "other-item"></li>
    </ul>
  );
}

export function visualAreaDOM() {
  return(
    <img className = "visual_area_bg" src="./img/lp/bg.jpg" alt="bg" loading = "lazy" />
  )
}

export function aboutAreaDOM() {
  return(
    <div className = "about">
      <img className = "about_char" src="./img/lp/about.png" alt="春猿火" />
      <div className = "about_profile">
        <h2>春猿火</h2>
        <p>
          10代、20代の若者が抱える想い、エモーションを歌とラップに込める、バーチャルラップシンガー。<br />
          時に台風のように力強く、時にあどけない少女のように、パワフルで変幻自在な歌唱力で聴き手の心を引き込む19歳。<br />
          2022年11月15日に3周年を迎える。
        </p>
        <ul className = "sns-list">
          <li>
            <a href = "https://www.youtube.com/channel/UCE7gtjLeZKNXLp5YURzYYeg" target = "_blank"><img src = "./img/lp/sns/youtube.png" alt = "YouTube" /></a>
          </li>
          <li>
            <a href = "https://twitter.com/harusaruhi" target = "_blank"><img src = "./img/lp/sns/twitter.png" alt = "Twitter" /></a>
          </li>
          <li>
            <a href = "https://space.bilibili.com/488976992" target = "_blank"><img src = "./img/lp/sns/bilibili.png" alt = "bilibili" /></a>
          </li>
          <li>
            <a href = "https://piapro.jp/harusaruhi" target = "_blank"><img src = "./img/lp/sns/piapro.png" alt = "piapro" /></a>
          </li>
          <li>
            <a href = "https://www.tiktok.com/@harusaruhi?" target = "_blank"><img src = "./img/lp/sns/tiktok.png" alt = "TikTok" /></a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function movieAreaDOM() {
  return(
    <div className = "movie">
      <h1>MOVIE</h1>
      <div className = "3rd">
        <h2>参周年感謝編</h2>
        <div id = "modal_3rd" className = "movie_3rd">
            <img src="./img/lp/3rd/3rd.jpg" alt="参周年感謝編" />
            <div className = "ico_play">
              <img src="./img/lp/3rd/playButton.png" alt="再生ボタン" />
            </div>
        </div>
      </div>
      <div className = "my_song">
        <h2>私の歌</h2>
        <div className = "slider_contain">
          <div id = "outerSliderList" className = "slider-outer">
            <div id = "sliderList" className = "slider-list">
              <div className = "slider-list-item" data-index = "1" data-position = "">
                <img src="./img/lp/my_song/03.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "2" data-position = "">
                <img src="./img/lp/my_song/04.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "3" data-position = "">
                <img src="./img/lp/my_song/05.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "4" data-position = "">
                <img src="./img/lp/my_song/06.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "5" data-position = "">
                <img src="./img/lp/my_song/07.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "6" data-position = "">
                <img src="./img/lp/my_song/09.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "7" data-position = "prev">
                <img src="./img/lp/my_song/11.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "8" data-position = "main">
                <img src="./img/lp/my_song/13.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "9" data-position = "next">
                <img src="./img/lp/my_song/14.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "10" data-position = "">
                <img src="./img/lp/my_song/16.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "11" data-position = "">
                <img src="./img/lp/my_song/18.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "12" data-position = "">
                <img src="./img/lp/my_song/19.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "13" data-position = "">
                <img src="./img/lp/my_song/20.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "14" data-position = "">
                <img src="./img/lp/my_song/21.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "15" data-position = "">
                <img src="./img/lp/my_song/23.jpg" alt="春猿火-オリジナルMV" />
              </div>
              <div className = "slider-list-item" data-index = "16" data-position = "">
                <img src="./img/lp/my_song/24.jpg" alt="春猿火-オリジナルMV" />
              </div>
            </div>
          </div>
          <div className = "slider-numbers">
            <ul id = "sliderNumbersList" className = "slider-numbers-list">
              <li data-numbers = "1" data-square = ""></li>
              <li data-numbers = "2" data-square = ""></li>
              <li data-numbers = "3" data-square = ""></li>
              <li data-numbers = "4" data-square = ""></li>
              <li data-numbers = "5" data-square = ""></li>
              <li data-numbers = "6" data-square = ""></li>
              <li data-numbers = "7" data-square = ""></li>
              <li data-numbers = "8" data-square = "rotate"></li>
              <li data-numbers = "9" data-square = ""></li>
              <li data-numbers = "10" data-square = ""></li>
              <li data-numbers = "11" data-square = ""></li>
              <li data-numbers = "12" data-square = ""></li>
              <li data-numbers = "13" data-square = ""></li>
              <li data-numbers = "14" data-square = ""></li>
              <li data-numbers = "15" data-square = ""></li>
              <li data-numbers = "16" data-square = ""></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export function storeAreaDOM() {
  return(
    <div className = "store">
      <div className = "store_info">
        <h1>STORE</h1>
        <div className = "store-detail-list">
          <div className = "store-syamanizumu">
            <div className = "syamanizumu-img">
              <a href = "https://findmestore.thinkr.jp/collections/harusaruhi/products/harusaruhi220403" target = "_blank"><img src="./img/lp/store/syamanizumu.jpg" alt="春猿火-アルバム" /></a>
            </div>
            <div className = "syamanizumu-explanation">
              <h2>1st LIVE Blu-ray「シャーマニズム」</h2>
              <p>
                2021年8月27日に開催された春猿火の1st ONE-MAN LIVEがBlu-rayで映像化。<br />
                新鋭のラップアーティストさなり、KMNZらの客演も含む19曲の歌唱に加え、<br />
                デビューまでの裏話や心の奥に秘めた思いを語ったMC等も完全収録。<br />
                ライブ全編を収録したBlu-rayの他、LIVE音源を収録したCD2枚を同梱した3枚組。<br />
                ライブの為に13名のイラストレーターが描き下ろした公式ファンアートをアートブックも付属。<br /><br />

                [内容]<br />
                Blu-ray、CD2枚組（全22曲）、アートブック（32ページ）<br /><br />

                [収録曲]<br />
                22曲
              </p>
            </div>
          </div>
          <div className = "store-singan">
            <div className = "singan-img">
              <a href = "https://findmestore.thinkr.jp/products/%E6%98%A5%E7%8C%BF%E7%81%AB-1st-album-%E5%BF%83%E7%9C%BC" target = "_blank"><img src="./img/lp/store/singan.jpg" alt="春猿火-アルバム" /></a>
            </div>
            <div className = "singan-explanation">
              <h2>1st Album「心眼」</h2>
              <p>
                バーチャルラップシンガー春猿火、待望の1st Album「心眼」。<br />
                楽曲の主な作詞作曲はメインコンポーザーであるたかやんが担当。デビュー曲の「逆転」、<br />
                オリジナル楽曲で初のYoutube100万再生を突破した「オオゴト」、<br />
                リアルとバーチャルの壁を超えた意欲作「覚醒 feat.さなり」、1st ONE-MAN LIVE「シャーマニズム」でも公演を彩った
                「INTRODUCTION-目-」「OUTRODUCTION-眼-」などを含む、全12曲を収録。<br />
                2019年11月のYoutubeデビューからの約2年弱の活動の集大成的な作品となっています。<br />
                全曲のMixは神作、マスタリングはFlugel Mastering 山崎翼。ジャケットイラストは穂竹 藤丸。<br /><br />

                [内容]<br />
                CDアルバム「心眼」の他に「春猿火自由律」収録ミュージックカード、アクリルキーホルダー、<br />
                タトゥーシール、缶バッジ（3個）、ファンブック（37ページ）を同梱。
              </p>
            </div>
          </div>
        </div>
        <div className = "store-detail-more">
          <a href = "https://findmestore.thinkr.jp/collections/harusaruhi" target = "_blank" >
            <div className = "more-button">
              MORE
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export function otherAreaDOM() {
  return(
    <div className = "other_harusaruhi">
      <div className = "harusaruhi-list">
        <div className = "harusaruhi-char">
          <img src="./img/lp/other/harusaruhi.png" alt="春猿火" />
        </div>
        <div className = "harusaruhi-log">
          <img src="./img/lp/other/log.png" alt="春猿火-ロゴ" />
        </div>
      </div>
    </div>
  )
}

export function footerDOM() {
  return(
    <div className = "footer-inner">
      <ul className = "footer-list">
        <li><a href = "https://kamitsubaki.jp/" target = "_blank"><img src="./img/lp/footer_log.svg" alt="KAMITSUBAKI STUDIO" /></a></li>
        <li>© 2022 Kou Koyama</li>
      </ul>
    </div>
  )
}

export function modalWindowDOM() {
  return(
    <div id = "outerModalWindow" className = "modal-window_outer">
      <div className = "modal-window_background"></div>
      <div className = "modal-window_content">
        <div className = "modal-window_warp">
          <div id ="modalWindowMovie" className = "modal-window_movie">
            <iframe width="560" height="315" src="" frameborder="0"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}


export function outerTransitionDOM() {
  return(
    <div></div>
  );
}
