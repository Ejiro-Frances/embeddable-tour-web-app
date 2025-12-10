"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface LoaderProps {
    size?: "sm" | "md" | "lg";
    className?: string;
    itemName?: string;
}

export const Loader: React.FC<LoaderProps> = ({
    size = "md",
    className = "",
    itemName = ""
}) => {
    const sizeClasses = {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
    };

    const dotSizes = {
        sm: 8,
        md: 12,
        lg: 16,
    };

    const dotSize = dotSizes[size];

    // Animation for the circular path that dots follow
    const pathVariants: Variants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
            },
        },
    };

    // Staggered dot animations to create a "walking through steps" effect
    const dotVariants: Variants = {
        initial: { scale: 0, opacity: 0 },
        animate: (i: number) => ({
            scale: [0, 1.2, 1, 1.2, 1],
            opacity: [0, 1, 1, 1, 0.6],
            transition: {
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                times: [0, 0.2, 0.4, 0.6, 1],
                ease: "easeInOut",
            },
        }),
    };

    // Pulsing center indicator
    const centerVariants: Variants = {
        animate: {
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="w-full min-h-[500px] flex items-center justify-center">
            <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
                {/* Rotating path container */}
                <motion.div
                    className="absolute inset-0"
                    variants={pathVariants}
                    animate="animate"
                >
                    {/* Tour step dots positioned in a circle */}
                    {[0, 1, 2, 3].map((i) => {
                        const angle = (i * Math.PI * 2) / 4;
                        const radius = size === "sm" ? 24 : size === "md" ? 36 : 48;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 rounded-full bg-primary"
                                style={{
                                    width: dotSize,
                                    height: dotSize,
                                    x: x - dotSize / 2,
                                    y: y - dotSize / 2,
                                }}
                                variants={dotVariants}
                                initial="initial"
                                animate="animate"
                                custom={i}
                            />
                        );
                    })}
                </motion.div>

                {/* Center pulsing indicator */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    variants={centerVariants}
                    animate="animate"
                >
                    <div className="relative">
                        {/* Outer ring */}
                        <div
                            className="rounded-full border-2 border-primary/30"
                            style={{
                                width: dotSize * 2,
                                height: dotSize * 2
                            }}
                        />
                        {/* Inner dot */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
                            style={{
                                width: dotSize * 0.8,
                                height: dotSize * 0.8
                            }}
                        />
                    </div>
                </motion.div>

                {/* Animated arrow/pointer indicating direction */}
                {/* <motion.div
                className="absolute"
                style={{
                    right: size === "sm" ? -20 : size === "md" ? -28 : -36,
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
                variants={arrowVariants}
                animate="animate"
            >
                <svg
                    width={size === "sm" ? 16 : size === "md" ? 20 : 24}
                    height={size === "sm" ? 16 : size === "md" ? 20 : 24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="url(#gradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="5" y1="12" x2="19" y2="12">
                            <stop offset="0%" stopColor="#eabe7b" />
                            <stop offset="100%" stopColor="#f5c98e" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div> */}

                {/* Connecting path lines */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ opacity: 0.2 }}
                >
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r={size === "sm" ? 24 : size === "md" ? 36 : 48}
                        stroke="url(#pathGradient)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{
                            pathLength: 1,
                            rotate: 360,
                        }}
                        transition={{
                            pathLength: { duration: 2, ease: "easeInOut" },
                            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        }}
                    />
                    <defs>
                        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#eabe7b" />
                            <stop offset="50%" stopColor="#f5c98e" />
                            <stop offset="100%" stopColor="#eabe7b" />
                        </linearGradient>
                    </defs>
                </svg>

                {
                    !!itemName && (
                        <p className="text-sm animate-pulse mt-36">Loading {itemName}</p>
                    )
                }
            </div>
        </div>
    );
};

export default Loader;
