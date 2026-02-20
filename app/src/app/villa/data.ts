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

const STANDARD_AMENITIES = ["wifi", "climate", "bathroom"];

function bedroom(
  key: string,
  title: string,
  description: string,
  extraAmenities: string[] = [],
): RoomData {
  return {
    key,
    title,
    description,
    amenities: [...STANDARD_AMENITIES, ...extraAmenities],
  };
}

function exterior(
  key: string,
  title: string,
  subtitle: string,
  description: string,
): ExteriorSectionData {
  return { key, title, subtitle, description };
}

export const rooms: RoomData[] = [
  bedroom(
    "bedroom-1",
    "Sypialnia 1",
    "Przestronna sypialnia z łóżkiem małżeńskim i prywatną łazienką en-suite. Klimatyzacja i WiFi zapewniają komfort przez cały pobyt.",
  ),
  bedroom(
    "bedroom-2",
    "Sypialnia 2",
    "Jasna sypialnia z łóżkiem małżeńskim, łazienką en-suite i widokiem na ogród. Idealna dla par szukających spokoju.",
  ),
  bedroom(
    "bedroom-3",
    "Sypialnia 3",
    "Wygodna sypialnia z dwoma łóżkami pojedynczymi i prywatną łazienką. Możliwość dostawienia łóżeczka niemowlęcego.",
    ["crib"],
  ),
  bedroom(
    "bedroom-4",
    "Sypialnia 4",
    "Sypialnia z łóżkiem małżeńskim i łazienką en-suite. Na życzenie dostępna dostawka dla dodatkowego gościa.",
    ["extra-bed"],
  ),
  bedroom(
    "bedroom-5",
    "Sypialnia 5",
    "Przytulna sypialnia z łóżkiem małżeńskim i prywatną łazienką. Klimatyzacja i WiFi w standardzie.",
  ),
  bedroom(
    "bedroom-6",
    "Sypialnia 6",
    "Sypialnia z dwoma łóżkami pojedynczymi i łazienką en-suite. Możliwość połączenia łóżek w jedno duże.",
  ),
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
  exterior(
    "garden",
    "Ogród",
    "Hektar śródziemnomorskiej zieleni",
    "Cała posiadłość położona jest u stóp góry Monte Calvia, na terenie o powierzchni ok. 1 hektara. Naturalna sardyńska roślinność, egzotyczne palmy i drzewa oliwne tworzą prywatną oazę spokoju. Cały teren jest ogrodzony.",
  ),
  exterior(
    "relaxation-zone",
    "Strefa wypoczynkowa",
    "Relaks wśród zieleni i słońca",
    "Wydzielone strefy odpoczynku z leżakami i parasolami — idealne miejsce na leniwe popołudnie z książką lub drzemkę w cieniu drzew.",
  ),
  exterior(
    "veranda",
    "Weranda i taras",
    "Zadaszona przestrzeń do wspólnych posiłków",
    "Zadaszona weranda z dużym stołem to idealne miejsce na wspólne śniadania i kolacje. Wieczorami taras zaprasza do relaksu przy lampce wina z widokiem na ogród.",
  ),
  exterior(
    "sports-court",
    "Boisko sportowe",
    "Aktywny wypoczynek dla całej rodziny",
    "Prywatne boisko do gier zespołowych — piłka nożna, siatkówka i inne zabawy na świeżym powietrzu. Idealne dla rodzin z dziećmi i grup przyjaciół.",
  ),
  exterior(
    "summer-kitchen",
    "Kuchnia letnia",
    "Gotowanie na świeżym powietrzu",
    "Altana z letnią kuchnią i grillem pozwala na przygotowanie posiłków w plenerze. Sardyńskie wieczory przy wspólnym gotowaniu to niezapomniane doświadczenie.",
  ),
  exterior(
    "parking",
    "Parking",
    "Prywatny, bezpłatny",
    "Prywatny parking na terenie posiadłości z miejscem dla kilku samochodów. Bezpłatny i dostępny przez cały okres pobytu.",
  ),
  exterior(
    "views",
    "Widoki i otoczenie",
    "Sardyńskie krajobrazy na wyciągnięcie ręki",
    "Posiadłość otacza typowy sardyński krajobraz — wzgórza porośnięte makią, drzewa oliwne i widok na górę Monte Calvia. W okolicy znajduje się również nurag — starożytna sardyńska budowla kamienna.",
  ),
];
