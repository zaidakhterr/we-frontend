import "./search.css";

import React, { useEffect, useState } from "react";
import algoliasearch from "algoliasearch";
import { Button, Drawer, Input } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const applicationId = "YSEWN881LL";
const apiKey = "21995acb873adc6d8f526d5aa3b1a37d";

const client = algoliasearch(applicationId, apiKey);
const index = client.initIndex("Questions");

export const Search = () => {
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const search = () => {
    if (query) {
      setLoading(true);
      index.search(query).then(res => {
        console.log(res);
        setResults(res.hits);
        setLoading(false);
      });
    } else {
      setResults([]);
    }
  };
  useEffect(() => {
    search();
  }, [query]);

  return (
    <div
      className="search"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <Input.Search
        style={{ zIndex: 2 }}
        placeholder="search for questions"
        onSearch={search}
        onChange={e => setQuery(e.target.value)}
        loading={loading}
      />
      {results.length > 0 && (
        <div className={`search-dropdown ${focus ? "focus" : ""}`}>
          <div className="search-list">
            {results.map(v => (
              <Link
                key={v.objectID}
                className="search-item"
                to={`/question/${v.objectID}`}
                onClick={() => setFocus(false)}
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

export const SearchMobile = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const search = () => {
    if (query) {
      setLoading(true);
      index.search(query).then(res => {
        console.log(res);
        setResults(res.hits);
        setLoading(false);
      });
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    search();
  }, [query]);

  return (
    <>
      <Button
        icon={<SearchOutlined />}
        type="text"
        onClick={() => setOpen(v => !v)}
      />
      <Drawer
        title="Search"
        placement="top"
        closable
        onClose={() => setOpen(false)}
        visible={open}
        height={450}
      >
        <Input.Search
          style={{ zIndex: 2 }}
          placeholder="search for questions"
          onSearch={search}
          onChange={e => setQuery(e.target.value)}
          loading={loading}
        />
        {results.length > 0 && (
          <div className="search-mobile">
            <div className="search-list">
              {results.map(v => (
                <Link
                  key={v.objectID}
                  className="search-item"
                  to={`/question/${v.objectID}`}
                  onClick={() => setOpen(false)}
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
          </div>
        )}
      </Drawer>
    </>
  );
};
