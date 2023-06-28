import axios from "axios";
import cheerio from "cheerio";
import React, { useEffect, useState } from "react";

function App() {
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (query, e) => {
    e.preventDefault();
    const url = `https://web-4ra5.onrender.com/proxy/${query}`;
    setIsLoading(true);

    axios.get(url).then((response) => {
      setLinks(response.data);
      setIsLoading(false);
    });
  };

  return (
    <div className="container">
      <form onSubmit={(e) => fetchData(searchQuery, e)}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="show-card">
          {links.map((link, index) => (
            <div className="card">
              <a href={link.link} key={index}>
                <img src={link.img} alt={link.title} />
                <h3>{link.title}</h3>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
