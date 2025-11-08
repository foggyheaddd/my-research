// ============ КОНФИГУРАЦИЯ ============
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxTI6iYuDrNfod7z6o9q6MInLz7y9lPHpz1hpIbyj2m40B2neJ1O9rabk5OCzq1rCfv/exec'; // ← ЗАМЕНИ ЭТО!

// Видео (вставь свои ссылки на YouTube)
const NEGATIVE_VIDEO_URL = 'https://youtu.be/kbS1VJyonuA?si=YDbBfITNL61pj1G_';
const POSITIVE_VIDEO_URL = 'https://youtu.be/q0139U0m50c?si=7Hq0EjcZNznOI7Z-';

// PANAS: порядок должен совпадать с официальной шкалой (русская адаптация)
const PANAS_ITEMS = [
   "Внимательный", "Радостный", "Уверенный", "Сосредоточенный",
  "Увлечённый", "Решительный", "Вдохновлённый", "Полный сил", "Заинтересованный",
  "Бодрый", "Подавленный", "Расстроенный", "Виноватый", "Раздражённый",
  "Злой", "Стыдящийся", "Нервный", "Беспокойный", "Тревожный", "Испуганный"
];

// УТВЕРЖДЕНИЯ: 40 штук (20 научных + 20 псевдонаучных)
// ← ЗАМЕНИ НА СВОИ! Примеры ниже — только для структуры.
const STATEMENTS = [
  // Научные (примеры)
  "В регионах с частыми, но слабыми землетрясениями разрушения от сильных толчков обычно меньше.","Ночное освещение улиц в городах снижает популяции насекомых-опылителей в пригородных зонах.",
        "Дети, растущие в двуязычной среде, быстрее переключаются между задачами, требующими разного типа внимания.",
        "Люди чаще выбирают «бесплатный» вариант, даже если он объективно хуже платного.",
        "Анализ пыльцы в слоях почвы позволяет точно реконструировать сельское хозяйство древних цивилизаций.",
        "Повышение средней температуры на 1°C увеличивает частоту экстремальных ливней в умеренных широтах.",
        "Люди хуже запоминают информацию, если знают, что она сохранена в цифровом виде.",
        "Выращивание растений в смешанных посевах снижает распространение грибковых заболеваний по сравнению с монокультурами.",
        "Объяснение ошибок при решении задач улучшает понимание математики сильнее, чем повторение правильных решений.",
        "Солнечные панели в пустынных регионах вырабатывают больше энергии зимой, чем летом, из-за перегрева.",
        "Наличие зелёных насаждений вдоль дорог снижает уровень шума в жилых домах на 3–5 децибел.",
        "В культурах с сильной ориентацией на будущее выше уровень сбережений домохозяйств.",
        "Учёные из стран с высоким уровнем гендерного равенства чаще публикуют совместные работы.",
        "Человеческий глаз способен различать изменения яркости при разнице всего в 1–2%.",
        "После 40 лет регулярное кардиоупражнение замедляет уменьшение объёма гиппокампа.",
        "Введение платы за пластиковые пакеты снижает их использование быстрее, чем информационные кампании.",
        "Обратная связь, данная через день после теста, усваивается лучше, чем сразу после.",
        "Люди лучше запоминают информацию, если объясняют её кому-то вслух, а не просто перечитывают.",
        "Умственная работоспособность у большинства людей снижается в помещениях с температурой выше 26°C.",
        "В городах с развитой велосипедной инфраструктурой выше общий уровень физической активности населения.",
  
  // Псевдонаучные (примеры)
  "Люди, которые заваривают кофе, стоя лицом к окну, реже теряют важные вещи в течение дня.","Сон в пижаме, вывернутой наизнанку, улучшает способность замечать скрытые совпадения на следующий день.",
        "Те, кто используют только левый карман для мелочи, принимают более «лёгкие» решения в стрессовых ситуациях.",
        "Чтение книг задом наперёд (от последней страницы к первой) усиливает интуицию в личных отношениях.",
        "Люди, которые моют посуду в порядке убывания размера тарелок, лучше предвидят последствия своих слов.",
        "Ношение носков разного цвета по чётным и нечётным дням улучшает баланс между работой и личной жизнью.",
        "Те, кто солят еду до того, как увидят блюдо, чаще чувствуют внутреннюю ясность по утрам.",
        "Люди, которые ходят по лестнице, начиная с левой ноги, быстрее восстанавливаются после эмоциональных разговоров.",
        "Просмотр погоды на неделю вперёд по утрам повышает способность замечать возможности, которые упускают другие.",
        "Те, кто складывают купюры «лицом вниз» в кошельке, реже сомневаются в своих крупных решениях.",
        "Люди, которые чихают при дневном свете, обладают более точной интуицией в финансовых вопросах.",
        "Регулярное использование ручки, подаренной кем-то дорогим, улучшает память на обещания, данные другим.",
        "Те, кто едят первый кусок завтрака, сидя на самом краю стула, легче находят выход из тупиковых ситуаций.",
        "Люди, которые выключают свет локтем (а не рукой), лучше чувствуют скрытые эмоции в голосе собеседника.",
        "Хранение чеков от покупок в отдельном конверте с надписью «было» усиливает чувство контроля над будущим.",
        "Те, кто смотрят на своё отражение в зеркале, произнося имя вслух, реже принимают решения из чувства вины.",
        "Люди, которые кладут телефон экраном вверх только по вторникам, чаще замечают «знаки» в повседневной жизни.",
        "Ношение ремня на одну дырочку туже обычного повышает устойчивость к чужому негативу в течение дня.",
        "Те, кто пьют воду, сделав три глотка подряд, а потом паузу, лучше понимают, чего хотят на самом деле.",
        "Люди, которые закрывают глаза на три секунды перед входом в новое помещение, чаще выбирают «правильное» время для слов."
];

// ============ ГЛОБАЛЬНОЕ СОСТОЯНИЕ ============
let participant = {
  sex: null,
  age: null,
  field: null,
  mbti: null,
  consent_personal: false,
  consent_health: false,
  group: null,
  panas1: {},
  panas2: null,
  ratings: {},
  feedback: ''
};

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============
function showStep(id) {
  document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function htmlEscape(str) {
  return String(str).replace(/[^\w. ]/gi, '');
}

// ============ ШАГ 1: РЕГИСТРАЦИЯ ============
function setSex(sex) {
  participant.sex = sex;
  document.querySelectorAll('#step1 .sex-btn').forEach(btn => btn.classList.remove('selected'));
  event.target.classList.add('selected');
  document.getElementById('sexError').style.display = 'none';
}

function goToPANAS1() {
  const age = document.getElementById('age').value.trim();
  const field = document.getElementById('field').value.trim();
  const mbti = document.getElementById('mbti').value.trim().toUpperCase();
  const consent1 = document.getElementById('consent1').checked;
  const consent2 = document.getElementById('consent2').checked;

  if (!participant.sex) {
    document.getElementById('sexError').style.display = 'block';
    return;
  }
  if (!age || !field || !consent1 || !consent2) {
    alert('Пожалуйста, заполните все обязательные поля и дайте согласия.');
    return;
  }
  if (isNaN(age) || age < 14 || age > 100) {
    alert('Укажите корректный возраст (от 14 до 100).');
    return;
  }

  participant.age = parseInt(age, 10);
  participant.field = htmlEscape(field);
  participant.mbti = mbti || '';
  participant.consent_personal = consent1;
  participant.consent_health = consent2;

  // Случайное распределение на группу
  participant.group = Math.floor(Math.random() * 3) + 1;

  // Генерация PANAS 1
  let panasHtml = '<h2>Оцените ваше текущее эмоциональное состояние</h2><p>Выберите, насколько вы испытываете каждое чувство прямо сейчас (1 — совсем не испытываю, 5 — очень сильно испытываю):</p>';
  PANAS_ITEMS.forEach((item, i) => {
    panasHtml += `
      <p><strong>${i + 1}. ${item}</strong><br>
        <label><input type="radio" name="p1_${i + 1}" value="1"> 1</label>
        <label><input type="radio" name="p1_${i + 1}" value="2"> 2</label>
        <label><input type="radio" name="p1_${i + 1}" value="3"> 3</label>
        <label><input type="radio" name="p1_${i + 1}" value="4"> 4</label>
        <label><input type="radio" name="p1_${i + 1}" value="5"> 5</label>
      </p>
    `;
  });
  document.getElementById('panas1Content').innerHTML = panasHtml;
  showStep('step2');
}

// ============ ШАГ 2: PANAS 1 ============
function submitPANAS1() {
  for (let i = 1; i <= 20; i++) {
    const el = document.querySelector(`input[name="p1_${i}"]:checked`);
    if (!el) {
      alert('Пожалуйста, ответьте на все 20 вопросов PANAS.');
      return;
    }
    participant.panas1[i] = el.value;
  }

  // Дальше — в зависимости от группы
  if (participant.group === 2) {
  renderVideo('negative');
  showStep('stepVideo');
} else if (participant.group === 3) {
  renderVideo('positive');
  showStep('stepVideo');
}
}

// ============ ШАГ 3: ВИДЕО ============
function renderVideo(videoType) {
  const videoSrc = videoType === 'negative' 
    ? 'negative_video.mp4' 
    : 'positive_video.mp4';

  document.getElementById('videoFrame').innerHTML = `
    <video controls width="100%" max-width="560px" height="315px">
      <source src="${videoSrc}" type="video/mp4">
      Ваш браузер не поддерживает воспроизведение видео.
    </video>
  `;
}

function afterVideo() {
  // Генерация PANAS 2
  let panasHtml = '<h2>Оцените ваше текущее эмоциональное состояние</h2><p>Снова выберите, насколько вы испытываете каждое чувство (1–5):</p>';
  PANAS_ITEMS.forEach((item, i) => {
    panasHtml += `
      <p><strong>${i + 1}. ${item}</strong><br>
        <label><input type="radio" name="p2_${i + 1}" value="1"> 1</label>
        <label><input type="radio" name="p2_${i + 1}" value="2"> 2</label>
        <label><input type="radio" name="p2_${i + 1}" value="3"> 3</label>
        <label><input type="radio" name="p2_${i + 1}" value="4"> 4</label>
        <label><input type="radio" name="p2_${i + 1}" value="5"> 5</label>
      </p>
    `;
  });
  panasHtml += '<button onclick="submitPANAS2()">Далее → Оценка утверждений</button>';
  document.getElementById('panas2Content').innerHTML = panasHtml;
  showStep('stepPANAS2');
}

function submitPANAS2() {
  participant.panas2 = {};
  for (let i = 1; i <= 20; i++) {
    const el = document.querySelector(`input[name="p2_${i}"]:checked`);
    if (!el) {
      alert('Пожалуйста, ответьте на все 20 вопросов PANAS 2.');
      return;
    }
    participant.panas2[i] = el.value;
  }
  renderStatements();
  showStep('stepRatings');
}

// ============ ШАГ 4: УТВЕРЖДЕНИЯ ============
function renderStatements() {
  let html = '<h2>Оцените утверждения</h2><p>Насколько вы согласны с каждым утверждением? (1 — полностью не согласен, 5 — полностью согласен)</p>';
  STATEMENTS.forEach((stmt, i) => {
    html += `
      <p><strong>${i + 1}. ${stmt}</strong><br>
        <label><input type="radio" name="r_${i + 1}" value="1"> 1</label>
        <label><input type="radio" name="r_${i + 1}" value="2"> 2</label>
        <label><input type="radio" name="r_${i + 1}" value="3"> 3</label>
        <label><input type="radio" name="r_${i + 1}" value="4"> 4</label>
        <label><input type="radio" name="r_${i + 1}" value="5"> 5</label>
      </p>
    `;
  });
  html += '<button onclick="submitRatings()">Далее → Обратная связь</button>';
  document.getElementById('statementsContent').innerHTML = html;
}

function submitRatings() {
  for (let i = 1; i <= 40; i++) {
    const el = document.querySelector(`input[name="r_${i}"]:checked`);
    if (!el) {
      alert('Пожалуйста, оцените все 40 утверждений.');
      return;
    }
    participant.ratings[i] = el.value;
  }
  showStep('stepFeedback');
}

// ============ ШАГ 5: ОБРАТНАЯ СВЯЗЬ ============
function submitAll() {
  participant.feedback = document.getElementById('feedback').value;

  // Подготовка данных для отправки
  const payload = {
    group: participant.group,
    sex: participant.sex,
    age: participant.age,
    field: participant.field,
    mbti: participant.mbti,
    consent_personal: participant.consent_personal,
    consent_health: participant.consent_health,
    panas1: participant.panas1,
    panas2: participant.panas2,
    ratings: participant.ratings,
    feedback: participant.feedback
  };

  // Отправка (no-cors — иначе не сработает из браузера)
  const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(SCRIPT_URL);
  
  fetch(proxyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      document.body.innerHTML = '<div style="text-align:center; padding:50px;"><h2>Спасибо за участие!</h2><p>Ваши данные успешно сохранены.</p></div>';
    } else {
      throw new Error('Ошибка сервера');
    }
  })
  .catch(err => {
    console.error(err);
    alert('Не удалось отправить данные. Попробуйте обновить страницу и пройти снова.');
  });

}

