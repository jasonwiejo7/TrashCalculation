import React, { useState, useEffect, useReducer } from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet, Button, Pressable, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'

export default function DashboardScreen(){
    state = {
      // host: "http://192.168.2.59:5000"
      host: "http://192.168.1.2:5000"
        
    }

    const [volumeTPSG, setVolumeTPSG] = useState(50000)
    const [volumeTPSBS, setVolumeTPSBS] = useState(45000)
    const maxTPS = 100000
    const [TPS, setTPS] = useState(null)
    const [volume, setVolume] = useState(null)

    const persenGanesha = volumeTPSG/maxTPS*100
    const persenBS = volumeTPSBS/maxTPS*100

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(this.state.host + "/volume");
            const data = response.data
            setVolume(data.volume);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        const fetchString = async () => {
          try {
            const response1 = await axios.get(this.state.host + '/tps');
            setTPS(response1.data);
          } catch (error) {
            console.error('Error fetching string:', error);
          }
        };
    
        fetchString();
      }, []);
      
      const updatevolume = async() => {
        if (TPS == "TPS Ganesha") {
          const newvolume1 = volumeTPSG + volume
          setVolumeTPSG(newvolume1)
          setVolume(0)
        }

        else if (TPS == "TPS Babakan Siliwangi") {
          const newvolume2 = volumeTPSBS + volume
          setVolumeTPSBS(newvolume2)
          setVolume(0)
        }
      }
      
      return(
          <View style={styles.container}>
            <KeyboardAwareScrollView>
              <View style={styles.rectangle1}>
                <Text style={styles.textJudul1}>TPS Ganesha</Text>
                <View style={styles.circle}>
                  <Text style={styles.angka1}>{persenGanesha}%</Text>
                </View>
              </View>

              <View style={styles.rectangle2}>
                <Text style={styles.textJudul2}>TPS Babakan Siliwangi</Text>
                <View style={styles.circle}>
                  <Text style={styles.angka2}>{persenBS}%</Text>
                </View>
              </View>
              <View>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={updatevolume}>
                      <Text style={styles.buttonTitle}>Refresh</Text>
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
  textJudul1: {
    fontSize: 16,
    color: '#2e2e2d',
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 7,
    marginLeft: 105,
    marginRight: 10
  },
  textJudul2: {
    fontSize: 16,
    color: '#2e2e2d',
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 7,
    marginLeft: 70,
    marginRight: 10
  }, 
  rectangle1: {
    height: 200,
    width: 315,
    borderRadius: 25,
    backgroundColor: '#aaeee9',
    marginHorizontal: 25,
    marginTop: 60,
}, 
  rectangle2: {
    height: 200,
    width: 315,
    borderRadius: 25,
    backgroundColor: '#aaeee9',
    marginHorizontal: 25,
    marginTop: 60,
  }, 
  circle: {
    height: 120,
    width: 120,
    borderRadius: 180/2,
    backgroundColor: '#ffffff',
    marginHorizontal: 92,
    marginTop: 10,
}, 
  angka1: {
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 23,
    marginTop: 32
  }, angka2: {
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 23,
    marginTop: 32
  },button: {
    backgroundColor: '#AAEEE9',
    marginLeft: 100,
    marginRight: 40,
    marginTop: 40,
    height: 48,
    width: 150,
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