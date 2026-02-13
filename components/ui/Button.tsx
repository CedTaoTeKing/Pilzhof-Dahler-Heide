import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'baba' | 'outline-light' | 'light';
    children: React.ReactNode;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
    variant = 'primary', 
    children, 
    className = '', 
    fullWidth = false,
    ...props 
}) => {
    const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-out transform hover:-translate-y-0.5 rounded-sm";
    
    const variants = {
        primary: "bg-forest text-cream hover:bg-earth shadow-lg hover:shadow-xl border border-transparent",
        secondary: "bg-transparent text-forest border border-forest hover:bg-forest hover:text-cream",
        baba: "bg-baba text-white hover:bg-red-700 shadow-lg hover:shadow-red-900/20 border border-transparent font-bold",
        "outline-light": "bg-transparent text-cream border border-cream hover:bg-cream hover:text-forest backdrop-blur-sm",
        light: "bg-cream text-forest hover:bg-white shadow-md hover:shadow-lg border border-transparent font-semibold"
    };

    const widthClass = fullWidth ? "w-full" : "w-auto";

    return (
        <button 
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};