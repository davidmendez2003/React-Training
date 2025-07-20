import { useState, useEffect } from "react";
import {useDebounce} from "react-use";
import Search from "./components/Search.jsx";
import MovieCard from "./components/MovieCard.jsx";

function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [searchItem, setSearchItem] = useState("");
  const [debounceSearchItem, setDebounceSearchItem] =useState('')
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(null);

  useDebounce(()=>setDebounceSearchItem(searchItem),1000,[searchItem])

  const fetchMovies = async (query="") => {
    try {
      const endpoint = query ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`:`${API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      const response = await fetch(endpoint);
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error fetching data");
    }
  };

  useEffect(() => {
    fetchMovies(debounceSearchItem);
  }, [debounceSearchItem]);

  return (
    <div className="min-h-screen w-full bg-[url('/bg.png')] bg-cover bg-center bg-fixed">
      <header className="flex flex-col items-center">
        <img src="/titleImg.png" alt="Movie Hub Logo" />
        <h1 className="text-4xl font-bold text-white font-dm mt-2">
          Discover, Watch, Repeat – Your Ultimate Movie Hub!
        </h1>
        <Search searchItem={searchItem} setSearchItem={setSearchItem} />
      </header>


      {errorMsg ? <section className="flex justify-center mt-6">
        <p className="text-red-500 font-semibold">{errorMsg}</p>
      </section>
                :
      <div className="mt-8 text-white flex flex-col justify-center items-center gap-4  text-center">
        <h2 className="text-2xl font-bold">All Movies</h2>
        <div className="grid grid-cols-4 gap-20 mb-8">
         {data && data.results && data.results.map((item) => (
                   <div key={item.id} className="flex flex-col justify-center items-center gap-2 bg-[#080419] w-[300px] min-h-[430px] border-[2px] border-[#cc0fc5] p-4 rounded-2xl "> 
                     <img className="h-[350px] w-[260px] rounded-xl" src= { item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : '/default.png'} />  
                     <h className="text-white font-bold">{item.title}</h>
                    
                     <div className="flex flex-row gap-2 ">
                      <img src="/star.gif" className="h-[17px] w-[17px] mt-[1px]"/>
                      <span>{item.vote_average ? item.vote_average.toFixed(1) : "N/A"}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400 text-transform: capitalize">{item.original_language ? item.original_language: "N/A"}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400">{item.release_date? item.release_date.split("-")[0]:"N/A"}</span>
                     </div>

                   </div>
          ))}
        </div>  
      </div>}

    </div>
  );
}

export default App;
