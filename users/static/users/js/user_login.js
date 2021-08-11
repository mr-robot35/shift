document.addEventListener('DOMContentLoaded', () => {
    var inputs = document.getElementsByTagName('input');

    for (i = 0; i < inputs.length; i ++){
        console.log(inputs[i].getAttribute('type'))
        if (inputs[i].getAttribute('tpye') != 'hidden'){
            console.log(inputs[i]);
            inputs[i].classList.add('form-control', 'form-control-lg');
        }
    }
})
