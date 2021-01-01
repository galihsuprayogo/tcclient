import { showMessage } from 'react-native-flash-message';

export const showError = (message) => {
  showMessage({
    message,
    position: 'top',
    type: 'danger',
    color: 'black',
  });
};
