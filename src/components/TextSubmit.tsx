import { SearchCircleIcon, ShieldCheckIcon } from "@heroicons/react/solid";

interface Props {
  text: string;
  setText: (text: string) => void;
  onSubmit: (() => void) | (() => Promise<void>);
  label: string;
  placeholder?: string;
}
export default function TextSubmit({
  text,
  setText,
  onSubmit,
  label,
  placeholder = "Enter unique registration code of participant",
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {/* List icon */}
            <ShieldCheckIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={placeholder}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {/* Submit icon */}
          <SearchCircleIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span>{`Submit`}</span>
        </button>
      </div>
    </form>
  );
}
