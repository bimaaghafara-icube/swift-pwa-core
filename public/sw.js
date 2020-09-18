/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
self.addEventListener('notificationclick', (event) => {
    console.log(event);
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
