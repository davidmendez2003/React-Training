import { useState } from "react";
export default App;

function App() {
  const images = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/4.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= images.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(nextIndex);
    }
  };
  const handlePrev = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(prevIndex);
    }
  };

  return (
<div className="relative w-fit mx-auto mt-[300px]">
  <img src={images[currentIndex]} className="w-[1080px] h-64 object-cover"/>

  <button onClick={handlePrev} className="absolute left-[-50px] top-1/2 p-2 transform -translate-y-1/2 bg-transparent border-none hover:cursor-pointer">
    <img src="/images/prev.png" alt="Previous" />
  </button>

  <button onClick={handleNext} className="absolute right-[-50px] top-1/2 p-2 transform -translate-y-1/2 bg-transparent border-none hover:cursor-pointer">
    <img src="/images/next.png" alt="Next" />
  </button>
</div>
  );
}