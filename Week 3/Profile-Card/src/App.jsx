import profile from './data.json'; 
import { useState } from 'react';

export default function App() {

  const [toggle, setToggle] = useState(0);
  function handleToggle() {
    setToggle((toggle) => (toggle === 0 ? 1 : 0));
  }

  return (

          <div className="flex justify-center pt-[250px]">
            <div className="flex flex-col w-[395px] min-h-[470px] items-center bg-blue-950 shadow-2xl rounded-xl">
                <img src={profile.photo} alt="Profile-Image" className="w-[150px] h-[150px] mt-[50px] rounded-full object-cover"/>
                <span className="text-cyan-300 text-xl font-bold mt-[20px]">{profile.name}</span>
                <span className='text-medium text-white mt-[15px] font-bold'>{profile.role}</span>
                <span className="text-gray-200 text-sm mt-[15px] font-normal">" {profile.bio} "</span>
                <div className="w-4/5 h-0.5 bg-gray-300 my-4" />

                <button onClick={handleToggle} className="mt-4 px-4 my-[20px] py-2 bg-cyan-400 text-blue-950 font-semibold rounded hover:bg-cyan-300">
                    {toggle === 0 ? "Show Contact Info" : "Show Less"}
                </button>
                {toggle === 1 && (
                    <div className="w-full text-base font-base text-gray-100">
                      <p className="flex flex-row mb-[5px] gap-[5px] font-base ml-[160px]"><img src='/images/location.png' className="h-6 w-6" />{profile.location}</p>
                      <p className="flex flex-row mb-[5px] gap-[10px] ml-[100px] mb-[19px]"><img src="/images/mail.gif" className="h-6 w-6"/>{profile.email}</p>
                    </div>
                )}
            </div>
          </div>

  );
}