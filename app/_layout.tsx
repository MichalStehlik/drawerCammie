import React from 'react';
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DrawerLayout = () => {  
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer>
                <Drawer.Screen name="index" options={{
                    drawerLabel: 'Home',
                    title: 'Domácí stránka',
                    drawerIcon: ({focused, color, size}) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}/>
                <Drawer.Screen name="Pictures/Images" options={{
                    drawerLabel: 'Images',
                    title: 'Obrázky',
                    drawerIcon: ({focused, color, size}) => (
                        <Ionicons name="images" size={size} color={color} />
                    ),
                }}/>
                <Drawer.Screen name="Pictures/CameraDisplay" options={{
                    drawerLabel: 'Camera',
                    title: 'Kamera',
                    drawerIcon: ({focused, color, size}) => (
                        <Ionicons name="camera" size={size} color={color} />
                    ),
                }}/>
                <Drawer.Screen name="settings" options={{
                    drawerLabel: 'Settings',
                    title: 'Nastavení',
                    drawerIcon: ({focused, color, size}) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}/>
            </Drawer>
        </GestureHandlerRootView>
    );
}

export default DrawerLayout;