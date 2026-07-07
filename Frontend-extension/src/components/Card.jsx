import { useState } from "react";
import { Plus, X, Ghost } from "lucide-react";

function Card({ icon, heading, content, dispatcher, selector, deleter }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    // 1. Added `h-full` so the card expands to fill its container
    <div className="flex flex-col h-full gap-2 md:gap-4">
      <h2 className="text-2xl md:text-xl lg:text-3xl items-center flex gap-4 text-green-primary tracking-tight font-medium">
        {icon}
        {heading}
      </h2>

      <p className="text-neutral-600 font-light lg:text-[16px] md:text-center lg:text-left">
        {content}
      </p>

      <div className="flex flex-col max-h-49 items-center overflow-scroll gap-2 mb-8">
        {selector.length !== 0 ? (
          selector.map((item, idx) => (
            <span
              key={idx}
              className="w-full flex justify-between items-center p-4 bg-white border border-gray-200 rounded-md text-neutral-600"
            >
                <a href={`https://www.${item}`} target="_blank">
              {item}
                </a>
              <button
                className="hover:text-red-500 transition-colors"
                onClick={() => {
                  deleter(item);
                }}
              >
                <X />
              </button>
            </span>
          ))
        ) : (
          <Empty />
        )}
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <input
          type="text"
          className="w-full rounded-lg px-2 py-4 border-2 border-neutral-primary focus:outline-none focus:ring-2 focus:ring-green-secondary transition-all duration-500 text-neutral-600 placeholder:text-neutral-400"
          placeholder="Enter Website Name"
          value={input}
          onChange={handleInputChange}
        />

        <button
          className="flex gap-2 align-bottom items-center justify-center border-2 border-dashed border-gray-300 hover:border-green-primary px-2 py-4 rounded-lg text-neutral-600 text-md font-medium transition-colors"
          onClick={() => {
            if (input.trim() !== "") {
              dispatcher(input);
              setInput("");
            }
          }}
        >
          <Plus /> Add Website
        </button>
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-2 mt-12   ">
    <GhostIllustration/>
      <p className="text-sm text-gray-400 mt-1 text-center">
        Add a website below to get started.
      </p>
    </div>
  );
}

export function GhostIllustration(){
  return(
    <>
     <div className="p-3 bg-neutral-primary rounded-full mb-3">
        <Ghost className="w-8 h-8 text-green-secondary " strokeWidth={1.5} />
      </div>
      <p className="text-lg font-medium text-gray-500">
        It's a ghost town in here
      </p>
    </>
  )
}

export default Card;
