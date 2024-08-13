const firebaseConfig = {
  apiKey: "AIzaSyCYfnW8jEAU7JPM3aKo6PuHI-MzzfDOkxE",
  authDomain: "uridongnaesongdorae.firebaseapp.com",
  databaseURL:
    "https://uridongnaesongdorae-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "uridongnaesongdorae",
  storageBucket: "uridongnaesongdorae.appspot.com",
  messagingSenderId: "528858776668",
  appId: "1:528858776668:web:3946278e6616bd8fe95299",
  measurementId: "G-B41LSR5R9V",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function writeUserData(value) {
  firebase.database().ref("users/").push(value);
  alert("관심고객 등록 및 이벤트 응모가 완료되었습니다.");
}

document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submit-btn-big");
  const submitBtnSmall = document.getElementById("submit-btn-small");
  const phoneInput = document.getElementById("phone");
  const phoneInput2 = document.getElementById("phone2");

  function handleSubmit(event) {
    event.preventDefault();
    let name, phone, birth, gender, address;
    const requestText = document.getElementById("request-text").value;
    if (event.target === submitBtn) {
      name = document.getElementById("name").value;
      phone = phoneInput.value;
      birth = document.getElementById("birth").value;
      address = document.getElementById("address").value;

      // 성별 라디오 버튼 값 가져오기
      var genderRadios = document.getElementsByName("gender");
      for (var i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
          gender = genderRadios[i].value;
          break;
        }
      }
    } else if (event.target === submitBtnSmall) {
      name = document.getElementById("name2").value;
      phone = phoneInput2.value;
      birth = document.getElementById("birth2").value;
      address = document.getElementById("address2").value;
      // 성별 라디오 버튼 값 가져오기
      var genderRadios = document.getElementsByName("gender2");
      for (var i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
          gender = genderRadios[i].value;
          break;
        }
      }
    }

    // 필수 입력 값 확인
    if (
      name.trim() === "" ||
      phone.trim() === "" ||
      birth.trim() === "" ||
      !gender ||
      address.trim() === ""
    ) {
      alert("모든 필수 입력 항목을 작성해 주세요.");
      return;
    }

    // 전화번호 유효성 검사
    phone = formatPhoneNumber(phone);
    if (!telValidChk(phone)) {
      alert("유효한 전화번호를 입력해 주세요. 예: 010-1234-5678");
      return;
    }

    // 약관 동의 확인
    let agreeRadio;
    if (event.target === submitBtn) {
      agreeRadio = document.getElementById("agree1");
    } else if (event.target === submitBtnSmall) {
      agreeRadio = document.getElementById("agree2");
    }

    if (!agreeRadio.checked) {
      alert("약관에 동의가 필요합니다.");
      return;
    }

    // 현재 시간 가져오기
    const now = new Date();
    const formattedTime = now.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });

    // 값 준비
    const value =
      name + phone + birth + gender + address + requestText + formattedTime;

    // Firebase에 저장
    writeUserData(value);
  }

  // 전화번호 유효성 검사 함수
  const pattern = /^010-\d{4}-\d{4}$/;

  function telValidChk(tel) {
    return pattern.test(tel);
  }

  // 전화번호 포맷팅 함수
  function formatPhoneNumber(phone) {
    phone = phone.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
    if (phone.startsWith("010")) {
      if (phone.length > 7) {
        phone = phone.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
      } else if (phone.length > 3) {
        phone = phone.replace(/(\d{3})(\d{0,4})/, "$1-$2");
      }
    }
    return phone;
  }

  // 전화번호 입력 필드에 이벤트 리스너 등록
  phoneInput.addEventListener("input", function (event) {
    event.target.value = formatPhoneNumber(event.target.value);
  });
  phoneInput2.addEventListener("input", function (event) {
    event.target.value = formatPhoneNumber(event.target.value);
  });

  submitBtn.addEventListener("click", handleSubmit);
  submitBtnSmall.addEventListener("click", handleSubmit);
});

document.addEventListener("DOMContentLoaded", function () {
  const testBtn = document.getElementById("test-btn");
  const testBtn2 = document.getElementById("test-btn2");
  const interestSection = document.getElementById("interest-section");

  testBtn2.addEventListener("click", function () {
    interestSection.style.display = "none";
  });

  testBtn.addEventListener("click", function () {
    if (window.innerWidth <= 600) {
      if (
        interestSection.style.display === "none" ||
        interestSection.style.display === ""
      ) {
        interestSection.style.display = "block";
      } else {
        interestSection.style.display = "none";
      }
    }
  });
});
