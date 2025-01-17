import React, { useState  , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { info } from '../Football_Pages/Risk_info'; // Import your data
import '../Football Comps/Risk.css'


const Risk = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedHead, setSelectedHead] = useState(null);
  const [visibleQuestions, setVisibleQuestions] = useState({}); // Track visible questions
  const [revealedQuestions, setRevealedQuestions] = useState({}); // Track all revealed questions for all heads
  const [visibleAnswers, setVisibleAnswers] = useState({}); // Track visible answers
  const [colors, setColors] = useState({
    one: 'bg-green-500',
    two: 'bg-blue-400',
    three: 'bg-yellow-300',
    four: 'bg-red-600'
  });
  let [timer, setTimer] = useState(29);
  let [active, setActive] = useState(false);


  const handleShowRandomInfo = () => {
    const randomGroup = info[Math.floor(Math.random() * info.length)];
    setSelectedGroup(randomGroup);
    setSelectedHead(null);
    setVisibleQuestions({}); // Reset visible questions
    setRevealedQuestions({}); // Reset revealed questions
    setVisibleAnswers({}); // Reset visible answers
  };

  const handleHeadClick = (head) => {
    setSelectedHead(head);
    setVisibleQuestions({}); // Reset visible questions
  };

  const handleRevealQuestion = (headKey, questionKey) => {
    setVisibleQuestions((prev) => ({
      ...prev,
      [`${headKey}-${questionKey}`]: true,
    }));
    setRevealedQuestions((prev) => ({
      ...prev,
      [headKey]: {
        ...prev[headKey],
        [questionKey]: true,
      },
    }));
  };

  const handleRevealAnswer = (headKey, questionKey) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [`${headKey}-${questionKey}`]: true,
    }));
  };

  const handleColorChange = (questionKey, color) => {
    setColors((prev) => ({
      ...prev,
      [questionKey]: color,
    }));
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

    let toggleTimer = () => {
      setActive(!active);
    };

    let resetTimer = () => {
      setTimer(29);
      setActive(false);
    };


  return (
    <div className=" mx-auto p-4 bg-[#135570] w-full overflow-auto h-screen">
      <button
        onClick={handleShowRandomInfo}
        className="mb-8 bg-red-500/90 shadow-sm flex m-auto shadow-black text-white p-2 rounded-md text-[25px] font-semibold hover:scale-110 transition-all"
      >
        عرض الاسئلة
      </button>
      {selectedGroup && (
        <div className="grid grid-cols-4 gap-4">
          {Object.values(selectedGroup).map((item, index) => (
            <div
              key={index}
              className="p-4 shadow shadow-black/40 hover:scale-110 transition-all rounded-lg text-[23px] font-semibold cursor-pointer flex justify-center"
              onClick={() => handleHeadClick(item)}
            >
              {item.head}
            </div>
          ))}
        </div>
      )}

      
      {selectedHead && (
        <div className="mt-8 p-4 bg-white/50 shadow-sm shadow-black/40 rounded-lg">
          <h2 className="text-[25px] m-auto flex justify-center font-semibold mb-4">{selectedHead.head}</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(selectedHead.questions).map(([key, { question, answer }]) => (
              <div key={key} className={`relative p-4 text-[20px] font-semibold text-center ${colors[key]}`}>
                {visibleQuestions[`${selectedHead.head}-${key}`] || (revealedQuestions[selectedHead.head] && revealedQuestions[selectedHead.head][key])
                  ? question
                  : ''}
                {!(visibleQuestions[`${selectedHead.head}-${key}`] || (revealedQuestions[selectedHead.head] && revealedQuestions[selectedHead.head][key])) && (
                  <button
                    className="mt-2 bg-blue-500 text-white p-2  rounded-lg"
                    onClick={() => handleRevealQuestion(selectedHead.head, key)}
                  >
                    عرض السؤال
                  </button>
                )}
                {(visibleQuestions[`${selectedHead.head}-${key}`] || (revealedQuestions[selectedHead.head] && revealedQuestions[selectedHead.head][key])) && (
                  <div>
                    {visibleAnswers[`${selectedHead.head}-${key}`] ? (
                      <div className="mt-6 text-[24px] p-3 font-semibold rounded-lg bg-white/30 shadow-black/20 shadow">{answer}</div>
                    ) : (
                      <button
                        className="mt-2 bg-white/60 shadow text-[20px] rounded-lg text-black p-2"
                        onClick={() => handleRevealAnswer(selectedHead.head, key)}
                      >
                        الإجابة
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
      )}

        <section className=" flex justify-around items-center mt-10 gap-y-5 lg:px-5 ">

        <button
            className="bg-white/80 h-[40px] md:h-[60px] items-center font-semibold rounded-md w-[130px] md:w-[150px] flex justify-center"
            onClick={resetTimer}
        >
            إعادة الوقت 
        </button>

        <p className=" bg-red-400 h-[40px] md:w-[150px] md:h-[60px] font-bold rounded-md items-center flex justify-center pointer-events-none w-[130px]">00:{timer}</p>

        <button
            className="bg-white/80 h-[40px] md:w-[150px] md:h-[60px] items-center font-semibold rounded-md w-[130px] flex justify-center"
            onClick={toggleTimer}
        >
            {active ? "إيقاف" : "تشغيل"}
        </button>
        </section>

       <aside className='shadow shadow-black rounded-lg mt-6 p-2 text-[22px] gap-y-2 flex flex-col text-right'>
        <h1>السؤال باللون الأخضر يساوي ٥ نقاط</h1>
        <h1>السؤال باللون الأزرق يساوي ١٠ نقاط</h1>
        <h1>السؤال باللون الأصفر يساوي ٢٠ نقطه</h1>
        <h1>السؤال باللون الأحمر يساوي ٤٠ نقطه</h1>
        <h1>يوجد سؤال نقاطه ستكون مضاعفه بمعني ان اللي هيجاوب عليه هياخد ضعف النقاط هيكون مكتوب بجانبه (X2)</h1>
       </aside>
       
       <Link to="/Football" className=' absolute top-0 right-0 shadow-sm p-3 shadow-black rounded-md text-[19px] font-semibold'>X</Link>
    </div>
  );
};


export default Risk;