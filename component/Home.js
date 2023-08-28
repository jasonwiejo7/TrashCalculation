import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function HomeScreen ( {navigation} ) {
    state = {
        // host: "http://192.168.2.59:5000"
        host: "http://192.168.1.2:5000"
        
    }

    const [takenImage, setImage] = useState(null);
    const [value, setValue] = useState(null)

    takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
          base64: false,
        });

        if (!result.canceled){
            setImage(result.assets[0].uri);
        }
    }

    const submitPicture = async () => {
        if (takenImage){
            const formData = new FormData()
            const opts = {
                uri: takenImage,
                type: "image/jpeg",
                name: 'test.jpg'
            }
            formData.append("photo", opts)
            
            try {
                const response = await fetch(this.state.host + "/images", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                      },
            })

            const response1 = await axios.get(this.state.host + '/value');
            setValue(response1.data)
            
            if (value === "None") {
                alert("Gagal mengidentifikasi sampah. Harap ambil gambar kembali.")
            }
            else if (value === "Tumpukan") {
                navigation.navigate("HasilTumpukanScreen")
            }
            else {
                navigation.navigate("HasilScreen")
            }
        } 
            catch (error) {
                console.log('Error:', error);
              }

        }
        else{
            alert("Harap ambil gambar terlebih dahulu.")
        }
    }

    let imagePreview=<Text style={styles.previewText}>No image taken yet.</Text>

    if (takenImage){
        imagePreview=<Image source={{ uri: takenImage}} style={styles.imageStyle}/>
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <Image
                    style={styles.logo}
                    source={require('../assets/LogoSetorSampah.png')}></Image>
                <Text style={styles.title}>Hitung Volume Sampah</Text>

                <View style={styles.row}>
                    <Text style={styles.textJudul1}>Silahkan ambil gambar sampah</Text>
                    <Text style={styles.asterix}>*</Text>
                </View>

                <Pressable onPress={takePicture}>
                <Image 
                style={styles.iconCamera}
                
                source={require('../assets/iconCamera.png')} ></Image>
                </Pressable>
                <Text style={styles.textJudul2}>Berikut ini adalah preview gambar yang telah diambil:</Text>
                <View>
                    {imagePreview}
                </View>

                <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={submitPicture}>
                    <Text style={styles.buttonTitle}>Identifikasi</Text>
                </TouchableOpacity>
                </View>
                
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FEFD',
        justifyContent: 'center'
    },

    title: {
        alignSelf: "center",
        fontSize: 24,
        fontWeight: "bold",
      },

    logo: {
        flex: 1,
        height: 100,
        width: 100,
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 20,
    },

    textJudul1: {
        fontSize: 16,
        color: '#2e2e2d',
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 0,
        marginLeft: 10
    },

    textJudul2: {
        fontSize: 16,
        color: '#2e2e2d',
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },

    asterix: {
        fontSize: 16,
        color: '#EF5DA8',
        fontWeight: "bold",
        marginTop: 22,
        marginRight: 110
    },
    
    row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between'},

    iconCamera: {
        flex: 1,
        height: 100,
        width: 100,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 0,
    },
    previewText:{
        alignSelf : "center",
        marginBottom: 20,
    },
    imageStyle:{
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 20
        },
    button: {
        backgroundColor: '#AAEEE9',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: '#000000',
        fontSize: 16,
        fontWeight: "bold"
    },  
    iconCamera: {
        flex: 1,
        height: 100,
        width: 100,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20,
    },
})

