import Search from './search';
export default function Home() {
  return (
    <div className="flex h-full items-center justify-around">
      <div>
        <Search />
      </div>
      <div>diplay data</div>
    </div>
  );
}

// https://image.tmdb.org/t/p/original/[poster_path] - use with poster path
