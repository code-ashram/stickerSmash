import { Pressable, StyleSheet, Text } from 'react-native'
import React, { Component, FC, ReactNode } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap
  label: ReactNode
  onPress: () => void
}

const IconButton: FC<Props> = ({ icon, label, onPress }) => {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12
  }
})

export default IconButton
