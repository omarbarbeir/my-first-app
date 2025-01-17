import { useState , useEffect } from "react"
import {Masal} from '../Pages/AmsalEX'
import { Link } from "react-router-dom";

const Amsal = () => {

    let [masal , setMasal] = useState(null);
    let[rules , setRules] = useState(false);
    let [active, setActive] = useState(false);
    let [timer, setTimer] = useState(59);


    let handleClick=()=>{
        let random = Masal[Math.floor(Math.random() * Masal.length)];
        setMasal(random)
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
    <div className="lg:flex lg:justify-around bg-stone-400 h-screen overflow-hidden lg:items-center">

        <div className="flex flex-col justify-center items-center py-10">
            {masal && (
                <div className="flex justify-center items-center relative">
                    <h1 className="flex justify-center bg-white/90 items-center h-[390px] w-[400px] md:w-[480px] md:h-[450px] lg:w-[520px] text-3xl rounded-md">{masal.ms}</h1>
                </div>
            )}
        </div>


        <div className="md:flex md:flex-row md:gap-x-9 flex justify-center items-center">
            <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={handleClick}>عرض المثل</button>
        </div>

        <section className=" flex justify-around items-center mt-10 gap-y-5 lg:flex-col">

            <button
                className="bg-white/80 h-[40px] md:h-[60px] items-center font-semibold rounded-md w-[130px] md:w-[150px] flex justify-center"
                onClick={resetTimer}
            >
                إعادة الوقت 
            </button>
            
            <p className=" bg-red-400 h-[40px] md:w-[150px] md:h-[60px] font-bold rounded-md items-center flex justify-center pointer-events-none w-[130px]">00:{timer}</p>

            <button
                className="bg-white/80 h-[40px] md:w-[150px] md:h-[60px] items-center font-semibold rounded-md w-[130px] flex justify-center"
                onClick={toggleTimer}
            >
                {active ? "إيقاف" : "تشغيل"}
            </button>
        </section>

        <Link to="/Cinema"><button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">X</button></Link>
    </div>
  )
}

export default Amsal