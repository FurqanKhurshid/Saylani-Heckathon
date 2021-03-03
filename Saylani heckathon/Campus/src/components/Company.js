import React, { useState, useEffect } from 'react';
// import Modal from 'react-native-modal';
import firebase from 'firebase'



import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    Alert,
    Pressable,
    Modal,
    TouchableHighlight,
    TextInput,
    FlatList,

} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import { useEffect } from 'react';


function company(props) {
    // const [modalVisible, setModalVisible] = useState(false);
    const clickHandler = () => {
        //function to handle click on floating Action Button
        alert('Floating Button Clicked');
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [companyName, setcompanyName] = useState('')
    const [jobTitle, setjobTitle] = useState('')
    const [qualification, setQualification] = useState('')
    const [experience, setExperience] = useState('')
    const [companyDetail, setcompanyDetail] = useState('')
    const [documentId,setdocumentId] = useState('')

    useEffect(() => {
        getCompanyDetail()
        console.log('yedetil...)', companyDetail)
    }, [companyDetail])

    // const [isModalVisible, setModalVisible] = useState(false);




    // const toggleModal = () => {
    //     setModalVisible(!isModalVisible);
    // };

    const saveCompanyDetail = async () => {

        var docid = documentId
        await firebase.firestore().collection('companyDetail').add({
            companyName, jobTitle, qualification, experience,docid
        }).then(() => {
            Alert.alert('Company Detail save successfully')
        }).catch(function (error) {
            Alert.alert(error)

        })




    }

    const getCompanyDetail = async () => {
        var detail = []

        await firebase.firestore().collection('companyDetail').get().then(function (snaps) {
            snaps.forEach((doc) => {
                console.log('doc--->', doc.data())
                detail.push({ ...doc.data(),documentId:doc.id })
                console.log('detail--->', detail)



            })
            setcompanyDetail(detail)

            console.log('alldetail****', companyDetail)

        }).catch(function (error) {
            Alert.alert(error)

        })




    }

    return (

        <ScrollView>

        <SafeAreaView style={styles.container}>

            <View >
                {/* <Text style={styles.titleStyle}>
        Example of React Native Floating Action Button
      </Text>
      <Text style={styles.textStyle}>
        Click on Action Button to see Alert
      </Text> */}
                {/* <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={toggleModal}
                    style={styles.touchableOpacityStyle}>
                    <Image
                        //We are making FAB using TouchableOpacity with an image
                        //We are using online image here
                        source={{
                            uri:
                                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                        }}
                        //You can use you project image Example below
                        //source={require('./images/float-add-icon.png')}
                        style={styles.floatingButtonStyle}
                    />
                </TouchableOpacity> */}
               
                <Text style={{ marginLeft:'25%',fontSize:20,fontWeight:'bold',fontFamily:'serif' }}>Company Detail</Text>

                    <FlatList
                        data={companyDetail}
                        // style={{display:'flex',alignItems:'center'}}
                        keyExtractor={elem => elem.companyName}
                        renderItem={elem => (<View style={styles.middle}>
                            <Text><Text style={{ fontSize: 15, fontWeight: 'bold', color: 'purple' }}>Company Name:</Text><Text style={{ fontSize: 15, color: 'green' }}> {elem.item.companyName}</Text></Text>
                            <Text><Text style={{ fontSize: 15, fontWeight: 'bold', color: 'purple' }}>Job Title:</Text><Text style={{ fontSize: 15, color: 'green' }}> {elem.item.jobTitle}</Text></Text>
                            <Text><Text style={{ fontSize: 15, fontWeight: 'bold', color: 'purple' }}>Qualification:</Text><Text style={{ fontSize: 15, color: 'green' }}> {elem.item.qualification}</Text></Text>
                            <Text><Text style={{ fontSize: 15, fontWeight: 'bold', color: 'purple' }}>Experience:</Text><Text style={{ fontSize: 15, color: 'green' }}> {elem.item.experience}</Text></Text>


                            {/* <Text><Title>Phone No: </Title><Title style={{ color: 'purple' }}>{elem.item.number}</Title></Text>
                        <Text><Title>Blood Group: </Title><Title style={styles.top}>{elem.item.bloodGroup}</Title></Text>

                        <Text><Title>Health: </Title><Title style={{ color: 'purple' }}>{elem.item.Health}</Title></Text> */}
                            {/* <Text><Title>tokenId: </Title><Title style={{ color: 'purple' }}>{elem.item.tokenId}</Title></Text> */}

                            {/* <Button title={`Chat with ${elem.item.name}`} onPress={() => navigateToChat(elem.item.fbid)} /> */}

                        </View>)}
                    />



            </View>
            <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}

                >
                    <Image

                        source={{
                            uri:
                                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                        }}

                        style={styles.floatingButtonStyle} />
                        {/* <Text>Add Company Detail</Text> */}
                </Pressable>





            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Company Detail!</Text>
                            <TextInput
                                placeholder='Company Name'
                                style={{ fontSize: 20 }}
                                onChangeText={(companyName) => setcompanyName(companyName)}


                            />
                            <TextInput
                                placeholder='Job Title'
                                style={{ fontSize: 20, margin: 20 }}
                                onChangeText={(jobTitle) => setjobTitle(jobTitle)}



                            />
                            <TextInput
                                placeholder='Qualification'
                                style={{ fontSize: 20, margin: 20 }}
                                onChangeText={(qualification) => setQualification(qualification)}



                            />
                            <TextInput
                                placeholder='Experience'
                                style={{ fontSize: 20 }}
                                onChangeText={(experience) => setExperience(experience)}



                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >

                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} >
                                <Text style={styles.loginText} onPress={saveCompanyDetail}>Save</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                {/* <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable> */}


            </View>




















        </SafeAreaView>
        </ScrollView>


    );

}
export default company;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    titleStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        // width: 50,
        height: 50,
        //   marginTop:500
        //backgroundColor:'black'
    },
    // centeredView: {
    //     flex: 1,
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     marginTop: 22,
    // },
    // modalView: {
    //     // margin: 20,
    //     backgroundColor: 'white',
    //     borderRadius: 20,
    //     padding: 100,
    //     alignItems: 'center',
    //     shadowColor: '#000',
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 20,
    // },
    // openButton: {
    //     backgroundColor: '#F194FF',
    //     borderRadius: 20,
    //     padding: 10,
    //     elevation: 2,
    // },
    // textStyle: {
    //     color: 'white',
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    // },
    // modalText: {
    //     height: 45,
    //     width: 50,
    //     borderBottomColor: 'red',



    //     marginBottom: 15,
    //     textAlign: 'center',
    // },
    // inputs: {
    //     height: 45,
    //     marginLeft: 10,
    //     borderRadius: 20,
    //     flex: 1,
    // },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginLeft: 280,
        // marginTop: 100
    },
    buttonOpen: {
        backgroundColor: "gray",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        width: 50,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 30

    },
    buttonContainer: {



        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
        width: 170,
        borderRadius: 12,
        marginTop: 20
    },
    loginButton: {

        backgroundColor: "#166FE5",

    },
    loginText: {
        color: 'white',
    },
    middle: {
        flex: 0.3,
        backgroundColor: "#e9ebee",
        borderWidth: 5,
        marginBottom: 10,
        borderRadius: 20,
        borderColor: '#23978b',
        alignItems: 'center',
        color: 'white'
    },

});

