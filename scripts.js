function getHistory() {
    return document.getElementById("history-value").innerText;
}
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}
function printOutput(num) {
    document.getElementById("output-value").innerText = num;
}






function historyDataShow() {
    var histryDataCall = document.getElementById("history-value-show");
    var storeString = "";
    for (var key in historyData) {
        // console.log('key',key);
        storeString += "" + historyData[key]["expression"] + "=" + "<br>"
            + historyData[key]["result"] + "<br>";
    }
    histryDataCall.innerHTML = storeString;
}
var historyData = [];
var expressionData = "";
var resultData = "";
var isPercentage = false;
var valOne;
var operatorr = document.getElementsByClassName("operator");

for (var i = 0; i < operatorr.length; i++) {
    operatorr[i].addEventListener('click', function () {

        if (this.id == "clear") {
            printHistory("");
            printOutput("0");
        }
        else if (this.id =="moduls") {
            var output = getOutput();
            var moduls = (output / 100);
            printOutput(moduls);
        }
        else if (this.id == "%") {
            valOne = getOutput()
            printHistory(valOne + "%")
            valOne = valOne/100
            printOutput("")
            isPercentage = true

        }
        else if (this.id == "delete") {
            historyData = [];
            historyDataShow();
        }
        else if (this.id == "backspace") {
            var output = getOutput();
            if (output) {

                if (output.length > 1) {
                    output = output.substring(0, output.length - 1);
                    printOutput(output);
                }
                else {
                    printOutput("0");
                }
            }
            else {
                printOutput("0");
            }
        }
            
        else {
            var output = getOutput();
            var history = getHistory();
            if (output != "") {
                if (output == resultData) {
                    output = "";
                } else {
                    history = history + output;
                }
              
                if (this.id == '=') {
                    if (isPercentage) {
                        var valTwo = getOutput();
                        printHistory(history);
                        var resultP = valOne * valTwo;
                        printOutput(resultP);
                        resultData = resultP;
                        isPercentage = false;
                        historyData.push({
                            expression: history, result: resultP
                        });
                        historyDataShow();
                    }
                    else {
                        // result = "";
                        var result = eval(history);
                        resultData = result;
                        // output = result;
                        expressionData = history;
                        historyData.push({
                            expression: expressionData, result: resultData  
                        });
                    }
                    historyDataShow();
                    // printOutput(result);
                    printOutput(resultData);
                    printHistory(history);
                }
                else { 
                    if (Number(document.getElementById("output-value").innerText)== resultData) {
                        if (Number(document.getElementById("output-value").innerText) > 0) {
                            history = (document.getElementById("output-value").innerText);
                            // console.log(history);
                        }    
                    }
                    history = eval(history);
                    history = history + this.id;
                    printOutput("");
                    printHistory(history);
                }
            }
            else {
                history = history.substring(0, history.length - 1);
                history = history + this.id;
                printHistory(history);
            }
        }
    })
}
printOutput("0");
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {

    number[i].addEventListener('click', function () {

        var output = getOutput();

        if (!output.includes(".") && this.id == ".") {
            output = output + this.id;
            printOutput(output);
        }
        if (output == '0') {
            output = "";
        }
        if (output != NaN && this.id != ".") {
            if (output == resultData && output != "") {
                printHistory("");
                output = "";
            }
            output = output + this.id;
            printOutput(output);
        }
    });


}