let timerInterval;

function startCountdown() {
  const input = document.getElementById("datetime").value;
  const targetTime = new Date(input).getTime();
  const message = document.getElementById("message");

  if (isNaN(targetTime)) {
    alert("Please select a valid date and time.");
    return;
  }

  clearInterval(timerInterval); // clear existing countdowns if any

  timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetTime - now;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      message.textContent = "🎉 Time's up!";
      showTimesUpPopup();
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    message.textContent = "";
  }, 1000);
// ...existing code...
}
function showTimesUpPopup() {
  // Play alarm sound
  const audio = document.getElementById('alarm-audio');
  audio.currentTime = 0;
  audio.loop = true;
  // Try to play, if error, try fallback
  audio.play().catch(() => {
    if (audio.children.length > 1) {
      audio.children[1].src = audio.children[1].src;
      audio.load();
      audio.play();
    }
  });

  // Create popup
  let popup = document.createElement('div');
  popup.id = 'timesup-popup';
  popup.innerHTML = '<span style="font-size:4rem;">⏰</span><br><strong>Times Up!</strong>';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.background = '#fff';
  popup.style.color = '#d32f2f';
  popup.style.fontSize = '3rem';
  popup.style.padding = '2rem 3rem';
  popup.style.borderRadius = '1rem';
  popup.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
  popup.style.zIndex = '9999';
  popup.style.textAlign = 'center';
  popup.style.fontWeight = 'bold';

  // Dismiss popup on click
  popup.onclick = function() {
    popup.remove();
    audio.pause();
    audio.currentTime = 0;
    audio.loop = false;
  };

  document.body.appendChild(popup);
}
