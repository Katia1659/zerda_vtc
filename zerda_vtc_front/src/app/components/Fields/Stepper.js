import React from "react";

export function Stepper({ currentStep, setStep }) {
    const baseStyle =
      "mx-2 px-3 py-2 font-nunito font-bold rounded-full shadow-md shadow-indigo-950 hover:shadow-xl  focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:ring-offset-2 active:shadow-none active:scale-95 transition transform duration-150 ease-in-out";
  return (
    <div className="flex justify-center gap-4 mb-6">
      {[1, 2, 3].map((step) => (
        <button
          type="button"
          key={step}
          onClick={()=>{setStep(step)}}
          className={`${baseStyle}  ${
            currentStep === step
              ? "bg-gradient-to-t from-purple-500 via-indigo-500 to-blue-500 hover:shadow-indigo-800 text-white"
              : "bg-gray-200 text-gray-600 hover:shadow-indigo-400"
          }`}
        >
          {step}
        </button>
      ))}
    </div>
  );
}
