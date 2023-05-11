var field;
var justSolved = false;

function numberHandler (ev) {
  flushTest();
  field.val(field.val() + $(ev.target).text());
}

function operatorHandler (ev) {
  var char = $(ev.target).text();

  flushTest();
  
  switch (char) {
    case "=":
      solve();
      break;
    default:
      field.val(field.val() + char);
  }
}

function actionHandler (ev) {
  var text = $(ev.target).text();
  var str;
  
  switch (text) {
    case "AC":
      reset();
      break;
    case "CE":
      flushTest();
      str = field.val();;
      field.val(str.substring(0, str.length - 1));
      break;
  }
}

function solve () {
  var str = field.val().replace("×", "*").replace("÷","/").replace("−", "-");
  var result;
  
  try {
    result = eval(str)
  } catch(e) {
    result = "NaN";
  }
  
  justSolved = true;
  field.val(result);
}

function reset () {
  field.val("");
}

function flushTest () {
  if (justSolved) {
    reset();
    justSolved = false;
  }
}

$(document).ready(function () {
  field = $("#field");
  $(".btn-number").on("click", numberHandler);
  $(".btn-operator").on("click", operatorHandler);
  $(".btn-action").on("click", actionHandler);
});