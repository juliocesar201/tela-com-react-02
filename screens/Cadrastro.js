import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {Text, CheckBox, Input, Button} from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import usuarioService from './services/UsuarioService';


export default function Cadastro({navigation}) {
  const [email, setEmail] = useState(null)
  const [nome, setNome] = useState(null)
  const[password, setPassword] = useState(null)
  const[isSelected, setSelected] = useState(false)
  const[errorEmail, setErroEmail] = useState(null)
  const[errorPassword, setErroPassword] = useState(null)
  const[errorNome, setErroNome] = useState(null)
  const[isLoading, setloading] = useState(false)

  const validar = () => {
    let error = false
    setErroEmail(null)
    setErroNome(null)
    setErroPassword(null)

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(email).toLowerCase())){
      setErroEmail("Prencha corretamente o seu e-mail")
      error = true
    }
     if (nome == null){
       setErroNome("Prencha o seu nome")
       error = true
      }

     if (password == null){
        setErroPassword("Prencha a senha")
        error = true
      }
      return !error
  
  }

  const salvar = () => {
    if (validar()){
      let data = {
        email: email,
        nome: nome,
        password: password
      }
      usuarioService.cadastrar(data)
      .then((response) => {
        setloading(false)
        console.log(response.data)
        
      })
      .catch((erro) => {
        setloading(false)
        console.log(erro)
        console.log("deu erro")
    })
   }
  }

  return (
    <View style={styles.container}>
      <Text h3>Cadastre-se</Text>
      <Input
      style={styles.input}
        placeholder="E-mail"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={value =>{
      etEmail(value)
      setErroEmail(null)
   }}
   keyboardType="email-address"
   errorMessage={errorEmail}
  />
  <Input
      style={styles.input}
   placeholder="Nome"
   leftIcon={{ type: 'font-awesome', name: 'envelope' }}
   onChangeText={value =>{
      setNome(value )
      setErroNome(null)
   }}
   errorMessage={errorNome}
  />
   <Input
   placeholder="Password"
   onChangeText={value => setPassword(value )}
   errorMessage={errorPassword}
   secureTextEntry={true}
   style={styles.input}
   
  />
  <CheckBox
       title="Eu aceito os termos de uso"
       checkedIcon="check"
       uncheckedIcon="square-o"
       checkedColor="green"
       uncheckedColor="red"
       checked={isSelected}
       onPress={() => setSelected(!isSelected)}

  />
  { isLoading &&
    <Text>carregando...</Text>
  }

<Button
  icon={
    <Icon
      name="check"
      size={15}
      color="white"
    />
  }
  title="Salvar"
  buttonStyle={styles.Button}
  onPress={() => salvar()}
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
