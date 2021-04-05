import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { colors } from '../../../utils';

const Dialog = () => (

<View style={styles.container}>
          <Swiper
            showsPagination
            showsButtons
            loop={false}
            dot={(<View style={styles.dot} />)}
            activeDot={(<View style={styles.activeDot} />)}
            nextButton={(<Text> Next </Text>)}
            prevButton={(<Text> Prev </Text>)}
            buttonWrapperStyle={styles.buttonWrapper}
          >
                    <View style={styles.contentWrapper}>
                              <Text> Page 1</Text>
                    </View>
                    <View style={styles.contentWrapper}>
                              <Text> Page 2</Text>
                    </View>
                    <View style={styles.contentWrapper}>
                              <Text> Page 3</Text>
                    </View>
          </Swiper>
</View>

);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  contentWrapper: {
    alignItems: 'center',
  },
  dot: {
    backgroundColor: colors.secondary,
    width: 7,
    height: 7,
    borderRadius: 20,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 20,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 9,
    height: 9,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});

export default Dialog;
