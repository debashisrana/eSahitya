import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Image,
    View,
    Dimensions,
    FlatList,
    Linking,
    StatusBar
} from 'react-native';
import {
    Text,
    Icon,
    Input,
    Button,
    Layout,
    Card,
    TopNavigation
} from '@ui-kitten/components';
const width = Dimensions.get('window').width / 2 - 30;
import { fetchRecords } from './commons/Services';
const APIURL = "http://192.168.29.50:5000/";
export const HomeScreen = ({ navigation }) => {
    // const [masterDataSource, setMasterDataSource] = useState(books);
    const [loading, setLoading] = useState(true);
    const [bookData, setBookData] = useState([]);
    const [cat, setCat] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState('');

    // const imgSource = { uri: APIURL + params.pdf };
    //call API 
    useEffect(() => {
        let componentMounted = true;
        fetchRecords('books')
            .then((json) => {
                if (json.length > 0 && componentMounted) {
                    // console.log(json);
                    setBookData(json);
                    setFilterData(json);

                }
            })
            .then(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            });

        return () => {
            componentMounted = false;
        };
    }, []);

    //category api
    useEffect(() => {
        let componentMounted = true;
        fetchRecords('categories')
            .then((json) => {
                if (json.length > 0 && componentMounted) {
                    // console.log(json);
                    setCat(json);
                }
            })
            .then(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            });
        return () => {
            componentMounted = false;
        };
    }, []);

    //search filter
    const searchBook = (text) => {
        if (text) {
            const newData = bookData.filter((item) => {
                const itemData = item.Book_Name
                    ? item.Book_Name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(text) > -1;
            });
            setFilterData(newData);
            setSearch(text);
        } else {
            setFilterData(bookData);
            setSearch(text);
        }
    }
    //search icon
    const SearchIcon = (props) => (
        <Icon name='search' {...props} />
    );
    //Filter by category operation
    const [categoryIndex, setCategoryIndex] = useState([0]);
    const [categoryName, setCategoryName] = useState('All');
    const categoryFilter = name => {
        if (name !== categoryName) {
            // alert('hi');
            setFilterData(bookData.filter(e => e.Category_Name === name));
        } else {
            setFilterData(bookData);
        }
        setCategoryName(name);
    }

    const CategoryList = () => {
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.categoryList}>
                {cat.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => categoryFilter(item.Category_Name)}
                    >

                        <View
                            style={{ backgroundColor: "#60f0a7", ...style.categorybtn }}
                        // style={{ backgroundColor: categoryIndex == index ? "#00cc66" : "#60f0a7", ...style.categorybtn }}
                        >
                            <View style={style.catbtnimg}>
                                <Text style={{ height: 25, width: 25, paddingLeft: 3 }}>{item.Icon}</Text>

                                {/* <Image source={item.img} style={{height:25,width:25,resizeMode:"cover"}}/> */}
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: 8, color: "#FFF" }}>
                                {item.Category_Name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        );
    };
    //function for renderItem
    const renderItem = ({ item, index }) => {
        // console.log(item.Audio_Url);
        const imgSource = { uri: APIURL + item.Image_Url };
        return (
            <TouchableOpacity
                activeOpacity={0.8}
            >
                <View key={index}>
                    <Card style={style.card}
                        onPress={() => navigation.navigate('Detail', {
                            screen: 'Pdf',
                            params: { name: item.Book_Name, img: item.Image_Url, about: item.Short_Desc, pdf: item.Book_Pdf, audio: item.Audio_Url }
                        }
                        )}
                    >
                        <ImageBackground source={imgSource} style={style.image}></ImageBackground>
                    </Card>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView
            style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "white" }}>
            {/* <TopNavigation title='MyApp' alignment='center'/> */}

            <View>
                <View>
                    <Text style={{
                        fontSize: 35,
                        //  color: "#00cc66",
                        color: "#16eab4",
                        fontWeight: 'bold'
                    }}>
                        e-Sahitya
                    </Text>
                </View>

            </View>
            <Layout style={style.inputContainer} level='1'>
                {/* <Icon  name="search" ></Icon> */}
                <Input
                    style={style.input}
                    type="text"
                    accessoryLeft={SearchIcon}
                    value={search}
                    placeholder="Search book"
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => searchBook(text)}
                />
            </Layout>
            <View>
                <CategoryList />
            </View>

            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}

                contentContainerStyle={{

                    marginTop: 10,
                    paddingBottom: 50,
                }}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                renderItem={renderItem}
                data={filterData}
                keyExtractor={(item) => '_' + item.id}
            />
        </SafeAreaView>
    );
}
const style = StyleSheet.create({
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchContainer: {
        height: 50,
        backgroundColor: "#F1F1F1",
        borderRadius: 21,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%"
    },

    card: {
        minHeight: 210,
        // backgroundColor: "#00cc66",
        width,
        marginHorizontal: 2,
        marginBottom: 20,
        color: "#FFF",
        elevation: 15
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 5
    },
    input: {
        flex: 1,
        margin: 10,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#effef6"
    },
    sortBtn: {
        marginLeft: 10,
        height: 40,
        width: 50,
        borderRadius: 10,
        backgroundColor: "#00B761",
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        minHeight: 210,
        ...StyleSheet.absoluteFill,


    },
    categoryList: {
        // padding: 30,
        alignItems: "center",
        marginBottom: 10
        // paddingHorizontal: 10
    },
    categorybtn: {
        height: 35,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: "center",
        paddingHorizontal: 5,
        flexDirection: "row",
        fontWeight: "bold"
    },
    catbtnimg: {
        height: 25,
        width: 25,
        fontWeight: "bold",
        backgroundColor: "#FFF",
        borderRadius: 30,
        justifyContent: "center",
        textAlign: "center"
    }
})