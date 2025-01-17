import { mirror } from "./Casino_info"
import { place } from "./Places"
import { Caps } from "./Capitals"
import { Flags } from "./Flags"
import { useState } from "react"
import { Link } from "react-router-dom"

let Casino =()=>{

    let[word ,setWord] = useState(false)
    let[placee ,setplacee] = useState(false)
    let[Capitals ,setCapitals] = useState(false)
    let[Flagss ,setFlagss] = useState(false)
    let [isFlagVisible , setIsFlageVisible] = useState(false)
    let [isFlagAnswerVisible, setIsFlagAnswerVisible] = useState(false)

    let handleWord=()=>{
        let random = mirror[Math.floor(Math.random() * mirror.length)];
        setWord(random)
        setplacee(false)
        setCapitals(false)
        setIsFlageVisible(false)
        setIsFlagAnswerVisible(false)
    }
    let handlePlacee=()=>{
        let random = place[Math.floor(Math.random() * place.length)];
        setplacee(random)
        setWord(false)
        setCapitals(false)
        setIsFlageVisible(false)
        setIsFlagAnswerVisible(false)

    }
    let handleCapitals=()=>{
        let random = Caps[Math.floor(Math.random() * Caps.length)];
        setCapitals(random)
        setWord(false)
        setplacee(false)
        setIsFlageVisible(false)
        setIsFlagAnswerVisible(false)

    }
    let handleFlags=()=>{
        let random = Flags[Math.floor(Math.random() * Flags.length)];
        setFlagss(random)
        setCapitals(false)
        setWord(false)
        setplacee(false)
        setIsFlageVisible(true)
        setIsFlagAnswerVisible(false)

    }
    let ShowFlagAnswer=()=>{
        setIsFlagAnswerVisible(true)
    }
    let HideFlagAnswer=()=>{
        setIsFlagAnswerVisible(false)
    }


    return(
        <div className="w-full h-screen overflow-auto bg-[#135570]">
            
            <div>
                {{placee,word,Capitals , Flagss} && (
                    <section className="flex justify-center items-center p-4">
                        <div className="w-screen h-[350px] bg-white/70  shadow-white/30 shadow-md rounded-md  flex flex-col gap-y-3 justify-center items-center">
                            <img className={`${isFlagVisible? "h-[265px] md:w-[600px] md:h-[270px] md:mt-5 rounded-md ":"pointer-events-none hidden"} `} src={Flagss.flag}></img>
                            <aside className="flex justify-around items-center gap-x-3">
                                <h1 className={`${isFlagAnswerVisible? "text-2xl md:text-3xl lg:text-4xl flex flex-row-reverse gap-x-4 font-bold w-[70%] justify-center items-center" : "hidden pointer-events-none" }`}>{Flagss.country}</h1>
                                <button onClick={ShowFlagAnswer} className={`${isFlagVisible?"bg-white/30 shadow shadow-black/60 rounded-lg w-[150px] p-1 text-2xl font-semibold":"hidden pointer-events-none"}`}>الإجابة</button>
                                <button onClick={HideFlagAnswer} className={`${isFlagVisible?"bg-white/30 shadow shadow-black/60 rounded-lg w-[150px] p-1 text-2xl font-semibold":"hidden pointer-events-none"}`}>إخفاء</button>
                            </aside>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl flex flex-row-reverse gap-x-4 font-bold"> {word.wordd}{placee.thig}{Capitals.country}</h1>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl flex flex-row-reverse gap-x-4 font-bold"> {word.mirrorWord}{placee.place}{Capitals.capital}</h1>
                            
                        </div>
                    </section>
                )}
            </div>


            <section className="flex justify-center items-center flex-col gap-y-3">
                    <button className=" bg-emerald-500 w-[250px] h-[50px]  shadow-white/30 shadow-md rounded-md p- text-2xl flex justify-center items-center font-semibold" onClick={handleWord}>الكلمات المعكوسة</button>
                    <button className=" bg-emerald-500 w-[250px] h-[50px]  shadow-white/30 shadow-md rounded-md p- text-2xl flex justify-center items-center font-semibold" onClick={handlePlacee}>اين يوجد</button>
                    <button className=" bg-emerald-500 w-[250px] h-[50px]  shadow-white/30 shadow-md rounded-md p- text-2xl flex justify-center items-center font-semibold" onClick={handleCapitals}>عواصم البلاد</button>
                    <button className=" bg-emerald-500 w-[250px] h-[50px]  shadow-white/30 shadow-md rounded-md p- text-2xl flex justify-center items-center font-semibold" onClick={handleFlags}>اعلام البلاد</button>
                    <button className=" bg-emerald-500 w-[250px] h-[50px]  shadow-white/30 shadow-md rounded-md p- text-2xl flex justify-center items-center font-semibold" onClick={handlePlacee}>اوصف مهنة</button>
                    <button className=" bg-emerald-500 w-[250px] h-[50px]  shadow-white/30 shadow-md rounded-md p- text-2xl flex justify-center items-center font-semibold" onClick={handlePlacee}>اوصف اكلة</button>
            </section>

            <Link to="/" className=" absolute top-0 right-0 bg-white/40 border shadow p-2 font-semibold text-2xl rounded">X</Link>


        </div>
    )
}
export default Casino