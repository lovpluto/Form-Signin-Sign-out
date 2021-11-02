// Khai báo Validator 
var validator = function(customs){
    
    let group = {};
    let error ;

    let formSelector = document.querySelector(customs.form);

    let changeError = function(change, rule){
        for (var i of group[rule.selector]){
            error = i(change.value);
            if (error){
                change.parentElement.querySelector('.error').innerText = i(change.value);
                change.parentElement.classList.add('invalid')
                change.parentElement.classList.remove('success')
                break;
            }else{
                change.parentElement.querySelector('.error').innerText = '';
                change.parentElement.classList.remove('invalid')
                change.parentElement.classList.add('success') 
            }
        }
        return !!error
    };
    
    customs.rules.forEach( rule => {
        var inputSelector = document.querySelector(rule.selector)  
        if(Array.isArray(group[rule.selector])){
                group[rule.selector].push(rule.test)
            }else{
                group[rule.selector] = [rule.test]
        };
        

        inputSelector.onblur = function(){
            changeError(inputSelector, rule)
        };

        inputSelector.oninput = function(){
            changeError(inputSelector, rule)
        };

    })
    formSelector.onsubmit = function(event){
        event.preventDefault();
        var emailValid;
        customs.rules.forEach( rule => {
            var inputSelector = document.querySelector(rule.selector)  
            changeError(inputSelector, rule)
            getAcount(function(courses){
                for (var i in courses){
                if(courses[i].email == inputSelector.parentElement.parentElement.querySelector('#email').value){
                    inputSelector.parentElement.parentElement.querySelector('.email .error').innerText = 'Email đã tồn tại'
                    inputSelector.parentElement.parentElement.querySelector('.email').classList.add('invalid')
                    inputSelector.parentElement.parentElement.querySelector('.email').classList.remove('success')
                    emailValid = true;
                    break;
                }
                }
            })
            })
            if (!!error && !emailValid){
                customs.rules.forEach( rule => {
                    var inputSelector = document.querySelector(rule.selector)  
                    changeError(inputSelector, rule)
                })
            }
            else{
            var name = document.querySelector('input[name="name"]').value
            var email = document.querySelector('input[name="email"]').value
            var password = document.querySelector('input[name="password"]').value

            var form = {
                name: name,
                email: email,
                password: password
            }
            postAcount(form)
            }
        }
}
// khai báo các rule 
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
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return value.match(regex) ? undefined : message ? message: 'hãy nhập email gì đó';
    }
}
};

validator.isMinlength = function(selector, leng , name){
    return{
        selector : selector,
        test: function(value){
            return value.length >= leng ? undefined : `${name} có ít nhất ${leng} kí tự`;
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

let courseApi = 'http://localhost:3000/account'

function postAcount(data){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }, 
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        // .then( function(response){
        //     response.json();
        // })
};

function getAcount(cb) {
    fetch(courseApi)
        .then(function(reponse){
            return reponse.json()
        })
        .then(cb)
};

