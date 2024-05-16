import { StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { FC } from 'react'

type Props = {
  placeholderImageSource: ImageSourcePropType
  selectedImage: string | null
}

const ImageViewer: FC<Props> = ({ placeholderImageSource, selectedImage }) => {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource

  return <Image source={imageSource} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  }
})

export default ImageViewer
