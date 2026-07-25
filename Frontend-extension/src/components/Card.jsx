import { useState } from "react";
import { Plus, X, Ghost } from "lucide-react";

function Card({ icon, heading, content, dispatcher, selector, deleter }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col h-full gap-2 md:gap-4">
      <h2 className="text-2xl md:text-xl lg:text-3xl items-center flex gap-4 text-brand tracking-tight font-medium">
        {icon}
        {heading}
      </h2>

      <p className="text-text-soft font-light lg:text-[16px] md:text-center lg:text-left">
        {content}
      </p>

      <div className="flex flex-col max-h-49 items-center overflow-auto gap-2 mb-8">
        {selector.length !== 0 ? (
          selector.map((item, idx) => (
            <div
              key={idx}
              className="w-full flex items-center justify-between rounded-md border border-border-default bg-surface p-4 text-text-muted transition-colors duration-300 ease-in hover:bg-surface-soft"
            >
              <a href={`https://www.${item}`} target="_blank">
                {item}
              </a>
              <button
                className="hover:text-danger transition-colors"
                onClick={() => {
                  deleter(item);
                }}
              >
                <X />
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
          className="w-full rounded-lg border-2 border-border-default bg-surface px-2 py-4 text-text placeholder:text-text-disabled transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Enter Website Name"
          value={input}
          onChange={handleInputChange}
        />

        <button
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border-default bg-surface px-2 py-4 text-md font-medium text-text-soft transition-colors hover:bg-surface-soft hover:border-border-brand"
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
      <GhostIllustration />
      <p className="text-sm text-text-disabled mt-1 text-center">
        Add a website below to get started.
      </p>
    </div>
  );
}

export function GhostIllustration() {
  return (
    <>
      <div className="p-3 bg-surface-soft rounded-full mb-3">
        <Ghost
          className="w-8 h-8 text-brand dark:text-brand-muted "
          strokeWidth={1.5}
        />
      </div>
      <p className="text-lg font-medium text-text-soft">
        It's a ghost town in here
      </p>
    </>
  );
}

export default Card;
