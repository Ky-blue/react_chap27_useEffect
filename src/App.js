import React, { useState, useEffect } from "react";
import "./styles.css";

const INITIAL_COUNT = 0;

const Timer = () => {
  //countた状態変数、カウント数に管理
  const [count, setCount] = useState(INITIAL_COUNT);

  //状態変数を初期値=INITIAL_COUNTに戻す関数
  const countReset = () => {
    setCount(INITIAL_COUNT);
  };

  //状態変数 count をカウントアップする関数
  const countIncrement = () => {
    //現在のcountを引数として受け取る
    setCount((prevCount) => prevCount + 1);

    //console上にログを表示
    console.log("カウントアップ +1");
  };

  //副作用関数
  const callbackFunction = () => {
    //副作用関数が実行された際にalertで「副作用関数が実行されました」と表示
    alert("副作用関数が実行されました！");

    //100ミリ秒ごとにcountIncrement関数を実行するtimer関数
    const timer = setInterval(countIncrement, 1000);
    return () => {
      //コンポーネントのアンマウント時及び副作用関数の再実行時に
      //console上に「timerが削除された」と表示される
      console.log("timerが削除されました！");

      //timer関数を削除
      clearInterval(timer);
    };
  };

  //第二引数に空の依存配列を渡して初回レンダリングのみ副作用関数実行
  useEffect(callbackFunction, []);

  return (
    <div className="App">
      {/* 状態変数の値 */}
      <p>現在のカウント数 :{count}</p>

      {/* 状態変数countが更新されても初期値は保持されている */}
      {/* クリックでcountResetが実行されてcountは初期値に戻る */}
      <button onClick={countReset}>RESET</button>
    </div>
  );
};

export default function App() {
  /* displayは状態変数toggleDisplayで状態変数を管理 */
  const [display, toggleDisplay] = useState(false);

  //displayの状態をトグルするhandleToggleDisplay関数
  const handleToggleDisplay = () => {
    toggleDisplay(!display);
  };

  return (
    <>
      {/* ボタンをクリックするとhandoleToggleDisplay関数が実行 */}
      <button onClick={handleToggleDisplay}>
        {/* displayのブール値に応じて表示する文字を分岐 */}
        {display ? "タイマーを非表示" : "タイマーを表示"}
      </button>

      {/* displayの情チアがtrueの時にのみTimerコンポーネントを表示 */}
      {/* handleToggleDisplay関数が実行されると差分が検出され、子であるTimerコンポーネントも再レンダリング */}
      {display && <Timer />}
    </>
  );
}
