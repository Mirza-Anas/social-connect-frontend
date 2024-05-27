"use client";
import { useState, useContext } from "react";
import { UserContext } from "../context";
import axios from "axios";
import People from "./cards/PeopleComp";

const Search = () => {
    const [state] = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    const searchQuery = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/search-user/${query}`);
            setResult(data);
            setQuery("");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <form onSubmit={searchQuery}>
                <input
                    type="search"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setResult([]);
                    }}
                    placeholder="Type Username to Search"
                    className="sidebar-search-input"
                />
                <button type="submit" className="sidebar-search-button">
                    Search
                </button>
            </form>
            {result && <People people={result} />}
        </>
    );
};

export default Search;
