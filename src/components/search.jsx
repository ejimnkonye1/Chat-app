import React,{useState} from "react";
import { CiSearch } from "react-icons/ci";

const Search = ({searchQuery, onSearchChange}) => {
    
    const handleSearchChange = (e) => {
        onSearchChange(e.target.value)
        }
    return(
        <div className="input-group rounded mb-3">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="input-group-text border-0" id="search-addon">
        <CiSearch />

        </span>
      </div>
    )
}

export default Search;

export const Searchs = () => {
  return(
    <div className="input-group rounded mb-3">
    <input
      type="search"
      className="form-control rounded"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="search-addon"
      
    />
    <span className="input-group-text border-0" id="search-addon">
    <CiSearch />

    </span>
  </div>
  )
}