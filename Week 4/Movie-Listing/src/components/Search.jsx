

const Search =({searchItem, setSearchItem})=>{
    return(
        <div className="flex justify-center mt-[50px]">
            <input type="text" placeholder="Search for movies" value={searchItem} onChange={(e)=> setSearchItem(e.target.value)} className=" w-[600px] h-12 p-4 text-gray-200 placeholder-gray-100 rounded-xl border-solid border-[#cc0fc5] border-2 bg-[#2a0645]"/>
        </div>
    )
}
export default Search
