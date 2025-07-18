import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TestForm from "./components/TestForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-center">
      <h1>Form</h1>
      <div>
        <TestForm />
      </div>
    </div>
  );
}

export default App;
