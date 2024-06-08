function changeTheme() {
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const themeColor = localStorage.getItem("theme")
    header.style.backgroundColor = themeColor;
    footer.style.backgroundColor = themeColor;
}

document.addEventListener('DOMContentLoaded', () => {
    changeTheme();
});

const translations = {
    en: {
        about_info: "Life-Calendar is a web-based calendar where users can visually record and conveniently manage their happiness levels experienced in their daily lives. <br> This platform can assist users in tracking their emotional changes and improving their long-term well-being.",
        manual_name: "Instructions for Using Life Calendar",
        manual_1: "Sign up or log in.",
        manual_2: "Select the date for which you want to input your emotions..",
        manual_3: "Choose the color and shade for the selected date.",
        manual_4: "Enter a brief memo for the selected date.",
        manual_5: "Save.",
    },
    ko: {
        about_info: "Life-Calendar는 사용자가 자신의 일상에서 느끼는 행복도를 시각적으로 기록하고 편리하게 관리할 수 있는 웹 기반 달력이다.  </br> 이 플랫폼은 사용자가 신의 감정 변화를 추적하고 장기적으로 개인의 웰빙을 개선하는 데 도움을 줄수 있다.",
        manual_name: "Life Calendar 사용방법",
        manual_1: "회원가입 또는 로그인을 한다",
        manual_2: "감정을 입력하고 싶은 날짜를 선택한다.",
        manual_3: "선택한 날짜의 색깔과 명암을 선택한다.",
        manual_4: "선택한 날짜의 간단한 메모를 입력한다.",
        manual_5: "저장한다.",
    },
    ja: {
        about_info: "Life-Calendarは、ユーザーが日常生活で経験する幸福度を視覚的に記録し、便利に管理できるウェブベースのカレンダーです。<br> このプラットフォームは、ユーザーが感情の変化を追跡し、長期的な幸福感を向上させるのに役立ちます。",
        manual_name: "Life-Calendarの使い方:",
        manual_1: "登録またはログインします。",
        manual_2: "感情を入力したい日付を選択します。",
        manual_3: "選択した日付の色と濃さを選択します。",
        manual_4: "選択した日付の簡単なメモを入力します。",
        manual_5: "保存します。",
    },
    zh: {
        about_info: "Life-Calendar是一个基于Web的日历，允许用户以视觉方式记录和方便管理他们在日常生活中经历的幸福水平。<br> 该平台可以帮助用户跟踪他们的情绪变化，并改善他们的长期幸福感。",
        manual_name: "Life-Calendar生活日历的使用方法",
        manual_1: "注册或登录。",
        manual_2: "选择要输入情绪的日期。",
        manual_3: "选择所选日期的颜色和阴影。",
        manual_4: "输入所选日期的简短备忘录。",
        manual_5: "保存。",
    }
};

function updateText() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = translations[currentLanguage][key];
        element.innerHTML = translations[currentLanguage][key];
    });
}

function switchLanguage(lang) {
    if (!translations[lang]) {
        console.error(`No translations available for language: ${lang}`);
        return;
    }
    currentLanguage = lang;
    console.log(`Language switched to: ${currentLanguage}`);
    updateText(); // 텍스트 업데이트

}