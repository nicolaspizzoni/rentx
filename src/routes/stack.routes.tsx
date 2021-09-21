import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
    return(
        <Navigator 
            headerMode="none"
            initialRouteName="Splash"
        >
            <Screen name="Splash" component={Splash}/>
            <Screen name="Home" component={Home} options={{gestureEnabled: false}}/>
            <Screen name="MyCars" component={MyCars}/>
            <Screen name="CarDetails" component={CarDetails}/>
            <Screen name="Scheduling" component={Scheduling}/>
            <Screen name="SchedulingDetails" component={SchedulingDetails}/>
            <Screen name="SchedulingComplete" component={SchedulingComplete}/>
        </Navigator>
    )
}