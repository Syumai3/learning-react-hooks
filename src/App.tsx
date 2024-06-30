import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
import SomeChild from "./SomeChild";
import { UserInfoContext } from "./main";
import useLocalStrage from "./useLocalStrage";

// useReducer
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

function App() {
  const [count, setCount] = useState(0);
  // main.tsxで生成した contex を useContext に渡す。これで provider で指定した value の値(context)を使用できる
  const userInfo = useContext(UserInfoContext);
  const ref = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, 0);

  // useMemo memo化とは、ブラウザのキャッシュに値を保存することができる
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  // const square = () => {
  //   let i = 0;
  //   while (i < 2000000000) {
  //     i++;
  //   }
  //   return count02 * count02;
  // };

  // count0２が更新された時だけ更新する。それ以外はメモリの値をそのまま使う。ただ使いすぎるとメモリを圧迫して重くなる
  const square = useMemo(() => {
    let i = 0;
    while (i < 2000000000) {
      i++;
    }
    return count02 * count02;
  }, [count02]);

  const handleClick = () => {
    setCount(count + 1);
  };

  // useCallback 関数のメモ化
  const [counter, setCounter] = useState(0);

  const showCount = useCallback(() => {
    alert(`これは重い処理です`);
  }, [counter]);

  // useEffect の中で依存関係のあるset関数は無限ループにつながるため使わない
  useEffect(() => {
    console.log("Hello hooks");
  }, [count]);

  // ボタンを押すと、インプット属性を参照しにいく
  const handleRef = () => {
    console.log(ref.current?.value);
    console.log(ref.current?.offsetHeight);
  };

  // 初期状態でカーソルをフォーカスする方法
  useEffect(() => {
    ref.current?.focus();
  }, []);

  // カスタムフック
  const [age, setAge] = useLocalStrage("age", 24);

  return (
    <>
      <div className="App"></div>
      {/* useStateはデータが変わったら再レンダリングされる、状態管理の手法 */}
      {/* useEffectは発火のタイミングを決めることができる。変数が変わった時、ページがリロードされた時、アンマウントされた時 */}
      <h1>useState, useEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>

      <hr />
      {/* 根本でuseContext を使うことで、どこでもprops を使える (props のバケツリレーをやらなくて済む) */}
      <h1>useContext</h1>
      <p>{userInfo.name}</p>
      <p>{userInfo.age}</p>

      <hr />
      {/* 指定した html のタグの中身の情報を参照しにいく */}
      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>UseRef</button>

      <hr />
      {/* reduxのreducer の考え方 */}
      <h1>useReducer</h1>
      <p>カウント：{state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>

      <hr />
      {/* React のパフォーマンスを改善するために使う 。関係ないものを呼ばれた時はメモリに保存されたものを使う*/}
      <h1>useMemo</h1>
      <div>カウント1:{count01}</div>
      <div>カウント2:{count02}</div>
      <div>結果：{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>+</button>
      <button onClick={() => setCount02(count02 + 2)}>+</button>

      <hr />
      <h1>useCallback</h1>
      <SomeChild showCount={showCount} />

      <hr />
      <h1>カスタムフック</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>年齢をセット</button>
    </>
  );
}

export default App;
