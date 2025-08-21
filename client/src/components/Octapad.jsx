import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const OctadrumLanding = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activePad, setActivePad] = useState(null);
  const [audioStarted, setAudioStarted] = useState(false);

  const navigate = useNavigate();

  // Cursor tracking - Faster response
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation controls for sections
  const controls = {
    hero: useAnimation(),
    octapad: useAnimation(),
    features: useAnimation(),
    testimonials: useAnimation(),
    gallery: useAnimation(),
    specs: useAnimation(),
  };

  // Intersection observers
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [octapadRef, octapadInView] = useInView({ threshold: 0.3 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.3 });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.3 });
  const [galleryRef, galleryInView] = useInView({ threshold: 0.3 });
  const [specsRef, specsInView] = useInView({ threshold: 0.3 });

  // Trigger animations when elements come into view
  useEffect(() => {
    if (heroInView) controls.hero.start("visible");
    if (octapadInView) controls.octapad.start("visible");
    if (featuresInView) controls.features.start("visible");
    if (testimonialsInView) controls.testimonials.start("visible");
    if (galleryInView) controls.gallery.start("visible");
    if (specsInView) controls.specs.start("visible");
  }, [heroInView, octapadInView, featuresInView, testimonialsInView, galleryInView, specsInView]);

  // Handle pad click
  const handlePadClick = (padNumber) => {
    setActivePad(padNumber);
    setTimeout(() => setActivePad(null), 300);
  };

  // Start audio function
  const startAudio = () => {
    setAudioStarted(true);
    // In a real implementation, this would initialize Tone.js
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const padVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.15, rotate: 10, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
    active: {
      scale: [1, 1.3, 1],
      boxShadow: ["0 0 10px rgba(81, 111, 255, 0.8)", "0 0 40px rgba(147, 51, 234, 0.9)", "0 0 10px rgba(81, 111, 255, 0.8)"],
      transition: { duration: 0.4 },
    },
  };

  // Feature data
  const features = [
    { title: "Plug & Play", description: "Instant USB connectivity", icon: "🔌" },
    { title: "Arduino Powered", description: "Open-source customization", icon: "🛠️" },
    { title: "Beginner Friendly", description: "Learn rhythm easily", icon: "🎓" },
    { title: "Portable", description: "Practice anywhere", icon: "✈️" },
  ];


  const modelsData = [
    {
      title: 'OCTADRUM Basic',
      subtitle: 'ENTRY LEVEL',
      price: '₹1,500',
      features: [
        'Plug-and-play ready',
        '15 premium drum sounds',
        'Basic software console',
        '3 customizable pad settings',
      ],
      unavailableFeatures: [
        'Learn-to-play mode',
        'DAW integration',
      ],
      color: 'blue',
      buttonText: 'Get Started',
      delay: 0.2,
    },
    {
      title: 'OCTADRUM Pro',
      subtitle: 'PROFESSIONAL',
      price: '₹2,300',
      features: [
        'Plug-and-play ready',
        'Unlimited drum sounds',
        'Advanced software console',
        'Fully customizable pads',
        'Custom sound imports',
      ],
      unavailableFeatures: [
        'Learn-to-play mode',
      ],
      color: 'purple',
      buttonText: 'Upgrade Now',
      delay: 0.4,
      popular: true,
    },
    {
      title: 'OCTADRUM Premium',
      subtitle: 'PREMIUM',
      price: '₹3,500',
      features: [
        'Plug-and-play ready',
        'Unlimited drum sounds',
        'Pro software console',
        'Fully customizable pads',
        'Interactive learn-to-play mode',
        'Full DAW integration',
      ],
      unavailableFeatures: [],
      color: 'blue',
      buttonText: 'Go Premium',
      delay: 0.6,
      bestValue: true,
    },
  ];
  
  const comparisonData = [
    { feature: 'Plug-and-play functionality', basic: '✓', pro: '✓', premium: '✓' },
    { feature: 'Drum sounds', basic: '15', pro: 'Unlimited', premium: 'Unlimited+' },
    { feature: 'Software console', basic: 'Basic', pro: 'Advanced', premium: 'Pro' },
    { feature: 'Pad customization', basic: 'Limited', pro: 'Full', premium: 'Full+' },
    { feature: 'Sound imports', basic: '✗', pro: '✓', premium: '✓' },
    { feature: 'Learn-to-play mode', basic: '✗', pro: '✗', premium: '✓' },
    { feature: 'DAW integration', basic: '✗', pro: '✗', premium: '✓' },
    { feature: 'Future updates', basic: '✗', pro: '✓', premium: 'Priority' },
  ];

  
  // Testimonial data
  const testimonials = [
    { name: "Anoop Gupta", quote: "make it durable i'll be the first buyer", role: "Music Teacher" },
    { name: "Rohit John", quote: "Amazing !! will be very usefull for my Students", role: "Music Teacher" },
    { name: "Harssh Bharti", quote: "complete it , i will make music from it ", role: "Drummer" },
  ];

  // Gallery data
  const galleryImages = [
    { src: "https://via.placeholder.com/600x400?text=Octadrum+In+Action", alt: "Octadrum on stage" },
    { src: "https://via.placeholder.com/600x400?text=Portable+Design", alt: "Portable Octadrum" },
    { src: "https://via.placeholder.com/600x400?text=Arduino+Setup", alt: "Arduino integration" },
  ];

  // Tech Specs data
  const specs = [
    { label: "Dimensions", value: "25 x 25 x 5 cm" },
    { label: "Weight", value: "1.2 kg" },
    { label: "Connectivity", value: "USB-C, MIDI" },
    { label: "Pads", value: "8 velocity-sensitive" },
    { label: "Power", value: "USB-powered" },
    { label: "Compatibility", value: "Windows, macOS, iOS, Android" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-x-hidden" style={{ fontFamily: "'Orbitron', sans-serif" }}>
      {/* Custom Cursor - Faster and snappier */}
      <motion.div
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 ${
          isHovering
            ? 'scale-150 bg-gradient-to-r from-blue-500 to-purple-600'
            : 'bg-gradient-to-r from-blue-400 to-indigo-500 opacity-70'
        }`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          boxShadow: isHovering ? '0 0 25px rgba(147, 51, 234, 0.9)' : '0 0 15px rgba(81, 111, 255, 0.5)',
        }}
        transition={{ duration: 0.05, ease: 'linear' }} // Faster transition
      />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center sticky top-0 z-40 bg-gray-900/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        >
          OCTADRUM
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-6"
        >
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#octapad" className="hover:text-purple-400 transition-colors">Try It</a>
          <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Reviews</a>
          <a href="#" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:shadow-[0_0_15px_rgba(81,111,255,0.8)] transition-all">
            Get Started
          </a>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <motion.section
      ref={heroRef}
      initial="hidden"
      animate={controls.hero}
      variants={containerVariants}
      className="min-h-[100vh] flex flex-col justify-center items-center text-center px-4 py-16 relative overflow-hidden"
      id="hero"
    >
      {/* Enhanced Particle Background */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.3,
              opacity: 0,
            }}
            animate={{
              x: [null, (Math.random() - 0.5) * 300],
              y: [null, (Math.random() - 0.5) * 300],
              opacity: [0, 0.5, 0],
              transition: {
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
            }}
            style={{
              width: `${Math.random() * 15 + 10}px`,
              height: `${Math.random() * 15 + 10}px`,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>

      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-10"
        initial={{ scale: 0.9 }}
        animate={{
          scale: [0.9, 1.1, 0.9],
          transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(81, 111, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(81, 111, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Pulsing Gradient Overlay */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          background: `radial-gradient(circle at center,
            rgba(81, 111, 255, 0.4) 0%,
            rgba(124, 58, 237, 0.3) 40%,
            transparent 70%)`,
        }}
      />

      {/* Main Content */}
      <motion.div variants={itemVariants} className="max-w-4xl mx-auto relative">
        {/* Floating Octapad Visual */}
        <motion.div
          className="absolute -top-40 -right-20 md:-right-10 w-64 h-64 md:w-80 md:h-80 -z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 0.5,
            y: [0, -10, 0],
            rotate: [0, 10, 0],
            transition: {
              delay: 0.5,
              duration: 15,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            },
          }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="url(#octapadGradient)"
              strokeWidth="3"
              strokeDasharray="5,5"
            />
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x = 100 + 60 * Math.cos(angle);
              const y = 100 + 60 * Math.sin(angle);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="15"
                  fill="none"
                  stroke="url(#octapadGradient)"
                  strokeWidth="3"
                  initial={{ scale: 0.5 }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                    transition: {
                      delay: i * 0.1,
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />
              );
            })}
            <defs>
              <linearGradient id="octapadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Title with Extreme Glow */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            textShadow: [
              "0 0 10px rgba(81, 111, 255, 0.7)",
              "0 0 30px rgba(81, 111, 255, 0.9)",
              "0 0 50px rgba(124, 58, 237, 0.8)",
              "0 0 30px rgba(81, 111, 255, 0.9)",
              "0 0 10px rgba(81, 111, 255, 0.7)",
            ],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          OCTADRUM
        </motion.h1>

        {/* Subtitle with Typewriter Effect */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto relative"
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"
          />
          <span className="relative">
            Revolutionizing rhythm with Arduino-powered precision
          </span>
        </motion.p>

        {/* CTA Button with Particle Burst */}
        <motion.div variants={itemVariants} className="relative">
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 30px rgba(147, 51, 234, 0.9)",
              background: [
                "linear-gradient(to right, #3b82f6, #8b5cf6)",
                "linear-gradient(to right, #8b5cf6, #3b82f6)",
                "linear-gradient(to right, #3b82f6, #8b5cf6)",
              ],
              transition: { duration: 1.5, repeat: Infinity },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={startAudio}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-[0_0_20px_rgba(81,111,255,0.8)] relative overflow-hidden"
          >
            <span className="relative z-10">
              {audioStarted ? "Audio Unleashed!" : "Start Rhythm Journey"}
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0"
              animate={{
                opacity: [0, 0.5, 0],
                transition: { duration: 2, repeat: Infinity },
              }}
            />
          </motion.button>

          {/* Button Glow */}
          <motion.div
            className="absolute inset-0 -z-10 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
              transition: { duration: 2, repeat: Infinity },
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(81, 111, 255, 0.8) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div variants={itemVariants} className="mt-16">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-purple-400 mx-auto drop-shadow-[0_0_10px_rgba(124,58,237,0.7)]"
          >
            <path
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
            className="text-sm text-purple-300 mt-2"
          >
            EXPLORE THE EXPERIENCE
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>

      {/* Octapad Section */}
      <motion.section
        ref={octapadRef}
        initial="hidden"
        animate={controls.octapad}
        variants={containerVariants}
        className="py-20 px-4 bg-gradient-to-b from-gray-800/50 to-gray-900/0 relative"
        id="octapad"
      >
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-2xl animate-pulse"
        />
        <div className="container mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Interactive Octapad
          </motion.h2>
          <motion.div variants={containerVariants} className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <motion.div variants={itemVariants} className="relative">
              <div className="p-8 rounded-2xl bg-gray-800/70 backdrop-blur-md border border-gray-700 shadow-[0_0_40px_rgba(81,111,255,0.4)]">
                <div className="grid grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((pad) => (
                    <motion.div key={pad} variants={itemVariants} className="flex flex-col items-center">
                      <motion.div
                        variants={padVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        animate={activePad === pad ? "active" : "rest"}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() => handlePadClick(pad)}
                        className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer ${
                          activePad === pad
                            ? 'bg-gradient-to-br from-blue-400 to-purple-500'
                            : 'bg-gradient-to-br from-blue-600 to-indigo-700'
                        } shadow-[0_0_20px_rgba(81,111,255,0.7)]`}
                      >
                        <span className="text-white text-xl font-bold">Pad {pad}</span>
                      </motion.div>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-300 mb-1">Note: {36 + pad}</p>
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(147, 51, 234, 0.7)' }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 text-xs bg-gray-700 rounded-full mt-1"
                        >
                          Change Sound
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div variants={itemVariants} className="mt-8 flex justify-center">
                  <motion.select
                    whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(81, 111, 255, 0.6)' }}
                    className="bg-gray-700 border border-gray-600 rounded-full px-4 py-2 text-sm text-gray-200"
                  >
                    <option>Select Drum Kit</option>
                    <option>Electronic Kit</option>
                    <option>Rock Kit</option>
                    <option>Hip-Hop Kit</option>
                    <option>Custom Kit</option>
                  </motion.select>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                className="absolute -top-12 -left-12 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl -z-10 animate-pulse"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.7 } }}
                className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl -z-10 animate-pulse"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="max-w-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Feel the Beat</h3>
              <p className="text-gray-300 mb-6">
                Experience seamless drumming with our Arduino-powered octapad. Plug it in, play instantly, and customize your sound with ease.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-blue-400 mr-3 mt-1">🎵</div>
                  <div>
                    <h4 className="font-semibold">Instant Setup</h4>
                    <p className="text-gray-400 text-sm">Plug-and-play with USB-C</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-purple-400 mr-3 mt-1">⚙️</div>
                  <div>
                    <h4 className="font-semibold">Fully Customizable</h4>
                    <p className="text-gray-400 text-sm">Tweak sounds via Arduino</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-indigo-400 mr-3 mt-1">🎹</div>
                  <div>
                    <h4 className="font-semibold">MIDI Ready</h4>
                    <p className="text-gray-400 text-sm">Sync with DAWs</p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(81, 111, 255, 0.9)' }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium"
                onClick={() => navigate('/console')}
              >
                Get Your Octadrum
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={controls.features}
        variants={containerVariants}
        className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-gray-800/0 relative"
        id="features"
      >
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-tl from-indigo-500/10 to-blue-500/10 blur-2xl animate-pulse"
        />
        <div className="container mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"
          >
            Why OCTADRUM Rocks
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto"
          >
            Built for beginners, loved by creators
          </motion.p>
          <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -15, boxShadow: "0 15px 30px rgba(81, 111, 255, 0.4)" }}
                className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 backdrop-blur-md"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-blue-400">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={testimonialsRef}
        initial="hidden"
        animate={controls.testimonials}
        variants={containerVariants}
        className="py-20 px-4 bg-gradient-to-b from-gray-800/50 to-gray-900/0 relative"
        id="testimonials"
      >
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 blur-2xl animate-pulse"
        />
        <div className="container mx-auto">
        <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"
          >
            What Users Say
          </motion.h2>
          <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(147, 51, 234, 0.3)" }}
                className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 backdrop-blur-md"
              >
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <h3 className="text-lg font-bold text-purple-400">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        ref={galleryRef}
        initial="hidden"
        animate={controls.gallery}
        variants={containerVariants}
        className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-gray-800/0 relative"
      >
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-tl from-blue-500/10 to-purple-500/10 blur-2xl animate-pulse"
        />
        <div className="container mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500"
          >
            OCTADRUM in Action
          </motion.h2>
          <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(81, 111, 255, 0.5)" }}
                className="relative overflow-hidden rounded-xl"
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end p-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white font-semibold">{image.alt}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Tech Specs Section */}
      <motion.section
        ref={specsRef}
        initial="hidden"
        animate={controls.specs}
        variants={containerVariants}
        className="py-20 px-4 bg-gradient-to-b from-gray-800/50 to-gray-900/0 relative"
      >
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 blur-2xl animate-pulse"
        />
        <div className="container mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"
          >
            Tech Specs
          </motion.h2>
          <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {specs.map((spec, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(81, 111, 255, 0.3)" }}
                className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 backdrop-blur-md flex justify-between items-center"
              >
                <span className="text-gray-300 font-semibold">{spec.label}</span>
                <span className="text-blue-400">{spec.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      {/* Development Timeline Section */}
<motion.section 
  className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  <div className="container mx-auto max-w-6xl">
    <motion.h2 
      className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
      initial={{ y: -20 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      Our Development Journey
    </motion.h2>

    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 -translate-x-1/2"></div>
      
      {/* Version items */}
      <div className="space-y-24">
        {/* Version 01 */}
        <motion.div 
          className="relative flex items-center justify-center gap-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-md p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-[0_0_20px_rgba(81,111,255,0.2)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">V-01</div>
              <div className="text-sm px-3 py-1 bg-gray-700 rounded-full">Prototype</div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Cardboard Based</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Basic functionality proof</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Less optimized design</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>High circuit cost</span>
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(81,111,255,0.8)]"></div>
        </motion.div>

        {/* Version 02 */}
        <motion.div 
          className="relative flex items-center justify-center gap-8 flex-row-reverse"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-md p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-[0_0_20px_rgba(81,111,255,0.2)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">V-02</div>
              <div className="text-sm px-3 py-1 bg-gray-700 rounded-full">First Production</div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Plastic Based</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Optimized design</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Minimal circuit cost</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Durable materials</span>
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(81,111,255,0.8)]"></div>
        </motion.div>

        {/* Version 02.1 */}
        <motion.div 
          className="relative flex items-center justify-center gap-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-md p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-[0_0_20px_rgba(81,111,255,0.2)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">V-02.1</div>
              <div className="text-sm px-3 py-1 bg-gray-700 rounded-full">Feature Update</div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Learning Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Note tracker integration</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Learn-to-play mode</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Beginner tutorials</span>
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(81,111,255,0.8)]"></div>
        </motion.div>

        {/* Version 02.2 */}
        <motion.div 
          className="relative flex items-center justify-center gap-8 flex-row-reverse"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-md p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-[0_0_20px_rgba(81,111,255,0.2)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">V-02.2</div>
              <div className="text-sm px-3 py-1 bg-gray-700 rounded-full">Epic Version</div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Professional Integration</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>DAW compatibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>MIDI 2.0 support</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Custom sound profiles</span>
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(81,111,255,0.8)]"></div>
        </motion.div>

        {/* Future Version */}
        <motion.div 
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-md p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-[0_0_20px_rgba(81,111,255,0.2)] text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mb-3">What's Next?</div>
            <p className="text-gray-300">We're constantly improving OCTADRUM with new features and capabilities</p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(81, 111, 255, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-medium"
            >
              Suggest a Feature
            </motion.button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(81,111,255,0.8)]"></div>
        </motion.div>
      </div>
    </div>
  </div>
</motion.section>

{/* Pricing & Models Section */}
<motion.section
      className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Choose Your Rhythm Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From beginner beatmaker to studio professional - we have the perfect OCTADRUM for you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {modelsData.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: model.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`relative overflow-hidden rounded-2xl border ${
                model.popular ? 'border-purple-500/50' : 'border-gray-700'
              } bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm ${
                model.popular ? 'shadow-[0_0_30px_rgba(124,58,237,0.3)]' : ''
              }`}
            >
              <div className={`absolute -top-1 -left-1 w-72 h-72 bg-${model.color}-500/10 rounded-full filter blur-3xl -z-10`}></div>
              {model.popular && (
                <div className="absolute top-0 right-0 bg-purple-600 text-xs font-bold px-3 py-1 rounded-bl-lg">
                  HERO PRODUCT
                </div>
              )}
              {model.bestValue && (
                <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-lg">
                  BEST VALUE
                </div>
              )}
              <div className="p-8 h-full flex flex-col">
                <div className="mb-6">
                  <div className={`text-sm font-semibold text-${model.color}-400 mb-2`}>
                    {model.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold">{model.title}</h3>
                </div>

                <div className="mb-8">
                  <div className="text-5xl font-bold mb-2">{model.price}</div>
                  <div className="text-gray-400">one-time payment</div>
                </div>

                <ul className="flex-1 space-y-4 mb-8">
                  {model.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className={`w-5 h-5 text-${model.color}-400 mr-3 mt-0.5 flex-shrink-0`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {model.unavailableFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start opacity-50">
                      <svg
                        className="w-5 h-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                      <span className="text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: `0 0 15px rgba(81, 111, 255, 0.5)` }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 ${
                    model.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-[0_0_15px_rgba(124,58,237,0.5)]'
                      : 'bg-gray-700'
                  } rounded-lg font-medium`}
                >
                  {model.buttonText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 font-semibold text-gray-300">Features</th>
                <th className="py-4 px-6 font-semibold text-blue-400">Basic</th>
                <th className="py-4 px-6 font-semibold text-purple-400">Pro</th>
                <th className="py-4 px-6 font-semibold text-blue-400">Premium</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map(({ feature, basic, pro, premium }, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-800/30' : ''}>
                  <td className="py-4 px-6 text-gray-300">{feature}</td>
                  <td className="py-4 px-6 text-center">{basic}</td>
                  <td className="py-4 px-6 text-center">{pro}</td>
                  <td className="py-4 px-6 text-center">{premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 text-center bg-gradient-to-b from-gray-900 to-gray-800 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse"
        />
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Drum Like a Pro?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the rhythm revolution with OCTADRUM today!
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-bold shadow-[0_0_25px_rgba(81,111,255,0.7)] hover:shadow-[0_0_40px_rgba(147,51,234,0.9)] transition-all">
              Order Now - 1499
            </button>
          </motion.div>
          <p className="mt-6 text-gray-400 text-sm">
            30-day money-back guarantee • Free worldwide shipping
          </p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800 text-center bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
              OCTADRUM
            </div>
            <div className="flex space-x-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
            </div>
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} OCTADRUM. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap');
        html {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: #111827;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 6px;
        }
        ::selection {
          background: rgba(147, 51, 234, 0.3);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default OctadrumLanding;