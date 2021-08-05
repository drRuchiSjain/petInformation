import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert,Image} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {SearchBar,ListItem, Input,Avatar} from 'react-native-elements'
import { RFValue } from "react-native-responsive-fontsize";


export default class QueryScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      breedGroup : "",
      bredFor:"",
      height: "",
      weight:"",
      lifeSpan:"",
      tempermant:"",
      userDocId: '',
      image: "#" ,
      docId :'',
      price:'',
      Imagelink: '',
      dataSource:"",
      showFlatlist: false
    }
  }

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("pet_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("pet_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };  



  addRequest = async ()=>{
    var userId = this.state.userId
    
   
    console.log("here in add pet information");

    db.collection('information').add({
    //    "user_id": userId,
        "breed_group":this.state.breedGroup,
        "bred_for":this.state.bredFor,
        "height"  : this.state.height,
        "weight" : this.state.weight,
         "lifespan"       : this.state.lifeSpan,
         "tempermant" : this.state.tempermant,
         "price":this.state.price,
         "image":this.state.image

    })

    return Alert.alert("Pet Information added Successfully")

    this.setState({
        breedGroup :"",
        
      bredFor:"",
      height: "",
      weight:"",
      lifeSpan:"",
      tempermant:"",
    })

    


  }
  render() {
    return (
      <View style={{flex:1}}>
        <MyHeader title="Pet Information" navigation ={this.props.navigation}/>
        <ScrollView style={styles.scrollview}>
          
          <View style={{ flex: 0.95 }}>
            <Text style={styles.label}>Breed Group </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Breed Group"}
              maxLength={12}
              onChangeText={text => {
                this.setState({
                  breedGroup: text
                });
              }}
            />

            <Text style={styles.label}>Bred For </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Bred For"}
              maxLength={12}
              onChangeText={text => {
                this.setState({
                  bredFor: text
                });
              }}
            />

            <Text style={styles.label}>Average Height </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Average Height"}
              maxLength={10}
              keyboardType={"numeric"}
              onChangeText={text => {
                this.setState({
                  height: text
                });
              }}
            />

          <Text style={styles.label}>Average Weight </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Average Weight"}
              maxLength={10}
              keyboardType={"numeric"}
              onChangeText={text => {
                this.setState({
                  weight: text
                });
              }}
            />  

            <Text style={styles.label}>Average Lifespan </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"LifeSpan"}
              keyboardType={"numeric"}
              onChangeText={text => {
                this.setState({
                  lifeSpan: text
                });
              }}
            />

            <Text style={styles.label}> Temperament </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Temperament"}
             
              onChangeText={text => {
                this.setState({
                  tempermant: text
                });
              }}
            />

            <Text style={styles.label}> Price </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Price"}
             
              onChangeText={text => {
                this.setState({
                  price: text
                });
              }}
            />

           
          </View>

          <Text style={styles.label}> Image </Text>
          <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size={"xlarge"}
            onPress={() => this.selectPicture()}
            showEditButton
          />
          <Text style={styles.label}> Image Link</Text>
          <TextInput
              style={styles.formInput}
              placeholder={"Image Link"}
             
              onChangeText={text => {
                this.setState({
                  image: text
                });
              }}
            />


          <View style={{ flex: 0.2, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() =>
                this.addRequest()          
                
              }
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <Text
              style={styles.cancelButtonText}
              onPress={() => {
                this.setState({ });
              }}
            >
              Cancel
            </Text>
          </View>
          
        </ScrollView>
        </View>
     
    );
  };


  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6fc0b8"
  },
  loginBox: {
    width: "80%",
    height: RFValue(50),
    borderWidth: 1.5,
    borderColor: "#ffffff",
    fontSize: RFValue(20),
    paddingLeft: RFValue(10)
  },
  button: {
    width: "80%",
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(25),
    backgroundColor: "#ffff",
    shadowColor: "#000",
    marginBottom: RFValue(10),
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16
  },
  buttonText: {
    color: "#32867d",
    fontWeight: "200",
    fontSize: RFValue(20)
  },
  label: {
    fontSize: RFValue(13),
    color: "#717D7E",
    fontWeight: "bold",
    paddingLeft: RFValue(10),
    marginLeft: RFValue(20)
  },
  formInput: {
    width: "90%",
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14)
  },
  registerButton: {
    width: "75%",
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10)
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff"
  },
  cancelButtonText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#32867d",
    marginTop: RFValue(10)
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#fff"
  },
  signupView: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center"
  },
  signupText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#32867d"
  },

  imageContainer: {
    flex: 0.75,
    width: "40%",
    height: "20%",
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
  },
 
  TextInput: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
 
});