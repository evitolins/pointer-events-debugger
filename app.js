var input = document.getElementById('input');;
var output = document.getElementById('output');
var pressureCircle = document.getElementById('pressureCircle');
var btn_save = document.getElementById('btn_save');
var btn_clear = document.getElementById('btn_clear');
var log_count = document.getElementById('log_count');

var log = [];
var data = {
    system : {
        os : bowser.osname,
        osVersion : bowser.osversion,
        browser : bowser.name,
        browserVersion : bowser.version
    },
    event : null
};

var init_log = function () {
    log = [];
    log.push(data.system);
    ui_update_log_count();
}

var save_log_to_file = function () {
    var filename = "pointer-events-debugger-results.json";
    var blob = new Blob([JSON.stringify(log, null, 4)], {type: "application/json;charset=utf-8"});
    saveAs(blob, filename);
};

var ui_update_log_count = function () {
    log_count.innerHTML = log.length;
}
var ui_update_events = function () {
    output.innerHTML = JSON.stringify(data, null, 4);
}

var listener_pointer = function (e) {
    data.event = {
        type : e.type,
        pointerType : e.pointerType,
        button : e.button,
        clientX : e.clientX,
        clientY : e.clientY,
        pressure : e.pressure,
        tiltX : e.tiltX,
        tiltY : e.tiltY,
        twist : e.twist,
        // bubbles : e.bubbles,
        // cancelable : e.cancelable,
        // detail : e.detail,
        // width : e.width,
        // height : e.height,
        pointerId : e.pointerId,
        isPrimary : e.isPrimary
    };
    log.push(data.event);
    ui_update_log_count();

    // // Auto reminder to save log
    // var remainder = log.length % 1000;
    // if (remainder === 0) {
    //     var confirmed = confirm("Think you've tested it enough?\n\n    Yep: Click 'Ok' to save a file of your results.\n\n    Nope: Click 'Cancel' to continue testing the mouse/stylus inputs.")
    //     if (confirmed === true) {
    //         save_log_to_file();
    //     }
    //     return;
    // }

    // Update DOM
    var scale = e.pressure * 20;
    pressureCircle.style.transform = "translate("+e.clientX+"px ,"+e.clientY+"px) skew("+e.tiltX+"deg, "+e.tiltY+"deg) scale("+scale+")";
    ui_update_events()
};

// Logic to optionally listen to any of the events below by
// adding a comma-separated in the URL hash.
// 
//   e.g. .../index.html#pointerover,pointerenter,pointerdown
//   
var listenable_events = [
    'pointerover',
    'pointerenter',
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointercancel',
    'pointerout',
    'pointerleave',
    'gotpointercapture',
    'lostpointercapture'
];

var currently_listening = [];

var refresh_listeners = function (events) {
    events = (events[0]) ? events : listenable_events;
    currently_listening.forEach(function (value) {
        input.removeEventListener(value, listener_pointer);
        console.log('removeEventListener ' + value);
    });
    currently_listening = [];
    events.forEach(function (value) {
        if (listenable_events.indexOf(value) > -1) {
            input.addEventListener(value, listener_pointer);
            currently_listening.push(value);
            console.log('addEventListener ' + value);
        }
    });
};

var listener_hashchange = function () {
    var hashstring = window.location.hash.slice(1);
    var events = [];
    if (hashstring) {
        events = hashstring.split(',');
    }
    refresh_listeners(events);
};


// Init App
if (!window.PointerEvent) alert("pointer events not detected");

btn_save.addEventListener('click', save_log_to_file);
btn_clear.addEventListener('click', init_log);
window.addEventListener('hashchange', listener_hashchange);

ui_update_events();
listener_hashchange();
init_log();

