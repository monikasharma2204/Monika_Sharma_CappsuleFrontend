import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./Cappsule/SearchBar";
import Product from "./Cappsule/Product";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState();

  useEffect(() => { fetchDetails() }, [])

  const fetchDetails = async (e) => {
    const response = await fetch(
      `https://backend.cappsule.co.in/api/v1/new_search?q=${searchText}&pharmacyIds=1,2,3`
    );
    const data = await response.json();
    setResults(data.data);
  };

  return (
    <div className="App">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        fetchDetails={fetchDetails}
      />
      {results && results.saltSuggestions && results.saltSuggestions.length > 0 ? (
        <Product data={results} />
      ) : (
        <p className="text-center mt-4">
          “Find medicines with amazing discount“
        </p>
      )}
    </div>
  );
}

export default App;
