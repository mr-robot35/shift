datejs = variables.schedule;


var monthToNumber = {
    'January': 0,
    'February': 1,
    'March': 2,
    'April': 3,
    'may': 4,
    'June': 5,
    'July': 6,
    'August': 7,
    'September': 8,
    'October': 9,
    'November': 10,
    'December': 11,
}


// Add onclick function to day field
function addOnclick(){
    var dayFields = document.getElementsByClassName('fc-daygrid-event');
    var month = document.getElementsByClassName('fc-toolbar-title')[0];
    month = month.textContent.split(' ')[0];

    for(var i = 0; i < dayFields.length; i++){
        dayFields[i].setAttribute('onclick', 'addForm(this)');
    }
}


// "Add" & "Close" button
function schedule(elem, type){
    var parent = elem.closest('.modal-form');

    if (type == 0){
        // When "Confirm" has pressed
        var inputs = parent.querySelectorAll('select');
        var day = parent.querySelectorAll('input[type="hidden"]')[0].value;
        parent.querySelectorAll('input[type="hidden"]')[2].value = true;
        var opening = inputs[0].value.split(':');
        var end = inputs[1].value.split(':');
        opening = opening[0] + ':' + opening[1];
        end = end[0] + ':' + end[1];

        // Change day field's text
        var tds = document.getElementsByClassName('fc-daygrid-day');
        for (i = 0; i < tds.length; i++ ){
            if (tds[i].getAttribute('data-date') == day ){
                title = tds[i].querySelector('.fc-event-title');
                inners = title.textContent.split(' ');
                title.textContent = opening + ' to ' + end + ' ' + inners[3];
            }
        }
        // close modal
        parent.classList.remove('modal-form');
        parent.querySelector('.modal-inner').style.display='none';
    } else if (type == 1) {
        // When "Delete" has pressed
        parent.querySelectorAll('input[type="hidden"]')[2].value = 'del';
        parent.classList.remove('modal-form');
        parent.querySelector('.modal-inner').style.display='none';
    } else {
        // When "Close" has pressed
        parent.classList.remove('modal-form');
        console.log(parent.querySelector('.modal-inner').classList);
        parent.querySelector('.modal-inner').style.display='none';
    }
}


// Create or Update form
function addForm(elem){
    var field = elem.closest('td.fc-daygrid-day');
    var day = field.getAttribute('data-date');
    var forms = document.getElementsByClassName('form');

    // Update
    var button = `
        <p class="buttons">
            <input type="button" id="confirm" class="btn btn-success btn-lg btn-block" value="CONFIRM" onclick="schedule(this, 0)" >
            <input type="button" id="delete" class="btn btn-danger btn-lg btn-block" value="DELETE" onclick="schedule(this, 1)" >
            <input type="button" id="close" class="btn btn-default btn-lg btn-block" value="CLOSE" onclick="schedule(this, 2)" >
        </p>`
    // Search the correct update field & make it modal
    for (i = 0; i < forms.length; i ++){
        var inputs = forms[i].querySelectorAll('input');
        for (j = 0; j < inputs.length; j ++){
            if (inputs[j].value == day){
                forms[i].classList.add('modal-form');
                forms[i].querySelector('div').classList.add('modal-inner');
                forms[i].querySelector('.modal-inner').style.display = 'block';
                var selects = forms[i].querySelectorAll('select');
                for(k = 0; k < selects.length;k ++){
                    selects[k].classList.add('form-select', 'form-select-lg', 'mb-3');
                    selects[k].setAttribute('aria-label', 'form-select-lg example');
                }
                if (forms[i].querySelector('p.buttons') == null){
                    forms[i].querySelector('.modal-inner').insertAdjacentHTML('beforeend', button);
                }
            }
        }
    }
}


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
    addOnclick();

});


