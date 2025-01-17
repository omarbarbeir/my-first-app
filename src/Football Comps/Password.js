import { useState , useEffect } from "react"
import {Europ} from '../Football_Pages/Password_info'
import {Other} from '../Football_Pages/Password_info'
import { Link } from "react-router-dom";

const Password = () => {

    let [pass , setPass] = useState(null);
    let [rules , setRules] = useState(false);
    let [active, setActive] = useState(false);
    let [timer, setTimer] = useState(29);
    // let [answer , setAnswer] = useState(false)


    let handleClickE=()=>{
        let random = Europ[Math.floor(Math.random() * Europ.length)];
        setPass(random);
        // setAnswer(false)
    }
    let handleClickO=()=>{
        let randomm = Other[Math.floor(Math.random() * Other.length)];
        setPass(randomm);
        // setAnswer(false)
    }
    
    // let showAnswer=()=>{
    //     setAnswer(true)
    // }

    
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

        
            <div id="rule" className={`${rules ? " opacity-1 pointer-events-auto" : " opacity-0 pointer-events-none"} lg:p-3 rounded mx-auto justify-center flex  text-xl text-center items-center bg-green-500 text-white w-[400px] md:w-[490px] md:p-3 p-6  font-semibold absolute top-[12%] left-[2%] sm:left-[20%] md:left-[22%] lg:left-[30%] z-20`}>
                <ul>
                  <li className="mb-3">يقوم لاعب من كل فريق لمعرفة اللاعب</li><hr></hr>
                  <li className="mb-3">يحاول كل لاعب ان يوضح اللاعب لزميله</li><hr></hr>
                  <li className="mb-3">يجب عدم ذكر اي اسم حتي اذا  كان اسم شخص ليس له علاقة بالكرة</li><hr></hr>
                  <li className="mb-3">عدم ذكر اي ارقام او اسماء اندية او منتخبات</li><hr></hr>
                  <li className="mb-3">اذا كنت تريد قول اسم فريق او منتخب اذكر اسم شهرته علي سبل المثال: ليفربول  تقول ريدز ، تشيلسي تقول بلوز ، اسبانيا تقول ماتادور وهكذا</li><hr></hr>
                  <li className="mb-3">عدم استخدام اليد او عمل اي حركات لزميلك</li>
                </ul>

                <button onClick={CloseRule} className=" absolute top-0 right-0 px-3 py-1 shadow-md text-[20px] font-semibold headfont rounded">X</button>
              </div>


        <div className="flex flex-col justify-center items-center py-10">
            {pass && (
                <div className="flex flex-col text-right  justify-center items-center relative">
                    <img src={pass.img} className="w-[370px] h-[470px] md:w-[580px] md:h-[520px] rounded-md"></img>
                    <h2 className=" absolute bottom-0 w-full bg-white/60 h-[60px] rounded-md flex justify-center items-center text-3xl font-semibold">{pass.name}</h2>
                </div>
            )}
        </div>


        <div className="md:flex lg:flex-col lg:gap-y-16 md:flex-row flex gap-x-4 justify-center items-center">
            <button className='w-[120px]  p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold' onClick={handleClickE}>لاعب اوروبي</button>
            <button className='w-[120px]  p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold' onClick={handleClickO}>لاعب محلي</button>
            <button className='w-[120px]  p-1 bg-yellow-200 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold' onClick={handleRule}>شررح اللعبة</button>
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

export default Password