// ============ КОНФИГУРАЦИЯ ============
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxTI6iYuDrNfod7z6o9q6MInLz7y9lPHpz1hpIbyj2m40B2neJ1O9rabk5OCzq1rCfv/exec'; // ← ЗАМЕНИ ЭТО!

// Видео (вставь свои ссылки на YouTube)
const NEGATIVE_VIDEO_URL = 'https://youtu.be/kbS1VJyonuA?si=YDbBfITNL61pj1G_';
const POSITIVE_VIDEO_URL = 'https://youtu.be/q0139U0m50c?si=7Hq0EjcZNznOI7Z-';

// PANAS: порядок должен совпадать с официальной шкалой (русская адаптация)
const PANAS_ITEMS = [
  "Заинтересованный", "Раздраженный", "Вдохновленный", "Пугливый", "Мощный",
  "Виноватый", "Страх", "Добродушный", "Злой", "Сильный",
  "Одинокий", "Внимательный", "Враждебный", "Энтузиастичный", "Смущенный",
  "Гордый", "Негодующий", "Активный", "Печальный", "Полный энергии"
];

// УТВЕРЖДЕНИЯ: 40 штук (20 научных + 20 псевдонаучных)
// ← ЗАМЕНИ НА СВОИ! Примеры ниже — только для структуры.
const STATEMENTS = [
  // Научные (примеры)
  "Физическая активность снижает уровень тревожности.",
  "Сон важен для консолидации памяти.",
  "Эмпатия связана с активностью зеркальных нейронов.",
  "Когнитивно-поведенческая терапия эффективна при депрессии.",
  "Хронический стресс может ослаблять иммунную систему.",
  "Медитация может улучшать внимание и саморегуляцию.",
  "Музыка влияет на эмоциональное состояние человека.",
  "Социальная поддержка снижает риск развития психических расстройств.",
  "Лица лучше распознаются в верхней части зрительного поля.",
  "Дети учатся через подражание взрослым.",
  "Положительное подкрепление эффективнее наказания в обучении.",
  "Эмоции влияют на принятие решений.",
  "Мозг сохраняет нейропластичность на протяжении всей жизни.",
  "Страх активирует миндалевидное тело.",
  "Цвет может влиять на восприятие времени.",
  "Люди склонны к когнитивным искажениям.",
  "Глубокий сон важен для физического восстановления.",
  "Визуальные образы активируют одни и те же зоны мозга, что и реальное зрение.",
  "Стыд и вина — разные эмоции с разными последствиями.",
  "Психотерапия может изменять структуру мозга.",
  
  // Псевдонаучные (примеры)
  "Люди используют только 10% своего мозга.",
  "Можно определить характер по форме черепа.",
  "Подсознание управляет 95% наших действий.",
  "Правое полушарие — творческое, левое — логическое.",
  "Можно читать мысли с помощью ЭЭГ.",
  "Нейролингвистическое программирование научно доказано.",
  "Цвета одежды точно отражают личность.",
  "Мозг не может отличить воображаемое от реального.",
  "У каждого человека есть скрытые способности, которые можно разбудить.",
  "Музыка Моцарта повышает IQ у детей.",
  "Человек может управлять своими генами мыслью.",
  "Эмоции хранятся в клетках тела.",
  "Сны всегда имеют скрытый символический смысл.",
  "Можно вылечить депрессию только позитивным мышлением.",
  "Все психологические проблемы идут из детства.",
  "Тест Роршаха точно определяет личность.",
  "Можно 'запрограммировать' мозг на успех за 21 день.",
  "Биополя человека можно измерить приборами.",
  "Существуют 'врождённые типы личности', которые нельзя изменить.",
  "Гипноз позволяет вспомнить прошлые жизни."
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
  if (participant.group === 1) {
    renderStatements();
    showStep('stepRatings');
  } else if (participant.group === 2) {
    renderVideo(NEGATIVE_VIDEO_URL);
    showStep('stepVideo');
  } else if (participant.group === 3) {
    renderVideo(POSITIVE_VIDEO_URL);
    showStep('stepVideo');
  }
}

// ============ ШАГ 3: ВИДЕО ============
function renderVideo(youtubeUrl) {
  const embedUrl = youtubeUrl.replace('watch?v=', 'embed/');
  document.getElementById('videoFrame').src = embedUrl;
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