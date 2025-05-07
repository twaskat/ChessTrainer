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
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>Chess Pieces Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pawn" className="w-full">
          <TabsList className="grid grid-cols-6 mb-4 h-14">
            {pieces.map(piece => (
              <TabsTrigger 
                key={piece.id} 
                value={piece.id}
                className="p-1"
              >
                <img 
                  src={piece.image} 
                  alt={piece.name} 
                  className="w-8 h-8 mx-auto"
                />
              </TabsTrigger>
            ))}
          </TabsList>
          
          {pieces.map(piece => (
            <TabsContent key={piece.id} value={piece.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{piece.name}</h3>
                <span className="text-sm text-muted-foreground">
                  Value: {piece.value}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{piece.description}</p>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PieceGuide;
