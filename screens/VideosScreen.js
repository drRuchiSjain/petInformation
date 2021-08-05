import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import MyHeader from '../components/MyHeader';
import db from "../config";
import firebase from "firebase";


export default class VideosScreen extends Component{
  constructor(){
    super()
    this.state = {
        
      requestedVideosList : []
    }
    
    this.requestRef= null;
 
  }
  

 getVideoList =()=>{
    this.requestRef = db.collection("information")
    .onSnapshot((snapshot)=>{
      var requestedVideosList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedVideosList : requestedVideosList
      });
    })
  }

  componentDidMount(){
  this.getVideoList();    

  }


 

  

  

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem key={i} bottomDivider>

        <ListItem.Content>
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {item.breed_group}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "green" }}>
            {item.video}
          </ListItem.Subtitle>
          <TouchableOpacity style={styles.button}

              onPress ={()=>{
                console.log(item.video);
                this.props.navigation.navigate("playVideo",{"details": item})
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
        <MyHeader title="Donate Books" navigation ={this.props.navigation}/>
       
        <Text>{this.state.requestedVideosList.length}</Text> 
       
        <View style={{flex:1}}>
          {
            this.state.requestedVideosList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Important Videos</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedVideosList}
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