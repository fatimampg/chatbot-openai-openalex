import { useTypewriter } from "../hooks/useTypewriter";
import { useState, useEffect } from "react";

interface TypewriterProps {
    text: string;
    speed: number;
    delay: number;
}
const Typewriter: React.FC<TypewriterProps> = ({ text, speed, delay }) => {
    const [startTyping, setStartTyping] = useState(false);
    const displayText = useTypewriter(startTyping ? text : '', speed);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartTyping(true);
        }, delay);
        return () => clearTimeout(timer); 
    }, []);

    return <p style={{fontSize: "1rem"}}>{displayText}</p>;
};

export default Typewriter;
  