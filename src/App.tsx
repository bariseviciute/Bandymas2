import * as React from "react";

import Window from "./Window";
import "./styles.css";

export default function App() {
  return (
    <div>
      <Window title="About">
        <h1>Hello there!</h1>
        <p>
          This is a window, it's a fancy window.
          <br />
          <strong>It's very stylized!</strong>
        </p>
      </Window>
    </div>
  );
}
