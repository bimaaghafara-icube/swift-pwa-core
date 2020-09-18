/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import firebase from './index';

const notification = {
    // send token to api
    sendTokenToServer(token) {
        fetch('/auth/fcm-token', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                token,
            }),
        });
    },
    getTokenFcm() {
        const messaging = firebase.messaging();
        messaging
            .getToken()
            .then((currentToken) => {
                if (currentToken) {
                    notification.sendTokenToServer(currentToken);
                    // updateUIForPushEnabled(currentToken)
                } else {
                }
            })
            .catch((err) => {});
    },
    updateTokenFcm() {
        const messaging = firebase.messaging();
        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(() => {
            messaging
                .getToken()
                .then((refreshedToken) => {
                    notification.sendTokenToServer(refreshedToken);
                })
                .catch((err) => {
                    console.log('Unable to retrieve refreshed token ', err);
                });
        });
    },
    init() {
        try {
            const messaging = firebase.messaging();
            // messaging.usePublicVapidKey(
            //   "BNLpFKMYBkoD5UoMz4YqVWVQkcSWJ3kxJQkhlAPclwZiZ0gLKYSsjolscS_7r6SX_qoNviXmEGTLweNuEzGNSng"
            // )
            messaging.usePublicVapidKey(
                'BJpXgmqEUC3PWbCac7_xLYd4_SBPPwTl43YeZH3VQBlizfh61uwlxVWmRxsisOVieVVHH_fJ_ifxyOqvPhZTqac',
            );

            // request notification
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    notification.getTokenFcm();
                    notification.updateTokenFcm();
                } else {
                    // handle ketika di block
                }
            });
        } catch (err) {}
    },
};

export default notification;
