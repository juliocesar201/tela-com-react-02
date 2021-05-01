import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, View } from 'react-native';
import {Text, Input, Button} from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import usuarioService from './services/UsuarioService';


export default function Login({navigation}) {
  const [email, setEmail] = useState(null)
  const[password, setPassword] = useState(null)
  const[isLoading, setloading] = useState(false)

  const entrar = () => {

    let data = {
      username: email,
      password:password
      
    }
    usuarioService.login(data)
    .then((response) => {
      setloading(false)
      console.log(response.data)
      navigation.reset({
        index: 0,
        routes: [{name: "Principal"}]
      })
      
    })
    .catch((erro) => {
      setloading(false)
      Alert.alert("Usuario invalido")
  })
 
  
  }
  const cadastrar = () => {
      navigation.navigate("Cadastro")
  }
  return (
    <View style={styles.container}>
      <Text h3>Tela de login</Text>
      <Input
      style={styles.input}
   placeholder="E-mail"
   leftIcon={{ type: 'font-awesome', name: 'envelope' }}
   onChangeText={value => setEmail(value )}
   keyboardType="email-address"
  />
   <Input
    style={styles.input}
   placeholder="sua senha"
   leftIcon={{ type: 'font-awesome', name: 'lock' }}
   onChangeText={value => setPassword(value )}
   secureTextEntry={true}
   
  />
  {isLoading &&
  <ActivityIndicator />
  }

  {!isLoading && 

<Button
  icon={
    <Icon
      name="check"
      size={15}
      color="white"
    />
  }
  title="Login"
  buttonStyle={styles.Button}
  onPress={() => entrar()}
/>
}
<Button
  icon={
    <Icon
      name="user"
      size={15}
      color="white"
      
    />
  }
  title="Cadastrar"
  buttonStyle={styles.Button}
  onPress={() => cadastrar()}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#76FF03',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3

  },

  Button: {
    width: 100,
    height: 42,
    backgroundColor: '#3498db',
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
 
});
