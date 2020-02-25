import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

const TwilioVideoBrowser = () => {
    return (
        <WebView
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction
        source={{ uri: 'https://shm.ranksol.com/compress-img/twillio-video-demo/' }} />
    )
}

export default TwilioVideoBrowser
