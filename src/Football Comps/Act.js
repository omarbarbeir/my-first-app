import { useState , useEffect } from "react"
import {outeer} from '../Football_Pages/Act_info'
import {inner} from '../Football_Pages/Act_info'
import { Link } from "react-router-dom";

const Act = () => {

    let [act , setAct] = useState(null);
    let [rules , setRules] = useState(false);
    let [active, setActive] = useState(false);
    let [timer, setTimer] = useState(59);


    let handleClickE=()=>{
        let random = outeer[Math.floor(Math.random() * outeer.length)];
        setAct(random);
    }
    let handleClickO=()=>{
        let randomm = inner[Math.floor(Math.random() * inner.length)];
        setAct(randomm);
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
        setTimer(59);
        setActive(false);
      };
    

  return (
    <div className="lg:flex lg:justify-around bg-[#135570] h-screen overflow-hidden lg:items-center">

        <div className="flex flex-col justify-center items-center py-10">
            {act && (
                <div className="flex flex-col text-right  justify-center items-center relative">
                    <img src={act.img} className="w-[370px] h-[440px] md:w-[580px] md:h-[520px] rounded-md"></img>
                    <h2 className=" absolute bottom-0 w-full bg-white/60 h-[60px] rounded-md flex justify-center items-center text-3xl font-semibold">{act.name}</h2>
                </div>
            )}
        </div>


        <div className="md:flex lg:flex-col lg:gap-y-16 md:flex-row flex gap-x-9 justify-center items-center">
            <button className='w-[140px]  p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold' onClick={handleClickE}>لاعب اوروبي</button>
            <button className='w-[140px]  p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold' onClick={handleClickO}>لاعب محلي</button>
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

export default Act