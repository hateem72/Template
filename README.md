import { useState, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { getDebateResponse, getDebateFeedback } from "../utils/aiHandler";
import { convertTextToSpeech } from "../utils/speech";
import { aiTrainers } from "../config/aiTrainers";
import FeedbackModal from "./FeedbackModal";
import { FaMicrophone, FaStop, FaPlay, FaRedo, FaChartBar, FaUserTie, FaChevronDown } from "react-icons/fa";

const Debate = () => {
  // State management
  const [selectedTrainer, setSelectedTrainer] = useState(aiTrainers[0]);
  const [topic, setTopic] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);
  const [debateStarted, setDebateStarted] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [fullTranscript, setFullTranscript] = useState("");
  const [lastTranscript, setLastTranscript] = useState("");
  const [isTrainerOpen, setIsTrainerOpen] = useState(false);
  const videoRef = useRef(null);

  // Speech recognition hooks
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Effects
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setIsBrowserSupported(false);
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    setIsUserSpeaking(listening);
  }, [listening]);

  useEffect(() => {
    if (listening && transcript) {
      const newWords = transcript.slice(lastTranscript.length).trim();
      if (newWords) {
        setFullTranscript(prev => (prev ? `${prev} ${newWords}` : newWords).trim());
      }
      setLastTranscript(transcript);
    }
  }, [transcript, listening]);

  useEffect(() => {
    if (!listening) {
      setLastTranscript("");
    }
  }, [listening]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log("Video play error:", e));
    }
  }, [isUserSpeaking]);

  // Speech handlers
  const startListening = () => {
    setFullTranscript("");
    setLastTranscript("");
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  // Debate flow functions
  const startDebate = async () => {
    if (!topic.trim()) {
      alert("Please enter a debate topic");
      return;
    }
    if (!isBrowserSupported) {
      alert("Browser doesn't support speech recognition");
      return;
    }

    setIsProcessing(true);
    setDebateStarted(true);

    try {
      const prompt = `As ${selectedTrainer.name}, a debate trainer, start a debate about "${topic}" (area: ${areaOfInterest}). 
      Provide an opening statement or question (2-3 sentences).`;
      
      const response = await getDebateResponse(selectedTrainer.name, topic, areaOfInterest, "", "");
      handleAIResponse(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAIResponse = async (response) => {
    const aiResponse = { speaker: "ai", text: response };
    setConversation(prev => [...prev, aiResponse]);
    setCurrentSubtitle(response);
    await convertTextToSpeech(
  response, 
  selectedTrainer.name,
);
  };

  const handleError = (error) => {
    console.error("Error:", error);
    setCurrentSubtitle("An error occurred. Please try again.");
  };

  const recordResponse = async () => {
    if (isProcessing) return;

    if (!listening) {
      return startListening();
    }

    setIsProcessing(true);
    stopListening();
    await new Promise(resolve => setTimeout(resolve, 800));

    if (fullTranscript.trim()) {
      const userMessage = { speaker: "user", text: fullTranscript };
      setConversation(prev => [...prev, userMessage]);

      const context = conversation.map(msg => `${msg.speaker}: ${msg.text}`).join("\n");
      const response = await getDebateResponse(
        selectedTrainer.name,
        topic,
        areaOfInterest,
        context,
        fullTranscript
      );
      handleAIResponse(response);
    }

    setIsProcessing(false);
    resetTranscript();
    setFullTranscript("");
    setLastTranscript("");
  };

  const endDebate = async () => {
    setIsProcessing(true);
    try {
      const feedback = await getDebateFeedback(topic, conversation);
      setFeedback(feedback);
      setShowFeedback(true);
    } catch (error) {
      setFeedback("Failed to generate feedback. Please try again.");
      setShowFeedback(true);
    } finally {
      setIsProcessing(false);
      setDebateStarted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Debate Practice
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Hone your argumentation skills with {selectedTrainer.name}, our {selectedTrainer.role.toLowerCase()}.
          </p>
        </div>
        
        {!isBrowserSupported && (
          <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-4 mb-8 rounded-lg">
            <p>Your browser doesn't support speech recognition. Please use Chrome or Edge.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Setup Panel - Dark Theme Redesign */}
          <div className="lg:col-span-1 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center gap-2">
              <FaMicrophone className="text-xl" />
              Debate Setup
            </h2>
            
            <div className="space-y-6">
              {/* Trainer Selection */}
              <div className="relative">
                <label className="block text-gray-300 mb-2 text-sm font-medium">AI Trainer</label>
                <div 
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-650 transition"
                  onClick={() => setIsTrainerOpen(!isTrainerOpen)}
                >
                  <div className="flex items-center gap-3">
                    <FaUserTie className="text-purple-400" />
                    <div>
                      <p className="font-medium text-white">{selectedTrainer.name}</p>
                      <p className="text-xs text-gray-400">{selectedTrainer.role}</p>
                    </div>
                  </div>
                  <FaChevronDown className={`text-gray-400 transition-transform ${isTrainerOpen ? 'transform rotate-180' : ''}`} />
                </div>
                
                {isTrainerOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg overflow-hidden">
                    {aiTrainers.map(trainer => (
                      <div
                        key={trainer.id}
                        className={`px-4 py-3 hover:bg-gray-600 cursor-pointer flex items-center gap-3 ${
                          selectedTrainer.id === trainer.id ? 'bg-gray-600' : ''
                        }`}
                        onClick={() => {
                          setSelectedTrainer(trainer);
                          setIsTrainerOpen(false);
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                        <div>
                          <p className="font-medium text-white">{trainer.name}</p>
                          <p className="text-xs text-gray-400">{trainer.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Topic Input */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Debate Topic</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="E.g. Should AI be regulated?"
                  disabled={debateStarted}
                />
              </div>
              
              {/* Area of Interest */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Area of Interest</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  value={areaOfInterest}
                  onChange={(e) => setAreaOfInterest(e.target.value)}
                  placeholder="Technology, Politics, etc."
                  disabled={debateStarted}
                />
              </div>
              
              {/* Start/End Debate Button */}
              {!debateStarted ? (
                <button
                  onClick={startDebate}
                  disabled={isProcessing || !topic.trim()}
                  className={`w-full py-3 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    isProcessing || !topic.trim()
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-purple-500/20'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Preparing...
                    </>
                  ) : (
                    <>
                      <FaPlay className="text-sm" /> Start Debate
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={endDebate}
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-lg font-bold hover:from-red-700 hover:to-pink-600 shadow-lg hover:shadow-red-500/20 transition-all flex items-center justify-center gap-2"
                  disabled={isProcessing}
                >
                  <FaChartBar /> Get Feedback
                </button>
              )}
            </div>
          </div>
          
          {/* Debate Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video and Controls */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
              <div className="flex flex-col items-center space-y-6">
                {/* Video Container */}
                <div className="w-full max-w-2xl">
                  <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                    <video
                      ref={videoRef}
                      src={isUserSpeaking ? selectedTrainer.listeningVideo : selectedTrainer.speakingVideo}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex justify-center mb-4">
                        <div className="relative w-16 h-16">
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                            <video
                              src={isUserSpeaking ? selectedTrainer.listeningVideo : selectedTrainer.speakingVideo}
                              autoPlay
                              loop
                              muted
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 rounded-full p-1 bg-green-500">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                          </div>
                        </div>
                      </div>
                      {/* AI Subtitle */}
                      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 text-center">
                        <p className="text-white font-medium">
                          {currentSubtitle || `${selectedTrainer.name} is ready to debate with you`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Response Controls */}
                {debateStarted && (
                  <div className="w-full max-w-2xl space-y-6">
                    <button
                      onClick={recordResponse}
                      className={`px-8 py-4 rounded-xl text-white w-full flex items-center justify-center gap-3 text-lg font-medium ${
                        listening 
                          ? "bg-red-600 hover:bg-red-700" 
                          : "bg-green-600 hover:bg-green-700"
                      } transition-colors shadow-lg`}
                      disabled={isProcessing}
                    >
                      {listening ? (
                        <>
                          <FaStop /> Stop Recording
                        </>
                      ) : (
                        <>
                          <FaMicrophone /> Record Response
                        </>
                      )}
                    </button>
                    
                    {/* Transcript Display */}
                    <div className="bg-gray-700 rounded-lg p-6">
                      <p className="font-medium text-gray-300 mb-2">Your response:</p>
                      <div className="min-h-20 p-4 bg-gray-800 rounded border border-gray-600">
                        <p className="text-white">
                          {listening 
                            ? fullTranscript || "Speak now, your words will appear here..."
                            : fullTranscript || "Press the button above to record your response"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Conversation History */}
            {conversation.length > 0 && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-400">
                  Debate Transcript
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {conversation.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        msg.speaker === "ai" 
                          ? "bg-purple-900/30 border-l-4 border-purple-500"
                          : "bg-blue-900/30 border-l-4 border-blue-500"
                      }`}
                    >
                      <strong className={`${
                        msg.speaker === "ai" 
                          ? "text-purple-400"
                          : "text-blue-400"
                      }`}>
                        {msg.speaker === "ai" ? selectedTrainer.name : "You"}:
                      </strong>
                      <p className="mt-1 text-white">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showFeedback && (
        <FeedbackModal 
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
          feedback={feedback}
          type="debate"
          topic={topic}
          trainerName={selectedTrainer.name}
        />
      )}
    </div>
  );
};

export default Debate;# SkillUp
