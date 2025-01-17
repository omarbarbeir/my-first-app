import { useState , useEffect } from "react"
import {jokes} from '../Pages/AFJOk'
import { Link } from "react-router-dom";

const AflamJokes = () => {

    let [jok , setJok] = useState(null);
    let [active, setActive] = useState(false);
    let [timer, setTimer] = useState(14);
    let [answer , setAnswer] = useState(false)


    let handleClick=()=>{
        let random = jokes[Math.floor(Math.random() * jokes.length)];
        setJok(random);
        setAnswer(false)
    }

    let showAnswer = () =>{
        setAnswer(true)
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
        setTimer(14);
        setActive(false);
      };
    

  return (
    <div className="lg:flex lg:justify-around bg-stone-400 h-screen overflow-hidden lg:items-center">


        <div className="flex flex-col justify-center items-center py-10">
            {jok && (
                <div className="w-[400px] mt-0 relative h-[390px] md:w-[480px] md:h-[450px] lg:w-[520px]">
                    <h1 className="flex text-center justify-center bg-white/90 items-center h-[390px] w-[400px] md:w-[480px] md:h-[450px] lg:w-[520px] text-3xl rounded-md">{jok.joke}</h1>
                    <h2 className={`${answer ? " opacity-100 " : "opacity-0"} bg-stone-300  rounded-md mt-2 h-[60px] flex justify-center items-center text-2xl font-bold`}>{jok.answer}</h2>
                </div>
            )}
        </div>


        <div className="md:flex gap-x-5 md:flex-row md:gap-x-10 mt-14 flex justify-center items-center">
            <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={handleClick}>عرض الافيه</button>
            <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={showAnswer}>الاجابة</button>
        </div>

        <section className=" flex justify-around items-center mt-10 gap-y-5 lg:flex-col">

            <button
                className="bg-white/80 h-[40px] items-center font-semibold rounded-md w-[130px] flex justify-center"
                onClick={resetTimer}
            >
                إعادة الوقت 
            </button>
            
            <p className=" bg-red-400 h-[40px] font-bold rounded-md items-center flex justify-center pointer-events-none w-[130px]">00:{timer}</p>

            <button
                className="bg-white/80 h-[40px] items-center font-semibold rounded-md w-[130px] flex justify-center"
                onClick={toggleTimer}
            >
                {active ? "إيقاف" : "تشغيل"}
            </button>
        </section>

        <Link to="/Cinema"><button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">X</button></Link>
    </div>
  )
}

export default AflamJokes