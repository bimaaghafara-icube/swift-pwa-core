/* eslint-disable no-restricted-globals */
/* global importScripts, firebase */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
const { features } = require('../../swift.config');

importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const firebaseConfig = features.pushNotification.config;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload,
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png',
        data: payload,
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});

/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const { data } = event.notification;
    switch (data.type) {
    case 'open-event':
        event.waitUntil(clients.openWindow(`/go/detail/${data.eventId}`));
        break;
    default:
        event.waitUntil(clients.openWindow('/'));
        break;
    }
});
