import * as React from 'react';
import { Text, View, Image } from "react-native";


export default class PetDetailsScreen extends React.Component {
constructor(props){
    super(props);
    this.state={
        img:''
    }
}
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
          <View style={{height: 135}}>
            <Image
              source={{uri : 'https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/dogs_1280p_0.jpg?itok=PWGpcKuD'}}
              style={{
                height:200,
                width: 155
              }}
            />
          </View>
          <View style={{ padding: 10, width: 155 }}>
            <Text>Title</Text>
            <Text style={{ color: "#777", paddingTop: 5 }}>
              My cute dog
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
