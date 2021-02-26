import { ChallengesProvider } from '../contexts/ChallengesContext';
import {
  CountdownContext,
  CountdownProvider,
} from '../contexts/CountdownContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <CountdownProvider>
        <Component {...pageProps} />;
      </CountdownProvider>
    </ChallengesProvider>
  );
}

export default MyApp;
