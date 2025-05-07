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
          customPieces={{
            wP: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#ff80bf" stroke="#ff80bf" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z"/>
                        </svg>
                      </div>,
            wR: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#ff80bf" stroke="#ff80bf" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z"/>
                          <path d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z"/>
                          <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z"/>
                          <path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z"/>
                          <path d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z"/>
                          <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z"/>
                        </svg>
                      </div>,
            wN: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#ff80bf" stroke="#ff80bf" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"/>
                          <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"/>
                        </svg>
                      </div>,
            wB: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#ff80bf" stroke="#ff80bf" strokeWidth="1.5" strokeLinecap="round">
                          <g>
                            <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"/>
                            <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"/>
                            <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"/>
                          </g>
                        </svg>
                      </div>,
            wQ: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#ff80bf" stroke="#ff80bf" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"/>
                          <path d="M 9 26 A 2 2 0 1 1  5,26 A 2 2 0 1 1  9 26 z"/>
                          <path d="M 9 39 A 2 2 0 1 1  5,39 A 2 2 0 1 1  9 39 z"/>
                          <path d="M 22 13 A 2 2 0 1 1  18,13 A 2 2 0 1 1  22 13 z"/>
                          <path d="M 22 26 A 2 2 0 1 1  18,26 A 2 2 0 1 1  22 26 z"/>
                          <path d="M 22 39 A 2 2 0 1 1  18,39 A 2 2 0 1 1  22 39 z"/>
                          <path d="M 35 13 A 2 2 0 1 1  31,13 A 2 2 0 1 1  35 13 z"/>
                          <path d="M 35 26 A 2 2 0 1 1  31,26 A 2 2 0 1 1  35 26 z"/>
                          <path d="M 35 39 A 2 2 0 1 1  31,39 A 2 2 0 1 1  35 39 z"/>
                          <path d="M 9,13 L 22,26 L 35,13"/>
                          <path d="M 9,26 L 22,13 L 35,26"/>
                          <path d="M 9,39 L 22,26 L 35,39"/>
                          <path d="M 9,13 L 9,39"/>
                          <path d="M 22,13 L 22,39"/>
                          <path d="M 35,13 L 35,39"/>
                        </svg>
                      </div>,
            wK: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#ff80bf" stroke="#ff80bf" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M 22.5,11.63 L 22.5,6"/>
                          <path d="M 20,8 L 25,8"/>
                          <path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"/>
                          <path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z"/>
                          <path d="M 11.5,30 C 17,27 27,27 32.5,30"/>
                          <path d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"/>
                          <path d="M 11.5,37 C 17,34 27,34 32.5,37"/>
                        </svg>
                      </div>,
            bP: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#80ceff" stroke="#80ceff" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z"/>
                        </svg>
                      </div>,
            bR: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#80ceff" stroke="#80ceff" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z"/>
                          <path d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z"/>
                          <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z"/>
                          <path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z"/>
                          <path d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z"/>
                          <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z"/>
                        </svg>
                      </div>,
            bN: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#80ceff" stroke="#80ceff" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"/>
                          <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"/>
                        </svg>
                      </div>,
            bB: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#80ceff" stroke="#80ceff" strokeWidth="1.5" strokeLinecap="round">
                          <g>
                            <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"/>
                            <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"/>
                            <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"/>
                          </g>
                        </svg>
                      </div>,
            bQ: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#80ceff" stroke="#80ceff" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"/>
                          <path d="M 9 26 A 2 2 0 1 1  5,26 A 2 2 0 1 1  9 26 z"/>
                          <path d="M 9 39 A 2 2 0 1 1  5,39 A 2 2 0 1 1  9 39 z"/>
                          <path d="M 22 13 A 2 2 0 1 1  18,13 A 2 2 0 1 1  22 13 z"/>
                          <path d="M 22 26 A 2 2 0 1 1  18,26 A 2 2 0 1 1  22 26 z"/>
                          <path d="M 22 39 A 2 2 0 1 1  18,39 A 2 2 0 1 1  22 39 z"/>
                          <path d="M 35 13 A 2 2 0 1 1  31,13 A 2 2 0 1 1  35 13 z"/>
                          <path d="M 35 26 A 2 2 0 1 1  31,26 A 2 2 0 1 1  35 26 z"/>
                          <path d="M 35 39 A 2 2 0 1 1  31,39 A 2 2 0 1 1  35 39 z"/>
                          <path d="M 9,13 L 22,26 L 35,13"/>
                          <path d="M 9,26 L 22,13 L 35,26"/>
                          <path d="M 9,39 L 22,26 L 35,39"/>
                          <path d="M 9,13 L 9,39"/>
                          <path d="M 22,13 L 22,39"/>
                          <path d="M 35,13 L 35,39"/>
                        </svg>
                      </div>,
            bK: () => <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 45 45" width="80%" height="80%" fill="#80ceff" stroke="#80ceff" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M 22.5,11.63 L 22.5,6"/>
                          <path d="M 20,8 L 25,8"/>
                          <path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"/>
                          <path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z"/>
                          <path d="M 11.5,30 C 17,27 27,27 32.5,30"/>
                          <path d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"/>
                          <path d="M 11.5,37 C 17,34 27,34 32.5,37"/>
                        </svg>
                      </div>
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ChessBoard;
