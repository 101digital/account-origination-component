import React, { useState, useRef, ReactNode } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');
interface Item {
  item: ReactNode;
}

export enum CarouselType {
  CARD = 'CARD',
  PAGE = 'PAGE',
}

interface ComponentProps {
  carouselList: Item[];
  containerStyle?: StyleProp<ViewStyle>;
  bulletContainerStyle?: StyleProp<ViewStyle>;
  bulletStyle?: StyleProp<ViewStyle>;
  type?: CarouselType;
  showBullets?:boolean;
}

export type CarouselProps = ComponentProps;

export const Carousel = (prop: CarouselProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const [interval, setInterval] = useState<number>(0);
  const { carouselList, containerStyle, bulletContainerStyle, bulletStyle, type,showBullets } = prop;

  const onPointerPress = (index: number) => {
    scrollRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {carouselList.length > 0 && (
        <ScrollView
          ref={scrollRef}
          style={styles.container}
          horizontal={true}
          decelerationRate={0}
          scrollEventThrottle={200}
          snapToInterval={width}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          onScroll={(data) => {
            setInterval(Math.round(data.nativeEvent.contentOffset.x / width));
          }}
        >
          {carouselList.map((obj: Item, k: number) => {
            return (
              <View
                key={k}
                style={
                  type === CarouselType.CARD
                    ? carouselList.length === k + 1
                      ? styles.cardContainerEnd
                      : k === 0
                      ? styles.cardContainerStart
                      : styles.cardContainer
                    : styles.page
                }
              >
                {obj.item}
              </View>
            );
          })}
        </ScrollView>
      )}
      {showBullets && carouselList.length > 0 && (
        <View style={[styles.bulletsWrapper, bulletContainerStyle]}>
          {carouselList.map((obj: Item, k: number) => {
            return (
              <TouchableOpacity
                key={k}
                style={[
                  styles.bulletsContent,
                  interval === k ? styles.activeBullet : styles.inActiveBullet,
                  bulletStyle,
                ]}
                onPress={() => onPointerPress(k)}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: width,
  },
  cardContainerStart: {
    marginLeft: 15,
  },
  cardContainer: {
    marginHorizontal: 7,
  },
  cardContainerEnd: {
    marginRight: 15,
  },
  bulletsWrapper: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bulletsContent: {
    width: 27,
    height: 8,
    borderRadius: 5,
    margin: 3,
  },
  activeBullet: {
    backgroundColor: '#f58007',
  },
  inActiveBullet: {
    backgroundColor: 'rgba(245, 128, 7, 0.3)',
  },
});

Carousel.defaultProps = {
  type: CarouselType.CARD,
  showBullets:true
};
