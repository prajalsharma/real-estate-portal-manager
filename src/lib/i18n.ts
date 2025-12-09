import { SupportedLanguage, useAppPrefs } from "./prefs-context";

// Minimal dictionary. Extend as needed.
const dict: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Navigation
    "nav.condos": "Condos",
    "nav.houses": "Houses",
    "nav.commercial": "Commercial",
    "nav.rent": "For rent",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.apartments": "Apartments",
    "nav.maisonettes": "Maisonettes",
    "nav.land": "Land",
    "nav.rentalService": "Rental Service",
    "nav.aboutUs": "About Us",
    "nav.contactUs": "Contact Us",

    // Actions
    "actions.viewAll": "View all",
    "actions.login": "Log in",
    "actions.requestTour": "Request a tour",
    "actions.contactAgent": "Contact agent",
    "actions.close": "Close",
    "actions.call": "Call",
    "actions.more": "More",
    "actions.search": "Search",
    "actions.moreFilters": "More filters",
    "actions.searchSubmitted": "Search submitted",

    // Labels & units
    "labels.bed": "bd",
    "labels.bath": "ba",
    "labels.area": "m²",
    "labels.location": "Location",
    "labels.propertyType": "Property type",
    "labels.minPrice": "Min price",
    "labels.maxPrice": "Max price",
    "labels.bedrooms": "Bedrooms",
    "labels.type": "Type",
    "labels.min": "Min",
    "labels.max": "Max",
    "labels.agent": "Agent",
    "labels.language": "Language",
    "labels.currency": "Currency",

    // Placeholders
    "placeholders.chooseLocation": "Choose a city or area",
    "placeholders.selectType": "Select type",
    "placeholders.minPrice": "e.g. 100,000",
    "placeholders.maxPrice": "e.g. 350,000",
    "placeholders.any": "Any",

    // Property types
    "propertyTypes.apartment": "Apartment",
    "propertyTypes.maisonette": "Maisonette",
    "propertyTypes.commercial": "Commercial",
    "propertyTypes.land": "Land",
    "propertyTypes.rental": "Rental Services",

    // Hero & sections
    "hero.title": "Real estate for living and investments",
    "hero.subtitle":
      "Discover properties across Greece. Buy, sell, or rent with trusted local expertise.",
    "hero.search.title": "Find your next home",
    "hero.search.subtitle": "Search by location, price, and more",

    // featured section
    "featured.title": "Latest in your area",
    "featured.subtitle": "Curated homes across Greece - fresh listings picked for you",

    // Recommended section
    "recommended.title": "You might be interested in",
    "recommended.subtitle": " Curated homes and apartments picked for you",

    // Messages
    "messages.advancedFiltersSoon": "Advanced filters coming soon.",

    // ARIA
    "aria.searchForm": "Property search form",
    "aria.selectLocation": "Select location",
    "aria.selectType": "Select property type",
    "aria.minPrice": "Minimum price",
    "aria.maxPrice": "Maximum price",
    "aria.selectBedrooms": "Select bedrooms",
    "aria.moreFilters": "Open more filters",
    "aria.searchProperties": "Search properties",

    // Property Details Page
    "property.description": "Description",
    "property.features": "Features",
    "property.price": "Price",
    "property.pricePerSqM": "Price per sq m.",
    "property.area": "Area",
    "property.plotSize": "Plot Size",
    "property.propertyType": "Property Type",
    "property.bedrooms": "Bedrooms",
    "property.bathrooms": "Bathrooms",
    "property.yearBuilt": "Year of construction",
    "property.underConstruction": "Under construction",
    "property.status": "Status",
    "property.lastUpdated": "Last Updated",
    "property.interior": "Interior",
    "property.externalFeatures": "External Features",
    "property.construction": "Construction",
    "property.suitableFor": "Suitable for",
    "property.location": "Location",
    "property.interested": "Interested in this property?",
    "property.share": "Share this property",
    "property.propertyLink": "Property Link",
    "property.translating": "Translating...",
    "property.notFound": "Property Not Found",
    "property.goBack": "Go Back",

    // Contact Form
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Your Message",
    "contact.nameRequired": "Name is required",
    "contact.emailRequired": "Email is required",
    "contact.messageRequired": "Message is required",
    "contact.sendWhatsApp": "Send via WhatsApp",
    "contact.callUs": "Call Us",

    // Footer
    "footer.description": "Trusted real estate partner in Greece. Discover condos, houses, and commercial properties to buy or rent, with expert guidance at every step.",
    "footer.licensed": "Licensed • Since 2012",
    "footer.menu": "Menu",
    "footer.help": "Help",
    "footer.contacts": "Contacts",
    "footer.support": "Support",
    "footer.realEstateValuation": "Real estate valuation",
    "footer.legalSupport": "Legal support",
    "footer.rentAndSale": "Rent and sale",
    "footer.workingHours": "Mon–Fri, 9:00–18:00 EET",
    "footer.emailUsAnytime": "Email us anytime",
    "footer.greece": "Greece",
    "footer.copyright": "All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
  },
  el: {
    // Navigation
    "nav.condos": "Διαμερίσματα",
    "nav.houses": "Κατοικίες",
    "nav.commercial": "Επαγγελματικά",
    "nav.rent": "Ενοικίαση",
    "nav.about": "Σχετικά",
    "nav.contact": "Επικοινωνία",
    "nav.apartments": "Διαμερίσματα",
    "nav.maisonettes": "Μεζονέτες",
    "nav.land": "Οικόπεδα",
    "nav.rentalService": "Υπηρεσίες Ενοικίασης",
    "nav.aboutUs": "Σχετικά με εμάς",
    "nav.contactUs": "Επικοινωνήστε μαζί μας",

    // Actions
    "actions.viewAll": "Δείτε όλα",
    "actions.login": "Σύνδεση",
    "actions.requestTour": "Κλείστε επίσκεψη",
    "actions.contactAgent": "Επικοινωνία με σύμβουλο",
    "actions.close": "Κλείσιμο",
    "actions.call": "Κλήση",
    "actions.more": "Περισσότερα",
    "actions.search": "Αναζήτηση",
    "actions.moreFilters": "Περισσότερα φίλτρα",
    "actions.searchSubmitted": "Η αναζήτηση στάλθηκε",

    // Labels & units
    "labels.bed": "υπν",
    "labels.bath": "μπ",
    "labels.area": "τ.μ.",
    "labels.location": "Περιοχή",
    "labels.propertyType": "Τύπος ακινήτου",
    "labels.minPrice": "Ελάχιστη τιμή",
    "labels.maxPrice": "Μέγιστη τιμή",
    "labels.bedrooms": "Υπνοδωμάτια",
    "labels.type": "Τύπος",
    "labels.min": "Ελάχιστο",
    "labels.max": "Μέγιστο",
    "labels.agent": "Σύμβουλος",
    "labels.language": "Γλώσσα",
    "labels.currency": "Νόμισμα",

    // Placeholders
    "placeholders.chooseLocation": "Επιλέξτε πόλη ή περιοχή",
    "placeholders.selectType": "Επιλέξτε τύπο",
    "placeholders.minPrice": "π.χ. 100.000",
    "placeholders.maxPrice": "π.χ. 350.000",
    "placeholders.any": "Οποιοδήποτε",

    // Property types
    "propertyTypes.apartment": "Διαμέρισμα",
    "propertyTypes.maisonette": "Μεζονέτα",
    "propertyTypes.commercial": "Επαγγελματικό",
    "propertyTypes.land": "Οικόπεδο",
    "propertyTypes.rental": "Υπηρεσίες ενοικίασης",

    // Hero & sections
    "hero.title": "Ακίνητα για κατοικία και επένδυση",
    "hero.subtitle":
      "Ανακαλύψτε ακίνητα σε όλη την Ελλάδα. Αγορά, πώληση ή ενοικίαση με αξιόπιστους τοπικούς συνεργάτες.",
    "hero.search.title": "Βρείτε το επόμενό σας σπίτι",
    "hero.search.subtitle": "Αναζήτηση ανά περιοχή, τιμή και άλλα",

    // featured section
    "featured.title": "Τα τελευταία στην περιοχή σας",
    "featured.subtitle": "Επιλεγμένα σπίτια σε όλη την Ελλάδα - φρέσκιες καταχωρήσεις για εσάς",

    // Recommended section
    "recommended.title": "Ίσως σας ενδιαφέρουν",
    "recommended.subtitle": "Επιλεγμένα σπίτια και διαμερίσματα για εσάς",

    // Messages
    "messages.advancedFiltersSoon": "Σύντομα περισσότερα φίλτρα.",

    // ARIA
    "aria.searchForm": "Φόρμα αναζήτησης ακινήτων",
    "aria.selectLocation": "Επιλέξτε περιοχή",
    "aria.selectType": "Επιλέξτε τύπο ακινήτου",
    "aria.minPrice": "Ελάχιστη τιμή",
    "aria.maxPrice": "Μέγιστη τιμή",
    "aria.selectBedrooms": "Επιλέξτε υπνοδωμάτια",
    "aria.moreFilters": "Άνοιγμα περισσότερων φίλτρων",
    "aria.searchProperties": "Αναζήτηση ακινήτων",

    // Property Details Page
    "property.description": "Περιγραφή",
    "property.features": "Χαρακτηριστικά",
    "property.price": "Τιμή",
    "property.pricePerSqM": "Τιμή ανά τ.μ.",
    "property.area": "Εμβαδόν",
    "property.plotSize": "Μέγεθος οικοπέδου",
    "property.propertyType": "Τύπος ακινήτου",
    "property.bedrooms": "Υπνοδωμάτια",
    "property.bathrooms": "Μπάνια",
    "property.yearBuilt": "Έτος κατασκευής",
    "property.underConstruction": "Υπό κατασκευή",
    "property.status": "Κατάσταση",
    "property.lastUpdated": "Τελευταία ενημέρωση",
    "property.interior": "Εσωτερικά",
    "property.externalFeatures": "Εξωτερικά χαρακτηριστικά",
    "property.construction": "Κατασκευή",
    "property.suitableFor": "Κατάλληλο για",
    "property.location": "Τοποθεσία",
    "property.interested": "Ενδιαφέρεστε για αυτό το ακίνητο;",
    "property.share": "Κοινοποίηση ακινήτου",
    "property.propertyLink": "Σύνδεσμος ακινήτου",
    "property.translating": "Μετάφραση...",
    "property.notFound": "Το ακίνητο δεν βρέθηκε",
    "property.goBack": "Επιστροφή",

    // Contact Form
    "contact.name": "Όνομα",
    "contact.email": "Email",
    "contact.message": "Το μήνυμά σας",
    "contact.nameRequired": "Το όνομά είναι υποχρεωτικό",
    "contact.emailRequired": "Το email είναι υποχρεωτικό",
    "contact.messageRequired": "Το μήνυμα είναι υποχρεωτικό",
    "contact.sendWhatsApp": "Αποστολή μέσω WhatsApp",
    "contact.callUs": "Καλέστε μας",

    // Footer
    "footer.description": "Αξιόπιστος συνεργάτης ακινήτων στην Ελλάδα. Ανακαλύψτε διαμερίσματα, κατοικίες και επαγγελματικά ακίνητα προς αγορά ή ενοικίαση, με ειδική καθοδήγηση σε κάθε βήμα.",
    "footer.licensed": "Άδεια • Από το 2012",
    "footer.menu": "Μενού",
    "footer.help": "Βοήθεια",
    "footer.contacts": "Επαφές",
    "footer.support": "Υποστήριξη",
    "footer.realEstateValuation": "Αξιολόγηση ακινήτων",
    "footer.legalSupport": "Νομική υποστήριξη",
    "footer.rentAndSale": "Ενοικίαση και πώληση",
    "footer.workingHours": "Δευ–Παρ, 9:00–18:00 EET",
    "footer.emailUsAnytime": "Στείλτε μας email οποιαδήποτε στιγμή",
    "footer.greece": "Ελλάδα",
    "footer.copyright": "Όλα τα δικαιώματα διατηρούνται.",
    "footer.privacy": "Απόρρητο",
    "footer.terms": "Όροι",
  },
  sr: {
    // Navigation
    "nav.condos": "Кондо",
    "nav.houses": "Куће",
    "nav.commercial": "Пословни",
    "nav.rent": "Изнајмљивање",
    "nav.about": "О нама",
    "nav.contact": "Контакт",
    "nav.apartments": "Станови",
    "nav.maisonettes": "Мезонете",
    "nav.land": "Земљишта",
    "nav.rentalService": "Услуге изнајмљивања",
    "nav.aboutUs": "О нама",
    "nav.contactUs": "Контактирајте нас",

    // Actions
    "actions.viewAll": "Погледај све",
    "actions.login": "Пријава",
    "actions.requestTour": "Закажи обилазак",
    "actions.contactAgent": "Контактирај агента",
    "actions.close": "Затвори",
    "actions.call": "Позови",
    "actions.more": "Више",
    "actions.search": "Претрага",
    "actions.moreFilters": "Више филтера",
    "actions.searchSubmitted": "Претрага послата",

    // Labels & units
    "labels.bed": "кр",
    "labels.bath": "куп",
    "labels.area": "м²",
    "labels.location": "Локација",
    "labels.propertyType": "Тип некретнине",
    "labels.minPrice": "Минимална цена",
    "labels.maxPrice": "Максимална цена",
    "labels.bedrooms": "Спаваће собе",
    "labels.type": "Тип",
    "labels.min": "Мин",
    "labels.max": "Макс",
    "labels.agent": "Агент",
    "labels.language": "Језик",
    "labels.currency": "Валута",

    // Placeholders
    "placeholders.chooseLocation": "Одаберите град или област",
    "placeholders.selectType": "Одаберите тип",
    "placeholders.minPrice": "нпр. 100.000",
    "placeholders.maxPrice": "нпр. 350.000",
    "placeholders.any": "Било који",

    // Property types
    "propertyTypes.apartment": "Стан",
    "propertyTypes.maisonette": "Мезонета",
    "propertyTypes.commercial": "Пословни простор",
    "propertyTypes.land": "Земљиште",
    "propertyTypes.rental": "Услуге изнајмљивања",

    // Hero & sections
    "hero.title": "Непокретности за живот и инвестиције",
    "hero.subtitle":
      "Откријте некретнине широм Грчке. Купите, продајте или изнајмите уз поуздане локалне стручњаке.",
    "hero.search.title": "Пронађите свој следећи дом",
    "hero.search.subtitle": "Претрага по локацији, цени и још много тога",

    // featured section
    "featured.title": "Најновије у вашем крају",
    "featured.subtitle": "Изабране куће широм Грчке - свеже понуде одабране за вас",

    // Recommended section
    "recommended.title": "Можда ће вас занимати",
    "recommended.subtitle": "Изабране куће и станови одабрани за вас",

    // Messages
    "messages.advancedFiltersSoon": "Напредни филтери ускоро.",

    // ARIA
    "aria.searchForm": "Форма за претрагу некретнина",
    "aria.selectLocation": "Одаберите локацију",
    "aria.selectType": "Одаберите тип некретнине",
    "aria.minPrice": "Минимална цена",
    "aria.maxPrice": "Максимална цена",
    "aria.selectBedrooms": "Одаберите број спаваћих соба",
    "aria.moreFilters": "Отворите више филтера",
    "aria.searchProperties": "Претрага некретнина",

    // Property Details Page
    "property.description": "Опис",
    "property.features": "Карактеристике",
    "property.price": "Цена",
    "property.pricePerSqM": "Цена по м²",
    "property.area": "Површина",
    "property.plotSize": "Величина парцеле",
    "property.propertyType": "Тип некретнине",
    "property.bedrooms": "Спаваће собе",
    "property.bathrooms": "Купатила",
    "property.yearBuilt": "Година изградње",
    "property.underConstruction": "У изградњи",
    "property.status": "Статус",
    "property.lastUpdated": "Последње ажурирање",
    "property.interior": "Ентеријер",
    "property.externalFeatures": "Спољне карактеристике",
    "property.construction": "Конструкција",
    "property.suitableFor": "Погодно за",
    "property.location": "Локација",
    "property.interested": "Заинтересовани сте за ову некретнину?",
    "property.share": "Поделите некретнину",
    "property.propertyLink": "Линк некретнине",
    "property.translating": "Превођење...",
    "property.notFound": "Некретнина није пронађена",
    "property.goBack": "Назад",

    // Contact Form
    "contact.name": "Име",
    "contact.email": "Email",
    "contact.message": "Ваша порука",
    "contact.nameRequired": "Име је обавезно",
    "contact.emailRequired": "Email је обавезан",
    "contact.messageRequired": "Порука је обавезна",
    "contact.sendWhatsApp": "Пошаљи преко WhatsApp",
    "contact.callUs": "Позовите нас",

    // Footer
    "footer.description": "Поуздан партнер за некретнине у Грчкој. Откријте станове, куће и пословне просторе за куповину или изнајмљивање, са стручном подршком на сваком кораку.",
    "footer.licensed": "Лиценцирано • Од 2012",
    "footer.menu": "Мени",
    "footer.help": "Помоћ",
    "footer.contacts": "Контакти",
    "footer.support": "Подршка",
    "footer.realEstateValuation": "Процена вредности некретнина",
    "footer.legalSupport": "Правна подршка",
    "footer.rentAndSale": "Изнајмљивање и продаја",
    "footer.workingHours": "Пон–Пет, 9:00–18:00 EET",
    "footer.emailUsAnytime": "Пошаљите нам email било када",
    "footer.greece": "Грчка",
    "footer.copyright": "Сва права задржана.",
    "footer.privacy": "Приватност",
    "footer.terms": "Услови",
  },
  ru: {
    // Navigation
    "nav.condos": "Кондоминиумы",
    "nav.houses": "Дома",
    "nav.commercial": "Коммерческая",
    "nav.rent": "Аренда",
    "nav.about": "О нас",
    "nav.contact": "Контакты",
    "nav.apartments": "Квартиры",
    "nav.maisonettes": "Мезонеты",
    "nav.land": "Земельные участки",
    "nav.rentalService": "Услуги аренды",
    "nav.aboutUs": "О нас",
    "nav.contactUs": "Свяжитесь с нами",

    // Actions
    "actions.viewAll": "Смотреть все",
    "actions.login": "Войти",
    "actions.requestTour": "Записаться на просмотр",
    "actions.contactAgent": "Связаться с агентом",
    "actions.close": "Закрыть",
    "actions.call": "Позвонить",
    "actions.more": "Ещё",
    "actions.search": "Поиск",
    "actions.moreFilters": "Больше фильтров",
    "actions.searchSubmitted": "Поиск отправлен",

    // Labels & units
    "labels.bed": "сп",
    "labels.bath": "с/у",
    "labels.area": "м²",
    "labels.location": "Местоположение",
    "labels.propertyType": "Тип недвижимости",
    "labels.minPrice": "Мин. цена",
    "labels.maxPrice": "Макс. цена",
    "labels.bedrooms": "Спальни",
    "labels.type": "Тип",
    "labels.min": "Мин",
    "labels.max": "Макс",
    "labels.agent": "Агент",
    "labels.language": "Язык",
    "labels.currency": "Валюта",

    // Placeholders
    "placeholders.chooseLocation": "Выберите город или район",
    "placeholders.selectType": "Выберите тип",
    "placeholders.minPrice": "напр. 100 000",
    "placeholders.maxPrice": "напр. 350 000",
    "placeholders.any": "Любой",

    // Property types
    "propertyTypes.apartment": "Квартира",
    "propertyTypes.maisonette": "Мезонет",
    "propertyTypes.commercial": "Коммерческая",
    "propertyTypes.land": "Земельный участок",
    "propertyTypes.rental": "Услуги аренды",

    // Hero & sections
    "hero.title": "Недвижимость для жизни и инвестиций",
    "hero.subtitle":
      "Откройте для себя объекты по всей Греции. Покупка, продажа или аренда с поддержкой местных экспертов.",
    "hero.search.title": "Найдите свой следующий дом",
    "hero.search.subtitle": "Поиск по локации, цене и другим параметрам",

    // featured section
    "featured.title": "Последние предложения в вашем районе",
    "featured.subtitle": "Отобранные дома по всей Греции - свежие объявления для вас",

    // Recommended section
    "recommended.title": "Возможно, вам будет интересно",
    "recommended.subtitle": "Отобранные дома и квартиры для вас",

    // Messages
    "messages.advancedFiltersSoon": "Скоро появятся расширенные фильтры.",

    // ARIA
    "aria.searchForm": "Форма поиска недвижимости",
    "aria.selectLocation": "Выберите местоположение",
    "aria.selectType": "Выберите тип недвижимости",
    "aria.minPrice": "Минимальная цена",
    "aria.maxPrice": "Максимальная цена",
    "aria.selectBedrooms": "Выберите количество спален",
    "aria.moreFilters": "Открыть дополнительные фильтры",
    "aria.searchProperties": "Поиск объектов",

    // Property Details Page
    "property.description": "Описание",
    "property.features": "Характеристики",
    "property.price": "Цена",
    "property.pricePerSqM": "Цена за м²",
    "property.area": "Площадь",
    "property.plotSize": "Размер участка",
    "property.propertyType": "Тип недвижимости",
    "property.bedrooms": "Спальни",
    "property.bathrooms": "Ванные",
    "property.yearBuilt": "Год постройки",
    "property.underConstruction": "В стадии строительства",
    "property.status": "Статус",
    "property.lastUpdated": "Последнее обновление",
    "property.interior": "Интерьер",
    "property.externalFeatures": "Внешние характеристики",
    "property.construction": "Строительство",
    "property.suitableFor": "Подходит для",
    "property.location": "Местоположение",
    "property.interested": "Заинтересованы в этом объекте?",
    "property.share": "Поделиться объектом",
    "property.propertyLink": "Ссылка на объект",
    "property.translating": "Перевод...",
    "property.notFound": "Объект не найден",
    "property.goBack": "Назад",

    // Contact Form
    "contact.name": "Имя",
    "contact.email": "Email",
    "contact.message": "Ваше сообщение",
    "contact.nameRequired": "Имя обязательно",
    "contact.emailRequired": "Email обязателен",
    "contact.messageRequired": "Сообщение обязательно",
    "contact.sendWhatsApp": "Отправить через WhatsApp",
    "contact.callUs": "Позвоните нам",

    // Footer
    "footer.description": "Надежный партнер по недвижимости в Греции. Откройте для себя кондоминиумы, дома и коммерческую недвижимость для покупки или аренды с экспертным руководством на каждом шаге.",
    "footer.licensed": "Лицензировано • С 2012",
    "footer.menu": "Меню",
    "footer.help": "Помощь",
    "footer.contacts": "Контакты",
    "footer.support": "Поддержка",
    "footer.realEstateValuation": "Оценка недвижимости",
    "footer.legalSupport": "Юридическая поддержка",
    "footer.rentAndSale": "Аренда и продажа",
    "footer.workingHours": "Пн–Пт, 9:00–18:00 EET",
    "footer.emailUsAnytime": "Напишите нам в любое время",
    "footer.greece": "Греция",
    "footer.copyright": "Все права защищены.",
    "footer.privacy": "Конфиденциальность",
    "footer.terms": "Условия",
  },
  bg: {
    // Navigation
    "nav.condos": "Апартаменти",
    "nav.houses": "Къщи",
    "nav.commercial": "Търговски",
    "nav.rent": "Наем",
    "nav.about": "За нас",
    "nav.contact": "Контакт",
    "nav.apartments": "Апартаменти",
    "nav.maisonettes": "Мезонети",
    "nav.land": "Земи",
    "nav.rentalService": "Услуги под наем",
    "nav.aboutUs": "За нас",
    "nav.contactUs": "Свържете се с нас",

    // Actions
    "actions.viewAll": "Виж всички",
    "actions.login": "Вход",
    "actions.requestTour": "Запази оглед",
    "actions.contactAgent": "Свържи се с агент",
    "actions.close": "Затвори",
    "actions.call": "Обади се",
    "actions.more": "Още",
    "actions.search": "Търсене",
    "actions.moreFilters": "Още филтри",
    "actions.searchSubmitted": "Търсенето е изпратено",

    // Labels & units
    "labels.bed": "сп",
    "labels.bath": "бан",
    "labels.area": "кв.м",
    "labels.location": "Локация",
    "labels.propertyType": "Тип имот",
    "labels.minPrice": "Мин. цена",
    "labels.maxPrice": "Макс. цена",
    "labels.bedrooms": "Спални",
    "labels.type": "Тип",
    "labels.min": "Мин",
    "labels.max": "Макс",
    "labels.agent": "Агент",
    "labels.language": "Език",
    "labels.currency": "Валута",

    // Placeholders
    "placeholders.chooseLocation": "Изберете град или район",
    "placeholders.selectType": "Изберете тип",
    "placeholders.minPrice": "напр. 100 000",
    "placeholders.maxPrice": "напр. 350 000",
    "placeholders.any": "Който и да е",

    // Property types
    "propertyTypes.apartment": "Апартамент",
    "propertyTypes.maisonette": "Мезонет",
    "propertyTypes.commercial": "Търговски",
    "propertyTypes.land": "Земя",
    "propertyTypes.rental": "Услуги под наем",

    // Hero & sections
    "hero.title": "Недвижими имоти за живот и инвестиции",
    "hero.subtitle":
      "Открийте имоти в цяла Гърция. Купете, продайте или наемете с доверени местни експерти.",
    "hero.search.title": "Намерете своя следващ дом",
    "hero.search.subtitle": "Търсене по локация, цена и други",

    // featured section
    "featured.title": "Последни в района ви",
    "featured.subtitle": "Подбрани домове в цяла Гърция - свежи обяви за вас",

    // Recommended section
    "recommended.title": "Може да се интересувате от",
    "recommended.subtitle": "Подбрани домове и апартаменти за вас",

    // Messages
    "messages.advancedFiltersSoon": "Скоро ще има разширени филтри.",

    // ARIA
    "aria.searchForm": "Форма за търсене на имоти",
    "aria.selectLocation": "Изберете локация",
    "aria.selectType": "Изберете тип имот",
    "aria.minPrice": "Минимална цена",
    "aria.maxPrice": "Максимална цена",
    "aria.selectBedrooms": "Изберете брой спални",
    "aria.moreFilters": "Отворете още филтри",
    "aria.searchProperties": "Търсене на имоти",

    // Property Details Page
    "property.description": "Описание",
    "property.features": "Характеристики",
    "property.price": "Цена",
    "property.pricePerSqM": "Цена на кв.м",
    "property.area": "Площ",
    "property.plotSize": "Размер на парцела",
    "property.propertyType": "Тип имот",
    "property.bedrooms": "Спални",
    "property.bathrooms": "Бани",
    "property.yearBuilt": "Година на строителство",
    "property.underConstruction": "В процес на строителство",
    "property.status": "Статус",
    "property.lastUpdated": "Последна актуализация",
    "property.interior": "Интериор",
    "property.externalFeatures": "Външни характеристики",
    "property.construction": "Строителство",
    "property.suitableFor": "Подходящо за",
    "property.location": "Локация",
    "property.interested": "Заинтересовани ли сте от този имот?",
    "property.share": "Споделете имота",
    "property.propertyLink": "Връзка към имота",
    "property.translating": "Превеждане...",
    "property.notFound": "Имотът не е намерен",
    "property.goBack": "Назад",

    // Contact Form
    "contact.name": "Име",
    "contact.email": "Email",
    "contact.message": "Вашето съобщение",
    "contact.nameRequired": "Името е задължително",
    "contact.emailRequired": "Email е задължителен",
    "contact.messageRequired": "Съобщението е задължително",
    "contact.sendWhatsApp": "Изпрати чрез WhatsApp",
    "contact.callUs": "Обадете ни се",

    // Footer
    "footer.description": "Доверен партньор за недвижими имоти в Гърция. Открийте апартаменти, къщи и търговски имоти за покупка или наем, с експертна подкрепа на всяка стъпка.",
    "footer.licensed": "Лицензирано • От 2012",
    "footer.menu": "Меню",
    "footer.help": "Помощ",
    "footer.contacts": "Контакти",
    "footer.support": "Поддръжка",
    "footer.realEstateValuation": "Оценка на недвижими имоти",
    "footer.legalSupport": "Правна поддръжка",
    "footer.rentAndSale": "Наем и продажба",
    "footer.workingHours": "Пон–Пет, 9:00–18:00 EET",
    "footer.emailUsAnytime": "Пишете ни по всяко време",
    "footer.greece": "Гърция",
    "footer.copyright": "Всички права запазени.",
    "footer.privacy": "Поверителност",
    "footer.terms": "Условия",
  },
};

export function t(lang: SupportedLanguage, key: string, fallback?: string) {
  return dict[lang]?.[key] ?? dict.en[key] ?? fallback ?? key;
}

export function useT() {
  const { language } = useAppPrefs();
  // Always use 'en' on the server to prevent SSR/CSR mismatch
  const effectiveLanguage = typeof window === "undefined" ? "en" : language;
  return (key: string, fallback?: string) => t(effectiveLanguage, key, fallback);
}
