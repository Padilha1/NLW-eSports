
import { View, Image, FlatList } from 'react-native';

import { styles } from './styles';
import LogoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GamingCard } from '../../components/GamingCard';
import { GAMES } from '../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
      <Image 
        source={LogoImg}
        style={styles.logo}
      />
      <Heading
        title="Find your Duo"
        subtitle="Select the game you want to play"
      />

      <FlatList 
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={({item }) => (
            <GamingCard 
                    data={item}
            />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}