import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import openMap from 'react-native-open-maps';
import React from 'react'

const PollingPlaceButton = (passedUserInfo) => {

    const { userInfo } = passedUserInfo
    return (
        <TouchableOpacity style={styles.pollingLocationButton} onPress={() => openMap({ query: userInfo.currentPollingPlace.name })}>
            <View style={styles.pollingPlaceInfo}>
                <Text style={{ fontSize: 18, fontWeight: '900', paddingBottom: 5 }}>{userInfo.currentPollingPlace.name}</Text>
                <Text style={{ fontSize: 14, fontWeight: '700', color: 'grey' }}>{userInfo.currentPollingPlace.street}</Text>
                <Text style={{ fontSize: 14, fontWeight: '700', color: 'grey' }}>{userInfo.currentPollingPlace.city}, {userInfo.currentPollingPlace.state} {userInfo.currentPollingPlace.zipCode}</Text>
            </View>
            <MapView
                initialRegion={{
                    latitude: userInfo.currentPollingPlace.location._lat,
                    longitude: userInfo.currentPollingPlace.location._long,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.015
                }}
                scrollEnabled={false}
                style={{ width: '37%', height: 100, paddingLeft: 40 }}
            >
                <Marker coordinate={{ latitude: userInfo.currentPollingPlace.location._lat, longitude: userInfo.currentPollingPlace.location._long }}></Marker>
            </MapView>
        </TouchableOpacity>
    )
}

export default PollingPlaceButton

const styles = StyleSheet.create({
    pollingLocationButton: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        flexDirection: 'row',
        borderRadius: 15,
        overflow: 'hidden',
        marginLeft: 30,
        marginRight: 10,
        marginTop: 10,
        width: '80%'
    },
    pollingPlaceInfo: {
        backgroundColor: 'white',
        shadowColor: 'white',
        shadowOpacity: 1,
        shadowOffset: {
            height: 0,
            width: 15
        },
        shadowRadius: 5,
        zIndex: 2,
        width: '60%',
        paddingRight: 10,
        marginLeft: 20,
        justifyContent: 'center'
    }
})