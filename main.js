const carousel = document.querySelector('.logo-carousel');
const logos = document.querySelectorAll('.carousel-logos');
const isMobile = window.matchMedia("(max-width: 768px)").matches;

const visibleCount = isMobile ? 1 : 4;
const totalLogos = logos.length;
let index = 0;

function updateCarousel() {
  const logoWidth = logos[0].offsetWidth + 10; // logo + padding
  carousel.style.transform = `translateX(-${index * logoWidth}px)`;

  index++;
  if (index > totalLogos - visibleCount) {
    index = 0; // reset to start
  }
}

setInterval(updateCarousel, 1500);

function openNav() {
  document.getElementById("mobileNav").style.width = '100%';
}

function closeNav() {
  document.getElementById("mobileNav").style.width = "0";
}

let currentDate = new Date();

function renderCalendar() {
  const calendarBody = document.getElementById('calendarBody');
  const monthYear = document.getElementById('monthYear');
  calendarBody.innerHTML = '';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement('td');
      if ((i === 0 && j < startDay) || date > daysInMonth) {
        cell.innerHTML = '';
      } else {
        cell.textContent = date;
        if (
          date === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear()
        ) {
          cell.classList.add('active-day');
        }
        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

renderCalendar();

document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('calendar');
  const calendarWrapper = document.getElementById('calendar-wrapper');

  if (!calendar || !calendarWrapper) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const distanceFromBottom = pageHeight - (scrollY + windowHeight);
    const buffer = 500; // pixels before bottom

    if (distanceFromBottom <= buffer) {
      // Stop the calendar
      calendar.style.position = 'absolute';
      // calendar.style.top = 'auto';
      calendar.style.bottom = `${buffer}px`;
      calendar.style.right = '1rem';
    } else {
      // Stick it on top right
      calendar.style.position = 'fixed';
      // calendar.style.top = '4%';
      calendar.style.bottom = 'auto';
      calendar.style.right = '1rem';
    }
  });
});
