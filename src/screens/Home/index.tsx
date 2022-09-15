
import {  Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import LogoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { GameCardProps, GamingCard } from '../../components/GamingCard';
import { Background } from '../../components/Background';
import { SafeAreaView } from 'react-native-safe-area-context';




export function Home() {

	const [games, setGames] = useState<GameCardProps[]>([])
  
  const navigation = useNavigation();

  useEffect(() =>{
    fetch('http://26.141.147.28:3333/games')
    .then(response => response.json())
    .then(data => setGames(data))
  }, []);

  function handleOpenGame({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', {id, title, bannerUrl})
  }

  return (
    <Background >

    <SafeAreaView style={styles.container}>
      <Image 
        source={LogoImg}
        style={styles.logo}
      />
      <Heading
        title="Find your Duo"
        subtitle="Select the game you want to play"
      />

      <FlatList 
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item }) => (
            <GamingCard 
                    data={item}
                    onPress={() => handleOpenGame(item)}
            />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </SafeAreaView>
    </Background >

  );
}