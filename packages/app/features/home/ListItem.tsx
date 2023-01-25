import React from 'react'
import { Pressable } from 'react-native'
import { styled } from '@tamagui/core'
import { Card, SizableText, useTheme } from '@my/ui'

export const ItemTextNode = styled(Pressable, {
  name: 'ItemTextNode',
  ai: 'center',
  px: '$1',
  hoverStyle: {
    backgroundColor: '$hoverColor',
    borderRadius: '$1',
  },
})
export function ListItem({ item, index }) {
  const theme = useTheme()

  const { sections } = item

  return (
    <Card fd="row" fw="wrap" bg={theme.cardBackground} br={0} px="$5" py="$1.5" my="$2">
      {sections.map(({ heading, value }, index) => (
        <ItemTextNode key={index + heading}>
          <SizableText size="$2">{heading}</SizableText>
          <SizableText size="$5">{value}</SizableText>
        </ItemTextNode>
      ))}
      <SizableText ml="auto" size="$5">Item: {index + 1}</SizableText>
    </Card>
  )
}
