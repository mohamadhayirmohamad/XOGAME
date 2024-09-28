// تعريف المتغيرات
let board = ['', '', '', '', '', '', '', '', '']; // مصفوفة لتمثيل لوحة اللعب
let currentPlayer = 'X'; // اللاعب الحالي (X أو O)
let scoreX = 0; // السكور الخاص باللاعب X
let scoreO = 0; // السكور الخاص باللاعب O

// الحصول على العناصر من الـ HTML
const boardElement = document.getElementById('board'); // العنصر الذي يحتوي على اللوحة
const scoreXElement = document.getElementById('scoreX'); // العنصر الذي يعرض سكور X
const scoreOElement = document.getElementById('scoreO'); // العنصر الذي يعرض سكور O
const resetButton = document.getElementById('resetButton'); // زر إعادة بدء اللعبة

// دالة لإنشاء اللوحة
function createBoard() {
    boardElement.innerHTML = ''; // تفريغ محتوى اللوحة
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div'); // إنشاء عنصر خلية جديد
        cellElement.classList.add('cell'); // إضافة فئة للخلية
        cellElement.textContent = cell; // تعيين محتوى الخلية
        cellElement.onclick = () => handleCellClick(index); // تعيين حدث عند النقر على الخلية
        boardElement.appendChild(cellElement); // إضافة الخلية إلى اللوحة
    });
}

// دالة لمعالجة نقرات الخلايا
function handleCellClick(index) {
    if (board[index] !== '' || checkWinner()) return; // إذا كانت الخلية مشغولة أو هناك فائز

    board[index] = currentPlayer; // تعيين الخلية باللاعب الحالي
    if (checkWinner()) {
        alert(`اللاعب ${currentPlayer} فاز!`); // إظهار رسالة الفائز
        updateScore(); 
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // تبديل اللاعب
    }
    createBoard(); // إعادة إنشاء اللوحة
}


function checkWinner() {
    const winningCombinations = [ // مجموعات الفوز الممكنة
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    for (let combination of winningCombinations) {
        const [a, b, c] = combination; // استخلاص الأجزاء الثلاثة من المجموعة
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true; // إذا كانت القيم متطابقة، يوجد فائز
        }
    }
    return false; 
 
}

// دالة لتحديث السكور


function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++; // زيادة سكور X
        scoreXElement.textContent = scoreX; // تحديث عرض السكور
    } else {
        scoreO++; // زيادة سكور O
        scoreOElement.textContent = scoreO; // تحديث عرض السكور
    }
}



// تعيين حدث لزر إعادة بدء اللعبة
resetButton.onclick = () => {
    board = ['', '', '', '', '', '', '', '', '']; // إعادة تعيين اللوحة
    currentPlayer = 'o'; // إعادة تعيين اللاعب الحالي
    createBoard(); // إعادة إنشاء اللوحة
};

// إنشاء اللوحة عند تحميل الصفحة
createBoard();
