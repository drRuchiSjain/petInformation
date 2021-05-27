import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class FAQScreen extends Component{
  constructor(){
    super()
    this.state = {
      requestedAnsList : []
    }
  this.requestRef= null
  }

  getAnsList =()=>{
    console.log("I am here");
    this.requestRef = db.collection("query")
    .onSnapshot((snapshot)=>{
      var  requestedAnsList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedAnsList :  requestedAnsList
      });
    })
  }

  componentDidMount(){
    this.getAnsList()
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
            {item.questions}
          </ListItem.Title>
          
         
          <ListItem.Subtitle style={{ color: "green" }}>
            {item.answers}
          </ListItem.Subtitle>
          <TouchableOpacity style={styles.button}

              onPress ={()=>{
                console.log(item);
                this.props.navigation.navigate("AnswerDetails",{"details": item}) 
              
              }}
              >
            <Text style={{ color: "#ffff" }}>Add Answer</Text>
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
        <MyHeader title="FAQ" navigation ={this.props.navigation}/>
       
        <Text>{this.state. requestedAnsList.length}</Text> 
       
        <View style={{flex:1}}>
          {
            this.state.requestedAnsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Quesries</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedAnsList}
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