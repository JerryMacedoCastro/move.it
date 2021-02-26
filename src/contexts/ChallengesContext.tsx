import React from 'react';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesProviderProps {
  children: React.ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  expericeToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

const ChallengesContext = React.createContext({} as ChallengesContextData);

const ChallengesProvider = ({ children, ...rest }: ChallengesProviderProps) => {
  const [level, setLevel] = React.useState(rest.level ?? 1);
  const [currentExperience, setCurrenteExperience] = React.useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = React.useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = React.useState(null);

  const expericeToNextLevel = Math.pow((level + 1) * 4, 2);

  React.useEffect(() => {
    Notification.requestPermission();
  }, []);

  React.useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
    new Audio('/notification.mp3').play();
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🤘', {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= expericeToNextLevel) {
      finalExperience = finalExperience - expericeToNextLevel;
      levelUp();
    }

    setCurrenteExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        expericeToNextLevel,
        completeChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};

export { ChallengesContext, ChallengesProvider };
