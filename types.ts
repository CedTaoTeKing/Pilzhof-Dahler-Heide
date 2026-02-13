export interface ProcessStep {
    number: string;
    title: string;
    description: string;
}

export interface FoodItem {
    id: string;
    name: string;
    description: string;
    image: string;
}

export interface Recipe {
    id: string;
    title: string;
    description: string;
    image: string;
    time: string;
}

export interface VisionPillar {
    title: string;
    text: string;
}