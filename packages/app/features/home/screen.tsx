import React from 'react'
import { FlatList } from 'react-native'
import { H1, YStack, useTheme } from '@my/ui'
import { ListItem } from './ListItem'
import data from './data.json';

const records = Array(50).fill(data).flat();

export function HomeScreen() {
  const theme = useTheme();

  return (
    <YStack f={1} backgroundColor="$background" p="$4">
      <YStack space="$4">
        <FlatList data={records} renderItem={({ item }) => <ListItem item={item} />} />
      </YStack>
    </YStack>
  )
}
