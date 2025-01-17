import React, { useState  , useEffect} from 'react';
import { tics } from '../Football_Pages/Tic_Info';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import winSound from '../gta.mp3';
// import winSound from '../bravo.mp3';
import timerEndSound from '../timer.mp3'; // Import your MP3 file


const Tic = () => {
  const [colors, setColors] = useState(Array(9).fill('black'));
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');
  const [ticc, setTicc] = useState(false);
  const [timer, setTimer] = useState(29);
  const [active, setActive] = useState(false);
  const [rules, setRules] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playWinSound, { stop }] = useSound(winSound);
  const [playTimerEndSound, { stop: stopTimerEndSound }] = useSound(timerEndSound);

  const checkWinner = (colorsArray) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (colorsArray[a].player && colorsArray[a].player === colorsArray[b].player && colorsArray[a].player === colorsArray[c].player) {
        return colorsArray[a].player; // Return the winner
      }
    }
    return null; // No winner
  };

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            clearInterval(interval);
            setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
            setActive(false);
            playTimerEndSound();
            return 29; // Reset timer for the next player
          }
          return prevTimer - 1; // Decrease timer
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [active, currentPlayer, playTimerEndSound]);

  const toggleTimer = () => {
    setActive(!active);
    stopTimerEndSound();
  };

  const resetTimer = () => {
    setTimer(29);
    setActive(false);
    stopTimerEndSound();
  };

  // const handleClick = (index) => {
  //   const newColors = [...colors];
  //   if (newColors[index] === 'black') {
  //     newColors[index] = { color: currentPlayer === 'Player 1' ? '#065535' : '#0e2f44', player: currentPlayer };
  //     setColors(newColors);

  //     const isWinner = checkWinner(newColors);
  //     if (isWinner) {
  //       setWinner(isWinner);
  //       playWinSound();
  //       return;
  //     }

  //     setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
  //     resetTimer();
  //   }
  // };

  const handleClick = (index) => {
    const newColors = [...colors];
  
    // If the square is empty, fill it with the current player's color and mark
    if (newColors[index] === 'black') {
      newColors[index] = {
        color: currentPlayer === 'Player 1' ? '#065535' : '#0e2f44',
        player: currentPlayer,
      };
    } else {
      // If the square is already filled, empty it
      newColors[index] = 'black';
    }
  
    setColors(newColors);
  
    // Check for a winner only if a square was filled (not emptied)
    if (newColors[index] !== 'black') {
      const isWinner = checkWinner(newColors);
      if (isWinner) {
        setWinner(isWinner);
        playWinSound();
        return;
      }
    }
  
    // Switch players only if a square was filled (not emptied)
    if (newColors[index] !== 'black') {
      setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
      resetTimer();
    }
  };

  const next = () => {
    setTicc(tics[Math.floor(Math.random() * tics.length)]);
  };

  const reset = () => {
    setColors(Array(9).fill("black"));
    setCurrentPlayer("Player 1");
  };

  const togglePlayer = () => {
    setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
  };

  return (
    <div className='bg-[#135570] h-screen'>
      {tics && (
        <section className='relative w-screen p-3 h-screen overflow-auto'>
          <div id="rule" className={`${rules ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"} lg:p-3 rounded mx-auto justify-center flex text-xl text-center items-center bg-green-500 text-white w-[400px] md:w-[490px] md:p-3 p-6 font-semibold absolute top-[5%] left-[2%] sm:left-[20%] md:left-[22%] lg:left-[30%] z-20`}>
            <ul>
              <li className="mb-3 flex justify-center items-center text-center text-red-950 text-xl">الصور يتم تحميلها في وقت من ثانية الي ثانيتين، لاتلعب حتي يتم التحميل بالكامل</li>
              <hr />
              <li className="mb-3">يجب ايجاد اللاعب المشترك بين كل مربع في الصف و العمود</li>
              <hr />
              <li className="mb-3">كما هو موضح من عليه الدور لكي يلعب في المستطيل اسفل الجدول</li>
              <hr />
              <li className="mb-3">كل لاعب عليه الدور عندما يجاوب علي اللاعب يضغط علي المربع الذي اختاره لكي يتم تحديد اجابته</li>
              <hr />
              <li className="mb-3">بعد انتهاء الدور يجب الضغط علي زرار اعادة المربعات لكي يتم اخلاء المربعات</li>
              <hr />
              <li className="mb-3">اللاعب الفائز هو الذي يحصل علي ثلاث مربعات متتالية في اي اتجاه</li>
              <hr />
              <li className="mb-3">اذا لم يحصل اي لاعب علي ثلاث مربعات يحتسب الفائز علي اساس اكثر لاعب حصل علي مربعات</li>
              <hr />
              <li className="mb-3">ممنوع تكرار اسم اللاعب اكثر من مرة في </li>
            </ul>
            <button onClick={() => setRules(false)} className="absolute top-0 right-0 px-3 py-1 shadow-md text-[20px] font-semibold headfont rounded">X</button>
          </div>

          {winner && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white shadow-white/20 shadow-xl p-[40px] rounded-lg text-center">
                <span className="text-6xl">😎😜</span>
                <div>
                  <h1 className="font-bold mt-4 mission text-[#000000]">{winner} Win</h1>
                  <p className='mission text-4xl'>Mission Completed</p>
                </div>
                <button onClick={() => { setWinner(null); stop() }} className="mt-4 bg-[#dca927] shadow-lg hover:scale-110 transition-all text-white px-4 py-2 rounded mission text-2xl">إلعب مره أخري</button>
              </div>
            </div>
          )}

          <div className='md:flex md:justify-evenly md:items-center'>
            <section>
              <div className='flex justify-center items-center'>
                <div>
                  <div className='flex justify-end items-center gap-x-3' style={{ marginBottom: '10px' }}>
                    <img src={ticc.logo1} loading="lazy" className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
                    <img src={ticc.logo2} loading="lazy" className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
                    <img src={ticc.logo3} loading="lazy" className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
                  </div>

                  <div style={{ display: 'flex' }}>
                    <div className='mt-[-99px] md:mt-[-160px] ml-[-10px] md:ml-[10px] gap-y-4' style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                      <img src={require("../imgs/LOGO.png")} loading="lazy" className='w-[90px] h-[90px] bg-red-500 shadow shadow-black/60 md:w-[150px] md:h-[150px] rounded-md' />
                      <img src={ticc.logoleft1} loading='lazy' className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
                      <img src={ticc.logoleft2} loading='lazy' className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
                      <img src={ticc.logoleft3} loading="lazy" className='w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-md' />
                    </div>

                    <div style={{ display: 'grid', gap: '10px' }} className='grid grid-cols-3 bg-white/10 p-[2px] rounded-lg shadow'>
                      {colors.map((color, index) => (
                        <div
                          key={index}
                          onClick={() => handleClick(index)}
                          style={{ backgroundColor: color.color, cursor: 'pointer' }}
                          className='w-[90px] h-[90px] mt-1 md:w-[150px] md:h-[150px] rounded-md border flex justify-center items-center font-semibold text-lg md:text-2xl text-white'
                        >
                          {color.player}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='p-5 m-3 bg-stone-100 text-white bg-transparent shadow-sm shadow-black rounded-md font-semibold text-lg md:text-2xl flex mx-auto mr-7 md:mr-0 justify-center items-center'>
                    Current Player: {currentPlayer}
                  </div>

                  <section>
                    <aside className='flex justify-evenly items-center w-full'>
                      <button onClick={next} className='w-[100px] md:w-[180px] h-[70px] bg-yellow-300 rounded-md font-semibold text-2xl'>عرض</button>
                      <button onClick={reset} className='w-[110px] md:w-[180px] h-[70px] bg-yellow-300 rounded-md font-semibold text-xl'>إعادة المربعات</button>
                      <button onClick={() => setRules(true)} className='w-[110px] md:w-[180px] h-[70px] bg-yellow-300 rounded-md font-semibold text-xl'>شرح اللعبة</button>
                    </aside>
                  </section>
                </div>
              </div>
            </section>

            <section className="flex justify-evenly items-center mt-5 gap-y-4 md:flex-col">
              <button className="bg-white/80 h-[50px] shadow-md md:h-[70px] lg:w-[130px] items-center font-semibold rounded-md w-[100px] md:w-[90px] flex justify-center" onClick={resetTimer}>إعادة الوقت</button>
              <p className="bg-red-500 shadow-md h-[50px] md:w-[90px] lg:w-[130px] md:h-[60px] font-bold rounded-md items-center flex justify-center pointer-events-none w-[100px]">00:{timer}</p>
              <button className="bg-white/80 h-[50px] shadow-md md:w-[90px] lg:w-[130px] md:h-[60px] items-center font-semibold rounded-md w-[100px] flex justify-center" onClick={toggleTimer}>{active ? "إيقاف" : "تشغيل"}</button>
              <button onClick={togglePlayer} className='bg-blue-500 shadow-md h-[50px] md:w-[90px] lg:w-[130px] md:h-[60px] font-bold rounded-md items-center flex justify-center w-[100px]'>تغيير الدور</button>
            </section>
          </div>
        </section>
      )}
      <Link to="/Football"><button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">X</button></Link>
    </div>
  );
};

export default Tic;