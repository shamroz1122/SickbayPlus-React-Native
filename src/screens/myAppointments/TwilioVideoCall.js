import React, { Component } from 'react';
// import {
//   TwilioVideoLocalView,
//   TwilioVideoParticipantView,
//   TwilioVideo
// } from 'react-native-twilio-video-webrtc'
import { connect } from 'react-redux'
import { View, Text,Button,TextInput,TouchableOpacity } from 'react-native'
import {PermissionsAndroid} from 'react-native';


 class TwilioVideoCall extends Component {
  state = {
    isAudioEnabled: true,
    isVideoEnabled: true,
    status: 'disconnected',
    participants: new Map(),
    videoTracks: new Map(),
    roomName: '',
    token: ''
  }





  _onConnectButtonPress = async() => {

    console.log('twilioVideoClientToken ',this.props.twilioVideoClientToken)
    console.log('roomName ',this.props.roomName)
   
    //camera permission
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'SickbayPlus App Camera Permission',
          message:
            'SickbayPlus App needs access to your camera ' +
            'so you can connect with you doctor on video.',
    
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {


        //Audio Permission
                  try {
                    const granted = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                      {
                        title: 'SickbayPlus App Microphone Permission',
                        message:
                          'SickbayPlus App needs access to your microphone ' +
                          'so you can connect with you doctor on video.',
                  
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                      },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              
                      console.log('here man')
              
                          this.refs.twilioVideo.connect({ roomName: this.props.roomName, accessToken: this.props.twilioVideoClientToken })
                          this.setState({status: 'connecting'})
              
      
              
                    } else {
              
                      
                      console.log('Microphone permission denied. Go to SickbayPlus app settings and allow microphone permission.');
              
                    }
                  } catch (err) {
                    console.warn(err);
                  }

      } else {

        console.log('Camera permission denied. Go to SickbayPlus app settings and allow camera permission.');

      }
    } catch (err) {
      console.warn(err);
    }

}

  _onEndButtonPress = () => {
    this.refs.twilioVideo.disconnect()
  }

  _onMuteButtonPress = () => {
    this.refs.twilioVideo.setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then(isEnabled => this.setState({isAudioEnabled: isEnabled}))
  }

  _onFlipButtonPress = () => {
    this.refs.twilioVideo.flipCamera()
  }

  _onRoomDidDisconnect = ({roomName, error}) => {
    console.log("ERROR: ", error)

    this.setState({status: 'disconnected'})
  }

  _onRoomDidFailToConnect = (error) => {
    console.log("ERROR: ", error)

    this.setState({status: 'disconnected'})
  }

  _onParticipantAddedVideoTrack = ({participant, track}) => {
    console.log("onParticipantAddedVideoTrack: ", participant, track)

    this.setState({
      videoTracks: new Map([
        ...this.state.videoTracks,
        [track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid }]
      ]),
    });
  }

  _onParticipantRemovedVideoTrack = ({participant, track}) => {
    console.log("onParticipantRemovedVideoTrack: ", participant, track)

    const videoTracks = this.state.videoTracks
    videoTracks.delete(track.trackSid)

    this.setState({videoTracks: { ...videoTracks }})
  }

  render() {
    return (
      <View style={{flex:1}}>
        {
          this.state.status === 'disconnected' &&
          <View>
            <Text >
              React Native Twilio Video
            </Text>
            <TextInput
           
              autoCapitalize='none'
              value={this.state.roomName}
              onChangeText={(text) => this.setState({roomName: text})}>
            </TextInput>
            <TextInput
        
              autoCapitalize='none'
              value={this.state.token}
              onChangeText={(text) => this.setState({token: text})}>
            </TextInput>
            <Button
              title="Connect"
       
              onPress={this._onConnectButtonPress}>
            </Button>
          </View>
        }

        {
          (this.state.status === 'connected' || this.state.status === 'connecting') &&
            <View>
            {
              this.state.status === 'connected' &&
              <View >
                {
                  Array.from(this.state.videoTracks, ([trackSid, trackIdentifier]) => {
                    return (
                      <TwilioVideoParticipantView
                       
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                      />
                    )
                  })
                }
              </View>
            }
            <View
              >
              <TouchableOpacity
             
                onPress={this._onEndButtonPress}>
                <Text style={{fontSize: 12}}>End</Text>
              </TouchableOpacity>
              <TouchableOpacity
           
                onPress={this._onMuteButtonPress}>
                <Text style={{fontSize: 12}}>{ this.state.isAudioEnabled ? "Mute" : "Unmute" }</Text>
              </TouchableOpacity>
              <TouchableOpacity
           
                onPress={this._onFlipButtonPress}>
                <Text style={{fontSize: 12}}>Flip</Text>
              </TouchableOpacity>
              <TwilioVideoLocalView
                enabled={true}
           
              />
            </View>
          </View>
        }

        <TwilioVideo
          ref="twilioVideo"
          onRoomDidConnect={ this._onRoomDidConnect }
          onRoomDidDisconnect={ this._onRoomDidDisconnect }
          onRoomDidFailToConnect= { this._onRoomDidFailToConnect }
          onParticipantAddedVideoTrack={ this._onParticipantAddedVideoTrack }
          onParticipantRemovedVideoTrack= { this._onParticipantRemovedVideoTrack }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        twilioVideoClientToken:state.appointment.twilioVideoClientToken,
        roomName:state.appointment.roomName
    }
}



export default connect(mapStateToProps)(TwilioVideoCall)