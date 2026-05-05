import React from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const AR_URL = 'https://cbhorfe-nashie_artz-8081.exp.direct/ar.html';

export default function ArView() {
    React.useEffect(() => {
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
            window.location.href = '/ar.html';
        }
    }, []);

    if (Platform.OS === 'web') return null;

    return (
        <WebView
            source={{ uri: AR_URL }}
            style={{ flex: 1 }}
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={['*']}
            androidLayerType="hardware"
            onPermissionRequest={(request: any) => request.grant(request.resources)}
        />
    );
}