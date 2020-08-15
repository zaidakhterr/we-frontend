import "./search.css";

import React, { useState } from "react";
import algoliasearch from "algoliasearch";
import { Input } from "antd";
import { Link } from "react-router-dom";

const Search = () => {
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const client = algoliasearch(
    "YSEWN881LL",
    "21995acb873adc6d8f526d5aa3b1a37d"
  );
  const index = client.initIndex("Questions");

  const search = () => {
    if (query) {
      setLoading(true);
      index.search(query).then(res => {
        console.log(res);
        setResults(res.hits);
        setLoading(false);
      });
    }
  };

  return (
    <div
      className="search"
      onFocusCapture={() => setFocus(true)}
      onBlurCapture={() => {
        setTimeout(() => {
          setFocus(false);
        }, 500);
      }}
    >
      <Input.Search
        placeholder="search for questions"
        onSearch={search}
        onChange={e => setQuery(e.target.value)}
        loading={loading}
      />
      {focus && results.length > 0 && (
        <div className="search-dropdown">
          <div className="search-list">
            {results.map(v => (
              <Link
                key={v.objectID}
                className="search-item"
                to={`/question/${v.objectID}`}
              >
                <h4>{v.question}</h4>
                <p>{v.description.trim().slice(0, 50) + " ..."}</p>
                <div className="tags">
                  {v.tags.map(tag => (
                    <span>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="search-count">
            {results.length} {results.length === 1 ? "result" : "results"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
