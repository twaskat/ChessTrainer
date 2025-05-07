import React, { useEffect, useState, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { useChessTutorial } from '../lib/stores/useChessTutorial';
import { Card, CardContent } from './ui/card';

// Define a simpler structure for our internal usage
type ArrowData = { from: string; to: string; color: string };

const ChessBoard: React.FC = () => {
  const { chess, highlightSquares, showArrow, getCurrentStep } = useChessTutorial();
  const [boardWidth, setBoardWidth] = useState(500);
  const currentStep = getCurrentStep();

  // Create custom square styles for highlighting
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    
    // Add styles for highlighted squares
    highlightSquares.forEach(square => {
      styles[square] = {
        background: 'radial-gradient(circle, rgba(0, 128, 128, 0.4) 25%, transparent 25%)',
        borderRadius: '50%',
      };
    });
    
    return styles;
  }, [highlightSquares]);

  // Setup custom arrows for showing moves
  const customArrows = useMemo(() => {
    // Return a simple string array format that Chessboard can understand
    return showArrow ? [[showArrow.from, showArrow.to, '#00bcd4']] : [];
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
      <Card className="shadow-lg">
        <CardContent className="flex items-center justify-center h-80">
          <p className="text-muted-foreground">Loading chess board...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardContent className="p-1" id="chess-board-container">
        <Chessboard
          id="tutorial-board"
          position={chess.fen()}
          boardWidth={boardWidth}
          customSquareStyles={customSquareStyles}
          customArrows={customArrows}
          areArrowsAllowed={false}
          boardOrientation="white"
          showBoardNotation={true}
          animationDuration={300}
          customDarkSquareStyle={{ backgroundColor: '#2D3748' }} // Dark grey
          customLightSquareStyle={{ backgroundColor: '#E2E8F0' }} // Light grey
          customPieces={{
            // Use SVG pieces from the alpha set in the public folder
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ChessBoard;
