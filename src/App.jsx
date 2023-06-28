import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (query, e) => {
    e.preventDefault();
    const url = `https://web-4ra5.onrender.com/proxy/${query}`;
    setIsLoading(true);

    axios
      .get(url)
      .then((response) => {
        setLinks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
            <a href={link.link} key={index}>
              <div className="card">
                <img src={link.img} alt={link.title} />
                <h3>{link.title}</h3>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
