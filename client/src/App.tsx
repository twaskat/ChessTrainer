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
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse text-primary text-xl">Loading Chess Tutorial...</div>
      </div>
    );
  }

  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-8 pb-20 overflow-y-auto">
          <div className="lg:col-span-2 space-y-6">
            <ChessBoard />
            <TutorialControls />
          </div>
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] pb-6 md:max-h-none md:overflow-visible">
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
