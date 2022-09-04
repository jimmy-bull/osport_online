import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'
import Pages from './components/pages'
import store from './store/store';
// import 'react-native-gesture-handler'
export default function App() {
  return (
    <Provider store={store}>
      <Pages />
    </Provider>
  );
}


