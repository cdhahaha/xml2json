'use strick';

var sayName = function sayName(name) {
  return name;
};

var sayAge = function sayAge(age) {
  return age;
};

var sayColor = function sayColor(color) {
  return color;
};

exports = module.exports = {
  sayName: sayName,
  sayAge: sayAge
};