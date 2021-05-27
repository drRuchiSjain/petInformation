import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card,Avatar } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class EditInfoScreen extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      userId: firebase.auth().currentUser.email,
        docId:"",
      breedGroup:this.props.navigation.getParam('details')["breedGroup"],
      bredFor: "",
      height: "",
      weight: "",
      lifespan: "",
      tempermant: "",
      price:'',
      imageLink:""
    };
  }

  getPetDetails = () => {
    var email = firebase.auth().currentUser.email;
    var breedGroup = this.state.breedGroup;
   
   db.collection("information")
      .where("breed_group", "==", breedGroup)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            breedGroup:data.breed_group  ,
            bredFor:data.bred_for,
            height:data.height,
            weight:data.weight,
             lifespan: data.lifespan,
             tempermant : data.tempermant,
             price:'',
             imageLink : data.image,
            docId: doc.id,
          });
        });
      });
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.breedGroup);
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
        this.setState({ imageLink: url });
      })
      .catch((error) => {
        this.setState({ imageLink: "#" });
      });
      console.log(this.state.imageLink);
  };  



  updateUserDetails = () => {
    db.collection("information").doc(this.state.docId).update({
        "breed_group":this.state.breedGroup,
        "bred_for":this.state.bredFor,
        "height"  : this.state.height,
        "weight" : this.state.weight,
         "lifespan"       : this.state.lifespan,
         "tempermant" : this.state.tempermant,
         "price":this.state.price,
         "image" : this.state.imageLink
        
    });

    Alert.alert("Profile Updated Successfully");
  };

  componentDidMount() {

    this.getPetDetails();
  }

  render() {
    return (
      <ScrollView style={styles.scrollview}>
        <View style={styles.formContainer}>
            <View
              style={{
                flex: 0.66,
                padding: RFValue(10),
              }}
            >
            <Text style={styles.label}>Breed Group </Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"Breed Group"}
                maxLength={20}
                onChangeText={(text) => {
                  this.setState({
                    breedGroup: text,
                  });
                }}
                value={this.state.breedGroup}
              />

            <Text style={styles.label}>Bred For </Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"Bred For"}
                maxLength={12}
                onChangeText={(text) => {
                  this.setState({
                    bredFor : text,
                  });
                }}
                value={this.state.bredFor}
              />

                <Text style={styles.label}> Average Height </Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"Average Height"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({
                    height: text,
                  });
                }}
                value={this.state.height}
              />



                <Text style={styles.label}> Average Weight </Text>
                <TextInput
                style={styles.formTextInput}
                placeholder={"Average Weight"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({
                    weight: text,
                  });
                }}
                value={this.state.weight}
              />

              
                <Text style={styles.label}> Life Span </Text>
                <TextInput
                style={styles.formTextInput}
                placeholder={"Life Span"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({
                    lifespan: text,
                  });
                }}
                value={this.state.lifespan}
                />

                
                <Text style={styles.label}> Temprament </Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={""}
                maxLength={18}
              
                onChangeText={(text) => {
                  this.setState({
                    tempermant: text,
                  });
                }}
                value={this.state.tempermant}
              />

              <Text style={styles.label}> Price </Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={""}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({
                    price: text,
                  });
                }}
                value={this.state.price}
              />




            <Text style={styles.label}> Image </Text>
                <Avatar
                rounded
                source={{
                uri: this.state.imageLink,
                    }}
            size={"xlarge"}
            onPress={() => this.selectPicture()}
            showEditButton
          />



            </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateUserDetails();
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#6fc0b8"
  },
  formContainer:{
    flex: 0.88,
    justifyContent:'center'
  },
  label:{
    fontSize:RFValue(18),
    color:"#717D7E",
    fontWeight:'bold',
    padding:RFValue(10),
    marginLeft:RFValue(20)
  },
  formTextInput: {
    width: "90%",
    height: RFValue(50),
    padding: RFValue(10),
    borderWidth:1,
    borderRadius:2,
    borderColor:"grey",
    marginBottom:RFValue(20),
    marginLeft:RFValue(20)
  },
  button: {
    width: "75%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(20),
  },
  buttonView:{
    flex: 0.22,
    alignItems: "center",
    marginTop:RFValue(100)
},
  buttonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#fff"
  },
});