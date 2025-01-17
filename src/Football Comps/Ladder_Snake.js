import React, { useState , useEffect} from 'react';
import Draggable from 'react-draggable';
import questions from '../Football_Pages/Ladder_Snake_info';
import './LS.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';



const LS = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current object index
    const [squares, setSquares] = useState(Array(30).fill("")); // Initialize squares as empty
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [diceValue, setDiceValue] = useState(1); // Track the dice value
    let [rules , setRules] = useState(false);


          
    let handleRule=()=>{
      setRules(true)
    }

    let CloseRule=()=>{
      setRules(false)
    }

    const openModal = (question) => {
      setModalContent(question);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setModalContent(null);
    };
  
    // Function to get a random index
    const getRandomIndex = () => {
      return Math.floor(Math.random() * questions.length);
    };
  
    // Set a random object on component mount
    useEffect(() => {
      const randomIndex = getRandomIndex();
      setCurrentIndex(randomIndex);
    }, []); // Empty dependency array means this runs once on mount
  
    const showQuestions = () => {
      const randomIndex = getRandomIndex(); // Get a new random index
      setCurrentIndex(randomIndex);
      const selectedQuestions = Object.values(questions[randomIndex]);
      
      // Fill squares with the selected questions
      const filledSquares = Array(30).fill("").map((_, index) => selectedQuestions[index] || "");
      setSquares(filledSquares); // Update squares with the selected questions
    };
    
    const rollDice = () => {
        const newValue = Math.floor(Math.random() * 6) + 1; // Roll a dice (1-6)
        setDiceValue(newValue);
      };

    return (

        <div className="container md:flex md:justify-center md:items-center md:flex-col">

            <button 
                onClick={showQuestions} 
                className="mb-4 px-4 py-2 bg-blue-500 text-[27px] text-white rounded hover:bg-blue-600 transition duration-200"
            >
                عرض الأسئلة
            </button> {/* Button to show questions */}
        
            <div className="grid_LS grid-cols-4 grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 p-2">
                {squares.map((question, index) => {
                const squareStyle = {
                    backgroundColor: [6, 18, 21].includes(index) ? 'yellow' : 
                                    [13, 29, 25].includes(index) ? 'red' : 
                                    'lightgray',
                };

                return (
                    <div
                    key={index}
                    className="relative aspect-square border rounded-md shadow-md cursor-pointer transition duration-200"
                    style={{ ...squareStyle, height: '100px' }} // Fixed height for squares
                    onClick={() => question && openModal(question)} // Open modal on click if there's a question
                    >
                    <div className="flex justify-center items-center h-full overflow-auto p-3">
                        <p className="font-bold text-center">{question || ""}</p>
                    </div>
                    </div>
                );
                })}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <div className="modal-content bg-white p-6 rounded shadow-lg w-[450px] h-[360px] flex justify-around items-center flex-col">
                    <p className='text-[30px]'>{modalContent}</p>
                    <button 
                    onClick={closeModal} 
                    className="mt-4 px-4 py-2 bg-red-500 text-white text-[24px] flex justify-center items-center rounded hover:bg-red-600 transition duration-200 w-[270px] h-[45px]"
                    >
                    إغلاق
                    </button>
                </div>
                </div>
            )}

            <div className="draggable-container mt-4 flex justify-evenly items-center w-full">

                <Draggable>
                <div className="circle bg-red-500 p-2 rounded-full font-semibold flex justify-center items-center w-[45px] h-[45px] cursor-pointer">p1</div>
                </Draggable>

                <Draggable>
                <div className="circle bg-green-500 p-2 rounded-full font-semibold flex justify-center items-center w-[45px] h-[45px] cursor-pointer">p2</div>
                </Draggable>

                <Draggable>
                <div className="circle bg-yellow-500 p-2 rounded-full font-semibold flex justify-center items-center w-[45px] h-[45px] cursor-pointer">p3</div>
                </Draggable>

                <Draggable>
                <div className="circle bg-blue-500 p-2 rounded-full font-semibold flex justify-center items-center w-[45px] h-[45px] cursor-pointer">p4</div>
                </Draggable>

                <Draggable>
                <div className="circle bg-black p-2 text-white font-semibold rounded-full flex justify-center items-center w-[45px] h-[45px] cursor-pointer">p5</div>
                </Draggable>

                <Draggable>
                <div className="circle bg-orange-500 p-2 text-white font-semibold rounded-full flex justify-center items-center w-[45px] h-[45px] cursor-pointer">p6</div>
                </Draggable>

                <Draggable>
                <div className="circle bg-cyan-500 p-2 text-white font-semibold rounded-full flex justify-center items-center w-[45px] h-[45px] cursor-pointer">p7</div>
                </Draggable>

            </div>

            <div className="mt-4">

              <button 
                onClick={rollDice} 
                className="px-4 py-2 bg-green-500 text-[23px] text-white rounded hover:bg-green-600 transition duration-200"
                >
                الزهر
              </button>

              <div className="mt-2 text-center">
                <p className="text-xl font-bold">{diceValue}</p>
              </div>
                
            </div>

            <div id="rule" className={`${rules ? " opacity-1 pointer-events-auto" : " opacity-0 pointer-events-none"} lg:p-3 rounded mx-auto justify-center flex text-xl text-center items-center bg-green-500 text-white w-[400px] md:w-[490px] md:p-3 p-6  font-semibold absolute s z-20`}>
                <ul>
                  <li className="mb-3 text-red-950 font-semibold">الاسئلة قد تكون غير ظاهرة بشكل كافي ولكن عند الضغط علي السؤال سيتم عرضه في مربع كبير</li><hr></hr>
                  <li className="mb-3">عند فوز احد اللاعبين يتم الضغط علي عرض الاسئلة لعرض اسئلة جديدة</li><hr></hr>
                  <li className="mb-3">كل لاعب يختار اللون الذي سيلعب به و هذه الدوائر قابله للسحب و التحريك</li><hr></hr>
                  <li className="mb-3">زرار الزهر هو بديل عن حجر النرد</li><hr></hr>
                  <li className="mb-3">يتم الضغط علي زرار الزهر لمعرفة كم خطوة ستتحرك و اذا ضغط ولم يتغير الرقم فهذا ليس خطأ انما يعني انك لعبت و ظهر لك نفس الرقم مرة اخري</li><hr></hr>
                  <li className="mb-3">اسئلة المربع الاصفر اذا جاوبتها صح تلعب مرة اخري و اذا جاوبتها خطأ تحرم من الدور القادم يعني خصمك هيلعب مرتين ورا بعض</li><hr></hr>
                  <li className="mb-3">سؤال المربع الاحمر الحد الادني لاجاباته هم ٢ يعني اذا كنت واقف مثلا علي رقم ١٣ و لعبت الزهر و طلع رقم ١ لازم تجاوب ٢ علي الاقل و اذا جاوبت غلط ترجع ٣ مربعات من المربع اللي كنت واقف فيه قبل ما تلعب الزهر يعني اذا واقف في مربع ١٣ و الزهر طلع رقم ١ و جاوبت غلط ترجع لمربع رقم ١٠ و اذا جاوبت صح تتقدم ٣ مربعات بعد المربع الاحمر</li><hr></hr>
                </ul>

                <button onClick={CloseRule} className=" absolute top-0 right-0 px-3 py-1 shadow-md text-[20px] font-semibold headfont rounded">X</button>
            </div>
            
            <button onClick={handleRule} className='w-[110px] md:w-[180px] h-[70px] bg-yellow-300 rounded-md font-semibold text-xl'>شرح اللعبة</button>


            <Link to="/Football" className=' absolute top-0 right-0 bg-stone-400 p-3 text-[22px] font-semibold rounded-md'>X</Link>

        </div>
    )
    
};
  

export default LS;