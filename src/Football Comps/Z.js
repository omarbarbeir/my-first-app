// import React, { useState  , useEffect} from 'react';
// import { tics } from '../Football_Pages/Tic_Info';
// import { Link } from 'react-router-dom';
// import useSound from 'use-sound';
// import winSound from '../gta.mp3';
// import timerEndSound from '../timer.mp3'; // Import your MP3 file


// const Tic = () => {
//   const [colors, setColors] = useState(Array(9).fill('black'));
//   const [currentPlayer, setCurrentPlayer] = useState('Player 1');
//   let [ticc, setTicc] = useState(false);
//   let [timer, setTimer] = useState(29);
//   let [active, setActive] = useState(false);
//   let[rules , setRules] = useState(false);
//   const [winner, setWinner] = useState(null);
//   const [playWinSound , { stop }] = useSound(winSound);
//   const [playTimerEndSound, { stop: stopTimerEndSound }] = useSound(timerEndSound); 


//   const checkWinner = (colorsArray) => {
//     const winningCombinations = [
//       [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//       [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//       [0, 4, 8], [2, 4, 6]             // Diagonals
//     ];
  
//     for (let combination of winningCombinations) {
//       const [a, b, c] = combination;
//       if (
//         colorsArray[a].player &&
//         colorsArray[a].player === colorsArray[b].player &&
//         colorsArray[a].player === colorsArray[c].player
//       ) {
//         return colorsArray[a].player; // Return the winner
//       }
//     }
//     return null; // No winner
//   };
  
//     useEffect(() => {
//       let interval = null;
//         if (active) {
//           interval = setInterval(() => {
//             setTimer(prevTimer => {
//               if (prevTimer === 0) {
//                 clearInterval(interval);
//                 // Change the current player when the timer ends
//                 setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
//                 setActive(false)
//                 playTimerEndSound()
//                 return 29; // Reset timer for the next player
//               }
//               return prevTimer - 1; // Decrease timer
//             });
//         }, 1000);
//     }
//   return () => clearInterval(interval);
//     }, [active, currentPlayer, playTimerEndSound]);

//   let toggleTimer = () => {
//     setActive(!active);
//     stopTimerEndSound()
//   };

//   let resetTimer = () => {
//     setTimer(29);
//     setActive(false);
//     stopTimerEndSound()
//   };


//   const handleClick = (index) => {
//     const newColors = [...colors];
//     if (newColors[index] === 'black') { // Check if the square has not been clicked
//       if (currentPlayer === 'Player 1') {
//         newColors[index] = { color: '#065535', player: 'player 1' };
//         setCurrentPlayer('Player 2');
//       } else {
//         newColors[index] = { color: '#0e2f44', player: 'player 2' };
//       }
//       setColors(newColors)
//       // Reset timer when a player answers
     
//       const isWinner = checkWinner(newColors);
//       if (isWinner) {
//         setWinner(isWinner); // Set the winner immediately
//         playWinSound(); // Play the winning sound
//         return; // Exit the function to prevent further state updates
//       }
      
//       setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
//       resetTimer(); 
//     }
//   };

//   let next = () => {
//     let random = tics[Math.floor(Math.random() * tics.length)];
//     setTicc(random);
//   };

//   let reset = () => {
//     setColors(Array(9).fill("black"));
//     setCurrentPlayer("Player 1");
//   };

//   let handleRule=()=>{
//     setRules(true)
//   }
//   let CloseRule=()=>{
//     setRules(false)
//   } 

//   const togglePlayer = () => {
//     setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
//   };

//   return (
//     <div className='bg-[#135570] h-screen'>
//       {tics && (
//             <section className='relative w-screen p-3 h-screen overflow-auto'>

//               <div id="rule" className={`${rules ? " opacity-1 pointer-events-auto" : " opacity-0 pointer-events-none"} lg:p-3 rounded mx-auto justify-center flex text-xl text-center items-center bg-green-500 text-white w-[400px] md:w-[490px] md:p-3 p-6  font-semibold absolute top-[5%] left-[2%] sm:left-[20%] md:left-[22%] lg:left-[30%] z-20`}>
//                 <ul>
//                   <li className="mb-3 flex justify-center items-center text-center text-red-950  text-xl">الصور يتم تحميلها في وقت من ثانية الي ثانيتين، لاتلعب حتي يتم التحميل بالكامل</li><hr></hr>
//                   <li className="mb-3">يجب ايجاد اللاعب المشترك بين كل مربع في الصف و العمود</li><hr></hr>
//                   <li className="mb-3">كما هو موضح من عليه الدور لكي يلعب في المستطيل اسفل الجدول</li><hr></hr>
//                   <li className="mb-3">كل لاعب عليه الدور عندما يجاوب علي اللاعب يضغط علي المربع الذي اختاره لكي يتم تحديد اجابته</li><hr></hr>
//                   <li className="mb-3">بعد انتهاء الدور يجب الضغط علي زرار اعادة المربعات لكي يتم اخلاء المربعات</li><hr></hr>
//                   <li className="mb-3">اللاعب الفائز هو الذي يحصل علي ثلاث مربعات متتالية في اي اتجاه</li><hr></hr>
//                   <li className="mb-3">اذا لم يحصل اي لاعب علي ثلاث مربعات يحتسب الفائز علي اساس اكثر لاعب حصل علي مربعات</li><hr></hr>
//                   <li className="mb-3">ممنوع تكرار اسم اللاعب اكثر من مرة في </li>
//                 </ul>

//                 <button onClick={CloseRule} className=" absolute top-0 right-0 px-3 py-1 shadow-md text-[20px] font-semibold headfont rounded">X</button>
//               </div>

//               {winner && (
//                 <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//                   <div className="bg-white p-8 rounded-lg text-center">
//                     <span className="text-6xl">🎉</span>
//                    <div>
//                     <h1 className="font-bold mt-4 mission text-[#000000]">{winner} Win!</h1>
//                     <p className='mission'>Mission Completed</p>
//                    </div>
//                     <button
//                       onClick={() => {setWinner(null); stop()}}
//                       className="mt-4 bg-green-500 text-white px-4 py-2 rounded mission text-2xl"
//                     >
//                       إلعب مره آخري
//                     </button>
//                   </div>
//                 </div>
//               )}

//                 <div className='md:flex md:justify-evenly md:items-center'>

//                   <section>
//                     <div className='flex justify-center items-center'>

//                     <div className=''>
//                       <div className='flex justify-end items-center gap-x-3' style={{  marginBottom: '10px' }}>
//                         <img  src={ticc.logo1}loading="lazy" className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
//                         <img src={ticc.logo2} loading="lazy" className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
//                         <img src={ticc.logo3} loading="lazy" className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
//                       </div>
                      
//                       <div style={{ display: 'flex' }}>
//                         <div className='mt-[-99px] md:mt-[-160px] ml-[-10px] md:ml-[10px] gap-y-4' style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
//                           <img src={require("../imgs/LOGO.png")} loading="lazy" className='w-[90px] h-[90px] bg-red-500 shadow shadow-black/60 md:w-[150px] md:h-[150px] rounded-md' />
//                           <img src={ticc.logoleft1}  loading='lazy' className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
//                           <img src={ticc.logoleft2}  loading='lazy'  className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
//                           <img src={ticc.logoleft3}   loading="lazy" className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
                        
//                         </div>

//                         <div style={{ display: 'grid', gap: '10px' }} className='grid grid-cols-3 bg-white/10 p-[2px] rounded-lg shadow'>
//                           {colors.map((color, index) => (
//                             <div
//                               key={index}
//                               onClick={() => handleClick(index)}
//                               style={{
//                                 backgroundColor: color.color,
//                                 cursor: 'pointer',
//                               }}
//                               className='w-[90px] h-[90px] mt-1 md:w-[150px] md:h-[150px] rounded-md border flex justify-center items-center font-semibold text-lg md:text-2xl text-white'
//                             >
//                               {color.player}
//                             </div>
//                           ))}
//                         </div>

//                       </div>

//                       <div className='p-5 m-3 bg-stone-100 text-white bg-transparent shadow-sm shadow-black rounded-md font-semibold text-lg md:text-2xl flex mx-auto mr-7 md:mr-0 justify-center items-center'>
//                         Current Player: {currentPlayer}
//                       </div>

//                       <section>
//                         <aside className='flex justify-evenly items-center w-full'>
//                           <button onClick={next} className='w-[100px] md:w-[180px] h-[70px] bg-yellow-300 rounded-md font-semibold text-2xl'>عرض</button>
//                           <button onClick={reset} className='w-[110px] md:w-[180px] h-[70px] bg-yellow-300 rounded-md font-semibold text-xl'>إعادة المربعات</button>
//                           <button onClick={handleRule} className='w-[110px] md:w-[180px] h-[70px] bg-yellow-300 rounded-md font-semibold text-xl'>شرح اللعبة</button>
//                         </aside>
//                       </section>

//                     </div>

//                     </div>
//                   </section>

//                   <section className="flex justify-evenly items-center mt-5 gap-y-4 md:flex-col">

//                     <button
//                         className="bg-white/80 h-[50px] shadow-md md:h-[70px] lg:w-[130px] items-center font-semibold rounded-md w-[100px] md:w-[90px] flex justify-center"
//                         onClick={resetTimer}
//                     >
//                         إعادة الوقت 
//                     </button>

//                     <p className=" bg-red-500 shadow-md h-[50px] md:w-[90px] lg:w-[130px] md:h-[60px] font-bold rounded-md items-center flex justify-center pointer-events-none w-[100px]">00:{timer}</p>

//                     <button
//                             className="bg-white/80 h-[50px] shadow-md md:w-[90px] lg:w-[130px] md:h-[60px] items-center font-semibold rounded-md w-[100px] flex justify-center"
//                             onClick={toggleTimer}
//                         >
//                             {active ? "إيقاف" : "تشغيل"}
//                     </button>

//                     <button onClick={togglePlayer} className=' bg-blue-500 shadow-md h-[50px] md:w-[90px] lg:w-[130px] md:h-[60px] font-bold rounded-md items-center flex justify-center w-[100px]'>تغيير الدور</button> {/* New button to change player */}

//                   </section>

//                 </div>
                

//             </section>
            
//       )}
//             <Link to="/Football"><button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">X</button></Link>

//     </div>
//   );
// };

// export default Tic;




// import { useState , useEffect } from "react"
// import {WhoE} from '../Football_Pages/Who_iam_info'
// import { Link } from "react-router-dom";

// const Who = () => {
//     const [Who, setKora] = useState(null);
//     const [rules, setRules] = useState(false);
//     const [active, setActive] = useState(false);
//     const [timer, setTimer] = useState(29);
//     const [answer, setAnswer] = useState(false);
//     const [hintIndex, setHintIndex] = useState(0);
  
//     const handleClickE = () => {
//       let random = WhoE[Math.floor(Math.random() * WhoE.length)];
//       setKora(random);
//       setAnswer(false);
//       setHintIndex(0); // Reset hint index when a new player is selected
//     };
  
  
//     const showAnswer = () => {
//       setAnswer(true);
//     };

  
//     const handleShowHintClick = () => {
//       if (Who && hintIndex < Who.hints.length - 1) {
//         setHintIndex(hintIndex + 1);
//       }
//     };
  
//     useEffect(() => {
//       let interval = null;
//       if (active) {
//         interval = setInterval(() => {
//           setTimer((prevTimer) => {
//             if (prevTimer === 0) {
//               clearInterval(interval);
//               return 0;
//             }
//             return prevTimer - 1;
//           });
//         }, 1000);
//       }
//       return () => clearInterval(interval);
//     }, [active]);
  
//     const toggleTimer = () => {
//       setActive(!active);
//     };
  
//     const resetTimer = () => {
//       setTimer(29);
//       setActive(false);
//     };
  
//     return (
//       <div className="lg:flex lg:justify-around bg-[#135570] h-screen overflow-hidden lg:items-center">
//         {/* Photo and Hints Section */}
//         <div className="flex flex-col justify-center items-center py-10">
//           {Who && (
//             <div className="flex flex-col text-right justify-center items-center relative">
//               {/* Display Photo */}
//               <img
//                 src={Who.img}
//                 className="w-[550px] md:w-[650px] lg:w-[670px] h-[400px] md:h-[450px] lg:h-[500px]"
//                 alt="Player"
//               />
  
//               {/* Display Hints in Separate <h1> Tags */}
//               <div className="bg-white h-[350px] md:w-[600px] lg:w-[570px] mx-auto rounded-md flex flex-col items-center overflow-y-auto p-4 mt-4">
//                 {Who.hints.slice(0, hintIndex + 1).map((hint, index) => (
//                   <h1 key={index} className="text-xl text-center font-bold mb-2">
//                     {hint}
//                   </h1>
//                 ))}
//               </div>
  
//               {/* Display Answer */}
//               <h2
//                 className={`${
//                   answer ? "opacity-100" : "opacity-0"
//                 } bg-stone-300 rounded-md p-7 mt-2 h-[70px] flex justify-center items-center text-2xl font-bold`}
//               >
//                 {Who.player}
//               </h2>
//             </div>
//           )}
//         </div>
  
//         {/* Buttons Section */}
//         <div className="md:flex lg:flex-col lg:gap-y-16 md:flex-row flex gap-x-9 justify-center items-center">
//           <button
//             className="w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold"
//             onClick={handleClickE}
//           >
//             اوروبي
//           </button>

//           <button
//             className="w-[140px] p-1 bg-yellow-300 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold"
//             onClick={showAnswer}
//           >
//             الاجابة
//           </button>
//           <button
//             className="w-[140px] p-1 bg-yellow-300 h-[40px] md:w-[160px] md:h-[60px] rounded-md text-[20px] font-semibold"
//             onClick={handleShowHintClick}
//           >
//             عرض المعلومة
//           </button>
//         </div>
  
//         {/* Timer Section */}
//         <section className="flex justify-around items-center mt-10 gap-y-5 lg:px-5 lg:flex-col">
//           <button
//             className="bg-white/80 h-[40px] md:h-[60px] items-center font-semibold rounded-md w-[130px] md:w-[150px] flex justify-center"
//             onClick={resetTimer}
//           >
//             إعادة الوقت
//           </button>
  
//           <p className="bg-red-400 h-[40px] md:w-[150px] md:h-[60px] font-bold rounded-md items-center flex justify-center pointer-events-none w-[130px]">
//             00:{timer}
//           </p>
  
//           <button
//             className="bg-white/80 h-[40px] md:w-[150px] md:h-[60px] items-center font-semibold rounded-md w-[130px] flex justify-center"
//             onClick={toggleTimer}
//           >
//             {active ? "إيقاف" : "تشغيل"}
//           </button>
//         </section>
  
//         {/* Close Button */}
//         <Link to="/Football">
//           <button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">
//             X
//           </button>
//         </Link>
//       </div>
//     );
//   };
  
// export default Who


// the moves js

// import { useState , useEffect } from "react"
// import {movesData} from '../Pages/MoviesInfo'
// import { movs } from "../Pages/MoviesBefore2000";
// import { Mos } from "../Pages/MosalEX";
// import { Link } from "react-router-dom";

// const Movies = () => {
//     const [move, setMove] = useState(null);
//     const [rules, setRules] = useState(false);
//     const [active, setActive] = useState(false);
//     const [timer, setTimer] = useState(59);
//     const [players, setPlayers] = useState([]); // State to track player inputs

//     const handleClick = () => {
//         let random = movesData[Math.floor(Math.random() * movesData.length)];
//         setMove(random);
//     };

//     const handleMovs = () => {
//         let random = movs[Math.floor(Math.random() * movs.length)];
//         setMove(random);
//     };

//     const handleMosafter = () => {
//         let random = Mos[Math.floor(Math.random() * Mos.length)];
//         setMove(random);
//     };

//     const handleRule = () => {
//         setRules(true);
//     };

//     const CloseRule = () => {
//         setRules(false);
//     };

//     useEffect(() => {
//         let interval = null;
//         if (active) {
//             interval = setInterval(() => {
//                 setTimer(timer--);
//                 if (timer === -1) {
//                     clearInterval(interval);
//                 }
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [active]);

//     const toggleTimer = () => {
//         setActive(!active);
//     };

//     const resetTimer = () => {
//         setTimer(59);
//         setActive(false);
//     };

//     // Function to add a new player input pair
//     const addPlayerInput = () => {
//         setPlayers([...players, { id: Date.now(), name: '', number: '' }]); // Use Date.now() for unique IDs
//     };

//     // Function to handle changes in the player name input
//     const handleNameChange = (id, value) => {
//         const updatedPlayers = players.map(player =>
//             player.id === id ? { ...player, name: value } : player
//         );
//         setPlayers(updatedPlayers);
//     };

//     // Function to handle changes in the number input
//     const handleNumberChange = (id, value) => {
//         const updatedPlayers = players.map(player =>
//             player.id === id ? { ...player, number: value } : player
//         );
//         setPlayers(updatedPlayers);
//     };

//     // Function to remove a player input pair
//     const removePlayerInput = (id) => {
//         const updatedPlayers = players.filter(player => player.id !== id);
//         setPlayers(updatedPlayers);
//     };

//     return (
//         <div className="lg:flex lg:justify-around bg-[#135570] h-screen overflow-auto lg:items-center">
//             <div id="rule" className={`${rules ? " opacity-1 pointer-events-auto" : " opacity-0 pointer-events-none"} lg:p-3 rounded mx-auto justify-center items-center bg-emerald-600 text-white w-[400px] md:w-[490px] md:p-3 p-6  font-semibold absolute top-[30%] left-[2%] sm:left-[20%] md:left-[22%] lg:left-[30%] z-20`}>
//                 <ul>
//                     <li className="mb-3 flex justify-center items-center p-3 font-semibold text-2xl text-right">يجب تمثيل الفيلم خلال دقيقة بدون كلام</li>
//                 </ul>
//                 <button onClick={CloseRule} className=" absolute top-0 right-0 px-3 py-1 shadow-md text-[20px] font-semibold headfont rounded">X</button>
//             </div>

//             <div className="flex flex-col justify-center items-center py-10">
//                 {move && (
//                     <div className="w-[400px] mt-0 relative h-[390px] md:w-[480px] md:h-[450px] lg:w-[520px]">
//                         <img className="w-full h-full rounded-md" src={move.image} loading="lazy"></img>
//                         <h1 className=" absolute bottom-0 w-full py-2 font font-semibold text-[27px] md:text-[32px] bg-gradient-to-t from-[black]/90 to-[black]/70 shadow shadow-black rounded-b-md backdrop-blur justify-center flex text-white">{move.item}</h1>
//                     </div>
//                 )}
//             </div>

//             <section className="lg:flex-col lg:flex">
//                 <div className="md:flex md:flex-row md:gap-x-9 flex justify-evenly items-center">
//                     <aside className="flex flex-col gap-y-5">
//                         <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={handleClick}>أفلام بعد ٢٠٠٠</button>
//                         <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={handleMovs}>أفلام قبل ٢٠٠٠</button>
//                     </aside>
//                     <aside className="flex flex-col gap-y-5">
//                         <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={handleMosafter}>مسلسلات قبل </button>
//                         <button className='w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold' onClick={handleMosafter}>مسلسلات بعد </button>
//                     </aside>
//                 </div>

//                 <section className=" flex justify-around items-center mt-10 gap-y-5 lg:flex-col">
//                     <button
//                         className="bg-white/80 h-[40px] items-center font-semibold rounded-md w-[130px] flex justify-center"
//                         onClick={resetTimer}
//                     >
//                         إعادة الوقت 
//                     </button>
//                     <p className=" bg-red-400 h-[40px] font-bold rounded-md items-center flex justify-center pointer-events-none w-[130px]">00:{timer}</p>
//                     <button
//                         className="bg-white/80 h-[40px] items-center font-semibold rounded-md w-[130px] flex justify-center"
//                         onClick={toggleTimer}
//                     >
//                         {active ? "إيقاف" : "تشغيل"}
//                     </button>
//                 </section>
//             </section>

//             <aside className="flex justify-center items-center mt-5">
//                 <div className="flex flex-col justify-center items-center">
//                     <button onClick={addPlayerInput} className="w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold">
//                         إضافة لاعب
//                     </button>
//                     {players.map(player => (
//                         <div key={player.id} className="flex flex-col justify-center items-center mt-5">
//                             <div className="flex items-center gap-2">
//                                 <input
//                                     type="text"
//                                     placeholder="Player Name"
//                                     value={player.name}
//                                     onChange={(e) => handleNameChange(player.id, e.target.value)}
//                                     className="w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold mb-2"
//                                 />
//                                 <input
//                                     type="number"
//                                     placeholder="Number"
//                                     value={player.number}
//                                     onChange={(e) => handleNumberChange(player.id, e.target.value)}
//                                     className="w-[140px] p-1 bg-white/80 h-[40px] md:w-[160px] md:h-[45px] rounded-md text-[20px] font-semibold mb-2"
//                                 />
//                                 <button
//                                     onClick={() => removePlayerInput(player.id)}
//                                     className="w-[40px] p-1 bg-white/60 h-[40px] rounded-md text-[20px] font-bold flex items-center justify-center"
//                                 >
//                                     X
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </aside>

//             <Link to="/Cinema"><button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">X</button></Link>
//         </div>
//     );
// }

// export default Movies