
var see = function(pre = '', expr, post = '') {
  return console.log(`${pre} ** ${JSON.stringify(expr)} ** ${post}`);
};



/// hasRowConflictAt Tests ///
console.log('\nhasRowConflictAt tests'); 

var board1 = new Board({n: 4});

/*
0 [0,0,0,0] f
1 [0,1,0,1] t
2 [0,0,1,0] f
3 [0,0,0,0]
*/

board1.togglePiece(1, 1);
board1.togglePiece(1, 3);
board1.togglePiece(2, 2);

console.log(JSON.stringify(board1)); 

see('Expect board1.hasRowConflictAt(0)', board1.hasRowConflictAt(0), 'to equal *false* if there are no pieces in the row');
see('Expect board1.hasRowConflictAt(1)', board1.hasRowConflictAt(1), 'to equal *true* if there are 2 (or more) pieces in the row');
see('Expect board1.hasRowConflictAt(2)', board1.hasRowConflictAt(2), 'to equal *false* if there is only 1 pieces in the row');

/// hasAnyRowConflicts Tests ///
console.log('\nhasAnyRowConflicts tests'); 

var board2 = new Board({n: 4}); 

/*
0 [0,0,0,0] 
1 [0,1,0,0] 
2 [0,0,1,0] 
3 [0,0,0,0]
*/

board2.togglePiece(1, 1);
board2.togglePiece(2, 2);


see('Expect board1.hasAnyRowConflicts()', board1.hasAnyRowConflicts(), 'to equal *true* if there are more than two pieces on a row');
see('Expect board2.hasAnyRowConflicts()', board2.hasAnyRowConflicts(), 'to equal *false* if there are not more than two pieces on a row');


// hasColConflictAt Tests ///
console.log('\nhasColConflictAt tests'); 

var board3 = new Board({n: 4}); 

/*
0 [0,0,0,0] 
1 [0,1,0,0] 
2 [0,0,1,0] 
3 [0,1,0,0]
*/

board3.togglePiece(1, 1);
board3.togglePiece(2, 2);
board3.togglePiece(3, 1);


see('Expect board3.hasColConflictAt()', board3.hasColConflictAt(0), 'to equal *false* if there are not more than two pieces in a col');
see('Expect board3.hasColConflictAt()', board3.hasColConflictAt(1), 'to equal *true* if there are  more than two pieces in a col');
see('Expect board3.hasColConflictAt()', board3.hasColConflictAt(2), 'to equal *false* if there only 1 piece in a col');
see('Expect board3.hasColConflictAt()', board3.hasColConflictAt(3), 'to equal *false* if there are no pieces in a col');


/// hasAnyColConflicts Tests ///
console.log('\nhasAnyColConflicts tests'); 

see('Expect board1.hasAnyColConflicts()', board1.hasAnyColConflicts(), 'to equal *false* if no columns have more than two pieces on a column');
see('Expect board3.hasAnyColConflicts()', board3.hasAnyColConflicts(), 'to equal *true* if there are more than two pieces on a column');

// hasMajorDiagonalConflictAt Tests ///
console.log('\hasMajorDiagonalConflictAt tests'); 

var board4 = new Board({n: 4}); 

/*
0 [0,0,0,0] 
1 [0,1,1,0] 
2 [1,0,1,0] 
3 [0,1,0,0]
*/

board4.togglePiece(1, 1);
board4.togglePiece(1, 2);
board4.togglePiece(2, 0);
board4.togglePiece(2, 2);
board4.togglePiece(3, 1);


see('Expect board4.hasMajorDiagonalConflictAt(-3)', board4.hasMajorDiagonalConflictAt(-3), 'to equal *false* if there is only one item in diagonal');
see('Expect board4.hasMajorDiagonalConflictAt(-2)', board4.hasMajorDiagonalConflictAt(-2), 'to equal *true* if there are  more than two pieces in a diagonal starting from negative colIndex');
see('Expect board4.hasMajorDiagonalConflictAt(0)', board4.hasMajorDiagonalConflictAt(0), 'to equal *true* if there 2 pieces in a diagonal');
see('Expect board4.hasMajorDiagonalConflictAt(1)', board4.hasMajorDiagonalConflictAt(1), 'to equal *false* if there is only 1 piece in diagonal');
















