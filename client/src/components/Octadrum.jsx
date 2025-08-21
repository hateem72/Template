import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Tone from 'tone';
import PadSelector from '../components/PadSelector';
import SoundSelectorPopup from '../components/SoundSelectorPopup';
import Patch from '../components/Patch';
import { DRUM_SOUNDS } from '../sounds';
import { setupMidi } from '../setupMidi';

const MIDI_NOTES = [47, 45, 36, 41, 48, 38, 40, 43];

const Octadrum = () => {
  const [selectedSounds, setSelectedSounds] = useState(
    MIDI_NOTES.reduce((acc, note) => ({ ...acc, [note]: 'Kick01' }), {})
  );
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [lastTriggerTime, setLastTriggerTime] = useState({});
  const [players, setPlayers] = useState(
    MIDI_NOTES.reduce((acc, note) => ({ ...acc, [note]: null }), {})
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const soundKeys = Object.keys(DRUM_SOUNDS);
  const DEBOUNCE_TIME = 300;

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // MIDI setup
  useEffect(() => {
    if (isAudioStarted && players) {
      setupMidi((note) => {
        if (MIDI_NOTES.includes(note) && players[note]) {
          const now = Date.now();
          const lastTime = lastTriggerTime[note] || 0;
          if (now - lastTime < DEBOUNCE_TIME) return;
          console.log(`Triggering sound for note ${note}`);
          if (players[note].state === 'started') players[note].stop();
          players[note].start(0);
          setLastTriggerTime((prev) => ({ ...prev, [note]: now }));
        }
      });
    }
  }, [players, isAudioStarted]);

  const startAudio = async () => {
    if (!isAudioStarted) {
      await Tone.start();
      console.log('Audio context started');
      const newPlayers = {};
      MIDI_NOTES.forEach((note) => {
        const sound = selectedSounds[note];
        newPlayers[note] = new Tone.Player({
          url: DRUM_SOUNDS[sound],
          onload: () => console.log(`${sound} loaded for note ${note}`),
        }).toDestination();
      });
      setPlayers(newPlayers);
      setIsAudioStarted(true);
    }
  };

  const handleSoundChange = (note, sound) => {
    console.log(`Changing sound for note ${note} to ${sound}`);
    setSelectedSounds((prev) => ({ ...prev, [note]: sound }));
    if (isAudioStarted && players[note]) {
      players[note].stop(); // Stop the current sound
      players[note].dispose(); // Dispose of the old player
      const newPlayer = new Tone.Player({
        url: DRUM_SOUNDS[sound],
        onload: () => console.log(`${sound} loaded for note ${note}`),
      }).toDestination();
      setPlayers((prev) => ({ ...prev, [note]: newPlayer }));
    }
  };

  const handlePadClick = (note) => {
    if (!isAudioStarted) {
      startAudio();
    } else if (players && players[note] && players[note].loaded) {
      const sound = selectedSounds[note];
      console.log(`Pad Clicked: Note ${note}, Sound: ${sound}`);
      if (players[note].state === 'started') {
        players[note].stop();
      }
      players[note].start(0);
    }
  };

  const handleOpenPopup = (note) => {
    setActiveNote(note);
    setIsPopupOpen(true);
  };

  const handlePatchSelect = (patch) => {
    console.log('Applying patch:', patch);
    // Stop and dispose of all existing players
    Object.values(players).forEach((player) => {
      if (player) {
        if (player.state === 'started') player.stop();
        player.dispose();
      }
    });

    // Set new sounds
    setSelectedSounds(patch);

    if (isAudioStarted) {
      const newPlayers = {};
      MIDI_NOTES.forEach((note) => {
        newPlayers[note] = new Tone.Player({
          url: DRUM_SOUNDS[patch[note]],
          onload: () => console.log(`${patch[note]} loaded for note ${note}`),
        }).toDestination();
      });
      setPlayers(newPlayers);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
      {/* Custom Cursor */}
      <div
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out ${
          isHovering
            ? 'scale-150 bg-gradient-to-r from-blue-500 to-purple-600'
            : 'bg-gradient-to-r from-blue-400 to-indigo-500 opacity-70'
        }`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center py-16"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 shadow-[0_0_10px_rgba(81,111,255,0.8)]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          OCTADRUM
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl text-gray-300 mt-4"
        >
          Your Beginner's Gateway to Rhythm Mastery
        </motion.p>
      </motion.header>

      {/* Octapad Section */}
      <main className="flex-1 flex justify-center items-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="p-8 rounded-xl bg-opacity-10 bg-gray-800 shadow-[0_0_20px_rgba(81,111,255,0.6)]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {!isAudioStarted && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(81, 111, 255, 0.8)' }}
              transition={{ duration: 0.5 }}
              onClick={startAudio}
              className="mb-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-[0_0_10px_rgba(81,111,255,0.8)]"
            >
              Start Audio
            </motion.button>
          )}
          <Patch onPatchSelect={handlePatchSelect} />
          <motion.div
            className="grid grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, staggerChildren: 0.2 }}
          >
            {MIDI_NOTES.map((note, idx) => (
              <PadSelector
                key={note}
                note={note}
                padNumber={idx + 1}
                selectedSound={selectedSounds[note]}
                onPadClick={handlePadClick}
                onOpenPopup={handleOpenPopup}
              />
            ))}
          </motion.div>
          {/* Patch Selector */}
          
        </motion.div>
      </main>

      {/* Sound Selector Popup */}
      <SoundSelectorPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        drumSounds={DRUM_SOUNDS}
        onSoundChange={handleSoundChange}
        activeNote={activeNote}
      />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="text-center py-8 text-gray-400"
      >
        <p>© 2025 OCTADRUM | Crafted for Beat Enthusiasts</p>
      </motion.footer>

      {/* Inline CSS */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        body {
          margin: 0;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a2e;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #516fff, #9333ea);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Octadrum;