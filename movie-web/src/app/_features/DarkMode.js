import { useState } from "react";
export default function Dark() {
  const [darkmode, setDarkmode] = useState(false);
  return (
    <div className={darkmode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center transition-all duration-300">
        <h1 className="mb-4">{darkmode ? "Dark Mode" : "Light Mode"}</h1>
        <button
          onClick={() => setDarkmode(!darkmode)}
          className=" px-4 py-2 bg-gray-300 roundeed transition"
        >
          Mode
        </button>
      </div>
    </div>
  );
}
