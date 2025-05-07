import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import ChessBoard from "./components/ChessBoard";
import TutorialControls from "./components/TutorialControls";
import TutorialInstructions from "./components/TutorialInstructions";
import PieceGuide from "./components/PieceGuide";
import { useChessTutorial } from "./lib/stores/useChessTutorial";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { initializeAudio } = useAudio();
  const { initialize } = useChessTutorial();

  // Initialize the tutorial and audio system
  useEffect(() => {
    // Load audio assets
    const loadAudio = async () => {
      try {
        // Create audio elements
        const hitSound = new Audio('/sounds/hit.mp3');
        const successSound = new Audio('/sounds/success.mp3');
        
        // Set up audio store
        initializeAudio(hitSound, successSound);
        console.log("Audio initialized successfully");
      } catch (error) {
        console.error("Failed to initialize audio:", error);
      }
    };
    
    // Initialize the chess tutorial
    initialize();
    loadAudio();
    setIsLoaded(true);
  }, [initialize, initializeAudio]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#12192d] to-[#0d111d]">
        <div 
          className="animate-pulse text-[#00e6ff] text-xl"
          style={{ textShadow: '0 0 10px rgba(0, 230, 255, 0.6)' }}
        >
          Loading Chess Tutorial...
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-2 pb-10 overflow-y-auto">
          <div className="lg:col-span-2 space-y-2">
            <ChessBoard />
            <TutorialControls />
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[45vh] pb-2 md:max-h-none md:overflow-visible">
            <TutorialInstructions />
            <PieceGuide />
          </div>
        </div>
      </Layout>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
