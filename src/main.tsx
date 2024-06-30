import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 他のコンポーネントで使いたいデータを用意する
const userInfo = {
  name: "Taro",
  age: 24,
};

// createContext(扱いたいデータ) で constex を生成して xxContext に格納する
export const UserInfoContext = createContext(userInfo);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // 生成したcontext の Provider プロパティで管理したい範囲のコンポーネントを囲う。value に管理したい データを渡す
  <UserInfoContext.Provider value={userInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserInfoContext.Provider>
);
