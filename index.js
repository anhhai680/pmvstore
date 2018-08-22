import { AppRegistry } from 'react-native';
import App from './App';
import bgListener from './fcmListener';

AppRegistry.registerComponent('pmvstore', () => App);
// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgListener);
