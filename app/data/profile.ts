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
  cta: { telegram: string; cv: string; cvNote: string; cvFile: string }
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
  loadersButton: { show: string; hide: string }
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
  factory: 'PHP, Laravel, MySQL, Vue.js, Nuxt, TypeScript, i18n, Docker',
  edtech: 'PHP, Laravel, MySQL, Redis, RabbitMQ, Vue.js, Nuxt, TypeScript, Pinia, Tailwind CSS, WebSocket, Docker',
  proptech:
    'PHP 7.4 / 8, Laravel, MySQL, Redis, Vue.js, Nuxt 3, TypeScript, Pinia, Vuex, Zod, vue-query, Nuxt UI, Chart.js, Vite, Storybook, Playwright, RabbitMQ, WebSocket, JWT, Swagger/OpenAPI, i18n, Stripe, AWS S3, Docker',
  innowise:
    'PHP, Laravel, MySQL, Redis, Vue.js, JavaScript, Bootstrap, Webpack, Elasticsearch, RabbitMQ, GraphQL, Laravel Sanctum, OAuth, PHPUnit, Cypress, GitLab CI/CD, i18n, Docker',
  freelance: 'PHP, Laravel, MySQL, Vue.js, JavaScript, HTML, SCSS, Redis, RabbitMQ, Docker',
}

export const ru: Profile = {
  lang: 'ru',
  title: 'Михаил Маковецкий — Full Stack разработчик (PHP/Laravel, Vue/Nuxt)',
  description:
    'Full Stack разработчик, 6 лет коммерческого опыта: Laravel, Vue 3 и Nuxt 3, TypeScript, Stripe, очереди. Минск, удалённо или гибрид.',
  name: 'Михаил Маковецкий',
  role: 'Full Stack разработчик: PHP/Laravel и Vue/Nuxt',
  lead:
    'Fullstack-разработчик, 6 лет коммерческого опыта на PHP/Laravel и Vue.js, последние три года — Vue 3, Nuxt 3 и TypeScript. На платформе по недвижимости для американского клиента (команда 20+) выстроил архитектуру фронтенда, ускорил карту примерно в 5 раз и API примерно на 35%. Руководил командой из четырёх, менторю джунов.',
  status: 'Открыт к предложениям. Минск: удалённо или гибрид, B2B.',
  cta: { telegram: 'Написать в Telegram', cv: 'Скачать резюме', cvNote: 'PDF', cvFile: '/cv-ru.pdf' },
  nav: { experience: 'Опыт', skills: 'Навыки', contacts: 'Контакты', switchTo: 'EN' },
  experienceTitle: 'Опыт',
  jobs: [
    {
      period: 'май 2026 — ноя 2026',
      role: 'Full Stack разработчик, частичная занятость',
      company: 'Фриланс',
      product: 'Корпоративный сайт производственной компании: страницы, каталог продукции и админ-панель. Проект в разработке',
      points: [
        'Сделал клиентскую часть на Nuxt и серверную на Laravel: мультиязычные страницы и каталог продукции с поиском.',
        'Разработал админ-панель с авторизацией и ролями: страницы, каталог и заявки, поиск и фильтры. Каталог наполняется без участия разработчика.',
        'Настроил приём заявок с мгновенными уведомлениями в админке и в Telegram, подготовил сайт к индексации: SSR, мета-теги, sitemap, Open Graph.',
      ],
      tech: tech.factory,
    },
    {
      period: 'ноя 2025 — апр 2026',
      role: 'Full Stack разработчик',
      company: 'EdTech-платформа, контракт',
      product: 'CRM для учебных учреждений: успеваемость, расписание, отчётность. Новый продукт на несколько тысяч пользователей, команда из 6 человек',
      points: [
        'Сделал отчёты с фильтрами и выгрузкой: интерфейс на Nuxt и TypeScript, API на Laravel. Тяжёлые отчёты вынес в очереди RabbitMQ и добавил индексы, и отчёты за большой период перестали упираться в таймаут.',
        'Построил ролевую модель доступа к разделам и действиям в интерфейсе.',
        'Определял подходы к коду на фронтенде: структура проекта, переиспользуемые компоненты, формы и таблицы; участвовал в распределении задач.',
        'LCP улучшился примерно на 30% благодаря отложенной загрузке тяжёлых компонентов.',
      ],
      tech: tech.edtech,
    },
    {
      period: 'сен 2023 — авг 2025',
      role: 'Full Stack разработчик',
      company: 'Right&Above, B2B',
      product: 'Connected Investors — платформа по недвижимости для американского клиента. Новая версия с нуля на Laravel и Nuxt 3 взамен Zend, команда выросла до 20+ человек',
      points: [
        'Выстроил архитектуру фронтенда на Nuxt 3 и TypeScript: документация с соглашениями, эталонные шаблоны компонентов, ревью кода в команде фронтенда из 6–7 человек.',
        'Сделал UI-kit из переиспользуемых компонентов с документацией в Storybook.',
        'Реализовал на Pinia сложную клиентскую логику, включая фильтры объектов, и убрал лишние запросы и перерисовки.',
        'Разрабатывал серверную часть на Laravel: объекты, дашборды, рабочие процессы; подключил платежи и подписки Stripe с вебхуками.',
        'Ускорил инициализацию Google Maps примерно в 5 раз, а ответ ключевых API — примерно на 35% (оптимизация MySQL и кеш в Redis).',
        'Настроил Docker-окружение с нуля, обновлял Nuxt до новых версий, менторил джунов.',
      ],
      tech: tech.proptech,
    },
    {
      period: 'дек 2021 — авг 2023',
      role: 'Full Stack разработчик',
      company: 'Innowise',
      product: 'Аутсорс-компания (около 1500 сотрудников): внутренняя платформа резюме и подготовки к собеседованиям, затем клиентское приложение для данных сотрудников',
      points: [
        'Руководил командой из четырёх на раннем этапе платформы резюме: распределял задачи, проводил ревью кода, помогал с техническими решениями.',
        'Разработал фронтенд на Vue.js и бэкенд на Laravel: конструктор резюме с готовыми образцами, экраны управления сотрудниками и командами.',
        'Построил поиск и фильтрацию на Elasticsearch, выгрузку результатов вынес в очереди RabbitMQ.',
        'Писал тесты PHPUnit и с нуля настроил GitLab CI/CD для автоматических тестов и релизов.',
      ],
      tech: tech.innowise,
    },
    {
      period: 'июл 2020 — ноя 2021',
      role: 'Junior Full Stack разработчик',
      company: 'Фриланс',
      product: 'Первые коммерческие проекты в команде: сайт заказов для ресторана и приложение для ЖЭС',
      points: [
        'Сайт заказов: интерфейс, серверная часть, приём заказов в админке, уведомления и фоновые задачи в очередях RabbitMQ.',
        'Приложение для ЖЭС: учёт жилья, смена статусов, бизнес-правила — и фронтенд, и бэкенд.',
      ],
      tech: tech.freelance,
    },
  ],
  skillsTitle: 'Навыки',
  skills: [
    { group: 'Основной стек', items: 'PHP 8, Laravel, Vue 3, Nuxt 3, TypeScript, MySQL, Redis' },
    { group: 'Бэкенд', items: 'Eloquent, очереди (Horizon, RabbitMQ), REST API и Swagger/OpenAPI, GraphQL, Sanctum, JWT, OAuth, RBAC, Elasticsearch, Node.js' },
    { group: 'Фронтенд', items: 'Composition API, Pinia, Vuex, Zod, vue-query, Nuxt UI, Tailwind CSS, Storybook, Vite, SSR, SEO, i18n, адаптивная вёрстка' },
    { group: 'Тесты и качество', items: 'PHPUnit, PHPStan, Vitest, Playwright, Cypress, ESLint, Prettier' },
    { group: 'Инфраструктура', items: 'Docker, GitLab CI/CD, Git, Linux, Nginx, AWS S3' },
    { group: 'Интеграции', items: 'Stripe (Laravel Cashier), Google Maps API, Telegram Bot API, WebSocket' },
    { group: 'AI в работе', items: 'Claude, ChatGPT, Codex' },
  ],
  languages: 'Языки: русский — родной, английский — B2 (Upper-Intermediate).',
  educationTitle: 'Образование',
  education: { period: '2016 — 2020', text: 'Колледж бизнеса и права, Минск — «Программное обеспечение информационных технологий», техник-программист' },
  contactsTitle: 'Контакты',
  contactsLead: 'Быстрее всего отвечаю в Telegram. Для писем — почта.',
  contactsSticker: {
    src: '/contact-sticker.webp',
    alt: 'Иллюстрация: Михаил машет рукой, хаски Арчи держит рамку с надписью «Открыт к новым проектам»',
    frame: 'Открыт к\u00a0новым проектам',
  },
  footer: 'Сайт под присмотром хаски.',
  footerNote: 'Арчи проверяет каждый коммит.',
  loadersButton: { show: 'Посмотреть, как Арчи бегает', hide: 'Вернуть фото' },
  photoAlt: 'Михаил Маковецкий',
  archie: {
    title: 'Арчи',
    text: 'Мой хаски и напарник в поездках. Отвечает за настроение в команде и проверяет, чтобы я вовремя делал перерывы.',
    review: { src: '/archie-review.webp', alt: 'Иллюстрация: хаски в очках проверяет код на ноутбуке, рядом Михаил с кофе', caption: 'Арчи проверяет мой код' },
    photos: [
      { src: '/archie-mirror.webp', full: '/archie-mirror-full.webp', alt: 'Хаски Арчи смотрит из окна машины, отражение в боковом зеркале' },
      { src: '/archie-smile.webp', full: '/archie-smile-full.webp', alt: 'Хаски Арчи лежит на газоне и улыбается' },
      { src: '/archie-snow.webp', full: '/archie-snow-full.webp', alt: 'Хаски Арчи на прогулке по снегу' },
      { src: '/archie-grin.webp', full: '/archie-grin-full.webp', alt: 'Хаски Арчи довольно щурится на солнце' },
    ],
  },
  life: {
    title: 'Вне работы',
    photos: [
      { src: '/life-kayak.webp', full: '/life-kayak-full.webp', alt: 'Каяк на Висле, вдали Варшава', caption: 'На каяке по Висле, Варшава' },
      { src: '/life-grill.webp', full: '/life-grill-full.webp', alt: 'Михаил у мангала', caption: 'Выходные у мангала' },
      { src: '/life-meetup.webp', full: '/life-meetup-full.webp', alt: 'Общее фото участников летней встречи в парке', caption: 'Летняя встреча на ~200 человек: общение и волейбол' },
      { src: '/life-fire.webp', full: '/life-fire-full.webp', alt: 'Костёр в мангале вечером', caption: 'Вечерний костёр на летней встрече' },
    ],
  },
  lightbox: { close: 'Закрыть', prev: 'Предыдущее фото', next: 'Следующее фото', hint: 'дважды нажмите или сведите пальцы, чтобы приблизить', open: 'Открыть фото' },
}

export const en: Profile = {
  lang: 'en',
  title: 'Mikhail Makavetski — Full Stack Developer (PHP/Laravel, Vue/Nuxt)',
  description:
    'Full Stack Developer with 6 years of commercial experience: Laravel, Vue 3 and Nuxt 3, TypeScript, Stripe, queues. Minsk, remote or hybrid.',
  name: 'Mikhail Makavetski',
  role: 'Full Stack Developer: PHP/Laravel and Vue/Nuxt',
  lead:
    'Full Stack Developer with 6 years of commercial experience in PHP/Laravel and Vue.js, the last three with Vue 3, Nuxt 3 and TypeScript. On a real estate platform for a US client (team of 20+) I set up the frontend architecture, made the map ~5x faster and the API ~35% faster. Led a team of four and mentor juniors.',
  status: 'Open to new opportunities. Minsk: remote or hybrid, B2B.',
  cta: { telegram: 'Message on Telegram', cv: 'Download CV', cvNote: 'PDF', cvFile: '/cv.pdf' },
  nav: { experience: 'Experience', skills: 'Skills', contacts: 'Contacts', switchTo: 'RU' },
  experienceTitle: 'Experience',
  jobs: [
    {
      period: 'May 2026 — Nov 2026',
      role: 'Full Stack Developer, part-time',
      company: 'Freelance',
      product: 'Corporate website for a manufacturing company: pages, product catalog and admin panel. In development',
      points: [
        'Built the Nuxt frontend and the Laravel backend: multilingual pages and a product catalog with search.',
        'Built an admin panel with authorization and roles: pages, catalog and requests, with search and filters. The catalog is filled without a developer.',
        'Set up website requests with instant notifications in the admin panel and in Telegram; prepared the site for search engines: SSR, meta tags, sitemap, Open Graph.',
      ],
      tech: tech.factory,
    },
    {
      period: 'Nov 2025 — Apr 2026',
      role: 'Full Stack Developer',
      company: 'EdTech platform, contract',
      product: 'CRM for educational institutions: grades, schedules, reporting. A new product for several thousand users, team of 6',
      points: [
        'Built reports with filters and export: Nuxt and TypeScript UI, Laravel APIs. Moved heavy report generation to RabbitMQ queues and added indexes, so long-period reports no longer hit timeouts.',
        'Built role-based access control for sections and actions in the UI.',
        'Shaped frontend code practices: project structure, reusable components, forms and tables; helped distribute tasks in the frontend team.',
        'Improved LCP by ~30% with lazy loading of heavy components.',
      ],
      tech: tech.edtech,
    },
    {
      period: 'Sep 2023 — Aug 2025',
      role: 'Full Stack Developer',
      company: 'Right&Above, B2B',
      product: 'Connected Investors, a real estate platform for a US client. The new version was built from scratch on Laravel and Nuxt 3 to replace Zend; the team grew to 20+',
      points: [
        'Set up the frontend architecture on Nuxt 3 and TypeScript: documented conventions, reference component templates, code reviews in a frontend team of 6–7.',
        'Built a UI kit of reusable components documented in Storybook.',
        'Implemented complex client-side logic in Pinia, including property filters, and removed redundant requests and re-renders.',
        'Developed the Laravel backend: properties, dashboards, workflows; integrated Stripe payments and subscriptions with webhooks.',
        'Made Google Maps initialization ~5x faster and key API responses ~35% faster (MySQL optimization and Redis caching).',
        'Set up the Docker environment from scratch, kept Nuxt up to date, mentored juniors.',
      ],
      tech: tech.proptech,
    },
    {
      period: 'Dec 2021 — Aug 2023',
      role: 'Full Stack Developer',
      company: 'Innowise',
      product: 'Outsourcing company (~1,500 people): an internal platform for CVs and interview preparation, then a client app for employee data',
      points: [
        'Led a team of four in the early stage of the CV platform: distributed tasks, reviewed code, helped with technical decisions.',
        'Built the Vue.js frontend and the Laravel backend: a CV builder with ready-made templates, employee and team management screens.',
        'Built search and filtering on Elasticsearch and moved result exports to RabbitMQ queues.',
        'Wrote PHPUnit tests and set up GitLab CI/CD from scratch for automated tests and releases.',
      ],
      tech: tech.innowise,
    },
    {
      period: 'Jul 2020 — Nov 2021',
      role: 'Junior Full Stack Developer',
      company: 'Freelance',
      product: 'First commercial projects in a team: a restaurant ordering website and an app for a housing office',
      points: [
        'Ordering website: UI, backend, order handling in the admin panel, notifications and background jobs in RabbitMQ queues.',
        'Housing office app: housing records, status changes, business rules, on both frontend and backend.',
      ],
      tech: tech.freelance,
    },
  ],
  skillsTitle: 'Skills',
  skills: [
    { group: 'Core stack', items: 'PHP 8, Laravel, Vue 3, Nuxt 3, TypeScript, MySQL, Redis' },
    { group: 'Backend', items: 'Eloquent, queues (Horizon, RabbitMQ), REST API and Swagger/OpenAPI, GraphQL, Sanctum, JWT, OAuth, RBAC, Elasticsearch, Node.js' },
    { group: 'Frontend', items: 'Composition API, Pinia, Vuex, Zod, vue-query, Nuxt UI, Tailwind CSS, Storybook, Vite, SSR, SEO, i18n, responsive design' },
    { group: 'Testing & quality', items: 'PHPUnit, PHPStan, Vitest, Playwright, Cypress, ESLint, Prettier' },
    { group: 'Infrastructure', items: 'Docker, GitLab CI/CD, Git, Linux, Nginx, AWS S3' },
    { group: 'Integrations', items: 'Stripe (Laravel Cashier), Google Maps API, Telegram Bot API, WebSocket' },
    { group: 'AI tools', items: 'Claude, ChatGPT, Codex' },
  ],
  languages: 'Languages: Russian — native, English — B2 (Upper-Intermediate).',
  educationTitle: 'Education',
  education: { period: '2016 — 2020', text: 'College of Business and Law, Minsk — Software for Information Technologies, programming technician' },
  contactsTitle: 'Contacts',
  contactsLead: 'Telegram is the fastest way to reach me. Email works too.',
  contactsSticker: {
    src: '/contact-sticker.webp',
    alt: 'Illustration: Mikhail waving, Archie the husky holding a frame that says "Open to new projects"',
    frame: 'Open to new projects',
  },
  footer: 'This site is supervised by a husky.',
  footerNote: 'Archie reviews every commit.',
  loadersButton: { show: 'Watch Archie run', hide: 'Bring the photos back' },
  photoAlt: 'Mikhail Makavetski',
  archie: {
    title: 'Archie',
    text: 'My husky and travel buddy. In charge of team morale and makes sure I take breaks on time.',
    review: { src: '/archie-review.webp', alt: 'Illustration: a husky in glasses reviewing code on a laptop, Mikhail with a coffee next to him', caption: 'Archie reviewing my code' },
    photos: [
      { src: '/archie-mirror.webp', full: '/archie-mirror-full.webp', alt: 'Archie the husky looking out of the car window, seen in the side mirror' },
      { src: '/archie-smile.webp', full: '/archie-smile-full.webp', alt: 'Archie the husky lying on the lawn and smiling' },
      { src: '/archie-snow.webp', full: '/archie-snow-full.webp', alt: 'Archie the husky on a snowy walk' },
      { src: '/archie-grin.webp', full: '/archie-grin-full.webp', alt: 'Archie the husky squinting happily in the sun' },
    ],
  },
  life: {
    title: 'Off work',
    photos: [
      { src: '/life-kayak.webp', full: '/life-kayak-full.webp', alt: 'A kayak on the Vistula with Warsaw in the distance', caption: 'Kayaking on the Vistula, Warsaw' },
      { src: '/life-grill.webp', full: '/life-grill-full.webp', alt: 'Mikhail at a barbecue', caption: 'Weekends at the grill' },
      { src: '/life-meetup.webp', full: '/life-meetup-full.webp', alt: 'Group photo of a summer meetup in a park', caption: 'Summer meetup of ~200 people: chatting and volleyball' },
      { src: '/life-fire.webp', full: '/life-fire-full.webp', alt: 'An evening fire in a grill', caption: 'Evening fire at a summer meetup' },
    ],
  },
  lightbox: { close: 'Close', prev: 'Previous photo', next: 'Next photo', hint: 'double tap, pinch or scroll to zoom', open: 'Open photo' },
}
