export type RoomData = {
  key: string;
  title: string;
  description: string;
  amenities: string[];
  isSalon?: boolean;
};

export type ExteriorSectionData = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
};

export const rooms: RoomData[] = [
  {
    key: "bedroom-1",
    title: "Sypialnia 1",
    description:
      "Przestronna sypialnia z łóżkiem małżeńskim i prywatną łazienką en-suite. Klimatyzacja i WiFi zapewniają komfort przez cały pobyt.",
    amenities: ["wifi", "climate", "bathroom"],
  },
  {
    key: "bedroom-2",
    title: "Sypialnia 2",
    description:
      "Jasna sypialnia z łóżkiem małżeńskim, łazienką en-suite i widokiem na ogród. Idealna dla par szukających spokoju.",
    amenities: ["wifi", "climate", "bathroom"],
  },
  {
    key: "bedroom-3",
    title: "Sypialnia 3",
    description:
      "Wygodna sypialnia z dwoma łóżkami pojedynczymi i prywatną łazienką. Możliwość dostawienia łóżeczka niemowlęcego.",
    amenities: ["wifi", "climate", "bathroom", "crib"],
  },
  {
    key: "bedroom-4",
    title: "Sypialnia 4",
    description:
      "Sypialnia z łóżkiem małżeńskim i łazienką en-suite. Na życzenie dostępna dostawka dla dodatkowego gościa.",
    amenities: ["wifi", "climate", "bathroom", "extra-bed"],
  },
  {
    key: "bedroom-5",
    title: "Sypialnia 5",
    description:
      "Przytulna sypialnia z łóżkiem małżeńskim i prywatną łazienką. Klimatyzacja i WiFi w standardzie.",
    amenities: ["wifi", "climate", "bathroom"],
  },
  {
    key: "bedroom-6",
    title: "Sypialnia 6",
    description:
      "Sypialnia z dwoma łóżkami pojedynczymi i łazienką en-suite. Możliwość połączenia łóżek w jedno duże.",
    amenities: ["wifi", "climate", "bathroom"],
  },
  {
    key: "salon",
    title: "Salon i Kuchnia",
    description:
      "Przestronny, jasny salon z wygodnymi sofami i widokiem na ogród — serce wspólnych chwil. W pełni wyposażona kuchnia z nowoczesnym sprzętem pozwala na przygotowanie posiłków w domowej atmosferze.",
    amenities: ["wifi", "climate", "kitchen"],
    isSalon: true,
  },
];

export const exteriorSections: ExteriorSectionData[] = [
  {
    key: "garden",
    title: "Ogród",
    subtitle: "Hektar śródziemnomorskiej zieleni",
    description:
      "Cała posiadłość położona jest u stóp góry Monte Calvia, na terenie o powierzchni ok. 1 hektara. Naturalna sardyńska roślinność, egzotyczne palmy i drzewa oliwne tworzą prywatną oazę spokoju. Cały teren jest ogrodzony.",
  },
  {
    key: "relaxation-zone",
    title: "Strefa wypoczynkowa",
    subtitle: "Relaks wśród zieleni i słońca",
    description:
      "Wydzielone strefy odpoczynku z leżakami i parasolami — idealne miejsce na leniwe popołudnie z książką lub drzemkę w cieniu drzew.",
  },
  {
    key: "veranda",
    title: "Weranda i taras",
    subtitle: "Zadaszona przestrzeń do wspólnych posiłków",
    description:
      "Zadaszona weranda z dużym stołem to idealne miejsce na wspólne śniadania i kolacje. Wieczorami taras zaprasza do relaksu przy lampce wina z widokiem na ogród.",
  },
  {
    key: "sports-court",
    title: "Boisko sportowe",
    subtitle: "Aktywny wypoczynek dla całej rodziny",
    description:
      "Prywatne boisko do gier zespołowych — piłka nożna, siatkówka i inne zabawy na świeżym powietrzu. Idealne dla rodzin z dziećmi i grup przyjaciół.",
  },
  {
    key: "summer-kitchen",
    title: "Kuchnia letnia",
    subtitle: "Gotowanie na świeżym powietrzu",
    description:
      "Altana z letnią kuchnią i grillem pozwala na przygotowanie posiłków w plenerze. Sardyńskie wieczory przy wspólnym gotowaniu to niezapomniane doświadczenie.",
  },
  {
    key: "parking",
    title: "Parking",
    subtitle: "Prywatny, bezpłatny",
    description:
      "Prywatny parking na terenie posiadłości z miejscem dla kilku samochodów. Bezpłatny i dostępny przez cały okres pobytu.",
  },
  {
    key: "views",
    title: "Widoki i otoczenie",
    subtitle: "Sardyńskie krajobrazy na wyciągnięcie ręki",
    description:
      "Posiadłość otacza typowy sardyński krajobraz — wzgórza porośnięte makią, drzewa oliwne i widok na górę Monte Calvia. W okolicy znajduje się również nurag — starożytna sardyńska budowla kamienna.",
  },
];
