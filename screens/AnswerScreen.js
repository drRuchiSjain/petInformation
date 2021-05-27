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
import { Card } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class AnswerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId:"",
        answers: "",
      questions:this.props.navigation.getParam('details')["questions"],
      docId: "",
    };
  }

  getUserQDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("query")
      .where("questions", "==", this.state.questions)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email_id,
            questions: data.questions,
           
            
            docId: doc.id,
          });
        });
      });
  };

  updateAnswerDetails = () => {
    db.collection("query").doc(this.state.docId).update({
      answers: this.state.answers,
      /*last_name: this.state.lastName,
      address: this.state.address,
      contact: this.state.contact,*/
    });

    Alert.alert("Answer Updated Successfully");
  };

  componentDidMount() {
    this.getUserQDetails();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
       
       


        <View style={styles.formContainer}>
            <View
              style={{
                flex: 0.66,
                padding: RFValue(10),
              }}
            >
            <Text style={styles.label}>Post Your Answer </Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"Type your Answer"}
                maxLength={50}
                onChangeText={(text) => {
                  this.setState({
                    answers: text,
                  });
                }}
                value={this.state.answers}
              />

              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateAnswerDetails();
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
      </View>
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
});