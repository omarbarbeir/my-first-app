import { useState , useEffect } from "react"
import { mos1 } from "../Pages/MosalEX";
import { mos2 } from "../Pages/Squares";
import { Link } from "react-router-dom";


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


const Mosalsalat = () => {

  const [isBlurred, setIsBlurred] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3);
  const [selectedSquares, setSelectedSquares] = useState([]);

  // const handleShowRandomly = () => {
  //   const allObjects = [...mos1, ...mos2];
  //   const randomIndex = Math.floor(Math.random() * allObjects.length);
  //   const selectedObject = allObjects[randomIndex];
  //   const squares = Object.values(selectedObject);
  //   const shuffledSquares = shuffleArray(squares);
  //   setSelectedSquares(shuffledSquares);
  //   setTimeLeft(4);
  //   setIsBlurred(false);
  //   setTimerActive(false);
  // };

  const handle14Squares = () => {
    const randomIndex = Math.floor(Math.random() * mos1.length);
    const selectedObject = mos1[randomIndex];
    const squares = Object.values(selectedObject);
    const shuffledSquares = shuffleArray(squares);
    setSelectedSquares(shuffledSquares);
    setTimeLeft(3);
    setIsBlurred(false);
    setTimerActive(false);
  };

  const handle16Squares = () => {
    const randomIndex = Math.floor(Math.random() * mos2.length);
    const selectedObject = mos2[randomIndex];
    const squares = Object.values(selectedObject);
    const shuffledSquares = shuffleArray(squares);
    setSelectedSquares(shuffledSquares);
    setTimeLeft(3);
    setIsBlurred(false);
    setTimerActive(false);
  };

  useEffect(() => {
    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            setIsBlurred(true);
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive]);

  const handleStartTimer = () => {
    setIsBlurred(false);
    setTimerActive(true);
  };

  const handleRemoveBlur = () => {
    setIsBlurred(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-6 gap-4 mb-8">
        {selectedSquares.map((image, index) => (
          <div
            key={index}
            className={`w-[150px] h-[150px] bg-blue-500 flex items-center justify-center ${
              isBlurred ? " filter blur-3xl" : ""
            }`}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {timerActive && (
        <div className="p-3 text-4xl font-bold">Time Left: {timeLeft}s</div>
      )}

      <section className="flex justify-center gap-x-5 items-center w-full">
        <button
          onClick={handle14Squares}
          className="p-3 text-white bg-red-600 rounded hover:bg-red-700"
        >
          14 Squares
        </button>

        <button
          onClick={handle16Squares}
          className="p-3 text-white bg-orange-600 rounded hover:bg-orange-700"
        >
          16 Squares
        </button>

        {/* <button
          onClick={handleShowRandomly}
          className="p-3 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          Show Randomly
        </button> */}

        <button
          onClick={handleStartTimer}
          className="p-3 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Start Timer
        </button>

        <button
          onClick={handleRemoveBlur}
          className="p-3 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Remove Blur
        </button>
      </section>

      <Link to="/Ran" className="p-3 text-white absolute top-0 right-0 bg-gray-600 rounded hover:bg-gray-700">
        X
      </Link>
    </div>
  );

};


export default Mosalsalat