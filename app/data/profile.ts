/**
 * All texts of the site, Russian (main, "/") and English ("/en").
 * Change the content here; the layout lives in app/components/Portfolio.vue.
 */
export type Lang = 'ru' | 'en'

export interface Job {
  period: string
  role: string
  company: string
  product: string
  points: string[]
  tech: string
}

export interface Profile {
  lang: Lang
  title: string
  description: string
  name: string
  role: string
  lead: string
  status: string
  cta: { telegram: string; cv: string; cvNote: string }
  nav: { experience: string; skills: string; contacts: string; switchTo: string }
  experienceTitle: string
  jobs: Job[]
  skillsTitle: string
  skills: { group: string; items: string }[]
  languages: string
  educationTitle: string
  education: { period: string; text: string }
  contactsTitle: string
  contactsLead: string
  contactsSticker: { src: string; alt: string; frame: string }
  footer: string
  footerNote: string
  photoAlt: string
  archie: { title: string; text: string; review: { src: string; alt: string; caption: string }; photos: { src: string; full: string; alt: string }[] }
  life: { title: string; photos: { src: string; full: string; alt: string; caption: string }[] }
  lightbox: { close: string; prev: string; next: string; hint: string; open: string }
}

const contacts = {
  email: 'mikhail.makavetski@gmail.com',
  telegram: 'https://t.me/MlXAKER',
  linkedin: 'https://www.linkedin.com/in/mikhail-makavetski-592062233/',
  github: 'https://github.com/makavetski',
}
export { contacts }

const tech = {
  edtech: 'PHP, Laravel, MySQL, Redis, RabbitMQ, Vue.js, Nuxt, TypeScript, Pinia, Tailwind CSS, Docker',
  proptech: 'PHP, Laravel, Zend, MySQL, Redis, RabbitMQ, Vue.js, Nuxt, TypeScript, Pinia, Stripe, AWS S3, Docker',
  innowise: 'PHP, Laravel, MySQL, Vue.js, JavaScript, Elasticsearch, Redis, PHPUnit, GitLab CI/CD, Docker',
  freelance: 'PHP, Laravel, Vue.js, REST API, Redis, RabbitMQ',
}

export const ru: Profile = {
  lang: 'ru',
  title: 'Михаил Маковецкий — Full Stack разработчик (PHP/Laravel, Vue/Nuxt)',
  description:
    'Full Stack разработчик, 5+ лет коммерческого опыта: Laravel, Vue и Nuxt, Stripe, очереди, оптимизация производительности. Минск, открыт к предложениям.',
  name: 'Михаил Маковецкий',
  role: 'Full Stack разработчик: PHP/Laravel и Vue/Nuxt',
  lead:
    'Больше 5 лет делаю веб-продукты целиком: от схемы базы и API на Laravel до интерфейсов на Vue и Nuxt. Ускорял API на 35–40% и LCP на 30% в боевых проектах, был тимлидом команды из четырёх человек.',
  status: 'Открыт к предложениям. Минск, удалённо.',
  cta: { telegram: 'Написать в Telegram', cv: 'Скачать резюме', cvNote: 'PDF, на английском' },
  nav: { experience: 'Опыт', skills: 'Навыки', contacts: 'Контакты', switchTo: 'EN' },
  experienceTitle: 'Опыт',
  jobs: [
    {
      period: 'ноя 2025 — апр 2026',
      role: 'Full Stack разработчик',
      company: 'Фриланс',
      product: 'EdTech: платформа управления учебным процессом — успеваемость, расписание, отчёты',
      points: [
        'Разрабатывал API на Laravel и интерфейсы на Nuxt и TypeScript для успеваемости, расписания и отчётов.',
        'Сократил среднее время ответа ключевых эндпоинтов примерно на 40%: оптимизация запросов, eager loading, индексы. Замеры до и после — Laravel Telescope и Postman.',
        'Улучшил Largest Contentful Paint примерно на 30% за счёт оптимизации рендеринга и загрузки бандлов (замеры в Lighthouse).',
        'Добавил кэширование в Redis для часто запрашиваемых данных и вынес долгие задачи в очереди RabbitMQ.',
      ],
      tech: tech.edtech,
    },
    {
      period: 'сен 2023 — авг 2025',
      role: 'Full Stack разработчик',
      company: 'Right&Above',
      product: 'PropTech: Connected Investors — платформа инвестиций в недвижимость, миграция с Zend на Laravel и Nuxt',
      points: [
        'Поддерживал легаси-платформу и участвовал в её переносе на Laravel и Nuxt 3 с TypeScript.',
        'Делал каталог объектов, дашборды и рабочие процессы управления на бэкенде и фронтенде.',
        'Интегрировал платежи и подписки Stripe, включая обработку вебхуков.',
        'Ускорил инициализацию Google Maps примерно в 5 раз: меньше запросов к API и оптимизированная отрисовка маркеров.',
        'Сократил время ответа ключевых эндпоинтов примерно на 35% оптимизацией запросов MySQL и кэшем в Redis.',
        'Менторил младших разработчиков и унифицировал Docker-окружение, чтобы упростить онбординг.',
      ],
      tech: tech.proptech,
    },
    {
      period: 'дек 2021 — авг 2023',
      role: 'Full Stack разработчик',
      company: 'Innowise Group',
      product: 'Внутренние HR-инструменты: конструктор резюме и управление сотрудниками',
      points: [
        'Делал интерфейсы конструктора резюме, валидацию форм и REST API на Vue.js и Laravel.',
        'Реализовал поиск и фильтрацию резюме на Elasticsearch и асинхронную генерацию выгрузок.',
        'Был исполняющим обязанности тимлида команды из четырёх: распределял задачи, проводил код-ревью, помогал с техническими решениями.',
        'Настроил пайплайны GitLab CI/CD для автоматических тестов и релизов.',
      ],
      tech: tech.innowise,
    },
    {
      period: 'июл 2020 — ноя 2021',
      role: 'Full Stack разработчик',
      company: 'Фриланс',
      product: 'Клиентские проекты: заказ еды в ресторанах и учёт жилых помещений',
      points: [
        'Разрабатывал интерфейсы заказа и обработку заказов на бэкенде: Laravel, Vue.js, REST API.',
        'Реализовал административные процессы: учёт жильцов, смена статусов, бизнес-правила.',
        'Добавил кэширование в Redis и фоновую обработку в RabbitMQ для рутинных задач и уведомлений.',
      ],
      tech: tech.freelance,
    },
  ],
  skillsTitle: 'Навыки',
  skills: [
    { group: 'Основной стек', items: 'PHP, Laravel, Vue.js, Nuxt 3, TypeScript, MySQL, Redis' },
    { group: 'Бэкенд', items: 'проектирование REST API, Laravel Horizon, очереди RabbitMQ, Elasticsearch, PHPUnit, Composer, Zend (легаси)' },
    { group: 'Фронтенд', items: 'JavaScript, Pinia и Vuex, Tailwind CSS, HTML, SCSS, адаптивная вёрстка, Vitest' },
    { group: 'Интеграции', items: 'Stripe и Laravel Cashier, вебхуки, Google Maps API, AWS S3' },
    { group: 'DevOps и инструменты', items: 'Docker, Git, GitLab CI/CD, Linux (Ubuntu), Postman, Laravel Telescope, Lighthouse, Chrome DevTools' },
    { group: 'AI в работе', items: 'Claude Code и Codex каждый день' },
  ],
  languages: 'Языки: русский — родной, английский — B2.',
  educationTitle: 'Образование',
  education: { period: '2016 — 2020', text: 'КБиП, Минск — программное обеспечение информационных технологий (ПОиТ)' },
  contactsTitle: 'Контакты',
  contactsLead: 'Быстрее всего отвечаю в Telegram. Для писем — почта.',
  contactsSticker: {
    src: '/contact-sticker.webp',
    alt: 'Иллюстрация: Михаил машет рукой, хаски Арчи держит рамку с надписью «Открыт к новым проектам»',
    frame: 'Открыт к\u00a0новым проектам',
  },
  footer: 'Сайт под присмотром хаски.',
  footerNote: 'Арчи проверяет каждый коммит.',
  photoAlt: 'Михаил Маковецкий',
  archie: {
    title: 'Арчи',
    text: 'Мой хаски и напарник в поездках. Отвечает за настроение в команде и проверяет, чтобы я вовремя делал перерывы.',
    review: { src: '/archie-review.webp', alt: 'Иллюстрация: хаски в очках проверяет код на ноутбуке, рядом Михаил с кофе', caption: 'Арчи проверяет мой код' },
    photos: [
      { src: '/archie-mirror.jpg', full: '/archie-mirror-full.jpg', alt: 'Хаски Арчи смотрит из окна машины, отражение в боковом зеркале' },
      { src: '/archie-smile.jpg', full: '/archie-smile-full.jpg', alt: 'Хаски Арчи лежит на газоне и улыбается' },
      { src: '/archie-snow.jpg', full: '/archie-snow-full.jpg', alt: 'Хаски Арчи на прогулке по снегу' },
      { src: '/archie-grin.jpg', full: '/archie-grin-full.jpg', alt: 'Хаски Арчи довольно щурится на солнце' },
    ],
  },
  life: {
    title: 'Вне работы',
    photos: [
      { src: '/life-kayak.jpg', full: '/life-kayak-full.jpg', alt: 'Каяк на Висле, вдали Варшава', caption: 'На каяке по Висле, Варшава' },
      { src: '/life-grill.jpg', full: '/life-grill-full.jpg', alt: 'Михаил у мангала', caption: 'Выходные у мангала' },
      { src: '/life-meetup.jpg', full: '/life-meetup-full.jpg', alt: 'Общее фото участников летней встречи в парке', caption: 'Летняя встреча на ~200 человек: общение и волейбол' },
      { src: '/life-fire.jpg', full: '/life-fire-full.jpg', alt: 'Костёр в мангале вечером', caption: 'Вечерний костёр на летней встрече' },
    ],
  },
  lightbox: { close: 'Закрыть', prev: 'Предыдущее фото', next: 'Следующее фото', hint: 'нажмите дважды, чтобы приблизить', open: 'Открыть фото' },
}

export const en: Profile = {
  lang: 'en',
  title: 'Mikhail Makavetski — Full Stack Developer (PHP/Laravel, Vue/Nuxt)',
  description:
    'Full Stack Developer with 5+ years of commercial experience: Laravel, Vue and Nuxt, Stripe, queues, performance tuning. Minsk, open to new opportunities.',
  name: 'Mikhail Makavetski',
  role: 'Full Stack Developer: PHP/Laravel and Vue/Nuxt',
  lead:
    'For 5+ years I have been delivering web products end to end, from database and API design in Laravel to Vue and Nuxt interfaces. Cut API response times by 35–40% and LCP by 30% on production products, and led a team of four.',
  status: 'Open to new opportunities. Minsk, remote.',
  cta: { telegram: 'Message on Telegram', cv: 'Download CV', cvNote: 'PDF' },
  nav: { experience: 'Experience', skills: 'Skills', contacts: 'Contacts', switchTo: 'RU' },
  experienceTitle: 'Experience',
  jobs: [
    {
      period: 'Nov 2025 — Apr 2026',
      role: 'Full Stack Developer',
      company: 'Freelance',
      product: 'EdTech: education management platform for academic tracking, scheduling, reporting and administration',
      points: [
        'Built backend APIs (Laravel) and frontend features (Nuxt, TypeScript) for academic tracking, scheduling and reporting.',
        'Reduced average response time of key API endpoints by ~40% through query optimization, eager loading and database indexing, measured before and after with Laravel Telescope and Postman.',
        'Improved Largest Contentful Paint by ~30% through rendering and bundle-loading optimizations (measured with Lighthouse).',
        'Added Redis caching for frequently accessed data and moved long-running tasks to RabbitMQ queues.',
      ],
      tech: tech.edtech,
    },
    {
      period: 'Sep 2023 — Aug 2025',
      role: 'Full Stack Developer',
      company: 'Right&Above',
      product: 'PropTech: Connected Investors, property investment platform (legacy Zend to Laravel + Nuxt migration)',
      points: [
        'Maintained the legacy property platform and contributed to its migration to Laravel and Nuxt 3 / TypeScript.',
        'Built property listings, dashboards and management workflows across the Laravel backend and Nuxt frontend.',
        'Integrated Stripe payments and subscriptions, including webhook processing.',
        'Made Google Maps initialization ~5x faster by reducing API requests and optimizing marker rendering.',
        'Reduced average response time of key API endpoints by ~35% through MySQL query optimization and Redis caching.',
        'Mentored junior developers and standardized Docker development environments to simplify onboarding.',
      ],
      tech: tech.proptech,
    },
    {
      period: 'Dec 2021 — Aug 2023',
      role: 'Full Stack Developer',
      company: 'Innowise Group',
      product: 'Internal HR tools: CV creation and employee management applications',
      points: [
        'Built CV builder interfaces, form validation and REST API endpoints with Vue.js and Laravel.',
        'Implemented Elasticsearch search and filtering for CV records and asynchronous export generation.',
        'Led a team of four as acting team lead: coordinated tasks, reviewed code and supported implementation decisions.',
        'Introduced GitLab CI/CD pipelines to automate testing and support releases.',
      ],
      tech: tech.innowise,
    },
    {
      period: 'Jul 2020 — Nov 2021',
      role: 'Full Stack Developer',
      company: 'Freelance',
      product: 'Client projects: restaurant food ordering and residential management',
      points: [
        'Developed restaurant ordering interfaces and backend order processing with Laravel, Vue.js and REST APIs.',
        'Implemented administrative workflows for residence records, status changes and business rules.',
        'Added Redis caching and RabbitMQ background processing for routine tasks and notifications.',
      ],
      tech: tech.freelance,
    },
  ],
  skillsTitle: 'Skills',
  skills: [
    { group: 'Core stack', items: 'PHP, Laravel, Vue.js, Nuxt 3, TypeScript, MySQL, Redis' },
    { group: 'Backend', items: 'REST API design, Laravel Horizon, RabbitMQ queues, Elasticsearch, PHPUnit, Composer, Zend (legacy)' },
    { group: 'Frontend', items: 'JavaScript, Pinia / Vuex, Tailwind CSS, HTML, SCSS, responsive design, Vitest' },
    { group: 'Integrations', items: 'Stripe / Laravel Cashier, webhooks, Google Maps API, AWS S3' },
    { group: 'DevOps & tools', items: 'Docker, Git, GitLab CI/CD, Linux (Ubuntu), Postman, Laravel Telescope, Lighthouse, Chrome DevTools' },
    { group: 'AI tools', items: 'Claude Code and Codex, daily' },
  ],
  languages: 'Languages: Russian — native, English — B2.',
  educationTitle: 'Education',
  education: { period: '2016 — 2020', text: 'KBiP, Minsk — Software for Information Technologies' },
  contactsTitle: 'Contacts',
  contactsLead: 'Telegram is the fastest way to reach me. Email works too.',
  contactsSticker: {
    src: '/contact-sticker.webp',
    alt: 'Illustration: Mikhail waving, Archie the husky holding a frame that says "Open to new projects"',
    frame: 'Open to new projects',
  },
  footer: 'This site is supervised by a husky.',
  footerNote: 'Archie reviews every commit.',
  photoAlt: 'Mikhail Makavetski',
  archie: {
    title: 'Archie',
    text: 'My husky and travel buddy. In charge of team morale and makes sure I take breaks on time.',
    review: { src: '/archie-review.webp', alt: 'Illustration: a husky in glasses reviewing code on a laptop, Mikhail with a coffee next to him', caption: 'Archie reviewing my code' },
    photos: [
      { src: '/archie-mirror.jpg', full: '/archie-mirror-full.jpg', alt: 'Archie the husky looking out of the car window, seen in the side mirror' },
      { src: '/archie-smile.jpg', full: '/archie-smile-full.jpg', alt: 'Archie the husky lying on the lawn and smiling' },
      { src: '/archie-snow.jpg', full: '/archie-snow-full.jpg', alt: 'Archie the husky on a snowy walk' },
      { src: '/archie-grin.jpg', full: '/archie-grin-full.jpg', alt: 'Archie the husky squinting happily in the sun' },
    ],
  },
  life: {
    title: 'Off work',
    photos: [
      { src: '/life-kayak.jpg', full: '/life-kayak-full.jpg', alt: 'A kayak on the Vistula with Warsaw in the distance', caption: 'Kayaking on the Vistula, Warsaw' },
      { src: '/life-grill.jpg', full: '/life-grill-full.jpg', alt: 'Mikhail at a barbecue', caption: 'Weekends at the grill' },
      { src: '/life-meetup.jpg', full: '/life-meetup-full.jpg', alt: 'Group photo of a summer meetup in a park', caption: 'Summer meetup of ~200 people: chatting and volleyball' },
      { src: '/life-fire.jpg', full: '/life-fire-full.jpg', alt: 'An evening fire in a grill', caption: 'Evening fire at a summer meetup' },
    ],
  },
  lightbox: { close: 'Close', prev: 'Previous photo', next: 'Next photo', hint: 'double tap or click to zoom', open: 'Open photo' },
}
