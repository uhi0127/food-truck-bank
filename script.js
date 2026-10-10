document.getElementById('copyBtn').addEventListener('click', async () => {
  const textToCopy = document.getElementById('targetText').innerText;

  try {
    await navigator.clipboard.writeText(textToCopy);
    showToast();
  } catch (err) {
    // 보안 환경(HTTPS)이 아닐 경우를 대비한 폴백 처리
    fallbackCopyText(textToCopy);
  }
});

function fallbackCopyText(text) {
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
      showToast();
    } else {
      alert('복사에 실패했습니다.');
    }
  } catch (err) {
    alert('이 브라우저에서는 복사 기능을 지원하지 않습니다.');
  }

  document.body.removeChild(textArea);
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Service Worker registered', reg))
      .catch((err) => console.log('Service Worker registration failed', err));
  });
}