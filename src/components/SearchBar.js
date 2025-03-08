import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/SearchBar.css";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() === "") return;

    navigate(`/search?query=${encodeURIComponent(searchText)}`);
  };

  return (
    <div className="bar">
      <form onSubmit={handleSearch}>
        <input
          className="search-bar"
          type="text"
          placeholder="포켓몬 이름을 입력해주세요."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input className="img-btn" type="submit" value={' '} />
      </form>
    </div>
  );
}

export default SearchBar;
