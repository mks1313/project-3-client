import './SearchBar.css'; // Importa los estilos CSS para el SearchBar

const SearchBar = () => {
    return (
        <div className="search-container">
            <input type="text" placeholder="Search..." />
            <button type="submit"><i className="fa fa-search"></i></button>
        </div>
    );
}

export default SearchBar;
