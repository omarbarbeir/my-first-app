import { RandomCats } from "../Random/RandomCats"
import { Link } from "react-router-dom"
let Ran = ()=>{
    return(

        <section className="flex bg-[#1d80cb] flex-col justify-center items-center overflow-x-hidden">
            <div>
                {RandomCats.map((e,index)=>{
                    return(
                    <>    
                    <div
                        className="relative w-[340px] overflow-x-hidden md:w-[500px] lg:w-[660px] h-[300px] mt-5 rounded-md">

                            <div class="p-6 bg-[#fed1b0] shadow-black shadow-sm border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 ">
                                {/* <h5 class="mb-2 text-2xl font-bold tracking-tight flex justify-center text-gray-900 dark:text-white">{e.title}</h5> */}
                                <p class="mb-3 text-black flex justify-center items-center text-xl font-bold">{e.desc}</p>
                                <Link className="flex justify-center items-center w-full bg-[#ee1c25] rounded-md shadow shadow-black h-[50px] text-2xl font-semibold hover:scale-105 transition-all" to={e.path}>إلعب</Link>
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
export default Ran