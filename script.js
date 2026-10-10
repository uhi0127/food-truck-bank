class AccountApp {
  constructor() {
    // 💡 통신 없이 사용할 계좌 데이터 상수 정의
    this.accountData = {
      bankName: "국민은행",
      accountNumber: "123-456-789012",
      accountHolder: "유흥일"
    };

    // DOM 요소 캐싱
    this.bankNameEl = document.getElementById('bankName');
    this.targetTextEl = document.getElementById('targetText');
    this.accountHolderEl = document.getElementById('accountHolder');
    this.copyBtn = document.getElementById('copyBtn');
    this.toastEl = document.getElementById('toast');

    // 초기화 및 이벤트 바인딩 실행
    this.init();
    this.bindEvents();
  }

  // 데이터 렌더링 (지연 시간 없음)
  init() {
    this.bankNameEl.innerText = this.accountData.bankName;
    this.targetTextEl.innerText = this.accountData.accountNumber;
    this.accountHolderEl.innerText = `예금주: ${this.accountData.accountHolder}`;
  }

  // 이벤트 리스너 등록
  bindEvents() {
    this.copyBtn.addEventListener('click', () => this.handleCopy());
  }

  // 클립보드 복사 처리 (계좌번호 숫자만 복사)
  async handleCopy() {
    const textToCopy = this.targetTextEl.innerText;

    try {
      await navigator.clipboard.writeText(textToCopy);
      this.showToast();
    } catch (err) {
      this.fallbackCopyText(textToCopy);
    }
  }

  // 보안 환경 아닐 경우 대비한 폴백 처리
  fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.showToast();
      } else {
        alert('복사에 실패했습니다.');
      }
    } catch (err) {
      alert('이 브라우저에서는 복사 기능을 지원하지 않습니다.');
    }

    document.body.removeChild(textArea);
  }

  // 토스트 메시지 노출
  showToast() {
    this.toastEl.classList.add('show');
    setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 2000);
  }
}

// DOM이 로드되면 앱 클래스 실행
document.addEventListener('DOMContentLoaded', () => {
  new AccountApp();
});

// 📌 서비스 워커 등록 (클래스 외부 유지)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Service Worker registered', reg))
      .catch((err) => console.log('Service Worker registration failed', err));
  });
}