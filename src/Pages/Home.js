import Header from "../Components/Header"
import { data } from "./Cats"
import { Link } from "react-router-dom"

let Home =()=>{
    return(
        <>
            
                <div className="flex items-center  flex-col p-3 lg:flex-row overflow-x-hidden justify-center bg-[#5667]  md:justify-evenly flex-wrap">
                    
                    {data.map((e,index)=>{
                        return(
                            <div class=" bg-white border border-gray-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center flex-col h-[360px] w-[360px] md:w-[470px] md:h-[460px] lg:w-[550px] lg:h-[560px] mt-5 transition-all">
                                    <img class="rounded-t-lg w-full h-full" src={e.img} alt="" />
                                <div class="p-2  flex justify-center items-center flex-col text-xl">
                                        <h5 class="mb-2 text-3xl md:text-5xl lg:mb-5 font-bold tracking-tight text-gray-900 dark:text-white">{e.title1}</h5>
                                        <h5 class="mb-2 text-3xl md:text-5xl lg:mb-5 font-bold tracking-tight text-gray-900 dark:text-white">{e.title2}</h5>
                                    <Link  className="w-[300px] h-[50px] rounded-md bg-[#e97156] hover:bg-[#D6563A] transition-all text-2xl font-bold flex justify-center items-center" to={e.path}><button>ابدأ</button></Link>
                                    
                                </div>
                            </div>
                        )
                    })}

                    

                </div>
                
            
        </>
    )
}
export default Home