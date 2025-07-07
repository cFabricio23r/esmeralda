"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import weeklyPoem from "./../../public/messages.json";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Buenos días";
    if (hour >= 12 && hour < 18) return "Buenas tardes";
    return "Buenas noches";
}
export default function Home() {
    const [verse, setVerse] = useState("");
    const [dayIndex, setDayIndex] = useState(0);

    useEffect(() => {
        const today = dayjs();
        const monday = dayjs(weeklyPoem.startDate);
        const diff = today.diff(monday, "day");
        const index = diff >= 0 && diff < weeklyPoem.verses.length ? diff : 0;
        setDayIndex(index);
        setVerse(weeklyPoem.verses[index]);
    }, []);

    const hour = new Date().getHours();
    const backgroundClass = hour >= 5 && hour < 12
        ? "from-sky-300 via-blue-400 to-indigo-700"
        : hour >= 12 && hour < 18
            ? "from-sky-300 via-blue-400 to-indigo-700"
            : "from-slate-800 via-blue-900 to-black";

    return (
        <div className={`min-h-screen bg-gradient-to-b ${backgroundClass} text-white flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden`}>

            <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-${2 + Math.floor(Math.random() * 3)} h-${2 + Math.floor(Math.random() * 3)} bg-white rounded-full blur-sm animate-twinkle`}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="relative z-10 max-w-2xl space-y-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="text-center space-y-4">
                    <motion.h1
                        className="text-3xl md:text-4xl font-semibold text-blue-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {getGreeting()}, Esmeralda 💙
                    </motion.h1>

                    <motion.h2
                        className="text-sm text-blue-200 tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {weeklyPoem.theme}
                    </motion.h2>
                </div>

                <motion.div
                    className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    <p className="text-lg md:text-xl font-light leading-relaxed text-white italic">
                        “{verse}”
                    </p>
                </motion.div>

                <motion.div
                    className="text-sm text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p>Una pequeña pieza de algo más grande, que se va revelando con el tiempo. {`${dayIndex + 1}/7`}</p>
                </motion.div>
            </motion.div>

            <footer className="absolute bottom-4 z-10 text-xs text-white/60">
                Hecho con cariño 💙 por alguien que piensa en ti
            </footer>
        </div>
    );
}