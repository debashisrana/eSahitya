import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Dimensions, View, TouchableOpacity, Image } from 'react-native';
import { Text, TopNavigation, TopNavigationAction, Icon, Button, Layout } from '@ui-kitten/components';
// import Logo from '../assets/media/logo.png';
import Slider from 'react-native-slider';
const APIURL = "http://192.168.29.50:5000/";

export const AudioScreen = ({ navigation, route }) => {
    const { params } = route.params;
    const imgSource = { uri: APIURL + params.img };
    console.log(params.img);
    const BackIcon = (props) => (
        <Icon {...props} name='arrow-ios-back' fill="#16eab4" />
    );
    const navigateBack = () => {
        navigation.goBack();
    };
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );
    const ForwordIcon = (props) => <Icon {...props} name="skip-forward-outline" fill='#009999' style={styles.icon1} />;
    const playIcon = (props) => <Icon {...props} name="play-circle-outline" fill='#009999' style={styles.icon} />;
    const preIcon = (props) => <Icon {...props} name="skip-back-outline" fill='#009999' style={styles.icon2} />;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TopNavigation alignment='center' accessoryLeft={BackAction} style={{ position: "absolute", color: "black", backgroundColor: "rgba(0,0,0,0)", zIndex: 1, fontWeight: 17, fontSize: 17 }} />
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.imagewapeer}>
                    <Image source={imgSource} style={styles.img} />
                </View>
                <View>
                    <Text style={styles.songtitle}>{params.name}</Text>
                </View>
                <View>
                    <Slider
                        style={styles.progressContainer}
                        value={10}
                        minimumValue={0}
                        maximumValue={100}
                        thumbTintColor="#FFD3369"
                        minimumTrackTintColor="#FFF"
                        maximumTrackTintColor="#CCC"
                        onSlidingComplete={() => { }}
                    />
                    <View>
                        <Layout style={styles.layout} level='1'>
                            <TouchableOpacity>                           
                             <Button
                                size='small'
                                accessoryLeft={preIcon}
                                appearance='ghost'
                                status="primary"
                            ></Button>
                            </TouchableOpacity>
                            
                            <Button
                                size='giant'
                                accessoryLeft={playIcon}
                                appearance='ghost'
                                status="primary"
                            ></Button>
                            <Button
                                size='small'
                                accessoryLeft={ForwordIcon}
                                appearance='ghost'
                                status="primary"
                            ></Button>
                        </Layout>
                    </View>
                    {/* <View style={styles.progressLabelContainer}>
                        <Text style={styles.progressLabelTxt}>0.00</Text>
                        <Text style={styles.progressLabelTxt}>0.35</Text>
                    </View> */}
                    {/* <View style={styles.musicContainer}>
                        <TouchableOpacity>
                            <Icon name='arrow-back' size={35} color="#FFD369" />
                        </TouchableOpacity>
                    </View>  */}
                </View>
            </View>

        </SafeAreaView>

    )
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray"
    },
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    imagewapeer: {
        width: 200,
        height: 240,
        // marginBottom:25,
        elevation: 5
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    songtitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: "center",
        color: "#FFF"
    },
    // progressContainer: {
    //     width: 350,
    //     height: 40,
    //     marginTop: 25,
    //     flexDirection: 'row'
    // },
    // progressLabelContainer: {
    //     width: 340,
    //     flexDirection: 'row',
    //     justifyContent: "space-between"
    // },
    // progressLabelTxt: {
    //     color: "#FFF"
    // },
    // musicContainer:{
    //     flexDirection:'row',
    //     width:'600',
    //     justifyContent:'space-between',
    //     marginTop:15
    // }
    icon: {
        height: 200,
        width: 100
    },
    icon1: {
        height: 100,
        width: 50,
        marginBottom: 50
    },
    icon2: {
        height: 100,
        width: 50,
        marginBottom: 50
    },
    layout: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        // justifyContent:"flex-end",
        backgroundColor: "rgba(0,0,0,0)",
    }
});