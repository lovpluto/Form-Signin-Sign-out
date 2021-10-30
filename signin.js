var signin = function(customs){
    let formSelector = document.querySelector(customs.form);
    let group1 = {};
if(formSelector){
    let changeError = function(change, rule){
        for (var i of group1[rule.selector]){
            if (i(change.value)){
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
    };

    customs.rules.forEach( rule => {
        var inputSelector = formSelector.querySelector(rule.selector)  
        if(Array.isArray(group1[rule.selector])){
                group1[rule.selector].push(rule.test)
            }else{
                group1[rule.selector] = [rule.test]
        };

        inputSelector.onblur = function(){
            changeError(inputSelector, rule)
        };

        inputSelector.oninput = function(){
            changeError(inputSelector, rule)
        };

        formSelector.onsubmit = function(event){
            event.preventDefault();
            customs.rules.forEach( rule => {
                var inputSelector = formSelector.querySelector(rule.selector)  
                changeError(inputSelector, rule)  
                console.log(inputSelector)
                
            })
            getAcount(function(courses){
                for ( var i in courses){
                if(courses[i].email == inputSelector.value){
                    alert('thanh cong')
                    break;
                }else{

                }}
    
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
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return value.match(regex) ? undefined : message ? message: 'hãy nhập email gì đó';
    }
}
};


function getAcount(cb) {
    fetch(courseApi)
        .then(function(reponse){
            return reponse.json()
        })
        .then(cb)
};