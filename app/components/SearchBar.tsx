import { Input } from "@nextui-org/input";
import { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query) {
      onSearch(query);
    }
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input
        type="text"
        label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="btn btn-primary">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
