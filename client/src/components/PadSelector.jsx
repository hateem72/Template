import React from 'react';
import { motion } from 'framer-motion';

const PadSelector = ({ note, padNumber, selectedSound, onPadClick, onOpenPopup }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-[0_0_10px_rgba(81,111,255,0.6)] flex flex-col items-center"
    >
      <motion.h3
        className="text-lg font-semibold text-white mb-4"
        whileHover={{ scale: 1.05, color: '#516fff' }}
      >
        Pad {padNumber} (Note {note})
      </motion.h3>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(81,111,255,0.8)]"
        onClick={() => onPadClick(note)}
      >
        <span className="text-white text-2xl font-bold">Hit</span>
      </motion.div>
      <div className="mt-4 w-full text-center">
        <p className="text-gray-300 text-sm mb-2">Selected: {selectedSound}</p>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(147, 51, 234, 0.8)' }}
          onClick={() => onOpenPopup(note)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-[0_0_10px_rgba(81,111,255,0.8)]"
        >
          Change Sound
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PadSelector;