import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { passE} from '../Football_Pages/Test_info';


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function Test() {
    const [shuffledData, setShuffledData] = useState([]);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [hintIndex, setHintIndex] = useState(0);
    const [showPlayer, setShowPlayer] = useState(false);
  
    useEffect(() => {
      const shuffled = shuffleArray(passE.map(player => ({
        player: player.player,
        hints: Object.values(player.hints)
      })));
      setShuffledData(shuffled);
    }, []);
  
    useEffect(() => {
      setHintIndex(0);
      setShowPlayer(false);
    }, [playerIndex]);
  
    const handleNextPlayerClick = () => {
      setPlayerIndex((prevIndex) => (prevIndex + 1) % shuffledData.length);
    };
  
    const handleShowHintClick = () => {
      if (hintIndex < shuffledData[playerIndex].hints.length - 1) {
        setHintIndex(hintIndex + 1);
      }
    };
  
    const handlePlayerClick = () => {
      setShowPlayer(!showPlayer);
    };
  
    return (
      <div className='p-5 bg-[#135570] h-screen overflow-hidden  lg:flex lg:flex-row lg:justify-between lg:items-center'>
        
        <div className='bg-white h-[350px] md:w-[500px] lg:w-[570px] mx-auto rounded-md flex flex-col overflow-y-auto'>
          {shuffledData[playerIndex]?.hints.slice(0, hintIndex + 1).map((hint, index) => (
            <p key={index} className='p-2 text-xl text-right flex items-start justify-end'>{hint}</p>
          ))}
        </div>
        {showPlayer && <p className='flex justify-center items-center mt-2 w-[220px]  h-[60px] p-2 font-semibold text-2xl bg-white/80 mx-auto rounded-md'>{shuffledData[playerIndex]?.player}</p>}

        <section className='flex justify-around items-center mt-5 text-xl lg:flex-col lg:gap-y-6 font-semibold'>
            <button className='bg-yellow-200 p-2 lg:w-[300px] lg:h-[70px] lg:text-2xl rounded-md' onClick={handleShowHintClick}>عرض المعلومة</button>
            <button className='bg-red-500 p-2 lg:w-[300px] lg:h-[70px] lg:text-2xl rounded-md' onClick={handlePlayerClick}>
            {showPlayer ? "إخفاء اسم اللاعب" : "اسم اللاعب"}
            </button>
            <button className='bg-yellow-200 p-2 lg:w-[300px] lg:h-[70px] lg:text-2xl rounded-md' onClick={handleNextPlayerClick}>اللاعب التالي</button>
        </section>
        <Link to="/Football"><button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">X</button></Link>

      </div>
    );
  }
  
  export default Test;