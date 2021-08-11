datejs = variables.schedule;

// Add Calendar
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listYear'
        },
    displayEventTime: false,
    googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
    events: 'en.usa#holiday@group.v.calendar.google.com',
    events: datejs,
    });
    calendar.render();

    var nextbutton = document.getElementsByClassName('fc-next-button')[0];
    nextbutton.setAttribute('onclick', 'addOnclick()');

});


