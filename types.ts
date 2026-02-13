export type ProcessStepIcon = 'grain' | 'package' | 'hygiene' | 'inoculate' | 'growth' | 'fruit';

export interface ProcessStep {
    number: string;
    title: string;
    description: string;
    category?: string;
    subHeading?: string;
    icon?: ProcessStepIcon;
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