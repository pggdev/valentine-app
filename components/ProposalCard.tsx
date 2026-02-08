'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ProposalCardProps {
    name: string;
    interactive?: boolean; // If false, the No button doesn't move (for preview, maybe?) - actually per requirements, preview should also work. But let's keep it flexible.
    onYes?: () => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ name, interactive = true, onYes }) => {
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [accepted, setAccepted] = useState(false);

    // Function to move the "No" button to a random position
    const moveNoButton = () => {
        if (!interactive || accepted) return;

        // Calculate random position within a reasonable range
        // We want it to stay somewhat visible but jump away from cursor
        const x = (Math.random() - 0.5) * 400; // -200 to 200
        const y = (Math.random() - 0.5) * 400; // -200 to 200

        setNoButtonPosition({ x, y });
    };

    const handleYesClick = () => {
        setAccepted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        if (onYes) onYes();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4 text-center">
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl max-w-lg w-full border border-pink-200">
                {!accepted ? (
                    <>
                        <div className="mb-8">
                            {/* Cute character placeholder - using an emoji or a simple SVG if preferred. 
                  The prompt ref image has a cute bear/cat face. 
                  Let's use a cute accessible emoji/img for now or SVG. */}
                            <div className="text-6xl animate-bounce">
                                🐻❤️
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 pb-8">
                            {name}, will you be my <span className="text-pink-500">valentine?</span>
                        </h1>

                        <div className="flex items-center justify-center gap-6 relative h-20">
                            <button
                                onClick={handleYesClick}
                                className="px-8 py-3 bg-pink-500 text-white font-bold rounded-full text-xl hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                            >
                                Yes
                            </button>

                            <motion.button
                                animate={noButtonPosition}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onMouseEnter={moveNoButton}
                                onClick={moveNoButton} // Also move on click just in case
                                className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-full text-xl hover:bg-gray-300 transition-colors absolute"
                                style={{ position: 'relative' }} // Changed to relative in flex container but motion handles x/y translate
                            >
                                No
                            </motion.button>
                        </div>

                        <p className="mt-12 text-sm text-gray-400 italic">
                            "No" seems a bit shy 😈
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                        <div className="text-8xl mb-6 animate-pulse">
                            💖🎉🥰
                        </div>
                        <h2 className="text-4xl font-bold text-pink-600 mb-4">
                            Yay!!! I knew it!
                        </h2>
                        <p className="text-xl text-gray-700">
                            Can't wait for our date!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProposalCard;
