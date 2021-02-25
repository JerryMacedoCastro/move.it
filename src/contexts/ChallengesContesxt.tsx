import React from 'react';

const ChallengesContext = React.createContext({});

interface ChallengesProviderProps {
  children: React.ReactNode;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
}

const ChallengesProvider = ({ children }: ChallengesProviderProps) => {
  const [level, setLevel] = React.useState(1);
  const [currentExperience, setCurrenteExperience] = React.useState(0);
  const [challengesCompleted, setChellengesCompleted] = React.useState(0);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    console.log('new challengee');
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};

export { ChallengesContext, ChallengesProvider };
