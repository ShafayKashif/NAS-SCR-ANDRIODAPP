import { View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { ActivityIndicator, Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3648',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading = ({navigation}) => {
  const handlePress = () => {
    navigation.navigate('Pg');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/Neubolt.png')}
        style={{alignItems: 'center', width: 300, height: 80, marginBottom: 30}}
      />
      <ActivityIndicator animating={true} color="#58AA42" size="large" />
      <TouchableWithoutFeedback onPress={handlePress}>
        <Button mode="contained">
          Go to Other Screen
        </Button>
      </TouchableWithoutFeedback>


    </View>
  );
};

export default Loading;