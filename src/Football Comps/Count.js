import { useState , useEffect } from "react"
import {quests} from '../Football_Pages/Counnt_Quests'
import { Link } from "react-router-dom";

const Count = () => {

    let [count , setCount] = useState(null);
    let [rules , setRules] = useState(false);
    let [active, setActive] = useState(false);
    let [timer, setTimer] = useState(29);
    let [answer , setAnswer] = useState(false)


    let handleClick=()=>{
        let random = quests[Math.floor(Math.random() * quests.length)];
        setCount(random);
        setAnswer(false)
    }
    
    let showAnswer=()=>{
        setAnswer(true)
    }

    
    let handleRule=()=>{
        setRules(true)
    }
    let CloseRule=()=>{
        setRules(false)
    }

    useEffect(() => {
        let interval = null;
        if (active) {
          interval = setInterval(() => {
            setTimer(timer--);
            if (timer === -1) {
              clearInterval(interval);
            }
          }, 1000);
        }
        return () => clearInterval(interval);
      }, [active]);
    
      let toggleTimer = () => {
        setActive(!active);
      };
    
      let resetTimer = () => {
        setTimer(29);
        setActive(false);
      };
    

  return (
    <div className="lg:flex lg:justify-around bg-[#135570] h-screen overflow-hidden lg:items-center">

        <div className="flex flex-col justify-center items-center py-10">
            {count && (
                <div className="flex flex-col text-right  justify-center items-center relative">
                    <h1 className="flex justify-center bg-white/90 items-center h-[390px] w-[400px] md:w-[480px] md:h-[450px] lg:w-[520px] text-3xl p-3  rounded-md">{count.question}</h1>
                </div>
            )}
        </div>


        <div className="md:flex lg:flex-col lg:gap-y-16 md:flex-row flex gap-x-9 justify-center items-center">
            <button className='w-[140px]  p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold' onClick={handleClick}>عرض السؤال</button>
        </div>

        <section className=" flex justify-around items-center mt-10 gap-y-5 lg:px-5 lg:flex-col">

            <button
                className="bg-white/80 h-[40px] md:h-[60px] items-center font-semibold rounded-md w-[130px] md:w-[150px] flex justify-center"
                onClick={resetTimer}
            >
                إعادة الوقت 
            </button>
            
            <p className=" bg-red-500 h-[40px] md:w-[150px] md:h-[60px] font-bold rounded-md items-center flex justify-center pointer-events-none w-[130px]">00:{timer}</p>

            <button
                className="bg-white/80 h-[40px] md:w-[150px] md:h-[60px] items-center font-semibold rounded-md w-[130px] flex justify-center"
                onClick={toggleTimer}
            >
                {active ? "إيقاف" : "تشغيل"}
            </button>
        </section>

        <Link to="/Football"><button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">X</button></Link>
    </div>
  )
}

export default Count