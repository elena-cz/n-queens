/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// return A possible solution if there is more than 1
window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var board = new Board({n: n});
  
  for (var rowIdx = 0; rowIdx < n; rowIdx++) {
    for (var colIdx = 0; colIdx < n; colIdx++) {
      board.togglePiece(rowIdx, colIdx); // Toggle on to add piece
      if (board.hasRowConflictAt(rowIdx) || board.hasColConflictAt(colIdx)) {
        board.togglePiece(rowIdx, colIdx); // Toggle off to remove piece
      }
    }
  }
  
  solution = board.rows();
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

//return the num of solutions
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, board, rowIdx = 0) {
  //debugger;
  board = board || new Board({n: n});
  var solutionCount = 0;
  
  for (var colIdx = 0; colIdx < n; colIdx++) {
    board.togglePiece(rowIdx, colIdx);
    
    if (!board.hasColConflictAt(colIdx) && rowIdx === n - 1) {
      solutionCount++; 
    }
    
    if (!board.hasColConflictAt(colIdx) && rowIdx !== n - 1) {
      var count = countNRooksSolutions(n, board, rowIdx + 1);
      solutionCount = solutionCount + count;
    }
    board.togglePiece(rowIdx, colIdx);
  } 

  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
