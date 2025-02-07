import { useState } from "react";
import PropTypes from "prop-types"; 
import "./SearchBar.css";

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div id="search-bar" className="restaurant-search-bar">
      <input
        className="search"
        type="text"
        id="search"
        placeholder="Search restaurants..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,  
};

export default SearchBar;



