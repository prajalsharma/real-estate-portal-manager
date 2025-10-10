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

    // Actions
    "actions.viewAll": "View all",
    "actions.login": "Log in",
    "actions.requestTour": "Request a tour",
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
  },
  el: {
    // Navigation
    "nav.condos": "Διαμερίσματα",
    "nav.houses": "Κατοικίες",
    "nav.commercial": "Επαγγελματικά",
    "nav.rent": "Ενοικίαση",
    "nav.about": "Σχετικά",
    "nav.contact": "Επικοινωνία",

    // Actions
    "actions.viewAll": "Δείτε όλα",
    "actions.login": "Σύνδεση",
    "actions.requestTour": "Κλείστε επίσκεψη",
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
  },
  sr: {
    // Navigation
    "nav.condos": "Кондо",
    "nav.houses": "Куће",
    "nav.commercial": "Пословни",
    "nav.rent": "Изнајмљивање",
    "nav.about": "О нама",
    "nav.contact": "Контакт",

    // Actions
    "actions.viewAll": "Погледај све",
    "actions.login": "Пријава",
    "actions.requestTour": "Закажи обилазак",
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
  },
  ru: {
    // Navigation
    "nav.condos": "Кондоминиумы",
    "nav.houses": "Дома",
    "nav.commercial": "Коммерческая",
    "nav.rent": "Аренда",
    "nav.about": "О нас",
    "nav.contact": "Контакты",

    // Actions
    "actions.viewAll": "Смотреть все",
    "actions.login": "Войти",
    "actions.requestTour": "Записаться на просмотр",
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
  },
  bg: {
    // Navigation
    "nav.condos": "Апартаменти",
    "nav.houses": "Къщи",
    "nav.commercial": "Търговски",
    "nav.rent": "Наем",
    "nav.about": "За нас",
    "nav.contact": "Контакт",

    // Actions
    "actions.viewAll": "Виж всички",
    "actions.login": "Вход",
    "actions.requestTour": "Запази оглед",
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
