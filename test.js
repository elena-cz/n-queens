var board = new Board({n:4});

/*
0[0,0,0,0] f
1[0,1,0,1] t
2[0,0,1,0] f
3[0,0,0,0]
*/

console.log(JSON.stringify(board));

board.togglePiece(1, 1);
board.togglePiece(1, 3);
board.togglePiece(2, 2);

var see = function(pre = '', expr, post = '') {
  return console.log(`${pre} ** ${JSON.stringify(expr)} ** ${post}`);
};

 console.log('toggle:', JSON.stringify(board));
 
 
 //shorthand way to console log
 see('Expect', board.hasRowConflictAt(0), 'to equal *false* if there are no pieces in the row');
 see('Expect', board.hasRowConflictAt(1), 'to equal *true* if there are 2 (or more) pieces in the row');
 see('Expect', board.hasRowConflictAt(2), 'to equal *false* if there is only 1 pieces in the row');
