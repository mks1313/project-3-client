import { useState } from "react";
import "./SearchBar.css"; 

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="restaurant-search-bar">
      <input
        className="search-input"
        type="text"
        id="search"
        placeholder="Search restaurants..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;

