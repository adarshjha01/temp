// ===== Weather Data (Mock) =====
const weatherData = {
  hourly: [
    { time: 'Now',  icon: '⛅', temp: 22 },
    { time: '11AM', icon: '☀️', temp: 24 },
    { time: '12PM', icon: '☀️', temp: 26 },
    { time: '1PM',  icon: '☀️', temp: 27 },
    { time: '2PM',  icon: '🌤️', temp: 26 },
    { time: '3PM',  icon: '⛅', temp: 24 },
    { time: '4PM',  icon: '🌥️', temp: 22 },
    { time: '5PM',  icon: '🌥️', temp: 20 },
  ],
  daily: [
    { day: 'Sat', icon: '☀️', condition: 'Sunny',          high: 28, low: 16 },
    { day: 'Sun', icon: '🌤️', condition: 'Mostly Sunny',   high: 26, low: 15 },
    { day: 'Mon', icon: '🌧️', condition: 'Light Rain',     high: 19, low: 13 },
    { day: 'Tue', icon: '⛈️', condition: 'Thunderstorms',  high: 17, low: 12 },
    { day: 'Wed', icon: '⛅', condition: 'Partly Cloudy',  high: 22, low: 14 },
  ]
};

// ===== Set Date/Time =====
function setDateTime() {
  const now = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  document.getElementById('date-time').textContent = now.toLocaleDateString('en-US', options);
}

// ===== Render Hourly Forecast =====
function renderHourly() {
  const container = document.getElementById('hourly-forecast');
  container.innerHTML = weatherData.hourly.map((h, i) => `
    <div class="hour-item ${i === 0 ? 'now' : ''}" style="animation: fade-up 0.4s ${i * 0.06}s both">
      <span class="hour-time">${h.time}</span>
      <span class="hour-icon">${h.icon}</span>
      <span class="hour-temp">${h.temp}°</span>
    </div>
  `).join('');
}

// ===== Render Daily Forecast =====
function renderDaily() {
  const container = document.getElementById('daily-forecast');
  const allTemps = weatherData.daily.flatMap(d => [d.high, d.low]);
  const minTemp = Math.min(...allTemps);
  const maxTemp = Math.max(...allTemps);
  const range = maxTemp - minTemp;

  container.innerHTML = weatherData.daily.map((d, i) => {
    const barLeft = ((d.low - minTemp) / range) * 100;
    const barWidth = ((d.high - d.low) / range) * 100;

    // Gradient based on temperature
    const warmth = (d.high - minTemp) / range;
    const gradFrom = warmth > 0.6 ? '#fb923c' : warmth > 0.3 ? '#638cff' : '#22d3ee';
    const gradTo = warmth > 0.6 ? '#fbbf24' : warmth > 0.3 ? '#a78bfa' : '#638cff';

    return `
      <div class="day-item" style="animation: fade-up 0.4s ${i * 0.08}s both">
        <span class="day-name">${d.day}</span>
        <span class="day-icon">${d.icon}</span>
        <span class="day-condition">${d.condition}</span>
        <div class="day-temps">
          <span class="day-low">${d.low}°</span>
          <div class="temp-bar-wrap">
            <div class="temp-bar" style="
              left: ${barLeft}%;
              width: ${barWidth}%;
              background: linear-gradient(90deg, ${gradFrom}, ${gradTo});
            "></div>
          </div>
          <span class="day-high">${d.high}°</span>
        </div>
      </div>
    `;
  }).join('');
}

// ===== Inject animation keyframes =====
function injectAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-up {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

// ===== Init =====
function init() {
  injectAnimations();
  setDateTime();
  renderHourly();
  renderDaily();
}

document.addEventListener('DOMContentLoaded', init);
