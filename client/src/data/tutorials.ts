import { Tutorial } from "../lib/stores/useChessTutorial";

// Define our chess tutorials
export const tutorials: Tutorial[] = [
  {
    id: "basics-of-chess",
    title: "Basics of Chess",
    description: "Learn how the pieces move and basic rules of chess",
    difficulty: "beginner",
    steps: [
      {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // Starting position
        move: "",
        notation: "",
        explanation: "Welcome to chess! This is the starting position. White pieces are at the bottom, and black pieces are at the top. Each player has 16 pieces: 8 pawns, 2 knights, 2 bishops, 2 rooks, a queen, and a king.",
        highlightSquares: []
      },
      {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        move: "e4",
        notation: "e4",
        explanation: "The most common opening move is to advance the king's pawn two squares. This controls the center of the board and opens lines for the queen and bishop to develop.",
        highlightSquares: ["e2", "e4"],
        showArrow: { from: "e2", to: "e4" }
      },
      {
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        move: "e5",
        notation: "e5",
        explanation: "Black often responds symmetrically with the same move. This also stakes a claim to the center of the board.",
        highlightSquares: ["e7", "e5"],
        showArrow: { from: "e7", to: "e5" }
      },
      {
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        move: "Nf3",
        notation: "Nf3",
        explanation: "White develops the king's knight, attacking the e5 pawn and preparing for kingside castling. Knights should be developed early as they can jump over other pieces.",
        highlightSquares: ["g1", "f3"],
        showArrow: { from: "g1", to: "f3" }
      },
      {
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
        move: "Nc6",
        notation: "Nc6",
        explanation: "Black develops the queen's knight, defending the e5 pawn and controlling the center. This is a key square for the knight.",
        highlightSquares: ["b8", "c6"],
        showArrow: { from: "b8", to: "c6" }
      },
      {
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        move: "Bc4",
        notation: "Bc4",
        explanation: "White develops the king's bishop to a powerful diagonal, eyeing the f7 square, which is a common weak point for black in the opening.",
        highlightSquares: ["f1", "c4"],
        showArrow: { from: "f1", to: "c4" }
      },
      {
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
        move: "Nf6",
        notation: "Nf6",
        explanation: "Black develops the king's knight, defending against any potential threats along the e4-h7 diagonal and preparing for kingside castling.",
        highlightSquares: ["g8", "f6"],
        showArrow: { from: "g8", to: "f6" }
      },
      {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
        move: "O-O",
        notation: "O-O",
        explanation: "White castles kingside, moving the king to safety and connecting the rooks. Castling is a special move that allows your king to move two squares towards a rook, and then the rook jumps over the king to the adjacent square.",
        highlightSquares: ["e1", "g1", "h1", "f1"],
        showArrow: { from: "e1", to: "g1" }
      },
      {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4",
        move: "Bc5",
        notation: "Bc5",
        explanation: "Black develops the king's bishop to a strong diagonal, mirroring white's bishop. This position is part of what's called the 'Italian Game' or 'Giuoco Piano' (quiet game).",
        highlightSquares: ["f8", "c5"],
        showArrow: { from: "f8", to: "c5" }
      },
      {
        fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 6 5",
        move: "d3",
        notation: "d3",
        explanation: "White plays a quiet move, supporting the e4 pawn and preparing to develop the queen's bishop. This is a solid, positional approach.",
        highlightSquares: ["d2", "d3"],
        showArrow: { from: "d2", to: "d3" }
      },
      {
        fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b kq - 0 5",
        move: "O-O",
        notation: "O-O",
        explanation: "Black also castles kingside, bringing the king to safety. Now both kings are castled and protected. The opening phase is nearly complete, and the middlegame is about to begin.",
        highlightSquares: ["e8", "g8", "h8", "f8"],
        showArrow: { from: "e8", to: "g8" }
      },
      {
        fen: "r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 1 6",
        move: "",
        notation: "",
        explanation: "Congratulations! You've completed the first tutorial on chess basics. Both sides have developed their pieces, castled their kings to safety, and controlled the center. These are the fundamental principles of a good chess opening.",
        highlightSquares: []
      }
    ]
  },
  {
    id: "pawn-structure",
    title: "Understanding Pawn Structure",
    description: "Learn how pawns form the backbone of chess strategy",
    difficulty: "intermediate",
    steps: [
      {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        move: "",
        notation: "",
        explanation: "Pawns are the soul of chess! In this tutorial, we'll learn about different pawn structures and how they influence your strategy.",
        highlightSquares: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"]
      },
      // Additional steps would follow but are omitted for brevity
      {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        move: "e4",
        notation: "e4",
        explanation: "We'll start with a common opening. The e4 pawn move fights for the center, opens lines for the bishop and queen, and prepares for kingside development.",
        highlightSquares: ["e2", "e4"],
        showArrow: { from: "e2", to: "e4" }
      }
    ]
  }
];
