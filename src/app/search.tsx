'use client';
import { useState } from 'react';
import Select from 'react-select';

interface IData {
  id: number;
  title: string;
}

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<IData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ search });
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );

    const data: { results: IData[]; page: number; total_pages: number } =
      await response.json();
    console.log('data is: ', data);

    if (data.results.length) {
      setSearchResult(data.results);
    }
    setSearch('');
    console.log({ searchResult });
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
        />
      </form>
      {searchResult.length ? (
        <div>
          <Select
            options={searchResult}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option.id.toString()}
            isMulti={true}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Search;
