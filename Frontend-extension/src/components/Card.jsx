import { useState } from "react";
import { Plus, X, Ghost } from "lucide-react";

function Card({ icon, heading, content, dispatcher, selector, deleter }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col h-full gap-3 md:gap-4">
      <h2 className="text-xl sm:text-2xl md:text-xl lg:text-3xl items-center flex gap-2 sm:gap-4 text-brand tracking-tight font-medium">
        {icon}
        {heading}
      </h2>

      <p className="text-sm sm:text-base text-text-soft font-light lg:text-[16px] text-left md:text-center lg:text-left">
        {content}
      </p>

      <div className="flex flex-col max-h-40 sm:max-h-49 items-center overflow-auto gap-2 mb-4 sm:mb-8 pr-1">
        {selector.length !== 0 ? (
          selector.map((item, idx) => (
            <div
              key={idx}
              className="w-full flex items-center justify-between rounded-md border border-border-default bg-surface p-3 sm:p-4 text-sm sm:text-base text-text-muted transition-colors duration-300 ease-in hover:bg-surface-soft"
            >
              <a
                href={`https://www.${item}`}
                target="_blank"
                rel="noreferrer"
                className="truncate max-w-[80%]"
              >
                {item}
              </a>
              <button
                className="hover:text-danger transition-colors p-1"
                onClick={() => {
                  deleter(item);
                }}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <input
          type="text"
          className="w-full rounded-lg border-2 border-border-default bg-surface px-3 py-2.5 sm:px-2 sm:py-4 text-sm sm:text-base text-text placeholder:text-text-disabled transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Enter Website Name"
          value={input}
          onChange={handleInputChange}
        />

        <button
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border-default bg-surface px-3 py-2.5 sm:px-2 sm:py-4 text-sm sm:text-md font-medium text-text-soft transition-colors hover:bg-surface-soft hover:border-border-brand"
          onClick={() => {
            if (input.trim() !== "") {
              dispatcher(input);
              setInput("");
            }
          }}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Add Website
        </button>
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-2 mt-4 sm:mt-12">
      <GhostIllustration />
      <p className="text-xs sm:text-sm text-text-disabled mt-1 text-center">
        Add a website below to get started.
      </p>
    </div>
  );
}

export function GhostIllustration() {
  return (
    <>
      <div className="p-2 sm:p-3 bg-surface-soft rounded-full mb-2 sm:mb-3">
        <Ghost
          className="w-6 h-6 sm:w-8 sm:h-8 text-brand dark:text-brand-muted"
          strokeWidth={1.5}
        />
      </div>
      <p className="text-base sm:text-lg font-medium text-text-soft text-center">
        It's a ghost town in here
      </p>
    </>
  );
}

export default Card;