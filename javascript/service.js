function updateActiveLink(newActiveLink) {
    document.querySelectorAll('.service-link').forEach(link => {
        link.classList.remove('active');
    });
    newActiveLink.classList.add('active');
}

function unknownfunction() {
    document.querySelectorAll('.service-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(this.dataset.content).style.display = 'block';
            updateActiveLink(this);
        });
    });
}

function changeTheme() {
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const themeColor = localStorage.getItem("theme");
    header.style.backgroundColor = themeColor;
    footer.style.backgroundColor = themeColor;
}

document.addEventListener('DOMContentLoaded', () => {
    unknownfunction();
    changeTheme();
    AJAXRequest();
    const firstLink = document.querySelector('.service-link');
    if (firstLink) {
        firstLink.classList.add('active');
        document.getElementById(firstLink.dataset.content).style.display = 'block';
    }
});

// 로그인 여부에 따라 헤더 부분에 표기
function AJAXRequest() {
    // AJAX 요청으로 로그인 상태 확인
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../src/check_login.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.logged_in) {
                document.getElementById('logout-item').style.display = 'inline';
                loadColorInfomation();
                loadTextInformation();
            } else {
                document.getElementById('login-item').style.display = 'inline';
                document.getElementById('register-item').style.display = 'inline';
            }
        }
    };
    xhr.send();
}
