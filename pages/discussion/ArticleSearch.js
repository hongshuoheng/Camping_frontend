// ArticleSearch.js
import React, { useState } from "react";

function ArticleSearch({ articles, onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="輸入關鍵字"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">搜尋</button>
            </form>
        </div>
    );
}

export default ArticleSearch;
