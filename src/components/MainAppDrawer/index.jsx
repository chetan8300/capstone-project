import { useState, useEffect } from 'react';
import { Image, ImageBackground, Text } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const MainAppDrawer = (props) => {
  const [userName, setUserName] = useState("asds");

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          // We have data!!
          setUserName(value)
        } else {
          setUserName('')
        }
      } catch (error) {
        // Error retrieving data
        setUserName('')
      }
    })()
  }, [])

  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground
        source={require('../../../assets/splash.png')}
        style={{ padding: 20, marginBottom: 20 }}
      >
        <Image
          source={require('../../../assets/icon.png')}
          style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
        />
        <Text style={{ color: '#000', fontSize: 18 }}>{userName}</Text>
      </ImageBackground>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

export default MainAppDrawer