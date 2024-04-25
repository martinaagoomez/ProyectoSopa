document.addEventListener('DOMContentLoaded', function() {
    let grid = [ // definimos la cuadricula de letras y la lista de palabras
        ['B', 'R', 'S', 'D', 'L', 'Q', 'V', 'C', 'T', 'L', 'Q', 'F', 'Y', 'E', 'M'],
        ['C', 'O', 'L', 'A', 'Y', 'E', 'B', 'Q', 'A', 'I', 'A', 'G', 'W', 'Z', 'F'],
        ['I', 'I', 'S', 'I', 'G', 'R', 'O', 'E', 'L', 'C', 'G', 'L', 'N', 'C', 'D'],
        ['G', 'E', 'I', 'M', 'A', 'B', 'M', 'N', 'Z', 'A', 'A', 'R', 'P', 'P', 'M'],
        ['Y', 'P', 'W', 'I', 'R', 'Y', 'R', 'H', 'N', 'P', 'I', 'T', 'E', 'E', 'I'],
        ['B', 'W', 'I', 'K', 'R', 'Q', 'N', 'Q', 'E', 'S', 'V', 'F', 'U', 'A', 'F'],
        ['J', 'D', 'M', 'C', 'A', 'Y', 'L', 'K', 'J', 'H', 'Q', 'C', 'X', 'A', 'F'],
        ['L', 'H', 'A', 'G', 'S', 'N', 'W', 'N', 'A', 'I', 'C', 'X', 'B', 'S', 'O'],
        ['T', 'R', 'S', 'C', 'L', 'Z', 'A', 'U', 'A', 'G', 'R', 'N', 'J', 'X', 'R'],
        ['P', 'U', 'C', 'U', 'C', 'C', 'M', 'A', 'U', 'M', 'U', 'A', 'Q', 'B', 'X'],
        ['V', 'I', 'O', 'U', 'Q', 'I', 'P', 'S', 'Q', 'R', 'G', 'I', 'F', 'Q', 'W'],
        ['B', 'W', 'T', 'H', 'O', 'K', 'P', 'N', 'O', 'H', 'Z', 'J', 'L', 'A', 'B'],
        ['E', 'Z', 'A', 'Z', 'O', 'O', 'L', 'O', 'G', 'I', 'C', 'O', 'A', 'A', 'V'],
        ['C', 'Z', 'A', 'P', 'W', 'S', 'H', 'E', 'R', 'B', 'I', 'V', 'O', 'R', 'O'],
        ['T', 'K', 'N', 'O', 'I', 'L', 'N', 'I', 'U', 'V', 'S', 'T', 'G', 'N', 'F']
    ];

    let words = ["AGUILA", "CACATUA", "COLA", "GARRAS", "HERBIVORO", "JIRAFA", "LEON", "MASCOTA", "TIGRE", "ZOOLOGICO"];

    let wordGrid = document.getElementById('wordGrid');

    // crear la cuadricula de letras en el HTML
    for (let i = 0; i < grid.length; i++) { // bucle sobre las filas del grid
        let row = document.createElement('div'); // creamos un div para las cuadriculas 
        row.classList.add('word-row'); 
        for (let j = 0; j < grid[i].length; j++) { 
            let cell = document.createElement('div');
            cell.classList.add('word-cell');
            cell.textContent = grid[i][j];
            row.appendChild(cell);
        }
        wordGrid.appendChild(row);
    }


    // obten todas las celdas de la cuadricula de letras
    let cells = document.querySelectorAll('.word-cell');
    let wordsToFindItems = document.querySelectorAll('#tofindWordsList .word-to-find');

    // para cada celda, agrega un event listener que cambie su color cuando se haga clic en ella
    cells.forEach(cell => { 
        cell.addEventListener('click', function() { // cuando se haga clic en una celda se ejecuta la siguiente funcion
            if (cell.classList.contains('selected')) { // si hay una letra seleccionada y haces clic pasa a no estar seleccionada
                cell.classList.remove('selected');
            } else {
                cell.classList.add('selected'); // si hay una letra sin seleccionar y haces clic se selecciona
            }
            
            // unir las letras seleccionadas para formar una palabra
            let selectedWord = '';
            let selectedCells = document.querySelectorAll('.word-cell.selected');
            selectedCells.forEach(selectedCell => {
                selectedWord += selectedCell.textContent;
            });
            
            // verificar si la palabra está en la lista de palabras y marcarla como encontrada
            for (let i = 0; i < selectedWord.length; i++) {
                for (let j = i + 1; j <= selectedWord.length; j++) {
                    let subWord = selectedWord.substring(i, j);
                    if (words.includes(subWord)) {
                        markWordAsFound(subWord);
                    }
                }
            }
        });
    });
    
    let timeLeft = 100; 

    let timer = setInterval(function() {
        if (timeLeft <= 0){
            clearInterval (timer);
            alert("¡Tiempo agotado! Intentalo de nuevo");
            disableCellClick();
        } else {
            document.getElementById('countdown').textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);

    function disableCellClick(){
        cells.forEach(cell => {
            cell.removeEventListener('click', cellClickHandler); 
        })
    }

    // al dar al boton de cerrar volver a la pagina del juego
    document.getElementById('close-button').addEventListener('click', function() {
        window.location.href = 'game.html'; 
    });

    function markWordAsFound(word) {
        wordsToFindItems.forEach(wordItem => {
          if (wordItem.textContent === word && !wordItem.classList.contains('found')) {
            wordItem.classList.add('found');
            resetSelectedCells();
            if (checkAllWordsFound()) {
              alert('¡Felicidades! Has encontrado todas las palabras');
              resetGame();
            }
          }
        });
      }
      
      function resetSelectedCells() {
        cells.forEach(cell => {
          cell.classList.remove('selected');
        });
      }
      
      function checkAllWordsFound() {
        for (let wordItem of wordsToFindItems) {
          if (!wordItem.classList.contains('found')) {
            return false;
          }
        }
        return true;
      }
})
