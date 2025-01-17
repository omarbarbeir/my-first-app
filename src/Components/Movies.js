import { useState , useEffect } from "react"
import {movesData} from '../Pages/MoviesInfo'
import { movs } from "../Pages/MoviesBefore2000";
import { Mos } from "../Pages/MosalsalatAfter";
import { Link } from "react-router-dom";
import "./Movies.css"

const Movies = () => {
    const [move, setMove] = useState(null);
    const [rules, setRules] = useState(false);
    const [active, setActive] = useState(false);
    const [timer, setTimer] = useState(59);
    const [players, setPlayers] = useState([]); // State to track player inputs

    const handleClick = () => {
        let random = movesData[Math.floor(Math.random() * movesData.length)];
        setMove(random);
    };

    const handleMovs = () => {
        let random = movs[Math.floor(Math.random() * movs.length)];
        setMove(random);
    };

    const handleMosafter = () => {
        let random = Mos[Math.floor(Math.random() * Mos.length)];
        setMove(random);
    };

    const handleRule = () => {
        setRules(true);
    };

    const CloseRule = () => {
        setRules(false);
    };

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

    const toggleTimer = () => {
        setActive(!active);
    };

    const resetTimer = () => {
        setTimer(59);
        setActive(false);
    };

    // Function to add a new player input pair
    const addPlayerInput = () => {
        setPlayers([...players, { id: Date.now(), name: '', number: '' }]); // Use Date.now() for unique IDs
    };

    // Function to handle changes in the player name input
    const handleNameChange = (id, value) => {
        const updatedPlayers = players.map(player =>
            player.id === id ? { ...player, name: value } : player
        );
        setPlayers(updatedPlayers);
    };

    // Function to handle changes in the number input
    const handleNumberChange = (id, value) => {
        const updatedPlayers = players.map(player =>
            player.id === id ? { ...player, number: value } : player
        );
        setPlayers(updatedPlayers);
    };

    // Function to remove a player input pair
    const removePlayerInput = (id) => {
        const updatedPlayers = players.filter(player => player.id !== id);
        setPlayers(updatedPlayers);
    };

    return (
        <div className="lg:flex lg:justify-around bg-[#135570] h-screen overflow-auto lg:items-center">
            <div id="rule" className={`${rules ? " opacity-1 pointer-events-auto" : " opacity-0 pointer-events-none"} lg:p-3 rounded mx-auto justify-center items-center bg-emerald-600 text-white w-[400px] md:w-[490px] md:p-3 p-6  font-semibold absolute top-[30%] left-[2%] sm:left-[20%] md:left-[22%] lg:left-[30%] z-20`}>
                <ul>
                    <li className="mb-3 flex justify-center items-center p-3 font-semibold text-2xl text-right">يجب تمثيل الفيلم خلال دقيقة بدون كلام</li>
                </ul>
                <button onClick={CloseRule} className=" absolute top-0 right-0 px-3 py-1 shadow-md text-[20px] font-semibold headfont rounded">X</button>
            </div>

            <div className="flex flex-col justify-center items-center py-10">
                {move && (
                    <div className="w-[400px] mt-0 relative h-[390px] md:w-[480px] md:h-[450px] lg:w-[520px]">
                        <img className="w-full h-full rounded-md" src={move.image} loading="lazy"></img>
                        <h1 className=" absolute bottom-0 w-full py-2 font font-semibold text-[27px] md:text-[32px] bg-gradient-to-t from-[black]/90 to-[black]/70 shadow shadow-black rounded-b-md backdrop-blur justify-center flex text-white">{move.item}</h1>
                    </div>
                )}
            </div>

            <section className="lg:flex-col lg:flex">
                <div className="md:flex md:flex-row md:gap-x-9 flex justify-evenly items-center">
                    <aside className="flex flex-col gap-y-5">
                        <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={handleClick}>أفلام بعد ٢٠٠٠</button>
                        <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={handleMovs}>أفلام قبل ٢٠٠٠</button>
                    </aside>
                    <aside className="flex flex-col gap-y-5">
                        <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={handleMosafter}>مسلسلات قبل </button>
                        <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={handleMosafter}>مسلسلات بعد </button>
                    </aside>
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
            </section>

            <aside className="flex justify-center items-center mt-5">
                <div className="flex flex-col justify-center items-center">
                    <button onClick={addPlayerInput} className="w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold">
                        إضافة لاعب
                    </button>
                    {players.map(player => (
                        <div key={player.id} className="flex flex-col justify-center items-center mt-5">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Player Name"
                                    value={player.name}
                                    onChange={(e) => handleNameChange(player.id, e.target.value)}
                                    className="w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold mb-2"
                                />
                                <input
                                    type="number"
                                    placeholder="Number"
                                    value={player.number}
                                    onChange={(e) => handleNumberChange(player.id, e.target.value)}
                                    className="w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold mb-2"
                                />
                                <button
                                    onClick={() => removePlayerInput(player.id)}
                                    className="w-[40px] p-1 bg-white/60 h-[40px] rounded-md text-[20px] font-bold flex items-center justify-center"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            <Link to="/Cinema"><button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">X</button></Link>
        </div>
    );
}

export default Movies