import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios'

export default function HasilTumpukanScreen( {navigation} ) {
    state = {
      // host: "http://192.168.2.59:5000"
      host: "http://192.168.1.2:5000"
        
    }

    const [value, setValue] = useState(null)
    const [image, setImage] = useState(null)
    const [TPS, setTPS] = useState("")

    const tps = [{key: '1', value:'TPS Ganesha'}, {key: '2', value:'TPS Babakan Siliwangi'}];

    const sendData = async (total, TPS) => {
      try {
        const response2 = await axios.post(this.state.host + '/hasil', {total, TPS})
        console.log(response2.data)
      } catch (error){
        console.error(error);
      }
    }

    useEffect(() => {
        const fetchString = async () => {
          try {
            const response1 = await axios.get(this.state.host + '/value');
            setValue(response1.data);
          } catch (error) {
            console.error('Error fetching string:', error);
          }
        };
    
        fetchString();
      }, []);

      useEffect(() => {
        const fetchImageUri = async () => {
          try {
            const response = await axios.get(this.state.host + '/image');
            setImage(response.data.image_uri);
          } catch (error) {
            console.error('Error fetching image URI:', error);
          }
        };
    
        fetchImageUri();
      }, []);
    
    const calculateResult = async () => {
      if (!TPS) {
        alert("Harap pilih TPS terlebih dahulu.")
      }

      else {
        const total = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
        alert('Perkiraan jumlah volume sampah adalah sebesar ' + total + ' gram')
        await new Promise(resolve => setTimeout(resolve, 1000))
        sendData(total, TPS)
        navigation.navigate('Root', { screen: 'Informasi TPS' })
      }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <Image style={styles.logo} source={{uri:image}}></Image>
                <Text style={styles.textJudul}>Sampah yang terdeteksi adalah {value} Sampah</Text>
                <Text style={styles.textJudul}>Lokasi TPS</Text>
                <View style = {{paddingHorizontal:40,paddingRight: 40,flex:1}}>
                  <SelectList data={tps} setSelected={setTPS} save="value" defaultOption="Pilih TPS"></SelectList>
                </View>
                {/* <Text style={styles.textJudul}>Perkiraan volume sampah adalah sekitar {randomNumber} gram</Text> */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={calculateResult}>
                    <Text style={styles.buttonTitle}>Kirim</Text>
                  </TouchableOpacity>
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
    logo: {
      flex: 1,
      height: 300,
      width: 300,
      alignSelf: "center",
      marginTop: 30,
      marginBottom: 20,
  },
    textJudul: {
      fontSize: 16,
      color: '#2e2e2d',
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 7,
      marginLeft: 20,
      marginRight: 10
    },
    input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: '#F5F5F5',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20,
      paddingLeft: 16
    },
    button: {
      backgroundColor: '#AAEEE9',
      marginLeft: 40,
      marginRight: 40,
      marginTop: 20,
      marginBottom: 35,
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

})