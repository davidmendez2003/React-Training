import { useState, useEffect } from "react";
export default function App(){

  const [data, setData] = useState([]);
  useEffect(()=>{
      fetch('/data.json')
      .then(response=>response.json())
      .then(setData);
  },[]);

  return(
  <div className="flex justify-center">
    <div className="grid grid-cols-3 gap-16 pt-24">
      {data.map(item=>(
        <div key={item.id} className="flex flex-col items-center w-[320px] h-[390px] border-[1.8px] border-black p-6 rounded-xl shadow-2xl">
         <span><img className="w-[330px] h-[150px] object-cover rounded-xl" src={item.image}/></span>
         <h className="font-semibold mt-4 text-lg">{item.name}</h>
         <p className="font-normal text-gray-900 mt-6 text-sm">{item.description}</p>
         <span className="mt-4">{item.rating}</span>
        </div>
      ))}

    </div>
  </div>
    );
}