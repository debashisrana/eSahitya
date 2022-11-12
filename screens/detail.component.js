import React from 'react';
import { SafeAreaView, View, Image, StyleSheet, Dimensions, StatusBar, ImageBackground, } from 'react-native';
import { Text, Icon, Divider, TopNavigation, TopNavigationAction, Button, Layout } from '@ui-kitten/components';
// import { greaterThan } from 'react-native-reanimated';
import { AudioPlayer } from './audioplayer.component';
const BackIcon = (props) => (
    <Icon {...props} name='arrow-ios-back' fill="#16eab4" />
);
const PdfIcon = (props) => <Icon {...props} name="file-text-outline" fill='#e60000' style={style.icon} />;
const AudioIcon = (props) => <Icon {...props} name="music-outline" fill='#33cc33' style={style.icon} />;
const APIURL = "http://192.168.29.50:5000/";

export const DetailScreen = ({ navigation, route }) => {
    const { params, screen } = route.params;
    // console.log(params.audio);
    const imgSource = { uri: APIURL + params.img };
    const audioSource = APIURL + params.audio;
    const navigateBack = () => {
        navigation.goBack();
    };
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <TopNavigation alignment='center' accessoryLeft={BackAction} style={{ position: "absolute", color: "black", backgroundColor: "rgba(0,0,0,0)", zIndex: 1, fontWeight: 17, fontSize: 17 }} />
            </View>
            <ImageBackground style={style.headerimg} source={imgSource}></ImageBackground>
            {/* <View style={style.imageContainer}>
                <Image source={imgSource} />
            </View> */}
            <View style={style.detailsContainer}>

                <View
                    style={{
                        marginLeft: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        {params.name}
                    </Text>

                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>About</Text>
                    <Text
                        style={{
                            color: 'gray',
                            fontSize: 16,
                            lineHeight: 22,
                            marginTop: 10,
                        }}>
                        {params.about}
                    </Text>

                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>


                        <View style={style.dwnBtn}>
                            <Layout style={style.layout} level='1'>
                                {params.pdf ?
                                    <Button
                                        onPress={() => {
                                            navigation.navigate('Pdf',
                                                { params: { pdf: params.pdf, name: params.name } }
                                            );
                                        }}
                                        size='giant'
                                        status='success'
                                        accessoryLeft={PdfIcon}
                                        appearance='ghost'
                                    // appearance='outline'
                                    />
                                    : <Text> </Text>}

                                <Button
                                    onPress={() => {
                                        navigation.navigate('Audio',
                                            { params: { img: params.img, name: params.name } }
                                        );
                                    }}
                                    size='giant'
                                    // status='success'
                                    accessoryLeft={AudioIcon}
                                    appearance='ghost'
                                    // appearance='outline'
                                    status="primary"
                                    style={style.btn}
                                />
                                {params.audio &&
                                    <AudioPlayer
                                        audioFile={audioSource} />
                                }

                            </Layout>
                        </View>
                    </View>
                </View>

            </View>
            {/* </ImageBackground> */}
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1
    },
    imageContainer: {
        flex: 0.45,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // zIndex: 1,
        // overflow:"hidden"

    },
    detailsContainer: {
        flex: 0.55,
        backgroundColor: "#F1F1F1",
        marginHorizontal: 7,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 20,
        paddingTop: 30,
    },
    line: {
        width: 25,
        height: 2,
        backgroundColor: "blue",
        marginBottom: 5,
        marginRight: 3,
    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
    },
    borderBtnText: { fontWeight: 'bold', fontSize: 28 },
    dwnBtn: {
        width: 90,
        height: 30,
        backgroundColor: "rgba(0,0,0,0)",
        justifyContent: 'center',
        alignItems: 'flex-end',
        // borderRadius: 30
    },
    layout: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        // justifyContent:"flex-end",
        backgroundColor: "rgba(0,0,0,0)",


    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    headerimg: {
        flex: 0.55,
        height: 400,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        overflow: "hidden"
    },
    icon: {
        height: 50,
        width: 30,

    },
    btn: {
        alignItems: "flex-end"
    }
});