const old = document.querySelector("#history");
const current = document.querySelector("#current");
const toggle = document.querySelector("#switch");
const numbers = document.querySelectorAll(".num");
const clear = document.querySelector("#allClear")
const operator = document.querySelectorAll(".operator")
const equals = document.querySelector("#equals")
const decimal = document.querySelector("#point")
const warn = document.querySelector(".text")
const del = document.querySelector("#delete")
const inv = document.querySelector("#inverse")
let stat = false;
let op1 = ''
let op = ''
let op2 = ''
let result = 0

//to display whether the calculator is on or not
function checkStatus(){
     if (stat) {
        current.textContent = "ON";
        current.style.opacity = "1";
        old.style.opacity = "0.625";
    } else {
        current.textContent = "OFF";
        current.style.opacity = "0.4";
        old.style.opacity = "0";
    }
}

checkStatus()


//to reset values every time calculator is toggled 
toggle.addEventListener("click", function () {
    stat = !stat;
    current.textContent=''
    old.textContent=''
    op1=''
    op=''
    op2=''
    result=0
    checkStatus()  
});



//functionality to number buttons
numbers.forEach((num)=>{
    num.addEventListener("click",function(){
        warn.textContent="RASIO"
        if(op==''&&stat&&current.textContent.length<13){
           op1=op1+num.textContent
           current.textContent=op1
        }
        else if(op!=''&&stat&&current.textContent.length<13)
            {
            op2=op2+num.textContent
            current.textContent=op2
        }
        if(current.textContent.length==13){
           warn.textContent="Max Limit Reached"
        }
    })
})



//functionality to operator buttons
operator.forEach((oper)=>{
    oper.addEventListener("click",function(){
        warn.textContent="RASIO"
        if(op1!=''&&stat&&op==''){
            op=oper.textContent
            old.textContent=current.textContent+oper.textContent
        }
        else if(op!=''&&op2==''&&stat&&op!=''){
            op=oper.textContent
            old.textContent=old.textContent.slice(0,-1)+op
        }
        current.textContent=''
    })
})


//functionality to equals button
equals.addEventListener("click",function(){
    warn.textContent="RASIO"
    if(op1!=''&&op!=''&&op2!=''&&stat){
        old.textContent=old.textContent+op2
        console.log(old.textContent)
        let x = parseFloat(op1)
        let y = parseFloat(op2)
    switch(op){
        case '+':
            result=x+y
            break;
         case '-':
            result=x-y
            break;
         case 'X':
            result=x*y
            break;
         case '/':
            result=x/y
            break;
    }
    if(parseFloat(result)>9999999||parseFloat(result)<9999999){
        result=result.toExponential(5)
    }
    else{
    result=parseFloat(result).toFixed(3)
    }
    current.textContent=result
    op1=result
    op2=''
    op=''

}})



//functionality to decimal button(ensures you cant repeat decimal in same number)
decimal.addEventListener("click",function(){
    
    if(op==''&&!op1.includes('.')){
        console.log(op1.includes("."))
        op1=op1+'.'
        current.textContent=current.textContent+'.'
    }
    else if(op!=''&&!op2.includes('.')){
        op2=op2+'.'
        current.textContent=current.textContent+'.'
    }
})



//functionality to clear all button
clear.addEventListener("click",function(){
    if(stat){
    current.textContent='|'
    old.textContent=''
    result=''
    op1=''
    op2=''
    op=''
    }
})



//functionality to delete button(clear one charcter)
del.addEventListener("click",function(){
   
    if(stat){
        current.textContent=current.textContent.slice(0,-1)
       if(op==''){
       op1= op1.slice(0,-1)
      
    }
        else if(op!=''&&op2==''){
        op=''
    }
        else if(op!=''&&op2!=''){
        op2.slice(0,-1)
    }
     if(current.textContent=="O"){
    current.textContent='|'
    }
    }})


 //functionality to inverse button
 inv.addEventListener("click",function(){
    if(stat){
    if(current.textContent==''||current.textContent=='ON'){
        return
    }
    if(current.textContent.startsWith('-')){
        current.textContent=current.textContent.slice(1,)
        if(op==''){
            op1=op1*(-1)
        }
        if(op!=''){
            op2=op2*(-1)
        }
    }
    else{
        current.textContent='-'+current.textContent
        if(op==''){
            op1=op1*(-1)
        }
        if(op!=''){
            op2=op2*(-1)
        }
    }
 }})




















