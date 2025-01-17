import { useState , useEffect } from "react"
import {WhoE} from '../Football_Pages/Who_iam_info'
import { Link } from "react-router-dom";

const Who = () => {
    const [Who, setKora] = useState(null);
    const [rules, setRules] = useState(false);
    const [active, setActive] = useState(false);
    const [timer, setTimer] = useState(29);
    const [answer, setAnswer] = useState(false);
    const [hintIndex, setHintIndex] = useState(0);
  
    const handleClickE = () => {
      let random = WhoE[Math.floor(Math.random() * WhoE.length)];
      setKora(random);
      setAnswer(false);
      setHintIndex(0); // Reset hint index when a new player is selected
    };
  
  
    const showAnswer = () => {
      setAnswer(true);
    };

  
    const handleShowHintClick = () => {
      if (Who && hintIndex < Who.hints.length - 1) {
        setHintIndex(hintIndex + 1);
      }
    };
  
    useEffect(() => {
      let interval = null;
      if (active) {
        interval = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer === 0) {
              clearInterval(interval);
              return 0;
            }
            return prevTimer - 1;
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [active]);
  
    const toggleTimer = () => {
      setActive(!active);
    };
  
    const resetTimer = () => {
      setTimer(29);
      setActive(false);
    };
  
    return (
      <div className="lg:flex lg:justify-around bg-[#135570] h-screen overflow-hidden lg:items-center">
        {/* Photo and Hints Section */}
        <div className="flex flex-col justify-center items-center py-10">
          {Who && (
            <div className="flex flex-col text-right justify-center items-center relative">
              {/* Display Photo */}
              <img
                src={Who.img}
                className="w-[550px] md:w-[650px] lg:w-[670px] h-[400px] md:h-[450px] lg:h-[500px]"
                alt="Player"
              />
  
              {/* Display Hints in Separate <h1> Tags */}
              <div className="bg-white h-[350px] md:w-[600px] lg:w-[570px] mx-auto rounded-md flex flex-col items-center overflow-y-auto p-4 mt-4">
                {Who.hints.slice(0, hintIndex + 1).map((hint, index) => (
                  <h1 key={index} className="text-xl text-center font-bold mb-2">
                    {hint}
                  </h1>
                ))}
              </div>
  
              {/* Display Answer */}
              <h2
                className={`${
                  answer ? "opacity-100" : "opacity-0"
                } bg-stone-300 rounded-md p-7 mt-2 h-[70px] flex justify-center items-center text-2xl font-bold`}
              >
                {Who.player}
              </h2>
            </div>
          )}
        </div>
  
        {/* Buttons Section */}
        <div className="md:flex lg:flex-col lg:gap-y-16 md:flex-row flex gap-x-9 justify-center items-center">
          <button
            className="w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold"
            onClick={handleClickE}
          >
            اوروبي
          </button>

          <button
            className="w-[140px] p-1 bg-yellow-300 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold"
            onClick={showAnswer}
          >
            الاجابة
          </button>
          <button
            className="w-[140px] p-1 bg-yellow-300 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold"
            onClick={handleShowHintClick}
          >
            عرض المعلومة
          </button>
        </div>
  
        {/* Timer Section */}
        <section className="flex justify-around items-center mt-10 gap-y-5 lg:px-5 lg:flex-col">
          <button
            className="bg-white/80 h-[40px] md:h-[60px] items-center font-semibold rounded-md w-[130px] md:w-[150px] flex justify-center"
            onClick={resetTimer}
          >
            إعادة الوقت
          </button>
  
          <p className="bg-red-400 h-[40px] md:w-[150px] md:h-[60px] font-bold rounded-md items-center flex justify-center pointer-events-none w-[130px]">
            00:{timer}
          </p>
  
          <button
            className="bg-white/80 h-[40px] md:w-[150px] md:h-[60px] items-center font-semibold rounded-md w-[130px] flex justify-center"
            onClick={toggleTimer}
          >
            {active ? "إيقاف" : "تشغيل"}
          </button>
        </section>
  
        {/* Close Button */}
        <Link to="/Football">
          <button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">
            X
          </button>
        </Link>
      </div>
    );
  };
  

export default Who