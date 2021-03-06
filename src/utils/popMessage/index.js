import { showMessage } from 'react-native-flash-message';
import { fonts } from '..';

export const showError = (message) => {
  showMessage({
    message,
    position: 'top',
    type: 'danger',
    color: 'white',
    style: {
      borderRadius: 8,
      marginHorizontal: 10,
    },
    titleStyle: {
      fontFamily: fonts.sfProDisplay.medium,
      fontSize: 15,
      textAlign: 'left'
    }
  });
};

export const showSuccess = (message) => {
  showMessage({
    message,
    position: 'top',
    type: 'success',
    color: 'white',
    style: {
      borderRadius: 8,
      marginHorizontal: 10,
    },
    titleStyle: {
      fontFamily: fonts.sfProDisplay.medium,
      fontSize: 15,
      textAlign: 'left'
    }
  });
};

export const showInfo = (message) => {
  showMessage({
    message,
    position: 'center',
    type: 'simple message',
    duration: 5000,
    color: 'white',
    style: {
      borderRadius: 8,
      marginHorizontal: 10,
      width: '80%'
    },
    titleStyle: {
      fontFamily: fonts.sfProDisplay.medium,
      fontSize: 15,
      textAlign: 'left'
    }
  });
};

export const showInfoSecond = (message) => {
  showMessage({
    message,
    position: 'top',
    type: 'simple message',
    duration: 500,
    color: 'white',
    style: {
      borderRadius: 8,
      marginHorizontal: 10,
      width: '80%'
    },
    titleStyle: {
      fontFamily: fonts.sfProDisplay.medium,
      fontSize: 15,
      textAlign: 'left'
    }
  });
};
