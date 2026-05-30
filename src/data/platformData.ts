import type {
  AgentTemplate,
  AuditEntry,
  GeneratedCourse,
  PageId,
  RecommendedAction,
  SkillGap,
  SourceDoc,
  TeamMember,
} from '../types';

export const userProfile = {
  name: 'Алексей Ильин',
  unit: 'ИТ-кластер, платформа данных',
  role: 'Middle Backend Developer',
  targetRole: 'Senior Backend Developer',
  points: 74,
  targetPoints: 100,
  nextReview: '18 июня',
  mentor: 'Мария Волкова, Senior Backend',
};

export const pageTitles: Record<PageId, { title: string; subtitle: string }> = {
  home: {
    title: 'Личный командный центр',
    subtitle: 'Единое рабочее пространство для обучения, грейда, карьерных целей и рекомендаций AI-агентов.',
  },
  career: {
    title: 'AI Career Coach',
    subtitle: 'Персональный карьерный агент для грейда, навыков, курсов, практики и подготовки к ревью.',
  },
  buddy: {
    title: 'AI Buddy для онбординга',
    subtitle: '30/60/90, доступы, наставник и быстрые ответы для стажеров и новых сотрудников.',
  },
  knowledge: {
    title: 'Корпоративный поиск знаний',
    subtitle: 'Поиск по внутренним документам с проверяемыми источниками, свежестью и уровнем уверенности.',
  },
  manager: {
    title: 'Панель руководителя',
    subtitle: 'Командная аналитика, риски ИПР, карьерный резерв и рекомендованные управленческие действия.',
  },
  course: {
    title: 'Конструктор курсов',
    subtitle: 'Генерация курса, тестов и практики из регламентов с обязательным human-in-the-loop контролем.',
  },
  studio: {
    title: 'Agent Studio',
    subtitle: 'No-code каталог AI-агентов для HR, T&D, руководителей, наставников и экспертов.',
  },
  offline: {
    title: 'Offline sync panel',
    subtitle: 'Курсы, документы и результаты обучения для полевых сотрудников при нестабильной связи.',
  },
  security: {
    title: 'Trust & Security Center',
    subtitle: 'Контуры безопасности AI-платформы: on-prem LLM, RBAC, аудит, DLP, маскирование и согласия.',
  },
};

export const skillGaps: SkillGap[] = [
  {
    name: 'Архитектура распределенных сервисов',
    current: 68,
    target: 85,
    status: 'warning',
    action: 'Разобрать ADR и провести мини-дизайн сервиса рекомендаций.',
  },
  {
    name: 'Наблюдаемость и SLO',
    current: 54,
    target: 80,
    status: 'critical',
    action: 'Настроить алерты, трассировки и error budget для пилотного API.',
  },
  {
    name: 'Наставничество и code review',
    current: 72,
    target: 82,
    status: 'stable',
    action: 'Провести 3 ревью для стажера с чек-листом качества.',
  },
];

export const recommendedActions: RecommendedAction[] = [
  {
    title: 'Закрыть курс по SRE-практикам',
    detail: 'Осталось 2 модуля и практическая работа по SLO.',
    tag: '+8 баллов',
    due: 'до 7 июня',
  },
  {
    title: 'Назначить встречу с наставником',
    detail: 'Обсудить дизайн сервиса событий и критерии Senior.',
    tag: 'ментор',
    due: 'на этой неделе',
  },
  {
    title: 'Взять практическую задачу',
    detail: 'Подготовить ADR для нового API выдачи рекомендаций.',
    tag: '+10 баллов',
    due: 'спринт 24.6',
  },
];

export const quickAgents: Array<{
  page: PageId;
  title: string;
  detail: string;
  metric: string;
}> = [
  {
    page: 'career',
    title: 'Career Coach',
    detail: 'Собрать 30-дневный план перехода к Senior.',
    metric: '3 шага',
  },
  {
    page: 'knowledge',
    title: 'Knowledge Agent',
    detail: 'Найти правила доступа и подтверждающие документы.',
    metric: '4 источника',
  },
  {
    page: 'course',
    title: 'Course Builder',
    detail: 'Сгенерировать мини-курс из регламента ИБ.',
    metric: '8 минут',
  },
  {
    page: 'manager',
    title: 'Manager Copilot',
    detail: 'Посмотреть риски команды и карьерный резерв.',
    metric: '5 ИПР',
  },
];

export const careerPrompts = [
  'Что нужно для следующего грейда?',
  'Собери 30-дневный план',
  'Объясни мои skill gaps',
];

export const careerResponses: Record<string, string> = {
  'Что нужно для следующего грейда?':
    'До Senior не хватает 26 баллов. Самый быстрый маршрут:\n- Закрыть SRE-практику и подтвердить работу по SLO, +8 баллов.\n- Защитить ADR по сервису рекомендаций на архитектурном комитете, +10 баллов.\n- Провести 3 системных code review для стажера, +4 балла.\n- Подготовить короткий доклад по отказоустойчивости, +4 балла.\nНаставник: Мария Волкова. Рекомендую встречу на 45 минут с фокусом на архитектурные trade-off.',
  'Собери 30-дневный план':
    'План на 30 дней:\n- Неделя 1: диагностика SLO, курс по наблюдаемости сервисов, ревью текущих алертов.\n- Неделя 2: ADR по сервису событий и консультация с архитектором.\n- Неделя 3: практическая задача - трассировка и dashboard latency p95.\n- Неделя 4: защита результата перед тимлидом, ретро и обновление матрицы навыков.\nОжидаемый прирост: +22-26 баллов.',
  'Объясни мои skill gaps':
    'Главные разрывы по матрице Senior:\n- Наблюдаемость: 54 из 80. Есть мониторинг, но мало формальных SLO и error budget.\n- Архитектура: 68 из 85. Нужны решения уровня доменных границ и отказоустойчивости.\n- Наставничество: 72 из 82. Поможет регулярное ревью стажера с фиксированными критериями.\nПриоритет - закрыть SLO, потому что этот разрыв сильнее всего влияет на ревью.',
  default:
    'Я сопоставил профиль, грейд-матрицу и последние учебные активности:\n- Для цели Senior лучше сочетать курс, практическую задачу и наставничество.\n- Баллы должны подтверждаться не только тестом, но и рабочим результатом.\n- Следующая контрольная точка - ревью 18 июня.',
};

export const onboardingPlan = [
  {
    period: '0-30 дней',
    title: 'Контекст и доступы',
    items: ['Карта команды и продукта', 'GitLab, Jira, Wiki и dev stand', 'Курс по ИБ и персональным данным'],
  },
  {
    period: '31-60 дней',
    title: 'Практика в команде',
    items: ['Первая задача под наставником', 'Демо результата', 'Ревью архитектурных стандартов'],
  },
  {
    period: '61-90 дней',
    title: 'Самостоятельный вклад',
    items: ['Задача средней сложности', 'Мини-доклад для команды', 'План развития на следующий квартал'],
  },
];

export const accessChecklist = [
  { label: 'Корпоративная почта', done: true },
  { label: 'GitLab и registry', done: true },
  { label: 'Jira и Confluence', done: true },
  { label: 'Dev stand', done: false },
  { label: 'VPN для удаленного доступа', done: false },
];

export const buddyPrompts = [
  'К кому идти за доступом к dev stand?',
  'Что сделать в первую неделю?',
  'Как подготовиться к первой задаче?',
];

export const buddyResponses: Record<string, string> = {
  'К кому идти за доступом к dev stand?':
    'Для dev stand нужен запрос в Service Desk по шаблону DEV-STAND-APP:\n- Согласующие: руководитель стажировки Ирина Ким и владелец стенда Павел Орлов.\n- Роль: backend-intern, срок 90 дней, проект SkillFlow API.\n- После согласования доступ появится в корпоративном VPN-профиле.',
  'Что сделать в первую неделю?':
    'Фокус первой недели:\n- Пройти курс ИБ и подтвердить правила работы с данными.\n- Получить доступы к GitLab, Jira, Wiki и dev stand.\n- Прочитать README сервисов и последние 3 merge request.\n- Встретиться с наставником и взять ознакомительную задачу.\nВ пятницу стоит показать короткий статус: что понял, где блокеры, следующий шаг.',
  'Как подготовиться к первой задаче?':
    'Перед стартом первой задачи:\n- Открой карточку и найди владельца API.\n- Проверь локальный запуск, тесты и правила code review.\n- Собери вопросы по архитектуре и данным.\n- Согласуй критерии готовности с наставником до начала разработки.',
  default:
    'Я сверил онбординг-план, чек-лист доступов и практики команды:\n- Следующий лучший шаг - закрыть dev stand и VPN.\n- После этого можно брать ознакомительную задачу.\n- Наставник поможет с первым PR и маршрутом эскалаций.',
};

export const sourceDocs: SourceDoc[] = [
  {
    id: 'onboarding',
    title: 'Онбординг: чек-лист нового сотрудника',
    owner: 'HR Operations',
    updated: '12.05.2026',
    excerpt: 'Порядок первых встреч, обязательные курсы, роли наставника и руководителя.',
    confidence: 94,
  },
  {
    id: 'security',
    title: 'Политика информационной безопасности',
    owner: 'ИБ и комплаенс',
    updated: '03.04.2026',
    excerpt: 'Классы данных, обработка ПДн, требования к рабочим станциям и VPN.',
    confidence: 91,
  },
  {
    id: 'grade',
    title: 'Грейд-матрица ИТ-кластера',
    owner: 'T&D',
    updated: '27.03.2026',
    excerpt: 'Критерии перехода Middle -> Senior: архитектура, ownership, наставничество.',
    confidence: 88,
  },
  {
    id: 'access',
    title: 'Регламент выдачи доступов',
    owner: 'Service Desk',
    updated: '18.02.2026',
    excerpt: 'SLA заявок, согласующие роли, шаблоны для dev, prod-read и аналитических контуров.',
    confidence: 86,
  },
];

export const knowledgeAnswers = {
  default:
    'Найдено 4 релевантных источника. Короткий ответ: доступы оформляются через Service Desk по шаблону роли, обязательные курсы по ИБ нужно пройти до работы с корпоративными данными, а карьерные критерии подтверждаются учебными активностями и практическими результатами.',
  access:
    'Доступы оформляются через Service Desk. Для dev-контура нужен шаблон DEV-STAND-APP, согласование руководителя и владельца стенда. SLA обычно 1-2 рабочих дня. Для контуров с данными требуется подтверждение курса ИБ.',
  grade:
    'Для перехода Middle -> Senior оцениваются архитектурная самостоятельность, влияние на качество сервиса, наставничество и ownership. Баллы подтверждаются курсами, практическими задачами, ADR, ревью и обратной связью руководителя.',
  security:
    'Политика ИБ требует RBAC, минимально необходимые права, запрет выгрузки ПДн во внешние сервисы, DLP-контроль и аудит действий. Для AI-сценариев персональные данные маскируются до передачи в модель.',
  onboarding:
    'В первые 30 дней сотрудник закрывает доступы, обязательные курсы, встречается с наставником и берет ознакомительную задачу. На 60-й день ожидается вклад в командную задачу, на 90-й - самостоятельный результат.',
};

export const quickKnowledgeQueries = [
  'Как оформить доступ?',
  'Критерии Senior грейда',
  'Правила безопасности ПДн',
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Алексей Ильин',
    role: 'Backend Developer',
    grade: 'Middle -> Senior',
    progress: 74,
    deadline: '18 июня',
    gaps: ['SLO', 'ADR'],
    risk: 'low',
    reserve: true,
  },
  {
    name: 'Наталья Соколова',
    role: 'Data Analyst',
    grade: 'Junior -> Middle',
    progress: 61,
    deadline: '26 июня',
    gaps: ['SQL perf', 'Storytelling'],
    risk: 'medium',
    reserve: false,
  },
  {
    name: 'Даниил Морозов',
    role: 'DevOps Engineer',
    grade: 'Middle',
    progress: 43,
    deadline: '11 июня',
    gaps: ['K8s security', 'Runbooks'],
    risk: 'high',
    reserve: false,
  },
  {
    name: 'Елена Миронова',
    role: 'QA Automation',
    grade: 'Middle -> Senior',
    progress: 82,
    deadline: '30 июня',
    gaps: ['Mentoring'],
    risk: 'low',
    reserve: true,
  },
  {
    name: 'Тимур Ахметов',
    role: 'Intern Backend',
    grade: 'Intern -> Junior',
    progress: 55,
    deadline: '5 июля',
    gaps: ['Доступы', 'Git flow'],
    risk: 'medium',
    reserve: false,
  },
];

export const managerRecommendations = [
  'Провести 1:1 с Даниилом: риск просрочки из-за двух незакрытых практик и падения активности в LMS.',
  'Назначить Елену наставником для Тимура: сильная динамика и готовность к Senior-критерию mentoring.',
  'Для Алексея запланировать защиту ADR на архитектурном комитете до 14 июня.',
];

export const regulationDraft =
  'Регламент: сотрудники, работающие с корпоративными данными, обязаны использовать ролевой доступ, проходить ежегодный курс по информационной безопасности, не передавать персональные данные во внешние сервисы и фиксировать инциденты в Service Desk в течение 2 часов.';

export const generatedCourse: GeneratedCourse = {
  title: 'Безопасная работа с корпоративными данными',
  modules: [
    'Классы данных и ответственность сотрудника',
    'RBAC: минимально необходимые права',
    'Запрет передачи ПДн во внешние AI-сервисы',
    'Инциденты: фиксация и эскалация за 2 часа',
  ],
  questions: [
    'Что означает принцип минимально необходимых прав?',
    'Когда нужно зарегистрировать инцидент в Service Desk?',
    'Какие данные запрещено отправлять во внешние сервисы?',
  ],
  practicalTask:
    'Разберите кейс: аналитик просит выгрузку с ПДн для тестового стенда. Опишите безопасный процесс согласования, маскирования и аудита.',
};

export const agentTemplates: AgentTemplate[] = [
  {
    id: 'buddy',
    title: 'AI Buddy',
    domain: 'Онбординг',
    description: 'Отвечает новичкам, ведет 30/60/90 и подсказывает по доступам.',
    tools: ['Wiki search', 'Service Desk draft', 'Mentor routing'],
    guardrails: ['Только утвержденные инструкции', 'Эскалация к HR при конфликте данных'],
  },
  {
    id: 'career',
    title: 'Career Coach',
    domain: 'Карьера',
    description: 'Сопоставляет профиль с грейд-матрицей и строит план развития.',
    tools: ['Grade matrix', 'LMS history', 'Mentor matching'],
    guardrails: ['Не заменяет решение руководителя', 'Показывает источники критериев'],
  },
  {
    id: 'knowledge',
    title: 'Knowledge Agent',
    domain: 'Знания',
    description: 'Ищет по документам и объясняет ответ с карточками источников.',
    tools: ['Hybrid search', 'Citation builder', 'Freshness check'],
    guardrails: ['Ответ без источников помечается как низкая уверенность', 'DLP-фильтр запросов'],
  },
  {
    id: 'manager',
    title: 'Manager Copilot',
    domain: 'Управление',
    description: 'Показывает прогресс команды, риски и следующие действия руководителя.',
    tools: ['Team analytics', 'Risk scoring', '1:1 planner'],
    guardrails: ['Нет автоматических кадровых решений', 'Объяснимые сигналы риска'],
  },
  {
    id: 'devops',
    title: 'DevOps Mentor',
    domain: 'Инженерная практика',
    description: 'Помогает с runbook, SLO, Kubernetes и разбором инцидентов.',
    tools: ['Runbook search', 'Incident replay', 'Checklist generator'],
    guardrails: ['Prod-команды только read-only', 'Подтверждение экспертом для критичных советов'],
  },
  {
    id: 'security',
    title: 'Security Mentor',
    domain: 'ИБ',
    description: 'Объясняет регламенты ИБ и генерирует безопасные практические кейсы.',
    tools: ['Policy search', 'PII detector', 'Course builder'],
    guardrails: ['Запрет обхода политик', 'Автоэскалация вопросов о нарушениях'],
  },
];

export const offlineCourses = [
  { title: 'Промышленная безопасность: сменный минимум', progress: 100, status: 'Скачан' },
  { title: 'ИБ для работы с планшетом на объекте', progress: 72, status: 'Доступен offline' },
  { title: 'Оказание первой помощи', progress: 38, status: 'Ожидает синхронизации' },
];

export const cachedDocuments = [
  'Инструкция по обходу установки',
  'Чек-лист приема смены',
  'Памятка по нештатным ситуациям',
  'Контакты ответственных служб',
];

export const securityControls = [
  'On-prem LLM в закрытом контуре',
  'RBAC для ролей и групп',
  'Row-level security для учебных данных',
  'Audit log запросов и действий агентов',
  'PII masking до обращения к модели',
  'DLP-контроль выгрузок и промптов',
  'Consent management для карьерной аналитики',
];

export const auditLog: AuditEntry[] = [
  {
    time: '10:42',
    actor: 'Career Coach',
    action: 'Запрос грейд-матрицы',
    object: 'Алексей Ильин / Backend',
    result: 'Разрешено',
  },
  {
    time: '10:38',
    actor: 'Knowledge Agent',
    action: 'Поиск по политике ИБ',
    object: 'security-policy-v12',
    result: 'Разрешено',
  },
  {
    time: '10:31',
    actor: 'Course Builder',
    action: 'Попытка вставить ПДн в промпт',
    object: 'draft-course-442',
    result: 'Заблокировано',
  },
  {
    time: '10:27',
    actor: 'Manager Copilot',
    action: 'Расчет риска disengagement',
    object: 'Команда API платформы',
    result: 'Требует проверки',
  },
];
