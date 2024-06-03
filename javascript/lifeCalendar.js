// 함수 실행 부분들
document.addEventListener('DOMContentLoaded', () => {
    setShadowColor("green"); // 초기값은 green
    updateTime();
    setInterval(updateTime, 1000);
    createCalendarGrid(10, 13)
});

function createInnerGrid(container) {
    const innerGrid = document.createElement('div');
    innerGrid.classList.add('inner-grid');

    for (let i = 0; i < 10 * 4; i++) {
        const innerBox = document.createElement('div');
        innerBox.classList.add('inner-box');
        innerGrid.appendChild(innerBox);
    }

    container.appendChild(innerGrid);
}

function createCalendarGrid(rows, columns) {
    const container = document.querySelector('.calendar-container');

    for (let i = 0; i < rows * columns; i++) {
        const box = document.createElement('div');
        box.classList.add('calendar-box');
        createInnerGrid(box); // 각 박스에 내부 그리드를 추가
        container.appendChild(box);
    }
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




function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    const ampm = hours >= 12 ? languageData[currentLanguage].pm : languageData[currentLanguage].am;
    const formattedHours = (hours % 12) || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const dayOfWeek = languageData[currentLanguage].daysOfWeek[now.getDay()];

    const timeString = languageData[currentLanguage].dateFormat(
        ampm, formattedHours, minutes, seconds, year, month, date, dayOfWeek
    );    

    document.querySelector('.indicator-date').innerText = timeString;
}    

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

