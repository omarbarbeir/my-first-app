import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';

const Round = () => {
  const [texts, setTexts] = useState(Array(16).fill('')); // Array to hold text for each input
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blueSquares, setBlueSquares] = useState(Array(16).fill('')); // Array to hold text for blue squares
  const [rules, setRules] = useState(false);

  // Handle input change
  const handleChange = (index, value) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  // Handle double click to open modal
  const handleDoubleClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // Move texts to blue squares randomly
  const moveTextsToBlueSquares = () => {
    const availableIndices = Array.from({ length: 16 }, (_, i) => i); // Indices for blue squares
    const newBlueSquares = [...blueSquares];

    texts.forEach((text) => {
      if (text) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        const indexToPlace = availableIndices[randomIndex];
        newBlueSquares[indexToPlace] = text; // Place text in blue square
        availableIndices.splice(randomIndex, 1); // Remove the index to avoid duplicates
      }
    });

    setBlueSquares(newBlueSquares);
  };

  // Reusable square component
  const Square = ({ text, onDoubleClick, className }) => (
    <div
      onDoubleClick={() => onDoubleClick(text)}
      className={`w-[80px] h-[80px] shadow-lg border text-center rounded-md m-1 flex justify-center items-center ${className}`}
    >
      {text}
    </div>
  );

  // Reusable draggable input component
  const DraggableInput = ({ index, value, onChange, onDoubleClick }) => (
    <Draggable>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        onDoubleClick={() => onDoubleClick(value)}
        className="bg-green-500 rounded-md p-2 font-semibold flex justify-center items-center w-[80px] h-[80px] cursor-pointer text-center border-none outline-none"
      />
    </Draggable>
  );

  return (
    <div className="p-5">
      {/* Tournament Bracket Layout */}
      <div className="flex flex-col gap-8">
        {/* First Round: 16 Squares (8 on each side) */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            {blueSquares.slice(0, 8).map((text, index) => (
              <Square key={index} text={text} onDoubleClick={handleDoubleClick} className="border-red-200" />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {blueSquares.slice(8, 16).map((text, index) => (
              <Square key={index} text={text} onDoubleClick={handleDoubleClick} className="border-red-200" />
            ))}
          </div>
        </div>

        {/* Second Round: 8 Squares (4 on each side) */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, index) => (
              <Square key={index} text="" className="border-green-200" />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, index) => (
              <Square key={index} text="" className="border-green-200" />
            ))}
          </div>
        </div>

        {/* Third Round: 4 Squares (2 on each side) */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            {[...Array(2)].map((_, index) => (
              <Square key={index} text="" className="border-yellow-200" />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {[...Array(2)].map((_, index) => (
              <Square key={index} text="" className="border-yellow-200" />
            ))}
          </div>
        </div>

        {/* Final Round: 2 Squares (1 on each side) */}
        <div className="flex justify-between">
          <Square text="" className="border-blue-200" />
          <Square text="" className="border-blue-200" />
        </div>
      </div>

      {/* Draggable Input Fields */}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        {texts.map((text, index) => (
          <DraggableInput
            key={index}
            index={index}
            value={text}
            onChange={handleChange}
            onDoubleClick={handleDoubleClick}
          />
        ))}
      </div>

      {/* Button to Move Texts */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={moveTextsToBlueSquares}
          className="bg-red-500 text-white font-semibold text-2xl p-2 rounded"
        >
          اجراء القرعة
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-bold">Content</h2>
            <p>{modalContent}</p>
            <button onClick={closeModal} className="mt-4 bg-red-500 text-white p-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Close Button */}
      <Link to="/">
        <button className="absolute top-0 right-0 shadow headfont px-3 py-2 rounded text-[18px] font-semibold">
          X
        </button>
      </Link>
    </div>
  );
};


export default Round;

