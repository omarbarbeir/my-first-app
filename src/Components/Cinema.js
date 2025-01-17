import { info } from "../Pages/CinemaCats"
import { Link } from "react-router-dom"
let Cinema = ()=>{
    return(

        <section className="flex flex-col justify-center items-center overflow-x-hidden bg-[#1d80cb] h-screen">
            <div>
                {info.map((e,index)=>{
                    return(
                    <>    
                    <div className="relative w-[340px] overflow-hidden md:w-[500px] lg:w-[660px] h-[300px] mt-5 rounded-md">


                        <div
                            className="relative w-[340px] overflow-x-hidden md:w-[500px] lg:w-[660px] h-[300px] mt-5 rounded-md">

                            <div class="p-6 bg-stone-300 shadow-black  border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight flex justify-center text-gray-900 dark:text-white">{e.title}</h5>
                                <p class="mb-3 font-bold text-gray-700 dark:text-gray-400 flex justify-center items-center text-xl">{e.desc}</p>
                                <Link className="flex justify-center items-center w-full bg-zinc-300 rounded-md shadow shadow-black h-[50px] text-2xl font-semibold hover:scale-105 hover:bg-stone-300 transition-all" to={e.path}>إلعب</Link>
                            </div>

                            
                         </div>
                            
                    </div>
                    <Link to="/" className=" absolute top-0 right-0 text-2xl bg-blue-300 p-[9px] rounded-md">X</Link>
                    </>    
                    )
                })}
            </div>
        </section>
    )
}
export default Cinema