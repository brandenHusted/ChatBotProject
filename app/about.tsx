import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AboutScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    
    <View>
      <Text>About Screen</Text>
      <Button
        title="Go to Home"
        
      />
      
      
    </View>
  );
};

export default AboutScreen;