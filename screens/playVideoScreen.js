import React, {  Component } from "react";
import { WebView } from 'react-native-webview';

//AIzaSyAMzQXb_-HlxpT68k4d71Kfi2MoylWPiZs
export default class playVideoScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      link:this.props.navigation.getParam('details')['video'],
      }
  }


    render() {
      return (
      <WebView
    style={{flex:1}}
    javaScriptEnabled={true}
    source={{uri: this.state.link+'?rel=0&autoplay=0&showinfo=0&controls=0'}}
/>
      )}
  
}  
  