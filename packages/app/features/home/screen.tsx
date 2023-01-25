import React, { useState, useEffect, useRef } from 'react'
import { FlatList, I18nManager } from 'react-native'
import { H1, YStack, useTheme, Button, Input } from '@my/ui'
import { ListItem } from './ListItem'
import data from './data.json'
import arData from './ar-data.json'

class List extends React.Component {
  flatListRef: FlatList

  scrollToItem = (item) => {
    setTimeout(() => {
      ;(this.flatListRef as FlatList).scrollToIndex({ index: item - 1, animated: true })
    }, 100)
  }

  scrollToIndexFailed(error) {
    console.log(error)
    const offset = error.averageItemLength * error.index
    this.flatListRef.scrollToOffset({ offset })
    setTimeout(() => this.flatListRef.scrollToIndex({ index: error.index }), 100) // You may choose to skip this line if the above typically works well because your average item height is accurate.
  }

  render() {
    const { lang } = this.props

    return (
      <FlatList
        ref={(ref) => (this.flatListRef = ref)}
        data={Array(20)
          .fill(lang == 'ar' ? arData : data)
          .flat()}
        onScrollToIndexFailed={this.scrollToIndexFailed.bind(this)}
        renderItem={({ item, index }) => <ListItem index={index} item={item} />}
        style={{}}
      />
    )
  }
}

export function HomeScreen() {
  const theme = useTheme()
  const ref = useRef(null)

  const [lang, setLang] = useState('en')
  const [index, setIndex] = useState(null)

  useEffect(() => {
    I18nManager.forceRTL(lang == 'ar')
  }, [lang])

  const scrollToItem = () => {
    ref.current.scrollToItem(Number(index))
  }

  return (
    <YStack
      maxHeight="100vh"
      direction={lang == 'ar' ? 'rtl' : 'ltr'}
      f={1}
      backgroundColor="$background"
      p="$4"
    >
      <Button
        onPress={() => {
          setLang(lang == 'en' ? 'ar' : 'en')
        }}
      >
        {lang}
      </Button>

      <Input width="$10" alignSelf="center" value={index} onChangeText={setIndex} />
      <Button onPress={scrollToItem}>Scroll To</Button>

      <List ref={ref} />
    </YStack>
  )
}
