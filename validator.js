// Khai báo Validator 
var validator = function(customs){
    let group = {};
    
    let formSelector = document.querySelector(customs.form);

    
    let changeError = function(change, rule){
        for (var i of group[rule.selector]){
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
        customs.rules.forEach( rule => {
            var inputSelector = document.querySelector(rule.selector)  
            changeError(inputSelector, rule)   
        })
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
           return value == cb() ? undefined : `${name} chưa chính xác`;
        }
    }
}

