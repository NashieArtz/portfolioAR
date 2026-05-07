import React from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

// URL générée par le tunnel (NGROK), sécu HTTPS
const AR_URL = 'https://cbhorfe-nashie_artz-8081.exp.direct/ar.html';


// A-frame + ar.js demande une manip directe du DOM pour la 3D, on route conditionnellement pour PC et mobile et éviter les erreurs
export default function ArView() {
    // Montage du composant, on déclenche
    React.useEffect(() => {
        // Navigation web format
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
            // Chargement direct du fichier
            window.location.href = '/ar.html';
        }
    }, []);

    if (Platform.OS === 'web') return null;

    // Rendu sur mobiles
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