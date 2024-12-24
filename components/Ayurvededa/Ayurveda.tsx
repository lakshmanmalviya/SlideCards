import React, { useEffect, useState } from "react";
import styles from "./Ayurveda.module.css";

const Ayurveda: React.FC = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [buttonShowable, setButtonShowable] = useState<boolean>(false);

    useEffect(() => {
        const savedIndex = localStorage.getItem("itemIndex");
        const savedShowable = localStorage.getItem("showable");

        if (savedIndex !== null) {
            setActiveCard(Number(savedIndex));
        } else {
            setActiveCard(1);
        }

        if (savedShowable !== null) {
            setButtonShowable(savedShowable === "true");
        }
    }, []);

    useEffect(() => {
        if (activeCard !== null) {
            localStorage.setItem("itemIndex", activeCard.toString());
        }
    }, [activeCard]);

    useEffect(() => {
        localStorage.setItem("showable", buttonShowable.toString());
    }, [buttonShowable]);

    const handleCardClick = (index: number) => {
        setActiveCard(index);
        setButtonShowable(true);
    };

    const handleNextClick = () => {
        if (activeCard !== null) {
            const nextCard = (activeCard + 1) % 3;
            setActiveCard(nextCard);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.cardContainer}>
                {["STRENGTH", "MOBILITY", "DRILLS"].map((title, index) => (
                    <div
                        key={index}
                        className={`${styles.card} ${activeCard === index ? styles.activeCard : ""} ${activeCard !== null && activeCard !== index ? styles.inactiveCard : ""
                            }`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className={styles.cardContent}>
                            <p className={styles.heading}>{title}</p>
                            {activeCard === index && buttonShowable && (
                                <button className={styles.nextButton} >
                                    <img src="/next.png" onClick={handleNextClick}/>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ayurveda;