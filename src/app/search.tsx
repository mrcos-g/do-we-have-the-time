'use client';
import { useState } from 'react';
import Select from 'react-select';

import { ISearchResults, IResponse } from '../types/movies';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<ISearchResults[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleMovieSelect = (option: readonly ISearchResults[]) => {
    let currentMoviesSelected = option.map((opt) => {
      return opt.id.toString();
    });

    setSelectedMovies(currentMoviesSelected);
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );

    const data: IResponse = await response.json();

    if (data.results.length) {
      setSearchResult(data.results);
    }
    setSearch('');
  };

  const handleDropdownSubmit = async () => {
    try {
      const test = await Promise.all(
        selectedMovies.map(async (movie) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
              },
            }
          );

          return await response.json();
        })
      );
      console.log(test);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleInputChange}
        />
      </form>
      {searchResult.length ? (
        <div>
          <Select
            options={searchResult}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option.id.toString()}
            isMulti={true}
            isOptionDisabled={() => selectedMovies.length >= 6}
            onChange={handleMovieSelect}
          />
          <button onClick={handleDropdownSubmit}>submit</button>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
