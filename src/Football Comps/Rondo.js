import { useState , useEffect } from "react"
import {outeer} from '../Football_Pages/Ronfo_info'
import {inner} from '../Football_Pages/Ronfo_info'
import {outTeams} from '../Football_Pages/Ronfo_info'
import {inTeams} from '../Football_Pages/Ronfo_info'
import { Link } from "react-router-dom";

const Rondo = () => {

    let [rondo , setRondo] = useState(null);
    let [rules , setRules] = useState(false);


    let handleClickE=()=>{
        let random = outeer[Math.floor(Math.random() * outeer.length)];
        setRondo(random);
    }
    let handleClickO=()=>{
        let randomm = inner[Math.floor(Math.random() * inner.length)];
        setRondo(randomm);
    }
    let handleClickT=()=>{
        let randommT = outTeams[Math.floor(Math.random() * outTeams.length)];
        setRondo(randommT);
    }
    let handleClickTI=()=>{
        let randommT = inTeams[Math.floor(Math.random() * inTeams.length)];
        setRondo(randommT);
    }
    
    let handleRule=()=>{
        setRules(true)
    }
    let CloseRule=()=>{
        setRules(false)
    }

    

  return (
    <div className="lg:flex lg:justify-around bg-[#135570] h-screen overflow-hidden lg:items-center">


            <div id="rule" className={`${rules ? " opacity-1 pointer-events-auto" : " opacity-0 pointer-events-none"} lg:p-3 rounded mx-auto justify-center flex text-xl text-center items-center bg-green-500 text-white w-[400px] md:w-[490px] md:p-3 p-6  font-semibold absolute top-[5%] left-[2%] sm:left-[20%] md:left-[22%] lg:left-[30%] z-20`}>
                <ul>
                  <li className="mb-3 flex justify-center items-center text-center text-red-950  text-xl">الصور يتم تحميلها في وقت من ثانية الي ثانيتين، لاتلعب حتي يتم التحميل بالكامل</li><hr></hr>
                  <li className="mb-3">يجب ايجاد اللاعب المشترك بين كل مربع في الصف و العمود</li><hr></hr>
                  <li className="mb-3">كما هو موضح من عليه الدور لكي يلعب في المستطيل اسفل الجدول</li><hr></hr>
                  <li className="mb-3">كل لاعب عليه الدور عندما يجاوب علي اللاعب يضغط علي المربع الذي اختاره لكي يتم تحديد اجابته</li><hr></hr>
                  <li className="mb-3">بعد انتهاء الدور يجب الضغط علي زرار اعادة المربعات لكي يتم اخلاء المربعات</li><hr></hr>
                  <li className="mb-3">اللاعب الفائز هو الذي يحصل علي ثلاث مربعات متتالية في اي اتجاه</li><hr></hr>
                  <li className="mb-3">اذا لم يحصل اي لاعب علي ثلاث مربعات يحتسب الفائز علي اساس اكثر لاعب حصل علي مربعات</li><hr></hr>
                  <li className="mb-3">ممنوع تكرار اسم اللاعب اكثر من مرة في </li>
                </ul>

                <button onClick={CloseRule} className=" absolute top-0 right-0 px-3 py-1 shadow-md text-[20px] font-semibold headfont rounded">X</button>
            </div>


        <div className="flex flex-col justify-center items-center py-10">
            {rondo && (
                <div className="flex flex-col text-right  justify-center items-center relative">
                    <img src={rondo.img} className="w-[370px] h-[440px] md:w-[580px] md:h-[520px] rounded-md"></img>
                    <h2 className=" absolute bottom-0 w-full bg-black h-[60px] rounded-md text-white flex justify-center items-center text-3xl font-semibold">{rondo.player}</h2>
                </div>
            )}
        </div>


        <div className="md:flex lg:flex-col lg:gap-y-16 md:flex-row flex gap-x-4 justify-center items-center">
            <button className='w-[100px]  p-1 bg-white/80 h-[70px] md:w-[180px] md:h-[80px] rounded-md text-[20px] md:text-[27px] font-semibold' onClick={handleClickE}>لاعب اوروبي</button>
            <button className='w-[100px]  p-1 bg-white/80 h-[70px] md:w-[180px] md:h-[80px] rounded-md text-[20px] md:text-[27px] font-semibold' onClick={handleClickO}>لاعب محلي</button>
            <button className='w-[100px]  p-1 bg-white/80 h-[70px] md:w-[180px] md:h-[80px] rounded-md text-[20px] md:text-[27px] font-semibold' onClick={handleClickT}>فريق اوروبي</button>
            <button className='w-[100px]  p-1 bg-white/80 h-[70px] md:w-[180px] md:h-[80px] rounded-md text-[20px] md:text-[27px] font-semibold' onClick={handleClickTI}>فريق محلي</button>
        </div>

        <section className=" flex justify-around items-center mt-10 gap-y-5 lg:px-5 lg:flex-col">
        
        <button onClick={handleRule} className='w-[110px] md:w-[180px] md:h-[80px] h-[70px] bg-yellow-300 rounded-md font-semibold text-xl'>شرح اللعبة</button>

        </section>

        <Link to="/Football"><button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">X</button></Link>
    </div>
  )
}

export default Rondo