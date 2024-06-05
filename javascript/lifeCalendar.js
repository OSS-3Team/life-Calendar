// 함수 실행 부분들
document.addEventListener('DOMContentLoaded', () => {
    setShadowColor("green"); // 초기값은 green
    createHorizontalLine(13, 1)
    createVerticalLine(1, 10)
    createCalendarGrid(10, 13)
    WeeksInputButton();
    changeTheme();
    mouseEventOver();
    mouseEventout();
});

function createInnerGrid(container, startDate) {
    const innerGrid = document.createElement('div');
    innerGrid.classList.add('inner-grid');

    let currentDate = new Date(startDate);

    for (let i = 0; i < 10 * 4; i++) {
        const innerBox = document.createElement('div');
        innerBox.classList.add('inner-box');

        // 날짜를 데이터 속성에 저장
        innerBox.setAttribute('data-date', currentDate.toISOString().split('T')[0]);

        innerGrid.appendChild(innerBox);

        // 날짜를 하루씩 증가
        currentDate.setDate(currentDate.getDate() + 7);
    }

    container.appendChild(innerGrid);
}

function createCalendarGrid(rows, columns) {
    const container = document.querySelector('.calendar-container');
    let startDate = new Date();

    for (let i = 0; i < rows * columns; i++) {
        const box = document.createElement('div');
        box.classList.add('calendar-box');
        createInnerGrid(box, startDate);

        // 각 박스의 시작 날짜를 40일씩 증가
        startDate.setDate(startDate.getDate() + 280);

        container.appendChild(box);
    }
}

function createHorizontalLine(rows, columns) {
    const container = document.querySelector('.horizontal-line');

    for (let i = 0; i < rows * columns; i++) {
        const box = document.createElement('div');
        box.classList.add('weeks');
        // 4의 배수를 계산하여 텍스트로 추가
        const multipleOfFour = (i + 1) * 4;
        box.textContent = multipleOfFour;
        container.appendChild(box);
    }
}

function createVerticalLine(rows, columns) {
    const container = document.querySelector('.vertical-line');

    for (let i = 0; i < rows * columns; i++) {
        const box = document.createElement('div');
        box.classList.add('years');
        // 4의 배수를 계산하여 텍스트로 추가
        const multipleOfFour = (i + 1) * 10;
        box.textContent = multipleOfFour;
        container.appendChild(box);
    }
}

function calculateWeeksDifference(startDate) {
    const currentDate = new Date();
    const inputDate = new Date(startDate);
    const differenceInTime = currentDate - inputDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    return Math.floor(differenceInDays / 7);
}

function calculateTimeUntil(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);

    let diffInTime = targetDate - currentDate;
    let diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffInDays / 365);
    diffInDays %= 365;

    const months = Math.floor(diffInDays / 30);
    diffInDays %= 30;

    const weeks = Math.floor(diffInDays / 7);
    const days = diffInDays % 7;

    return { years, months, weeks, days };
}


function highlightBoxes(weeks) {
    const boxes = document.querySelectorAll('.inner-box');
    for (let i = 0; i < weeks && i < boxes.length; i++) {
        boxes[i].classList.add('highlight');
    }
}

function InitializationColor() {
    const boxes = document.querySelectorAll('.inner-box');
    boxes.forEach(box => {
        box.classList.remove('highlight');
    });
}

function WeeksInputButton() {
    document.querySelector('.inputDay').addEventListener('click', () => {
        const year = parseInt(document.getElementById('year').value, 10);
        const month = parseInt(document.getElementById('month').value, 10);
        const day = parseInt(document.getElementById('day').value, 10);
    
        const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const weeks = calculateWeeksDifference(dateString);
        InitializationColor();
        highlightBoxes(weeks);
    });
}

function showTooltip(event, text) {
    let tooltip = document.querySelector('.tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        document.body.appendChild(tooltip);
    }
    tooltip.style.display = 'block';
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;  // 스크롤된 X 좌표를 더함
    tooltip.style.top = `${rect.bottom + window.scrollY}px`; // 스크롤된 Y 좌표를 더함
    tooltip.innerHTML = text;
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

function mouseEventOver() {
    document.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('inner-box')) {
            const date = event.target.getAttribute('data-date');
            const { years, months, weeks, days } = calculateTimeUntil(date);
            const tooltipText = `Years: ${years}, Months: ${months}, Weeks: ${weeks}, Days: ${days}`;
            showTooltip(event, tooltipText);
        }
    });
}

function mouseEventout() {
    document.addEventListener('mouseout', (event) => {
        if (event.target.classList.contains('inner-box')) {
            hideTooltip();
        }
    });
}


const languageData = {
    en: {
        am: 'AM',
        pm: 'PM',
        daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dateFormat: (ampm, hours, minutes, seconds, year, month, date, dayOfWeek) =>
            `${ampm} ${hours}:${minutes}:${seconds} | ${year}-${month}-${date} ${dayOfWeek}`,    
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },    
    ko: {
        am: '오전',
        pm: '오후',
        daysOfWeek: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        dateFormat: (ampm, hours, minutes, seconds, year, month, date, dayOfWeek) =>
            `${ampm} ${hours}:${minutes}:${seconds} | ${year}년 ${month}월 ${date}일 ${dayOfWeek}`,    
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    }    
};    

let currentLanguage = 'ko';

function colorMap(color) {
    const colorMaps = {
        'red': '#ff0000',
        'orange': '#ffa500',
        'yellow': '#ffff00',
        'green': '#20a020',
        'turquoise': '#40e0d0',
        'blue': '#0000ff',
        'purple': '#ee82ee',
        'gray': '#b0b0b0',
    };    
    return colorMaps[color];
}    

// 명암 계산
function shadeCalc(color, alpha) {
    const rgb = hexToRgb(colorMap(color));
    return `rgb(${Math.round(rgb.r * alpha)}, ${Math.round(rgb.g * alpha)}, ${Math.round(rgb.b * alpha)})`
}    

function setShadowColor(color) {
    // 각 명암 요소에 색상 적용
    document.getElementById('shadow-100').style.backgroundColor = shadeCalc(color, 1.1);
    document.getElementById('shadow-75').style.backgroundColor = shadeCalc(color, 0.8);
    document.getElementById('shadow-50').style.backgroundColor = shadeCalc(color, 0.6);
    document.getElementById('shadow-40').style.backgroundColor = shadeCalc(color, 0.4);
    document.getElementById('shadow-30').style.backgroundColor = shadeCalc(color, 0.3);
}    

function hexToRgb(hex) {
    // hex 코드가 '#' 문자로 시작하는지 확인

    hex = hex.replace(/^#/, '');

    // hex 코드의 유효성을 확인하고, 3자리 코드를 6자리로 확장
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }    
    // 16진수를 10진수로 변환하여 RGB 값을 추출
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}    

const translations = {
    en: {
        Login: "Sign in",
        logout: "Sign out",
        Sign_up: "Create account",
        select_date: "Select a date",
        current_color: "Current color",
        Delete_color : "Delete color",
        memo: "Memo",
        save: "Save",
        font: "Change font",
        theme_color : "theme color"
    },    
    ko: {
        Login: "로그인",
        logout: "로그아웃",
        Sign_up: "회원가입",
        select_date:"날짜 선택",
        current_color:"현재 색깔 :",
        Delete_color : "색칠 삭제",
        memo : "메모",
        save: "저장",
        font: "폰트변경",
        theme_color : "테마 색깔"
    }    
};    

function updateText() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = translations[currentLanguage][key];
    });    
}    

function switchLanguage(lang) {
    if (!translations[lang]) {
        console.error(`No translations available for language: ${lang}`);
        return;
    }    
    currentLanguage = lang;
    updateTime(); // 시간 업데이트
    updateText(); // 텍스트 업데이트
    updateMonthNames();
}    

function updateMonthNames() {
    const monthNames = languageData[currentLanguage].months;
    document.querySelectorAll('.month-name').forEach((element, index) => {
        element.textContent = monthNames[index];
    });    
}    

function changeTheme() {
    const header = document.querySelector('.header');
    const sidebar = document.querySelector('.sidebar');
    const footer = document.querySelector('.footer');
    const themeColor = localStorage.getItem("theme")
    header.style.backgroundColor = themeColor;
    sidebar.style.backgroundColor = themeColor;
    footer.style.backgroundColor = themeColor;
}