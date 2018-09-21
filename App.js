/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import { Container, Header, Title, Content, Card, Footer, FooterTab, CardItem, Button, Left, Right, Body, Icon, Text, ListItem, CheckBox } from 'native-base';
import Slider from "react-native-slider";
import {debounce} from "throttle-debounce";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useSpecialSymbol: false,
            useDifferentCase: false,
            useNumbers: false,
            passlen: 10,
            generatedPass: []
        };
        this.changePasslen = this.changePasslen.bind(this)
    }



handleToogle(name){
    this.setState({
        [name] : !this.state[name]
    }, this.generatePassword)
}

changePasslen(value){
    this.setState({
        passlen : value
    }, this.generatePassword)
}

generatePassword(){
    const { useSpecialSymbol, useDifferentCase, useNumbers, passlen } = this.state;
    let generatedPass = [];
    for (let i = 0; i<6;i++){
        generatedPass.push(getPassword(useSpecialSymbol,useDifferentCase,useNumbers,passlen))
    }
    this.setState({generatedPass})
}


  render() {
    const { useSpecialSymbol, useDifferentCase, useNumbers, generatedPass ,passlen} = this.state;
    return (
        <Container>
            <Header>
                <Left/>
                <Body>
                <Title>Wasgen</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Text>
                    To generate a password, select the required options.
                </Text>
                <ListItem>
                    <CheckBox
                        checked={useSpecialSymbol}
                        onPress={() => this.handleToogle('useSpecialSymbol')}
                    />
                    <Body>
                    <Text>Use special symbols (such !@#$%^&*() )</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <CheckBox
                        checked={useDifferentCase}
                        onPress={() => this.handleToogle('useDifferentCase')}
                    />
                    <Body>
                    <Text>Use letters of different letters.</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <CheckBox
                        name={'useNumbers'}
                        checked={useNumbers}
                        onPress={() => this.handleToogle('useNumbers')}
                    />
                    <Body>
                    <Text>Use numbers</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                    <Text>Password length is {passlen}</Text>
                    <Slider
                        value={passlen}
                        onSlidingComplete={this.changePasslen}
                        minimumValue={5}
                        maximumValue={15}
                        step={1}
                    />
                    </Body>
                </ListItem>
                {generatedPass.map((item,index)=>
                    <Card key={index}>
                        <CardItem>
                            <Body>
                            <Text>
                                {item}
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>
                )}
            </Content>
            {/*<Footer>*/}
                {/*<FooterTab>*/}
                    {/*<Button>*/}
                        {/*<Icon name="apps" />*/}
                    {/*</Button>*/}
                    {/*<Button>*/}
                        {/*<Icon name="info" />*/}
                    {/*</Button>*/}
                {/*</FooterTab>*/}
            {/*</Footer>*/}
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function getPassword(useSpecialSymbol, useDifferentCase, useNumbers, passlen){
    let pass = "";
    let dic = "abcdefghijklmnopqrstuvwxyz";
    dic = useDifferentCase ? dic+"ABCDEFGHIJKLMNOPQRSTUVWXYZ" : dic;
    dic = useNumbers ? dic+"0123456789" : dic;
    dic = useSpecialSymbol ? dic+"±!@#$%^&*()_-+=" : dic;

    for (let i = 0; i < passlen; i++)
    {
        pass += dic.charAt(Math.floor(Math.random() * dic.length));
    }
    return pass
}
