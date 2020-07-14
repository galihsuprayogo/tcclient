import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TabItem} from '../../atoms';
import {colors} from '../../../utils';

const BottomNavigator = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={ styles.container  }>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabItem
                        key={index.toString()}
                        title={label}
                        active={isFocused}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    />
                );
            })}
        </View>
    )
};

const styles = StyleSheet.create({
    container :{
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingVertical : 10,
        paddingHorizontal : 63,
        backgroundColor : colors.secondary
    }
});
export default BottomNavigator;
