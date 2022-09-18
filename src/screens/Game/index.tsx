
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { FlatList, TouchableOpacity, View , Text} from 'react-native';
import {Entypo } from '@expo/vector-icons';
import LogoImg from '../../assets/logo-nlw-esports.png';
import { THEME } from '../../theme';
import { Image } from 'react-native';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {

	const navigation = useNavigation();
  	const route = useRoute();
  	const game = route.params as GameParams;
    const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  	function handleGoBack() {
	navigation.goBack();
  }

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  useEffect(() =>{
    fetch(`http://26.141.147.28:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  }, []);

  async function getDiscordUser(adId: string) {
    fetch(`http://26.141.147.28:3333/ads/${adId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord))
  }

  return (
    <Background >

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />

          </TouchableOpacity>
            <Image 
              source={LogoImg}
              style={styles.logo}
            />
            <View style={styles.right}></View>
        </View>
		<Image
			source={{uri:game.bannerUrl}}
			style={styles.cover}
			resizeMode="cover"
		/>
        <Heading
          title= {game.title}
		  subtitle= "Connect and start playing!"
        />
        <FlatList
            data={duos}
            keyExtractor={item=> item.id}
            renderItem={({item}) => (
                <DuoCard   
                    data={item}
                    onConnect={()=> getDiscordUser(item.id) }
                />
            )}
            horizontal
            contentContainerStyle={[duos.length>0 ? styles.contentList : styles.emptyListContent ]}
            showsHorizontalScrollIndicator={false}
            style={styles.containerList}
            ListEmptyComponent={() => (
                <Text style={styles.emptyListText}>
                    There is no Ads for this game yet
                </Text>
            )}
        />
        <DuoMatch
            visible={discordDuoSelected.length > 0 }
            discord={discordDuoSelected}
            onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background >

  );
}