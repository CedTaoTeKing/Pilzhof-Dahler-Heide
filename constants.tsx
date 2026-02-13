import { FoodItem, ProcessStep, Recipe, VisionPillar } from './types';
import React from 'react';

export const PROCESS_STEPS: ProcessStep[] = [
    {
        number: "1",
        title: "Nährboden",
        description: "Lokale Dinkelspelzen aus der Region bilden die Grundlage unseres Substrats. Ein Nebenprodukt der Getreideproduktion wird zum wertvollen Nährboden.",
        category: "NÄHRBODEN",
        subHeading: "Regionale Dinkelspelzen",
        icon: "grain"
    },
    {
        number: "2",
        title: "Absacken",
        description: "Das Substrat wird präzise portioniert und für die weitere Verarbeitung vorbereitet.",
        category: "VORBEREITUNG",
        subHeading: "Absacken",
        icon: "package"
    },
    {
        number: "3",
        title: "Sterilisieren",
        description: "Durch Hitze eliminieren wir Konkurrenzorganismen ohne chemische Zusätze. Reinheit ist unser oberstes Gebot.",
        category: "HYGIENE",
        subHeading: "Sterilisieren",
        icon: "hygiene"
    },
    {
        number: "4",
        title: "Inokulieren",
        description: "Das Herzstück: Wir impfen das Substrat mit unserer Edelkultur des Castanhen Seitlings.",
        category: "IMPFUNG",
        subHeading: "Inokulieren",
        icon: "inoculate"
    },
    {
        number: "5",
        title: "Sommerraum",
        description: "In der Durchwachsphase breitet sich das Myzel vollständig aus. Ruhe und konstante Bedingungen sind hier entscheidend.",
        category: "REIFUNG",
        subHeading: "Sommerraum",
        icon: "growth"
    },
    {
        number: "6",
        title: "Herbsträume",
        description: "Die Fruchtung beginnt. Wir simulieren den perfekten Herbsttag, um Pilze höchster Qualität zu ernten.",
        category: "FRUKTUNG",
        subHeading: "Herbsträume",
        icon: "fruit"
    }
];

export const BABA_FOODS: FoodItem[] = [
    {
        id: "1",
        name: "Magic Döner",
        description: "Saftiger Seitling vom Spieß, knusprig gegrillt, mit hausgemachter Kräutersauce.",
        image: "https://picsum.photos/id/431/600/400"
    },
    {
        id: "2",
        name: "Magic Tacos",
        description: "Gezupfter Pilz 'Pulled Style', frischer Koriander, Limette und Chili.",
        image: "https://picsum.photos/id/225/600/400"
    },
    {
        id: "3",
        name: "Smash Burger",
        description: "Umami-Bombe pur. Gepresstes Pilz-Patty, veganer Cheddar, Röstzwiebeln.",
        image: "https://picsum.photos/id/835/600/400"
    },
    {
        id: "4",
        name: "Magic Bowl",
        description: "Bunter Mix aus marinierten Pilzen, Quinoa, Edamame und Tahini-Dressing.",
        image: "https://picsum.photos/id/493/600/400"
    }
];

export const RECIPES: Recipe[] = [
    {
        id: "r1",
        title: "Seitling à la Crème",
        description: "Klassisch, cremig, verfeinert mit Weißwein und frischen Kräutern.",
        image: "https://picsum.photos/id/292/600/800",
        time: "25 Min"
    },
    {
        id: "r2",
        title: "Gegrillte Marinade",
        description: "Rauchig und intensiv. Der perfekte Fleischersatz für den Sommer.",
        image: "https://picsum.photos/id/365/600/800",
        time: "40 Min"
    },
    {
        id: "r3",
        title: "Pilz-Risotto",
        description: "Cremiger Arborio-Reis trifft auf die nussige Note unserer Pilze.",
        image: "https://picsum.photos/id/674/600/800",
        time: "50 Min"
    }
];

export const VISION_PILLARS: VisionPillar[] = [
    {
        title: "Regionaler Nährboden",
        text: "Wir nutzen Dinkelspelzen aus der direkten Umgebung."
    },
    {
        title: "Kreislaufwirtschaft",
        text: "Unser 'Abfall' ist wertvoller Dünger für die Landwirtschaft."
    },
    {
        title: "Ressourcenschonend",
        text: "Minimaler Wasserverbrauch, maximale Effizienz."
    },
    {
        title: "100% Pflanzlich",
        text: "Kein Tierleid. Reine pflanzliche Wertschöpfung."
    },
    {
        title: "Transparenz",
        text: "Wir zeigen, was wir tun. Jeder Schritt ist nachvollziehbar."
    }
];
