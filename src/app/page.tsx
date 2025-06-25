"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Heart } from "lucide-react";
import messages from '@/../public/messages.json' assert { type: 'json' };
const typedMessages = messages as MessagesType;
interface DayMessage {
    greeting: string;
    verses: string[];
}

interface TimeOfDayMessages {
    morning: DayMessage;
    afternoon: DayMessage;
    night: DayMessage;
}

interface MessagesType {
    [key: string]: TimeOfDayMessages;
    default: TimeOfDayMessages;
}

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [verse, setVerse] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("morning");

  useEffect(() => {
    const hour = dayjs().hour();
    const currentTime = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "night";
    setTimeOfDay(currentTime);

    const today = dayjs().format("YYYY-MM-DD");
    const dailyMessage = typedMessages[today] || typedMessages.default;
    const message = dailyMessage[currentTime];

    setGreeting(message.greeting);
    const randomVerse = message.verses[Math.floor(Math.random() * message.verses.length)];
    setVerse(randomVerse);
  }, []);

  const getSkyGradient = () => {
    switch (timeOfDay) {
      case "morning":
        return "from-sky-400 via-blue-400 to-blue-800";
      case "afternoon":
        return "from-sky-400 via-blue-400 to-blue-800";
      case "night":
      default:
        return "from-gray-900 via-indigo-900 to-black";
    }
  };

  const getIcon = () => {
    if (timeOfDay === "morning") {
      return <div className="w-32 h-32 bg-yellow-400 rounded-full shadow-2xl animate-rise absolute bottom-10 left-1/2 transform -translate-x-1/2"></div>;
    } else if (timeOfDay === "afternoon") {
      return <div className="w-32 h-32 bg-yellow-400 rounded-full shadow-2xl animate-rise absolute bottom-10 left-1/2 transform -translate-x-1/2"></div>;
    } else if (timeOfDay === "night") {
      return <div className="w-24 h-24 bg-white rounded-full shadow-2xl animate-rise opacity-80 absolute bottom-10 left-1/2 transform -translate-x-1/2"></div>;
    }
    return null;
  };

  const decorativeParticles = Array.from({ length: 12 }).map((_, i) => {
    const isMorning = timeOfDay === "morning";
    return (
        <div
            key={i}
            className={`absolute ${isMorning ? 'bg-blue-300' : 'bg-white'} opacity-90 rounded-full blur-sm animate-float animate-drift ${!isMorning ? 'animate-twinkle' : ''}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: Math.floor(2 + Math.random() * 3)*4,
              height: Math.floor(2 + Math.random() * 3)*4,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
        >.</div>
    );
  });

  const copyVerse = () => {
    navigator.clipboard.writeText(verse);
    alert("Verso copiado 💙");
  };

  return (
      <div className={`min-h-screen bg-gradient-to-b ${getSkyGradient()} text-white flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden`}>
        {getIcon()}

        <div className="absolute inset-0 z-0 pointer-events-none">
          {decorativeParticles}
        </div>

        <motion.div
            className="relative z-10 max-w-xl space-y-14"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
          <motion.h1
              className="text-4xl md:text-5xl font-bold drop-shadow-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
          >
            {greeting}
          </motion.h1>

          <motion.div
              onClick={copyVerse}
              className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
          >
            <Heart className="absolute -top-3 -right-3 w-6 h-6 text-blue-700 drop-shadow" />
            <p className="text-lg md:text-xl font-light leading-relaxed text-white/90">
              “{verse}”
            </p>
          </motion.div>

        </motion.div>

        <footer className="absolute bottom-4 z-10 text-sm text-white/70">
          Hecho con cariño 💙 por alguien que piensa en ti
        </footer>
      </div>
  );
}
