// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  
  window.Board = Backbone.Model.extend({

   
    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },
    

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') && 
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/
    //we created a helper function to check a given array for conflicts
    hasConflictInArray: function(arr) {
      return arr.reduce((sum, num) => sum + num, 0) > 1 ? true : false;
    },

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    hasRowConflictAt: function(rowIndex) {
      return this.hasConflictInArray(this.get(rowIndex));
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // Get rows of board
      // Iterate through every row
      // - if hasRowConflictAt is true, return true
      // Otherwise return false
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // Get rows and assign to rows variable
      // Create column variable and set to empty array
      // Loop through rows
      // - Push element of each row at colIndex
      // Check if sum of column is greater than 1, using new helper function
      // Returns true if there is more than one piece in a column
      
      var rows = this.rows();
      var col = [];
      
      for (var i = 0; i < rows.length; i++) {
        col.push(rows[i][colIndex]);
      }
      return this.hasConflictInArray(col); 
      // return col.reduce((sum, num) => sum + num, 0) > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // Get rows and assign to rows variable
      // Loop through each column index
      // - Loop through each row
      // -- Push element of at each column index for row index
      //  Check if column array has a conflict
      // Otherwise return false
      
      var rows = this.rows();
      var n = this.get('n');
      
      for (var colIdx = 0; colIdx < n; colIdx++) {
        var col = [];

        for (var rowIdx = 0; rowIdx < n; rowIdx++) {
          col.push(rows[rowIdx][colIdx]);
        }
        if (this.hasConflictInArray(col)) {
          return true;
        }
      }
            
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //assign rowIdx = 0; 
      //get our rows array of arrays
      //assign colIdx to passed in parameter
      
      //create empty column array
      
      //create for loop to push n values into our column array, 
      //we will push in our row[rowIdx][colIdx], increment rowIdx and colIdx
      
      var rows = this.rows();
      var n = this.get('n');
      var diagonal = [];
      var rowIdx = 0;
      var colIdx = majorDiagonalColumnIndexAtFirstRow;
      
      for (var i = 0; i < n; i++) {
        var square = rows[rowIdx][colIdx];
        
        if (square !== undefined) {
          diagonal.push(square);
        }
        rowIdx++;
        colIdx++;
      }
      
      return this.hasConflictInArray(diagonal);
      
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      
      // iterate over the possible first row column indexes for diagonals (from -n + 2 to n - 2)
      // call hasMajorDiagonalConflictAt for each iteration
      // return true immediately if above is true
      var n = this.get('n');
      
      for (var i = -n + 2; i < n - 1; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      
      return false;
      
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      
      var rows = this.rows();
      var n = this.get('n');
      var diagonal = [];
      var rowIdx = 0;
      var colIdx = minorDiagonalColumnIndexAtFirstRow;
      
      for (var i = 0; i < n; i++) {

        var square = rows[rowIdx][colIdx];
        
        
        if (square !== undefined) {
          diagonal.push(square);
        }
        rowIdx++;
        colIdx--;
      }
      
      return this.hasConflictInArray(diagonal);
      
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      
      var n = this.get('n');
      
      for (var i = 1; i < 2 * n - 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
