import React from 'react';
import { motion } from 'framer-motion';
import * as Tone from 'tone';

const SoundSelectorPopup = ({ isOpen, onClose, drumSounds, onSoundChange, activeNote }) => {
  const soundKeys = Object.keys(drumSounds); // Define soundKeys locally from drumSounds

  const handleSoundPreview = async (sound) => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
      console.log('Audio context started for preview');
    }
    const player = new Tone.Player(drumSounds[sound]).toDestination();
    player.start();
  };

  const handleSoundSelect = (sound) => {
    if (activeNote !== null) {
      onSoundChange(activeNote, sound);
    }
    onClose();
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <motion.div
        initial={{ scale: 0.8, y: -100 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-[0_0_20px_rgba(81,111,255,0.6)] max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-gray-700"
      >
        <h4 className="text-2xl font-bold text-white mb-8 text-center">Select Sound</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {soundKeys.map((sound) => (
            <motion.div
              key={sound}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors shadow-[0_0_10px_rgba(81,111,255,0.6)]"
            >
              <motion.span
                onClick={() => handleSoundPreview(sound)}
                whileHover={{ scale: 1.05, color: '#9333ea' }}
                className="text-white text-base font-medium cursor-pointer mb-3"
                title="Click to preview"
              >
                {sound}
              </motion.span>
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(81, 111, 255, 0.8)' }}
                onClick={() => handleSoundSelect(sound)}
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full"
              >
                Select
              </motion.button>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(239, 68, 68, 0.8)' }}
          onClick={onClose}
          className="mt-8 w-full px-6 py-3 bg-red-600 text-white rounded-full font-semibold text-lg"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SoundSelectorPopup;