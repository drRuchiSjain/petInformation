import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class InformationScreen extends Component{
  constructor(){
    super()
    this.state = {
      requestedPetsList : []
    }
  this.requestRef= null
  }

  getPetsList =()=>{
    this.requestRef = db.collection("information")
    .onSnapshot((snapshot)=>{
      var  requestedPetsList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedPetsList :  requestedPetsList
      });
    })
  }

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("dog_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ imageLink: url });
      })
      .catch((error) => {
        this.setState({ imageLink: "#" });
      });
      console.log(this.state.imageLink);
  };  



 
  
  
  
  componentDidMount(){
    this.getPetsList()
  }



  componentWillUnmount(){

    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem key={i} bottomDivider>
<Avatar source={{uri: item.image}} />

        <ListItem.Content>
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {item.breed_group}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "green" }}>
            {item.bred_for}
          </ListItem.Subtitle>
          
          <TouchableOpacity style={styles.button}

              onPress ={()=>{
               // console.log(item);
                
                this.props.navigation.navigate("PetDetails",{"details": item})
              }}
              >
            <Text style={{ color: "#ffff" }}>View</Text>
          </TouchableOpacity>
          
        </ListItem.Content>
      </ListItem>
    );
    /*return (
        
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )*/
  }

  render(){
    return(
    
      <View style={{flex:1}}>
        <MyHeader title="Pet Details" navigation ={this.props.navigation}/>
       
        <Text>{this.state. requestedPetsList.length}</Text> 
       
        <View style={{flex:1}}>
          {
            this.state. requestedPetsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Pets</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state. requestedPetsList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    
    )
  }
}


const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
    marginTop:50
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})