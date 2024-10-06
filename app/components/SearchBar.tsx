import { Input } from "@nextui-org/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle search action
  const handleSearch = () => {
    if (query) {
      onSearch(query);
    }
  };

  // Handle "Enter" key press to trigger search
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle shortcut (Ctrl + K) to focus on the input field
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault(); // Prevent default behavior (browser's search)
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    // Attach event listener for keydown events
    window.addEventListener('keydown', handleShortcut);

    // Clean up the event listener
    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  return (
    <div className="flex w-full gap-4 items-center relative ">
      <div className="relative w-full">
        <Input
          ref={inputRef}  // Attach the ref to the input
          type="text"
          label="Search"
          value={query}
          onKeyDown={handleKeyPress}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-1 " // Make space for the Ctrl + K inside the input
        
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          <button
            className="rounded px-2 py-1 text-xs font-medium cursor-pointer mr-3  text-gray-400"
            onClick={() => inputRef.current?.focus()}
          >
            Ctrl + K
          </button>
        </div>
      </div>
      <Button
        onClick={handleSearch}
        color="default"
        size="lg"
        variant="shadow"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
