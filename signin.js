var signin = function(customs){
    let formSelector = document.querySelector(customs.form);
    let group1 = {};
if(formSelector){
    customs.rules.forEach( rule => {
        var inputSelector = formSelector.querySelector(rule.selector)  
        formSelector.onsubmit = function(event){
            event.preventDefault();
            getAcount(function(courses){
                for ( var i in courses){
                if(courses[i].email == inputSelector.value && inputSelector.parentElement.parentElement.querySelector('#password-login').value == courses[i].password){
                    alert('thanh cong')
                    inputSelector.parentElement.parentElement.querySelector('#error-login').innerText = ''
                    break;
                }else if( i >= courses.length - 1){
                    inputSelector.parentElement.parentElement.querySelector('#error-login').innerText = "Tài khoản và mật khẩu không chính xác"
                    // alert('that bai')
                    break;
                }
            }
            })
        }
    });
}
}
validator.isRequired = function(selector, message){    
    return {
        selector: selector,
        test: function(value){
        return value ? undefined : message ? message : 'Hãy nhập gì đó';
    }
}
};

validator.isEmail = function(selector, message){    
    return {
        selector: selector,
        test: function(value){
            let regexx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return value.match(regexx) ? undefined : message ? message: 'hãy nhập email gì đó';
    }
}
};
validator.isConfirmed = function(selector, cb, name){
    return{
        selector : selector,
        test: function(value){
           return value == cb() && value  ? undefined : `${name} chưa chính xác`;
        }
    }
}


function getAcount(cb) {
    fetch(courseApi)
        .then(function(reponse){
            return reponse.json()
        })
        .then(cb)
};