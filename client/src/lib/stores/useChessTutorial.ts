import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Chess } from "chess.js";
import { tutorials } from "../../data/tutorials";
import { useAudio } from "./useAudio";
import { ChessInsight, getChessInsights } from "../queryClient";

export type HighlightSquare = string;

interface TutorialStep {
  fen: string;
  move: string;
  notation: string; // e.g. "e4", "Nf3"
  explanation: string;
  highlightSquares: HighlightSquare[];
  showArrow?: { from: string; to: string };
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: TutorialStep[];
}

interface ChessTutorialState {
  tutorials: Tutorial[];
  currentTutorialId: string | null;
  currentStepIndex: number;
  chess: Chess | null;
  highlightSquares: HighlightSquare[];
  showArrow: { from: string; to: string } | null;
  aiInsight: ChessInsight | null;
  isLoadingInsight: boolean;
  
  // Actions
  initialize: () => void;
  selectTutorial: (id: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (index: number) => void;
  restart: () => void;
  fetchAIInsight: () => Promise<void>;
  
  // Computed
  getCurrentTutorial: () => Tutorial | null;
  getCurrentStep: () => TutorialStep | null;
  getTotalSteps: () => number;
  getProgress: () => number; // 0 to 100
}

export const useChessTutorial = create<ChessTutorialState>()(
  subscribeWithSelector((set, get) => ({
    tutorials: [],
    currentTutorialId: null,
    currentStepIndex: 0,
    chess: null,
    highlightSquares: [],
    showArrow: null,
    aiInsight: null,
    isLoadingInsight: false,
    
    initialize: () => {
      set({ tutorials, currentTutorialId: tutorials[0].id, chess: new Chess() });
      // Initialize the first tutorial
      const firstTutorial = tutorials[0];
      const firstStep = firstTutorial.steps[0];
      
      const chess = new Chess();
      if (firstStep.fen) {
        chess.load(firstStep.fen);
      }
      
      set({
        currentTutorialId: firstTutorial.id,
        currentStepIndex: 0,
        chess,
        highlightSquares: firstStep.highlightSquares || [],
        showArrow: firstStep.showArrow || null,
        aiInsight: null,
      });
      
      // Fetch AI insight for the initial position
      setTimeout(() => {
        get().fetchAIInsight();
      }, 300);
    },
    
    selectTutorial: (id: string) => {
      const tutorial = get().tutorials.find(t => t.id === id);
      if (!tutorial) return;
      
      const firstStep = tutorial.steps[0];
      const chess = new Chess();
      
      if (firstStep.fen) {
        chess.load(firstStep.fen);
      }
      
      // Reset AI insight when selecting a new tutorial
      set({
        currentTutorialId: id,
        currentStepIndex: 0,
        chess,
        highlightSquares: firstStep.highlightSquares || [],
        showArrow: firstStep.showArrow || null,
        aiInsight: null
      });
      
      // Play success sound when tutorial is selected
      useAudio.getState().playSuccess();
      
      // Fetch AI insight for the initial position of the new tutorial
      setTimeout(() => {
        get().fetchAIInsight();
      }, 300);
    },
    
    nextStep: () => {
      const { currentStepIndex, getCurrentTutorial, chess } = get();
      const tutorial = getCurrentTutorial();
      
      if (!tutorial || !chess || currentStepIndex >= tutorial.steps.length - 1) return;
      
      const nextIndex = currentStepIndex + 1;
      const nextStep = tutorial.steps[nextIndex];
      
      // Make the move if it's not the first step
      if (nextStep.move) {
        try {
          chess.move(nextStep.move);
          // Play sound for a successful move
          useAudio.getState().playHit();
        } catch (error) {
          console.error("Invalid move:", error);
        }
      }
      
      // Reset AI insight when moving to the next step
      set({
        currentStepIndex: nextIndex,
        highlightSquares: nextStep.highlightSquares || [],
        showArrow: nextStep.showArrow || null,
        aiInsight: null
      });
      
      // Fetch AI insight for the new position
      setTimeout(() => {
        get().fetchAIInsight();
      }, 300);
    },
    
    previousStep: () => {
      const { currentStepIndex, getCurrentTutorial, chess } = get();
      const tutorial = getCurrentTutorial();
      
      if (!tutorial || !chess || currentStepIndex <= 0) return;
      
      const prevIndex = currentStepIndex - 1;
      const prevStep = tutorial.steps[prevIndex];
      
      // Load the previous position
      if (prevStep.fen) {
        chess.load(prevStep.fen);
      }
      
      // Reset AI insight when moving to the previous step
      set({
        currentStepIndex: prevIndex,
        highlightSquares: prevStep.highlightSquares || [],
        showArrow: prevStep.showArrow || null,
        aiInsight: null
      });
      
      // Fetch AI insight for the new position
      setTimeout(() => {
        get().fetchAIInsight();
      }, 300);
    },
    
    goToStep: (index: number) => {
      const { getCurrentTutorial, chess } = get();
      const tutorial = getCurrentTutorial();
      
      if (!tutorial || !chess || index < 0 || index >= tutorial.steps.length) return;
      
      const step = tutorial.steps[index];
      
      // Load the position directly
      if (step.fen) {
        chess.load(step.fen);
      }
      
      // Reset AI insight when jumping to a specific step
      set({
        currentStepIndex: index,
        highlightSquares: step.highlightSquares || [],
        showArrow: step.showArrow || null,
        aiInsight: null
      });
      
      // Fetch AI insight for the new position
      setTimeout(() => {
        get().fetchAIInsight();
      }, 300);
    },
    
    restart: () => {
      const { getCurrentTutorial, chess } = get();
      const tutorial = getCurrentTutorial();
      
      if (!tutorial || !chess) return;
      
      const firstStep = tutorial.steps[0];
      
      if (firstStep.fen) {
        chess.load(firstStep.fen);
      } else {
        chess.reset();
      }
      
      // Reset AI insight when restarting the tutorial
      set({
        currentStepIndex: 0,
        highlightSquares: firstStep.highlightSquares || [],
        showArrow: firstStep.showArrow || null,
        aiInsight: null
      });
      
      // Play success sound when restarting
      useAudio.getState().playSuccess();
      
      // Fetch AI insight for the initial position
      setTimeout(() => {
        get().fetchAIInsight();
      }, 300);
    },
    
    // Computed getters
    getCurrentTutorial: () => {
      const { tutorials, currentTutorialId } = get();
      return tutorials.find(t => t.id === currentTutorialId) || null;
    },
    
    getCurrentStep: () => {
      const { currentStepIndex, getCurrentTutorial } = get();
      const tutorial = getCurrentTutorial();
      return tutorial ? tutorial.steps[currentStepIndex] || null : null;
    },
    
    getTotalSteps: () => {
      const tutorial = get().getCurrentTutorial();
      return tutorial ? tutorial.steps.length : 0;
    },
    
    getProgress: () => {
      const { currentStepIndex, getTotalSteps } = get();
      const totalSteps = getTotalSteps();
      return totalSteps > 0 ? Math.round((currentStepIndex / (totalSteps - 1)) * 100) : 0;
    },
    
    fetchAIInsight: async () => {
      const { chess, getCurrentStep, getCurrentTutorial } = get();
      const currentStep = getCurrentStep();
      const currentTutorial = getCurrentTutorial();
      
      if (!chess || !currentStep || !currentTutorial) {
        return;
      }
      
      // Set loading state
      set({ isLoadingInsight: true });
      
      try {
        // Get previous step if it exists for context
        const prevStepIndex = get().currentStepIndex - 1;
        const prevStep = prevStepIndex >= 0 ? 
          currentTutorial.steps[prevStepIndex] : null;
        
        // Call API to get AI insights
        const insight = await getChessInsights({
          fen: chess.fen(),
          move: currentStep.move,
          notation: currentStep.notation,
          previousMove: prevStep?.move,
          difficulty: currentTutorial.difficulty
        });
        
        set({ 
          aiInsight: insight,
          isLoadingInsight: false 
        });
      } catch (error) {
        console.error("Error fetching AI insight:", error);
        set({ 
          aiInsight: {
            insight: "Unable to generate AI insights at this time.",
            tip: "Please continue with the tutorial as provided.",
            concept: "Error occurred while fetching insights."
          },
          isLoadingInsight: false 
        });
      }
    },
  }))
);
