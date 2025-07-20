import React from "react";

const MovieCard =({item: title, vote_average, poster_path, release_date, original_language})=>{
    return(
      <div key={item.id} className="flex flex-col w-[330px] min-h-[430px] bg-gray-100 rounded-lg mt-2 ">   
        <p className="text-black">{title}</p>
      </div>
    )
}
export default MovieCard