var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    
    }
};


function confirm() {
    navigator.notification.confirm(
        // This is message to display for user.
        'Do you want to exit application?',  
        // This callback onConfirm function which alert a message
        onConfirm,  
        // This is title of message
        'Exit application',  
        // This is button labels which display to click        
        ['Cancel','Exit']     
    );
}

function onConfirm(btnIndex) {
    // Show a message
    alert('You select button' + btnIndex);
}

function callRing() {
    //3 is the times to repeat beep
    navigator.notification.beep(3);
}

function callVibration() {
    // This is vibrate, 3000 is milliseconds to vibrate device
    navigator.vibrate(3000)
}
