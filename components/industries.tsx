"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, Activity, ShoppingBag, Database, Box, Home, Truck, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import SubHeader from "./ui/sub-header";

export interface Industry {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export interface IndustriesProps {
    badge?: string;
    title?: string;
    description?: string;
    items?: Industry[];
}

const defaultItems: Industry[] = [
    {
        title: "Healthcare",
        description:
            "Business Process Outsourcing works for healthcare providers by managing patient support and other basic administrative tasks more efficiently. Outsourcing these operations reduces staff workload.",
        icon: (
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_103_2653)">
                    <path d="M21.0938 0C23.2512 0 25 1.74883 25 3.90625L25.0014 3.80527C25.0549 1.69453 26.7826 0 28.9062 0H46.0938C48.2512 0 50 1.74883 50 3.90625V21.0938C50 23.2512 48.2512 25 46.0938 25C48.2512 25 50 26.7488 50 28.9062V46.0938C50 48.2512 48.2512 50 46.0938 50H28.9062C26.7488 50 25 48.2512 25 46.0938C25 48.2512 23.2512 50 21.0938 50H3.90625C1.74883 50 0 48.2512 0 46.0938V28.9062C0 26.7826 1.69453 25.0549 3.80527 25.0014L3.90625 25C1.74883 25 0 23.2512 0 21.0938V3.90625C0 1.74883 1.74883 0 3.90625 0H21.0938ZM25 12.5C25 19.4035 19.4035 25 12.5 25C19.4035 25 25 30.5965 25 37.5C25 30.5965 30.5965 25 37.5 25C30.5965 25 25 19.4035 25 12.5Z" fill="#840ECD"/>
                </g>
                <defs>
                    <clipPath id="clip0_103_2653">
                        <rect width="50" height="50" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        title: "Ecommerce",
        description:
            "Our Business Process Outsourcing for ecommerce businesses is managing order processing, returns, refunds, product inquiries. Reliable outsourcing by us offers better response time.",
        icon: (
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_103_2655)">
                    <path d="M35.1562 0C43.3543 0 50 6.6457 50 14.8438V50H40.625V14.8438C40.625 11.8234 38.1766 9.375 35.1562 9.375C32.1359 9.375 29.6875 11.8234 29.6875 14.8438V35.1562C29.6875 43.3543 23.0418 50 14.8438 50C6.6457 50 0 43.3543 0 35.1562V0H9.375V35.1562C9.375 38.1766 11.8234 40.625 14.8438 40.625C17.8641 40.625 20.3125 38.1766 20.3125 35.1562V14.8438C20.3125 6.6457 26.9582 0 35.1562 0Z" fill="#840ECD"/>
                </g>
                <defs>
                    <clipPath id="clip0_103_2655">
                        <rect width="50" height="50" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        title: "SaaS",
        description:
            "Business Process Outsourcing works for SaaS companies by managing customer support and subscription related inquiries. Outsourcing these services through us reduces support backlogs.",
        icon: (
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_103_2657)">
                    <path d="M23.4375 34.375L7.8125 50H0V42.1875L15.625 26.5625H23.4375V34.375ZM37.5 50H12.5L25 37.5L37.5 50ZM50 42.1875V50H42.1875L26.5625 34.375V26.5625H34.375L50 42.1875ZM12.5 25L0 37.5V12.5L12.5 25ZM50 37.5L37.5 25L50 12.5V37.5ZM23.4375 15.625V23.4375H15.625L0 7.8125V0H7.8125L23.4375 15.625ZM50 7.8125L34.375 23.4375H26.5625V15.625L42.1875 0H50V7.8125ZM25 12.5L12.5 0H37.5L25 12.5Z" fill="#840ECD"/>
                </g>
                <defs>
                    <clipPath id="clip0_103_2657">
                        <rect width="50" height="50" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        title: "Retail",
        description:
            "Business Process Outsourcing for retail businesses means managing order tracking, product information, returns, after sales support. Professionals at Dexnive improve over all customer service.",
        icon: (
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_103_2659)">
                    <path d="M19.5312 26.5625C21.6887 26.5625 23.4375 28.3113 23.4375 30.4688V50H19.5312C8.74453 50 0 41.2555 0 30.4688V26.5625H19.5312ZM50 50H26.5625V30.4688C26.5625 28.3113 28.3113 26.5625 30.4688 26.5625H50V50ZM23.4375 19.5312C23.4375 21.6887 21.6887 23.4375 19.5312 23.4375H0V19.5312C0 8.74453 8.74453 0 19.5312 0H23.4375V19.5312ZM30.4688 0C41.2555 0 50 8.74453 50 19.5312V23.4375H30.4688C28.3113 23.4375 26.5625 21.6887 26.5625 19.5312V0H30.4688Z" fill="#840ECD"/>
                </g>
                <defs>
                    <clipPath id="clip0_103_2659">
                        <rect width="50" height="50" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        title: "Finance",
        description:
            "Business Process Outsourcing service works for financial organizations by managing customer support, account inquiries, documentation, administrative processes with accuracy.",
        icon: (
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_103_2651)">
                    <path d="M25 50H12.5V37.5H25V50ZM50 50H37.5V37.5H50V50ZM12.5 37.5H0V25H12.5V37.5ZM37.5 37.5H25V25H37.5V37.5ZM25 25H12.5V12.5H25V25ZM50 25H37.5V12.5H50V25ZM12.5 12.5H0V0H12.5V12.5ZM37.5 12.5H25V0H37.5V12.5Z" fill="#840ECD"/>
                </g>
                <defs>
                    <clipPath id="clip0_103_2651">
                        <rect width="50" height="50" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        title: "Real Estate",
        description:
            "Business Process Outsourcing works for real estate businesses to manage property inquiries, appointment scheduling, lead qualification, documentation, customer communication.",
        icon: (
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_103_2649)">
                    <path d="M12.7002 27.9316C13.8307 32.3242 17.2887 35.7822 21.6813 36.9127V49.6129C10.3727 48.2027 1.41016 39.24 0 27.9316H12.7002ZM49.6125 27.9316C48.2023 39.24 39.2396 48.2027 27.9312 49.6129V36.9127C32.3238 35.7822 35.7818 32.3242 36.9123 27.9316H49.6125ZM24.8063 21.6816C26.5322 21.6816 27.9312 23.0807 27.9312 24.8066C27.9312 26.5326 26.5322 27.9316 24.8063 27.9316C23.0803 27.9316 21.6813 26.5326 21.6813 24.8066C21.6813 23.0807 23.0803 21.6816 24.8063 21.6816ZM21.6813 12.7004C17.2887 13.8309 13.8307 17.2891 12.7002 21.6816H0C1.41016 10.373 10.3729 1.41035 21.6813 0.000195312V12.7004ZM27.9312 0C39.2396 1.41035 48.2023 10.3732 49.6125 21.6816H36.9123C35.7818 17.2891 32.3238 13.8309 27.9312 12.7004V0Z" fill="#840ECD"/>
                </g>
                <defs>
                    <clipPath id="clip0_103_2649">
                        <rect width="50" height="50" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        title: "Logistics",
        description:
            "Business Process Outsourcing for logistics companies is managing shipment inquiries, order tracking, documentation, customer communication, operational support.",
        icon: (
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_103_2647)">
                    <path d="M25 37.5V50H12.5977L6.25 43.5547L0 37.5V25H12.5L25 37.5ZM50 37.5V50H37.5977L31.25 43.5547L25 37.5V25H37.5L50 37.5ZM25 12.5V25H12.5977L6.25 18.5547L0 12.5V0H12.5L25 12.5ZM50 12.5V25H37.5977L31.25 18.5547L25 12.5V0H37.5L50 12.5Z" fill="#840ECD"/>
                </g>
                <defs>
                    <clipPath id="clip0_103_2647">
                        <rect width="50" height="50" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        title: "Travel",
        description:
            "Business Process Outsourcing works well for travel businesses. It can manage reservation changes, travel assistance and post booking services.",
        icon: (
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_103_2651_travel)">
                    <path d="M25 50H12.5V37.5H25V50ZM50 50H37.5V37.5H50V50ZM12.5 37.5H0V25H12.5V37.5ZM37.5 37.5H25V25H37.5V37.5ZM25 25H12.5V12.5H25V25ZM50 25H37.5V12.5H50V25ZM12.5 12.5H0V0H12.5V12.5ZM37.5 12.5H25V0H37.5V12.5Z" fill="#840ECD"/>
                </g>
                <defs>
                    <clipPath id="clip0_103_2651_travel">
                        <rect width="50" height="50" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        ),
    },
];

const Industries = ({
    badge = "Industries We Work With",
    title = "Which Industries Can Use Business Process Outsourcing Services?",
    description = "Business Process Outsourcing service is for different industries. Every industry has different customer expectations. So outsourcing solutions we provide are tailored to specific business needs.",
    items = defaultItems,
}: IndustriesProps) => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Drag States
    const [dragStartX, setDragStartX] = useState<number | null>(null);
    const [dragOffset, setDragOffset] = useState(0);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Duplicate array multiple times to ensure wrap-around happens far off-screen
    const extendedItems = [...items, ...items, ...items, ...items];

    const handleNext = useCallback(() => {
        setCurrent((prev) => (prev + 1) % extendedItems.length);
    }, [extendedItems.length]);

    const handlePrev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + extendedItems.length) % extendedItems.length);
    }, [extendedItems.length]);

    // Autoplay
    useEffect(() => {
        if (isPaused || dragStartX !== null) return;
        const timer = setTimeout(() => {
            handleNext();
        }, 3000);
        return () => clearTimeout(timer);
    }, [handleNext, isPaused, dragStartX, current]);

    // Drag Handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        setDragStartX(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (dragStartX !== null) {
            setDragOffset(e.clientX - dragStartX);
        }
    };

    const handlePointerUp = () => {
        if (dragStartX === null) return;
        
        const finalDragOffset = dragOffset;
        setDragStartX(null);
        setDragOffset(0);

        // Wait for the transition classes to re-apply before changing the active card
        setTimeout(() => {
            if (finalDragOffset < -75) {
                handleNext();
            } else if (finalDragOffset > 75) {
                handlePrev();
            }
        }, 20);
    };

    const getPos = (index: number, current: number, N: number) => {
        let diff = (index - current + N) % N;
        if (diff > N / 2) diff -= N;
        return diff;
    };

    const getOffset = (pos: number) => {
        const activeOffset = isMobile ? 285 : 390;
        const inactiveGap = isMobile ? 235 : 315;
        
        if (pos === 0) return 0;
        if (pos > 0) return activeOffset + (pos - 1) * inactiveGap;
        return -activeOffset + (pos + 1) * inactiveGap;
    };

    return (
        <div className="relative w-full flex flex-col items-center py-20 overflow-hidden">
        

            <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-[1920px] mx-auto px-5">
                {/* Header Section */}
                <div className="flex flex-col items-center gap-[15px] max-w-[799px] text-center">
                    <SubHeader title={badge} />

                    <h2 className="text-[40px] md:text-[70px] font-bold text-white leading-[1.1] tracking-[-0.01em] mt-4">
                        {title}
                    </h2>

                    <p className="text-[18px] text-white font-medium leading-[24px] mt-4 max-w-[750px]">
                        {description}
                    </p>
                </div>

                {/* Custom Carousel Section */}
                <div 
                    className="relative w-full h-[500px] md:h-[650px] mt-10 touch-pan-y select-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={() => {
                        handlePointerUp();
                        setIsPaused(false);
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center pointer-events-none">
                        {extendedItems.map((item, index) => {
                            const pos = getPos(index, current, extendedItems.length);
                            const offset = getOffset(pos);
                            const isActive = pos === 0;

                            // Hide items that are too far away to prevent long animations across screen
                            const isVisible = Math.abs(pos) <= 4;

                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "absolute top-1/2 left-1/2 lg:left-[40%] flex flex-col rounded-[16px] overflow-hidden pointer-events-auto",
                                        dragStartX === null && "transition-all duration-[700ms] ease-[cubic-bezier(0.175,0.885,0.32,1.02)]",
                                        isActive
                                            ? "w-[320px] h-[450px] md:w-[400px] md:h-[500px] p-[20px] justify-end gap-[10px] z-30 bg-[#C2C2C2]"
                                            : "w-[220px] h-[280px] md:w-[300px] md:h-[350px] p-[20px] justify-between z-10 bg-[#C2C2C2]",
                                        !isVisible && "opacity-0 scale-90",
                                        !isActive && isVisible && "opacity-50",
                                        dragStartX !== null && !isActive && "cursor-grabbing",
                                        dragStartX !== null && isActive && "cursor-grabbing"
                                    )}
                                    style={{
                                        transform: `translate(calc(-50% + ${offset + dragOffset}px), -50%)`,
                                    }}
                                    onClick={() => {
                                        if (!isActive && dragStartX === null) setCurrent(index);
                                    }}
                                >
                                    {/* Icon */}
                                    <div
                                        className={cn(
                                            dragStartX === null && "transition-all duration-[700ms] ease-[cubic-bezier(0.175,0.885,0.32,1.02)]",
                                            isActive
                                                ? "absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-[calc(50%+60px)] w-[150px] md:w-[220px] h-[150px] md:h-[220px]"
                                                : "w-[50px] h-[50px] mb-auto"
                                        )}
                                    >
                                        {item.icon}
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={cn(
                                            "flex flex-col",
                                            dragStartX === null && "transition-all duration-[700ms] ease-[cubic-bezier(0.175,0.885,0.32,1.02)]",
                                            isActive
                                                ? "items-start gap-2 w-full mt-auto"
                                                : "items-start text-left mt-auto"
                                        )}
                                    >
                                        <h3
                                            className={cn(
                                                "font-bold text-[#0B1023]",
                                                dragStartX === null && "transition-all duration-[700ms] ease-[cubic-bezier(0.175,0.885,0.32,1.02)]",
                                                isActive
                                                    ? "text-[24px] md:text-[32px] leading-[1.2]"
                                                    : "text-[20px] md:text-[32px] leading-[1.2] w-full text-left"
                                            )}
                                        >
                                            {item.title}
                                        </h3>
                                        
                                        <div
                                            className={cn(
                                                "overflow-hidden transition-all",
                                                dragStartX === null && "duration-[400ms] ease-out",
                                                isActive ? "max-h-[200px] opacity-100 translate-y-0 delay-[400ms] mt-2" : "max-h-0 opacity-0 translate-y-4 delay-0 mt-0"
                                            )}
                                        >
                                            <p className="font-light text-[#0B1023] text-[12px] md:text-[16px] leading-[1.6] md:leading-[22px] line-clamp-3 md:line-clamp-none">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Custom Navigation */}
                <div className="flex flex-row justify-center items-center mt-8">
                    <div className="flex flex-row justify-center items-center p-1 gap-[3px] bg-[#840ECD] rounded-[16px]">
                        <button
                            onClick={handlePrev}
                            className="w-[50px] h-[50px] flex items-center justify-center bg-[#0D0320] border border-white/5 rounded-[14px] backdrop-blur-[10px] z-20 shrink-0"
                        >
                            <ArrowLeft className="text-[#840ECD] w-5 h-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-[50px] h-[50px] flex items-center justify-center bg-[#0D0320] border border-white/5 rounded-[14px] backdrop-blur-[10px] z-20 shrink-0"
                        >
                            <ArrowRight className="text-[#840ECD] w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Industries;