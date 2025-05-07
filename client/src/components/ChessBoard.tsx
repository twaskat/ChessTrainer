import React, { useEffect, useState, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { useChessTutorial } from '../lib/stores/useChessTutorial';
import { Card, CardContent } from './ui/card';

const ChessBoard: React.FC = () => {
  const { chess, highlightSquares, showArrow, getCurrentStep } = useChessTutorial();
  const [boardWidth, setBoardWidth] = useState(500);
  const currentStep = getCurrentStep();

  // Create custom square styles for highlighting
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    
    // Add styles for highlighted squares with futuristic glow
    highlightSquares.forEach(square => {
      styles[square] = {
        background: 'radial-gradient(circle, rgba(0, 230, 255, 0.3) 30%, transparent 30%)',
        boxShadow: 'inset 0 0 15px rgba(0, 230, 255, 0.5)',
        borderRadius: '50%',
      };
    });
    
    return styles;
  }, [highlightSquares]);

  // Setup custom arrows for showing moves
  // Casting to any to bypass type checking for arrows
  const customArrows = useMemo(() => {
    // Bright cyan color for a futuristic glow effect
    return showArrow ? [[showArrow.from, showArrow.to, '#00e6ff']] as any : [];
  }, [showArrow]);

  // Responsive board size
  useEffect(() => {
    const handleResize = () => {
      const boardContainer = document.getElementById('chess-board-container');
      if (boardContainer) {
        // Set the board width to be responsive to container size
        const width = Math.min(
          boardContainer.offsetWidth - 8, // Minimal padding
          window.innerHeight * 0.5 // Maximum height proportional to viewport
        );
        setBoardWidth(width);
      }
    };

    // Initial size
    handleResize();
    
    // Resize event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!chess) {
    return (
      <Card className="shadow-sm bg-gradient-to-r from-[#12192d] to-[#121626] border-[#1a2742]">
        <CardContent className="flex items-center justify-center h-80">
          <p className="text-[#00e6ff] animate-pulse" style={{ textShadow: '0 0 5px rgba(0, 230, 255, 0.5)' }}>
            Loading chess board...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm overflow-hidden bg-gradient-to-r from-[#12192d] to-[#121626] border-[#1a2742]">
      <CardContent className="p-1" id="chess-board-container">
        <Chessboard
          id="tutorial-board"
          position={chess.fen()}
          boardWidth={boardWidth}
          customSquareStyles={customSquareStyles}
          // @ts-ignore - Bypassing type checking for arrows
          customArrows={customArrows}
          areArrowsAllowed={false}
          boardOrientation="white"
          showBoardNotation={true}
          animationDuration={300}
          customDarkSquareStyle={{ backgroundColor: '#121626' }} // Dark blue-gray
          customLightSquareStyle={{ backgroundColor: '#1d2b48' }} // Lighter blue-gray
        />
      </CardContent>
    </Card>
  );
};

export default ChessBoard;
