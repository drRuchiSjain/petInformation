import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,Button } from 'react-native';
import { Card, Header, Icon,Avatar } from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";
import db from '../config.js';

export default class PetDetailsScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userId: firebase.auth().currentUser.email,
      
     
    breedGroup: this.props.navigation.getParam('details')["breed_group"],
      bredFor: this.props.navigation.getParam('details')["bred_for"],
      height: this.props.navigation.getParam('details')["height"],
      weight : this.props.navigation.getParam('details')["weight"],
      lifeSpan: this.props.navigation.getParam('details')["lifespan"],
      tempermant :this.props.navigation.getParam('details')["tempermant"],
      price:this.props.navigation.getParam('details')["price"],
       image:this.props.navigation.getParam('details')["image"]
    }
  }

   render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: "Pet Details",
              style: {
                color: "#ffffff",
                fontSize: RFValue(20),
                fontWeight: "bold",
              },
            }}
            backgroundColor="#32867d"
          />
         
        </View>


        
        
<View style={{flex:4.5}}>

<Card>
  <Card.Title style={{fontSize:25}}>Breed Name : {this.state.breedGroup}</Card.Title>
  <Card.Divider/>
  <Card.Image style={{height:200,width:'95%'}}source={{uri:this.state.image}} >
    
  </Card.Image>
  <Text style={{fontSize:20,marginBottom: 10}}>
      Bred For: {this.state.bredFor} 
    </Text>
    <Text style={{fontSize:20,marginBottom: 10}}>
      Height: {this.state.height}
    </Text>
    <Text style={{fontSize:20,marginBottom: 10}}>
      Weight: {this.state.weight}
    </Text>
    <Text style={{fontSize:20,marginBottom: 10}}>
      LifeSpan: {this.state.lifeSpan}
    </Text>
    <Text style={{fontSize:20,marginBottom: 10}}>
      Temperament: {this.state.tempermant}
    </Text>
    <Text style={{fontSize:20,marginBottom: 10}}>
      Price: {this.state.price}
    </Text>
  </Card>
  
        </View>
        
       </View>
        
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "75%",
    marginLeft:50,
    marginTop:10,
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(60),
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  
});


/*<TouchableOpacity style={styles.button}

onPress ={()=>{
 // console.log(item);
  
  this.props.navigation.navigate("EditInfo",{"details":{
    breedGroup:this.state.breedGroup
  }})
}}
>
<Text style={{ color: "#ffff" }}>Edit</Text>
</TouchableOpacity>
*/