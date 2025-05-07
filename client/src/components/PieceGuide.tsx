import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Piece guide information
const pieces = [
  {
    id: 'pawn',
    name: 'Pawn',
    image: '/chesspieces/alpha/wP.svg',
    description: 'Moves forward one square, captures diagonally. Can move two squares on first move. Can be promoted when reaching the last rank.',
    value: 1
  },
  {
    id: 'knight',
    name: 'Knight',
    image: '/chesspieces/alpha/wN.svg',
    description: 'Moves in an L-shape: two squares in one direction and then one square perpendicular. Can jump over other pieces.',
    value: 3
  },
  {
    id: 'bishop',
    name: 'Bishop',
    image: '/chesspieces/alpha/wB.svg',
    description: 'Moves diagonally any number of squares. Cannot jump over other pieces.',
    value: 3
  },
  {
    id: 'rook',
    name: 'Rook',
    image: '/chesspieces/alpha/wR.svg',
    description: 'Moves horizontally or vertically any number of squares. Cannot jump over other pieces.',
    value: 5
  },
  {
    id: 'queen',
    name: 'Queen',
    image: '/chesspieces/alpha/wQ.svg',
    description: 'Combines the power of rook and bishop. Moves horizontally, vertically, or diagonally any number of squares.',
    value: 9
  },
  {
    id: 'king',
    name: 'King',
    image: '/chesspieces/alpha/wK.svg',
    description: 'Moves one square in any direction. Must be protected at all times. Can castle with a rook under certain conditions.',
    value: 'Invaluable'
  }
];

const PieceGuide: React.FC = () => {
  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="pb-1 pt-2 px-3">
        <CardTitle className="text-base">Chess Pieces</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <Tabs defaultValue="pawn" className="w-full">
          <TabsList className="grid grid-cols-6 mb-2 h-10 overflow-x-auto">
            {pieces.map(piece => (
              <TabsTrigger 
                key={piece.id} 
                value={piece.id}
                className="p-1"
              >
                <img 
                  src={piece.image} 
                  alt={piece.name} 
                  className="w-5 h-5 mx-auto"
                />
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="overflow-y-auto max-h-[80px]">
            {pieces.map(piece => (
              <TabsContent key={piece.id} value={piece.id} className="space-y-1">
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-medium">{piece.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    Value: {piece.value}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{piece.description}</p>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PieceGuide;
