import { View, StyleSheet, Image, Text } from "react-native";
import { ActivityIndicator } from 'react-native-paper';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3648',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Pg = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Hi</Text>
      <ActivityIndicator animating={true} color="#58AA42" size="large" />
      <ActivityIndicator animating={true} color="#58AA42" size="large" />
      <ActivityIndicator animating={true} color="#58AA42" size="large" />
      <ActivityIndicator animating={true} color="#58AA42" size="large" />
    </View>
  );
};

export default Pg;