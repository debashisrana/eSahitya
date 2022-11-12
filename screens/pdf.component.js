import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, ProgressBarAndroidBase} from 'react-native';
import { Text, TopNavigation, TopNavigationAction, Icon, Spinner, Layout, ViewPager ,Button} from '@ui-kitten/components';
import Pdf from 'react-native-pdf';
const BackIcon = (props) => (
    <Icon {...props} name='arrow-ios-back' fill="#16eab4" />
);
const APIURL = "http://192.168.29.50:5000/";

const LoadingIndicator = () => (
    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Spinner size='large' status='success' />
        <Text style={{ color: "#60f0a7" }}>Opening...</Text>
    </View>
);

export const PdfScreen = ({ navigation, route }) => {
    // const source = require('../assets/pdf/Tavobanam.pdf');
    const { params } = route.params;
    // console.log(params.pdf);

    const pdfSource = { uri: APIURL + params.pdf };
    const navigateBack = () => {
        navigation.goBack();
    };
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const pageView = (page) => {
        console.log(page);
        <View style={{ backgroundColor: "red", zIndex: 1, marginTop: 100 }}>
            {/* <ViewPager
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <Layout
                    style={style.tab}
                    level='2'>
                    <Text category='h5'>Page no.{page}</Text>
                </Layout>
            </ViewPager> */}
            <Text style={{color:"red",fontSize:30}}>Page{page}</Text>
        </View>
    };
const loading=()=>(<View>
    <ProgressBarAndroidBase />
</View>);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation alignment='center' accessoryLeft={BackAction} style={{ position: "absolute", zIndex: 1, backgroundColor: "rgba(0,0,0,0)" }} />
           
            <View style={style.container}>
                <Text style={{ fontWeight: 'bold', color: "#60f0a7", fontSize: 18 }}>{params.name}</Text>
                <Pdf
                    source={pdfSource}
                    horizontal
                    enablePaging
                    fitWidth
                    renderActivityIndicator={LoadingIndicator}
                    onLoadProgress={loading}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    // onPageChanged={(page, numberOfPages) => {
                    //     console.log(`Current page: ${page}`);

                    // }}
                    onPageChanged={(page, numberOfPages) => pageView(page)}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={style.pdf}

                />
            </View>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 28,

    },
    pdf: {
        flex: 1,
        zIndex: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: "center",
        borderTopColor: '#60f0a7',
        borderBottomColor: '#60f0a7',
        borderRightColor: '#00cc66',
        borderStartColor: '#00cc66',
        borderEndColor: '#00cc66',
        borderRadius: 5,
        borderWidth: 3,
        marginTop: 15,
        backgroundColor: "#FFF"

    },
    tab: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    }
});