import React from 'react';

const contentHTML = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
      <meta charset="UTF-8">
      <title>Portfolio AR</title>
      <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
      <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      <style>
        body, html, #root, #__next {
            background: transparent !important;
        }
        /* On s'assure que la vidéo AR.js n'est pas bloquée */
        video {
            display: block !important;
        }
      </style>
  </head>
  <body style='margin : 0; overflow: hidden; background-color: transparent;'>
  <a-scene embedded arjs='sourceType: webcam; debugUIEnabled: false;'>
      <a-marker type="pattern" url="/portfolio.patt">
          <a-text 
              value="Developpeur Full-Stack" 
          </a-text>
      </a-marker>
      <a-entity camera></a-entity>
  </a-scene>
  </body>
  </html>
`;

export default function ArView() {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: contentHTML }}
            style={{
                width: '100vw',
                height: '100vh',
                margin: 0,
                padding: 0,
                backgroundColor: 'transparent'
            }}
        />
    );
}