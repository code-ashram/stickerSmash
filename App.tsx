import {FC, useRef, useState} from 'react'
import {StyleSheet, Text, View, Image, Platform} from 'react-native'
import {captureRef} from 'react-native-view-shot';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StatusBar} from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import domToImage from 'dom-to-image'

import ImageViewer from './Components/ImageViewer/ImageViewer'
import Button from './Components/Button/Button'
import IconButton from './Components/IconButton/IconButton'
import CircleButton from './Components/CircleButton/CircleButton'
import EmojiPicker from "./Components/EmojiPicker"
import EmojiList from './Components/EmojiList'
import EmojiSticker from "./Components/EmojiSticker"

const PlaceholderImage = require('./assets/images/background-image.png')

const App: FC = () => {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)

  if (status === null) {
    requestPermission().then()
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!')
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const dataUrl = await domToImage.toJpeg(imageRef.current as unknown as Node, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a')
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl
        link.click()
      } catch (e) {
        console.log(e)
      }
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      alert('You did not select any image.')
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
        </View>

        {showAppOptions
          ? (<View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset}/>
              <CircleButton onPress={onAddSticker}/>
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
            </View>
          </View>)

          : (<View style={styles.footerContainer}>
            <Button label="Choose a photo" theme={'primary'} onPress={pickImageAsync}/>
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
          </View>)
        }

        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
        </EmojiPicker>
        <StatusBar style="auto"/>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})

export default App
