let curTotal=0;
let buffer="0";
let preOperator=null;
let curOperator=null;
let localBuffer='';

let bufferClass=document.querySelector(".buffer");
let curTotalClass=document.querySelector(".total-ans"); 

function buttonClicked(value){
    if(isNaN(parseInt(value))){
        console.log(value);
        if(buffer=="0"){
            return;
        }
        handleSymbol(value);
    }
    else{
        
        handleNumber(value);
    }
}

function handleNumber(value){
    if (buffer=="0"){
        buffer=value;
        localBuffer=value;
    }
    else{
        buffer+=value;
        localBuffer+=value;
    }
    renderBuffer();

}

function handleSymbol(value){
    console.log(isNaN(parseInt(buffer[buffer.length-1])));
    if(isNaN(parseInt(buffer[buffer.length-1])) && value!='C' && value!='←'){
        return;
    }
    switch (value) {
        case 'C':
            buffer='0';
            curTotal=null;
            curOperator=null;
            preOperator=null;
            console.log(buffer,curTotal);
            renderAns();
            renderBuffer();
            break;
        case '←':
            console.log(buffer);
            curOperator=null;
            preOperator=null;
            if(buffer==0 || buffer.length===1){
                buffer='0';
                curTotal=null;
                break;
            }
            buffer=buffer.substring(0,buffer.length-1);
            localBuffer=buffer;
            renderBuffer();
            break;

        case '+':
            preOperator=curOperator;
            curOperator='+';
            flushOperation();
            break;
        
        case '-':
            preOperator=curOperator;
            curOperator='-';
            flushOperation();
            break;
        
        case 'x':
            preOperator=curOperator;
            curOperator='x';
            flushOperation();
            break;
        
        case '÷':
            preOperator=curOperator;
            curOperator='÷';
            flushOperation();
            break;
        
        case '=':
            preOperator=curOperator;
            curOperator='=';
            flushOperation();
        default:
            break;
    }
    renderBuffer();
    renderAns();
    if(value=='='){
        console.log("Inside =");
        curOperator=null;
        preOperator=null;
        localBuffer=curTotal.toString();
    }

}

function flushOperation(){
    console.log("Inside flush",localBuffer);
    if (preOperator==null ){
        curTotal=parseInt(localBuffer);
        
    }
    else{
        if(preOperator=='+'){
            curTotal+=parseInt(localBuffer);
        }
        else if(preOperator=='-'){
            curTotal-=parseInt(localBuffer);
        }
        else if(preOperator=='x'){
            curTotal*=parseInt(localBuffer);
        }
        else if(preOperator=='÷'){
            curTotal/=parseInt(localBuffer);
        }
    }
    curTotal=parseInt(curTotal);
    buffer=curTotal.toString()+curOperator;
    if(curOperator=='='){
        buffer=curTotal.toString();
         
    }
    localBuffer='';
}


function renderBuffer(){
    bufferClass.innerText=buffer;
}

function renderAns(){
    curTotalClass.innerText=curTotal;
}

function clickable(){
    document.querySelector(".calci-btns").addEventListener("click",(event)=>buttonClicked(event.target.innerText))
}

clickable();