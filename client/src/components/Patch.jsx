import React from 'react';
import { motion } from 'framer-motion';

const patches = {
  'Basic Kit': {
    47: 'Cymbal04',
    45: 'Tom1',
    36: 'Tom2',
    41: 'Tom3',
    48: 'Kick02',
    38: 'Snare03',
    40: 'OpenHat01',
    43: 'ClosedHat02',
  },
  'Electronic': {
    47: 'Kick02',
    45: 'Snare02',
    36: 'ClosedHat02',
    41: 'OpenHat02',
    48: 'Clap02',
    38: 'Cymbal02',
    40: 'StackedHit01',
    43: 'Shaker02',
  },
  'Percussion': {
    47: 'tabla1',
    45: 'tabla2',
    36: 'congo1',
    41: 'congo2',
    48: 'Tom2',
    38: 'Tom3',
    40: 'Cymbal03',
    43: 'tabla3',
  },
};

const Patch = ({ onPatchSelect }) => {
  return (
    <div className="mb-4 flex flex-wrap justify-center gap-4">
      {Object.keys(patches).map((patchName) => (
        <motion.button
          key={patchName}
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(147, 51, 234, 0.8)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPatchSelect(patches[patchName])}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-[0_0_10px_rgba(81,111,255,0.8)]"
        >
          {patchName}
        </motion.button>
      ))}
    </div>
  );
};

export default Patch;