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
    var dayFields = document.getElementsByClassName('fc-daygrid-day');
    var today = new Date();
    var month = document.getElementsByClassName('fc-toolbar-title')[0];
    month = month.textContent.split(' ')[0];

    for(var i = 0; i < dayFields.length; i++){
        var day = new Date(dayFields[i].getAttribute('data-date'));

        if ( day <= today ||  today.getMonth() == day.getMonth()) {
            // When day fidld is past or its month equal to today's month
            continue;
        } else {
            if ( day.getMonth() == monthToNumber[month] ){
                // When the field's month is equal calendar's month
                dayFields[i].setAttribute('onclick', 'addForm(this)');
            }
        }
    }
}


// "Add" & "Close" button
function schedule(elem, type, del){
    var parent = elem.closest('.modal-form');

    if (type == 0){
        // When "Add" has pressed
        // Insert to day field
        var inputs = parent.querySelectorAll('select');
        var opening = inputs[0].value.split(':');
        var end = inputs[1].value.split(':');
        opening = opening[0] + ':' + opening[1];
        end = end[0] + ':' + end[1];

        var day = elem.getAttribute('data-day');
        var field = document.querySelector('td[data-date="' + day +'"]');
        var schedule = `
            <div class="fc-daygrid-day-events">
                <div class="fc-daygrid-event-harness" style="margin-top: 0px;">
                    <a class="fc-daygrid-event fc-daygrid-dot-event fc-event fc-event-start fc-event-end fc-event-future">
                        <div class="fc-daygrid-event-dot" style="border-color: rgb(0, 255, 0);"></div>
                        <div class="fc-event-title">${opening} to ${end}</div>
                    </a>
                </div>
                <div class="fc-daygrid-day-bottom" style="margin-top: 0px;">
                </div>
            </div>`
        field.querySelector('.fc-daygrid-day-bottom').insertAdjacentHTML('beforebegin', schedule);
        // close modal
        parent.classList.remove('modal-form');
        parent.querySelector('.modal-inner').style.display='none';
    } else {
        // When "Close" has pressed
        if (del == 0){
            // If the action was "create"
            parent.remove();
            var num = document.getElementsByClassName('form').length;
            document.getElementById('id_form-TOTAL_FORMS').value = num;
        } else {
            // If the action was "update"
            parent.classList.remove('modal-form');
			parent.querySelector('.modal-inner').style.display='none';
        }
    }
}


// Return Additional Form
function createForm(num, day){
    return `
        <div class="form form${num} modal-form">
            <div class="modal-inner">
                <p>
                    <label for="id_form-${num}-opening">OPENING</label>
					<select name="form-${num}-opening" id="id_form-${num}-opening" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
						<option value="00:00:00">00:00</option>
						<option value="00:10:00">00:10</option>
						<option value="00:20:00">00:20</option>
						<option value="00:30:00">00:30</option>
						<option value="00:40:00">00:40</option>
						<option value="00:50:00">00:50</option>
						<option value="01:00:00">01:00</option>
						<option value="01:10:00">01:10</option>
						<option value="01:20:00">01:20</option>
						<option value="01:30:00">01:30</option>
						<option value="01:40:00">01:40</option>
						<option value="01:50:00">01:50</option>
						<option value="02:00:00">02:00</option>
						<option value="02:10:00">02:10</option>
						<option value="02:30:00">02:30</option>
						<option value="02:40:00">02:40</option>
						<option value="02:50:00">02:50</option>
						<option value="03:00:00">03:00</option>
						<option value="03:10:00">03:10</option>
						<option value="03:30:00">03:30</option>
						<option value="03:40:00">03:40</option>
						<option value="03:50:00">03:50</option>
						<option value="04:00:00">04:00</option>
						<option value="04:10:00">04:10</option>
						<option value="04:20:00">04:20</option>
						<option value="04:30:00">04:30</option>
						<option value="04:40:00">04:40</option>
						<option value="04:50:00">04:50</option>
						<option value="05:00:00">05:00</option>
						<option value="05:10:00">05:10</option>
						<option value="05:20:00">05:20</option>
						<option value="05:30:00">05:30</option>
						<option value="05:40:00">05:40</option>
						<option value="05:50:00">05:50</option>
						<option value="06:00:00">06:00</option>
						<option value="06:10:00">06:10</option>
						<option value="06:20:00">06:20</option>
						<option value="06:30:00">06:30</option>
						<option value="06:40:00">06:40</option>
						<option value="06:50:00">06:50</option>
						<option value="07:00:00">07:00</option>
						<option value="07:10:00">07:10</option>
						<option value="07:20:00">07:20</option>
						<option value="07:30:00">07:30</option>
						<option value="07:40:00">07:40</option>
						<option value="07:50:00">07:50</option>
						<option value="08:00:00">08:00</option>
						<option value="08:10:00">08:10</option>
						<option value="08:20:00">08:20</option>
						<option value="08:30:00">08:30</option>
						<option value="08:40:00">08:40</option>
						<option value="08:50:00">08:50</option>
						<option value="09:00:00">09:00</option>
						<option value="09:10:00">09:10</option>
						<option value="09:20:00">09:20</option>
						<option value="09:30:00">09:30</option>
						<option value="09:40:00">09:40</option>
						<option value="09:50:00">09:50</option>
						<option value="10:00:00">10:00</option>
						<option value="10:10:00">10:10</option>
						<option value="10:20:00">10:20</option>
						<option value="10:30:00">10:30</option>
						<option value="10:40:00">10:40</option>
						<option value="10:50:00">10:50</option>
						<option value="11:00:00" selected="">11:00</option>
						<option value="11:10:00">11:10</option>
						<option value="11:20:00">11:20</option>
						<option value="11:30:00">11:30</option>
						<option value="11:40:00">11:40</option>
						<option value="11:50:00">11:50</option>
						<option value="12:00:00">12:00</option>
						<option value="12:10:00">12:10</option>
						<option value="12:20:00">12:20</option>
						<option value="12:30:00">12:30</option>
						<option value="12:40:00">12:40</option>
						<option value="12:50:00">12:50</option>
						<option value="13:00:00">13:00</option>
						<option value="13:10:00">13:10</option>
						<option value="13:20:00">13:20</option>
						<option value="13:30:00">13:30</option>
						<option value="13:40:00">13:40</option>
						<option value="13:50:00">13:50</option>
						<option value="14:00:00">14:00</option>
						<option value="14:10:00">14:10</option>
						<option value="14:20:00">14:20</option>
						<option value="14:30:00">14:30</option>
						<option value="14:40:00">14:40</option>
						<option value="14:50:00">14:50</option>
						<option value="15:00:00">15:00</option>
						<option value="15:10:00">15:10</option>
						<option value="15:20:00">15:20</option>
						<option value="15:30:00">15:30</option>
						<option value="15:40:00">15:40</option>
						<option value="15:50:00">15:50</option>
						<option value="16:00:00">16:00</option>
						<option value="16:10:00">16:10</option>
						<option value="16:20:00">16:20</option>
						<option value="16:30:00">16:30</option>
						<option value="16:40:00">16:40</option>
						<option value="16:50:00">16:50</option>
						<option value="17:00:00">17:00</option>
						<option value="17:10:00">17:10</option>
						<option value="17:20:00">17:20</option>
						<option value="17:30:00">17:30</option>
						<option value="17:40:00">17:40</option>
						<option value="17:50:00">17:50</option>
						<option value="18:00:00">18:00</option>
						<option value="18:10:00">18:10</option>
						<option value="18:20:00">18:20</option>
						<option value="18:30:00">18:30</option>
						<option value="18:40:00">18:40</option>
						<option value="18:50:00">18:50</option>
						<option value="19:00:00">19:00</option>
						<option value="19:10:00">19:10</option>
						<option value="19:20:00">19:20</option>
						<option value="19:30:00">19:30</option>
						<option value="19:40:00">19:40</option>
						<option value="19:50:00">19:50</option>
						<option value="20:00:00">20:00</option>
						<option value="20:10:00">20:10</option>
						<option value="20:20:00">20:20</option>
						<option value="20:30:00">20:30</option>
						<option value="20:40:00">20:40</option>
						<option value="20:50:00">20:50</option>
						<option value="21:00:00">21:00</option>
						<option value="21:10:00">21:10</option>
						<option value="21:20:00">21:20</option>
						<option value="21:30:00">21:30</option>
						<option value="21:40:00">21:40</option>
						<option value="21:50:00">21:50</option>
						<option value="22:00:00">22:00</option>
						<option value="22:10:00">22:10</option>
						<option value="22:20:00">22:20</option>
						<option value="22:30:00">22:30</option>
						<option value="22:40:00">22:40</option>
						<option value="22:50:00">22:50</option>
						<option value="23:00:00">23:00</option>
						<option value="23:10:00">23:10</option>
						<option value="23:20:00">23:20</option>
						<option value="23:30:00">23:30</option>
						<option value="23:40:00">23:40</option>
						<option value="23:50:00">23:50</option>
              		</select>
				</p>
                <p>
                    <label for="id_form-${num}-close">CLOSE</label>
					<select name="form-${num}-close" id="id_form-${num}-close" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
						<option value="00:00:00">00:00</option>
						<option value="00:10:00">00:10</option>
						<option value="00:20:00">00:20</option>
						<option value="00:30:00">00:30</option>
						<option value="00:40:00">00:40</option>
						<option value="00:50:00">00:50</option>
						<option value="01:00:00">01:00</option>
						<option value="01:10:00">01:10</option>
						<option value="01:20:00">01:20</option>
						<option value="01:30:00">01:30</option>
						<option value="01:40:00">01:40</option>
						<option value="01:50:00">01:50</option>
						<option value="02:00:00">02:00</option>
						<option value="02:10:00">02:10</option>
						<option value="02:30:00">02:30</option>
						<option value="02:40:00">02:40</option>
						<option value="02:50:00">02:50</option>
						<option value="03:00:00">03:00</option>
						<option value="03:10:00">03:10</option>
						<option value="03:30:00">03:30</option>
						<option value="03:40:00">03:40</option>
						<option value="03:50:00">03:50</option>
						<option value="04:00:00">04:00</option>
						<option value="04:10:00">04:10</option>
						<option value="04:20:00">04:20</option>
						<option value="04:30:00">04:30</option>
						<option value="04:40:00">04:40</option>
						<option value="04:50:00">04:50</option>
						<option value="05:00:00">05:00</option>
						<option value="05:10:00">05:10</option>
						<option value="05:20:00">05:20</option>
						<option value="05:30:00">05:30</option>
						<option value="05:40:00">05:40</option>
						<option value="05:50:00">05:50</option>
						<option value="06:00:00">06:00</option>
						<option value="06:10:00">06:10</option>
						<option value="06:20:00">06:20</option>
						<option value="06:30:00">06:30</option>
						<option value="06:40:00">06:40</option>
						<option value="06:50:00">06:50</option>
						<option value="07:00:00">07:00</option>
						<option value="07:10:00">07:10</option>
						<option value="07:20:00">07:20</option>
						<option value="07:30:00">07:30</option>
						<option value="07:40:00">07:40</option>
						<option value="07:50:00">07:50</option>
						<option value="08:00:00">08:00</option>
						<option value="08:10:00">08:10</option>
						<option value="08:20:00">08:20</option>
						<option value="08:30:00">08:30</option>
						<option value="08:40:00">08:40</option>
						<option value="08:50:00">08:50</option>
						<option value="09:00:00">09:00</option>
						<option value="09:10:00">09:10</option>
						<option value="09:20:00">09:20</option>
						<option value="09:30:00">09:30</option>
						<option value="09:40:00">09:40</option>
						<option value="09:50:00">09:50</option>
						<option value="10:00:00">10:00</option>
						<option value="10:10:00">10:10</option>
						<option value="10:20:00">10:20</option>
						<option value="10:30:00">10:30</option>
						<option value="10:40:00">10:40</option>
						<option value="10:50:00">10:50</option>
						<option value="11:00:00" selected="">11:00</option>
						<option value="11:10:00">11:10</option>
						<option value="11:20:00">11:20</option>
						<option value="11:30:00">11:30</option>
						<option value="11:40:00">11:40</option>
						<option value="11:50:00">11:50</option>
						<option value="12:00:00">12:00</option>
						<option value="12:10:00">12:10</option>
						<option value="12:20:00">12:20</option>
						<option value="12:30:00">12:30</option>
						<option value="12:40:00">12:40</option>
						<option value="12:50:00">12:50</option>
						<option value="13:00:00">13:00</option>
						<option value="13:10:00">13:10</option>
						<option value="13:20:00">13:20</option>
						<option value="13:30:00">13:30</option>
						<option value="13:40:00">13:40</option>
						<option value="13:50:00">13:50</option>
						<option value="14:00:00">14:00</option>
						<option value="14:10:00">14:10</option>
						<option value="14:20:00">14:20</option>
						<option value="14:30:00">14:30</option>
						<option value="14:40:00">14:40</option>
						<option value="14:50:00">14:50</option>
						<option value="15:00:00">15:00</option>
						<option value="15:10:00">15:10</option>
						<option value="15:20:00">15:20</option>
						<option value="15:30:00">15:30</option>
						<option value="15:40:00">15:40</option>
						<option value="15:50:00">15:50</option>
						<option value="16:00:00">16:00</option>
						<option value="16:10:00">16:10</option>
						<option value="16:20:00">16:20</option>
						<option value="16:30:00">16:30</option>
						<option value="16:40:00">16:40</option>
						<option value="16:50:00">16:50</option>
						<option value="17:00:00">17:00</option>
						<option value="17:10:00">17:10</option>
						<option value="17:20:00">17:20</option>
						<option value="17:30:00">17:30</option>
						<option value="17:40:00">17:40</option>
						<option value="17:50:00">17:50</option>
						<option value="18:00:00">18:00</option>
						<option value="18:10:00">18:10</option>
						<option value="18:20:00">18:20</option>
						<option value="18:30:00">18:30</option>
						<option value="18:40:00">18:40</option>
						<option value="18:50:00">18:50</option>
						<option value="19:00:00">19:00</option>
						<option value="19:10:00">19:10</option>
						<option value="19:20:00">19:20</option>
						<option value="19:30:00">19:30</option>
						<option value="19:40:00">19:40</option>
						<option value="19:50:00">19:50</option>
						<option value="20:00:00">20:00</option>
						<option value="20:10:00">20:10</option>
						<option value="20:20:00">20:20</option>
						<option value="20:30:00">20:30</option>
						<option value="20:40:00">20:40</option>
						<option value="20:50:00">20:50</option>
						<option value="21:00:00">21:00</option>
						<option value="21:10:00">21:10</option>
						<option value="21:20:00">21:20</option>
						<option value="21:30:00">21:30</option>
						<option value="21:40:00">21:40</option>
						<option value="21:50:00">21:50</option>
						<option value="22:00:00">22:00</option>
						<option value="22:10:00">22:10</option>
						<option value="22:20:00">22:20</option>
						<option value="22:30:00">22:30</option>
						<option value="22:40:00">22:40</option>
						<option value="22:50:00">22:50</option>
						<option value="23:00:00">23:00</option>
						<option value="23:10:00">23:10</option>
						<option value="23:20:00">23:20</option>
						<option value="23:30:00">23:30</option>
						<option value="23:40:00">23:40</option>
						<option value="23:50:00">23:50</option>
              		</select>
                </p>
                <p>
                    <label for="id_form-${num}-DELETE">DELETE</label>
                    <input type="checkbox" name="form-${num}-DELETE" id="id_form-${num}-DELETE">
                    <input type="hidden" name="form-${num}-date" id="id_form-${num}-date" value="${day}">
                    <input type="hidden" name="form-${num}-id" id="id_form-${num}-id" value="${num}">
                </p>
                <p class="buttons">
                    <input type="button" id="add" class="btn btn-success btn-lg btn-block" value="ADD" data-day="${day}" onclick="schedule(this, 0, 0)" >
                    <input type="button" id="close" class="btn btn-default btn-lg btn-block" value="CLSOE" data-day="${day}" onclick="schedule(this, 1, 0)" >
                </p>
            </div>
        </div>`
}


// Create or Update form
function addForm(elem){
    document.getElementsByTagName('body')[0].classList.add('gray-modal');
    var day = elem.getAttribute('data-date');
    var forms = document.getElementsByClassName('form');

    if (elem.querySelector('.fc-daygrid-event') == null){
        // Create
        num = forms.length;
        var formWrap = document.getElementById('forms');

        formHtml = createForm(num, day);
        formWrap.insertAdjacentHTML('beforeend', formHtml);
        document.getElementById('id_form-TOTAL_FORMS').value = num + 1;

    } else {
        // Update
        var button = `
            <p class="buttons">
                <input type="button" id="add" class="btn btn-success btn-lg btn-block" value="ADD" onclick="schedule(this, 0, 1)" >
                <input type="button" id="close" class="btn btn-default btn-lg btn-block" value="CLOSE" onclick="schedule(this, 1, 1)" >
            </p>`
        // Search the correct update field
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


