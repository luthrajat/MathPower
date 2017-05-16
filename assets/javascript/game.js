/**
Copyright (c) 2011-2017 GitHub Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


This application bundles the following third-party packages in accordance
with the following licenses:


Package: *
License: BSD
License Source: LICENSE
Source Text:

Copyright (c) Rajat Luthra (rajatluthra@gmail.com)
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

**/
/**
  Author: Rajat Luthra
  Date:   May 12th, 2017.

  Purpose: Pony Math Power Game js.
**/

var win = 0;
var lose = 0;
var currentCount = 0;
var operators = [];
var currentAnswer = 0;

var gameWins = 0;
var gameLost = 0;

function initGame() {
  var checkedBoxes = $("input:checked");
  operators = [];
  if (checkedBoxes.length==0) {
      $("#addition").prop('checked', true);
      $("#subtract").prop('checked', true);
      operators = ["+", "-"];
  }
  checkedBoxes.each(updateOperators);
  win = 0;
  lose = 0;
  currentCount=0;
  reset();
}

function updateOperators(item, index) {
  operators.push($(this).attr("value"));
}

function reset() {
  var ccCount = $("#questionCount option:selected").text();
  console.log(currentCount + " - " + ccCount);
  if(currentCount==parseInt(ccCount)) {
    console.warn(currentCount + " - " + ccCount);
    if (win==ccCount) {
        updateSpan("#win", (++gameWins));
    } else {
        updateSpan("#lose", (++gameLost));
    }
    win=0;
    lose=0;
    currentCount = 0;
    $("#first-number").empty();
    $("#operatpr").empty();
    $("#first-number").empty();
    $("#result").text("");
  }
  $(".panel-title").text("Question: " + (currentCount+1) + " / " + ccCount);
  displayNewQuestion();
}

function clearResult() {
  $("#result").text("");
}

function displayNewQuestion() {
  currentCount++;
  var min = $("#minCategory option:selected").text();
  var max = $("#maxCategory option:selected").text();
  var firstNumber = getRandomInt(min, max);
  var secondNumber = getRandomInt(min, max);
  var operator = operators[getRandomInt(0, operators.length-1)];

  if(secondNumber>firstNumber) {
    var tmp = firstNumber;
    firstNumber = secondNumber;
    secondNumber = tmp;
  }

  $("#result").text("");
  $("#first-number").text(firstNumber);
  $("#operator").text(operator);
  $("#second-number").text(secondNumber);

  currentAnswer = getCurrentAnswer(firstNumber, operator, secondNumber);
}

function getCurrentAnswer(firstNumber, operator, secondNumber) {
    var result = 0;
    switch (operator) {
      case '+':
        result = addNumbers(firstNumber, secondNumber);
        break;
      case '-':
        result = subNumbers(firstNumber, secondNumber);
        break;
      case '*':
        result = mulNumbers(firstNumber, secondNumber);
        break;
      case '*':
        result = divNumbers(firstNumber, secondNumber);
        break;
      case '^':
        result = powNumbers(firstNumber, secondNumber);
        break;
      default:
        result =0;
    }
    return result;
}

function addNumbers(value1, value2) {
      return parseInt(value1) + parseInt(value2);
  }

  function subNumbers(value1, value2) {
    return parseInt(value1) - parseInt(value2);
  }

  function mulNumbers(value1, value2) {
    return parseInt(value1) * parseInt(value2);
  }

  function divNumbers(value1, value2) {
    return parseInt(value1) / parseInt(value2);
  }

  function powNumbers(value1, value2) {
    return Math.pow(parseInt(value1), parseInt(value2));
  }

document.onkeypress = function(event) {
  if (event.which>=48 && event.which<59) {
    $("#result").text($("#result").text()+event.key);
  } else if (event.which==13) {
    playGame($("#result").text());
  }
}

function playGame(userTotal) {
    if(currentAnswer==userTotal) {
      updateScoreBoardOnScreen(currentAnswer, userTotal, true);
      win++;
      reset();
    }  else {
      updateScoreBoardOnScreen(currentAnswer, userTotal, false);
      reset();
    }
}

function updateMyChoices(myNewSelection) {
  var olList = document.getElementById('myChoices');
  var entry = document.createElement('li');
  entry.id = myNewSelection;
  entry.appendChild(document.createTextNode(myNewSelection));
  olList.appendChild(entry);
}

function clearUserInputs() {
  var olList = document.getElementById('myChoices');
  olList.innerHTML = '';
}

function updateScoreBoardOnScreen(valueOne, valueTwo, success) {
  var scoreBoardTable  = document.getElementById("scoreBoard");

  /** Using -1 to add row at the end, use 0 if you want to add new row on top. **/
  var newRow = scoreBoardTable.insertRow(-1);

  /** adding 3 new columns . **/
  var myCol = newRow.insertCell(0);
  var coCol = newRow.insertCell(1);
  var dCol = newRow.insertCell(2);

  /** Adding text to newly added 3 row cells **/
  myCol.innerHTML = $("#first-number").text()  + " " + $("#operator").text() + " " + $("#second-number").text() + " = " + valueOne;
  coCol.innerHTML = valueTwo;
  dCol.innerHTML = success ? "Yes" : "No";
}

function getRandomInt(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateSpan(id, value) {
  var spanObj = $(id);
  spanObj.html(value);
}
