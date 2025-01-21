export interface Property {
  id: string;
  title: string;
  price: number;
  area: number; // square meters
  district: string;
  address: string;
  type: "apartment" | "house" | "commercial";
  status: "available" | "reserved" | "sold";
  description: string;
  features: string[];
  sellerPhone: string;
  assignedTo: string; // username of the assigned admin/seller
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// Sample properties data
export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "prop1",
    title: "Современная квартира в Арбате",
    price: 25000000,
    area: 85,
    district: "Арбат",
    address: "ул. Арбат, 20",
    type: "apartment",
    status: "available",
    description: "Просторная 2-комнатная квартира с современным ремонтом",
    features: ["Балкон", "Паркинг", "Охрана"],
    sellerPhone: "+7 (999) 123-4567",
    assignedTo: "elena",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prop2",
    title: "Бизнес-центр на Тверской",
    price: 150000000,
    area: 500,
    district: "Тверской",
    address: "Тверская ул., 15",
    type: "commercial",
    status: "available",
    description: "Современный бизнес-центр класса А",
    features: ["Парковка", "Охрана", "Конференц-зал"],
    sellerPhone: "+7 (999) 234-5678",
    assignedTo: "mikhail",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prop3",
    title: "Пентхаус с видом на Москва-Сити",
    price: 80000000,
    area: 200,
    district: "Пресненский",
    address: "Пресненская наб., 10",
    type: "apartment",
    status: "reserved",
    description: "Роскошный пентхаус с панорамными окнами",
    features: ["Терраса", "Спа", "Консьерж"],
    sellerPhone: "+7 (999) 345-6789",
    assignedTo: "anna",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const MOSCOW_DISTRICTS = [
  "Арбат",
  "Басманный",
  "Замоскворечье",
  "Красносельский",
  "Мещанский",
  "Пресненский",
  "Таганский",
  "Тверской",
  "Хамовники",
  "Якиманка",
] as const;

export const PROPERTY_FEATURES = [
  "Балкон",
  "Паркинг",
  "Охрана",
  "Терраса",
  "Спа",
  "Консьерж",
  "Кондиционер",
  "Лифт",
  "Кладовая",
  "Подземная парковка",
] as const; 