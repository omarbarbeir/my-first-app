import { useState } from "react"
import { M_Easy } from "../Football_Pages/Who_Photo_info"
import { E_Easy } from "../Football_Pages/Who_Photo_info"
import { Link } from "react-router-dom"

let Who_Photo=()=>{

    let [infos , setInfos] = useState(false);
    let [playesNamesMeasy , setPlayersNamesMeasy] = useState(false)

    let disableAnswerMeasy=()=>{
        setPlayersNamesMeasy(false)
    }

    let playersMeasy=()=>{
        setPlayersNamesMeasy(true)
    }
    
    let handleMeasy =()=>{
        let mEasyrandom = M_Easy[Math.floor(Math.random() * M_Easy.length)];
        setInfos(mEasyrandom);
        setPlayersNamesMeasy(false)
    }

    let handleEeasy =()=>{
        let E_Easyrandom = E_Easy[Math.floor(Math.random() * E_Easy.length)];
        setInfos(E_Easyrandom);
        setPlayersNamesMeasy(false)
    }




    return(
        <div className=" bg-[#135570] h-screen overflow-y-auto lg:items-center"> 
        
        <div>
            {M_Easy && (
                <div>
                    <section className="flex justify-center items-center flex-col overflow-auto">
                        <div className="flex flex-col justify-center items-center gap-y-2">
                            <h1 className="w-[200px] h-[100px] bg-stone-300 text-center flex items-center text-[22px] m-2 rounded-md">{infos.team}</h1>
                            <img src={infos.photo} className="w-screen h-[350px] md:w-[730px] md:h-[450px] lg:w-[880px] lg:h-[550px]" alt="PHOTOS ARE HERE"></img>
                            <div className={`${playesNamesMeasy? " opacity-100 bg-red-500 p-3 text-center text-xl font-semibold":" opacity-0"}`}>{infos.players}</div>
                        </div>
                    </section>
                </div>
            )}
        </div>
        



            <div className="flex justify-evenly items-center w-full p-2">
                <button className="who_photos_buttonns " onClick={handleMeasy}>محلي</button>
                <button className="who_photos_buttonns " onClick={handleEeasy}>اوروبي</button>
            </div>

            <div className="flex justify-around items-center w-full mt-4">
                <button className="who_photos_buttonns bg-transparent shadow-lg shadow-white/20" onClick={playersMeasy}>عرض الاجابة</button>
                <button className="who_photos_buttonns bg-transparent shadow-lg shadow-white/20" onClick={disableAnswerMeasy}>اخفاء الاجابة</button>
            </div>

        

        
        
        
        
        
        </div>
    )
}
export default Who_Photo