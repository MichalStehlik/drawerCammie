import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

const CameraDisplay = () => { 
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const cameraRef = useRef<Camera | null>(null);

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const onCameraReady = () => {
        setIsCameraReady(true);
    }

    const takePicture = async () => {
        if (cameraRef.current && isCameraReady) {
          const options = { quality: 0.5, base64: true, skipProcessing: true };
          const data = await cameraRef.current.takePictureAsync(options);
          const source = data.uri;
          if (source) {
            await cameraRef.current.pausePreview();
            console.log("picture source", source);
          }
        }
    };
    if (!permission) {
        return (
            <View style={styles.container}>
                <Text>Buď nemáte kameru, nebo ji nemáte povolenou.</Text>
                <Button title="Povolit" onPress={()=>{requestPermission()}} />
            </View>
        );
    }
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>Přístup k fotoaparátu nemáte schválený.</Text>
            </View>
        );
    }
    if (!isCameraReady) {
        return (
            <View style={styles.container}>
                <Text>Načítám kameru...</Text>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Camera
            style={styles.camera} 
            type={type} 
            ref={cameraRef} 
            onCameraReady={onCameraReady} 
            onMountError={(error) => {
                console.log("camera error", error);
            }}>
                <Button title="Přepnout kameru" onPress={toggleCameraType}  />
                <Button title="Vyfotit" onPress={takePicture} />
            </Camera>
        </View>
    );
}

export default CameraDisplay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff0000',
    },
    camera: {
        width: 300,
        height: 300,
    },
});