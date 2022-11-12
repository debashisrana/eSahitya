import React from 'react'
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { AppNavigator } from './navigation.component';
import { SplashScreen } from './screens/splash.component';
export default function App() {
  const [showSplash, setShowSplash] = React.useState(true);
  React.useEffect(() => {
      setTimeout(() => {
        setShowSplash(false);
      }, 3000); // milliseconds
    }, []);
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
    {showSplash ? <SplashScreen /> : <AppNavigator />}
  </ApplicationProvider>
  </>
  )
}
