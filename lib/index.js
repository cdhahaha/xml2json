'use strick';

var sayName = function sayName(name) {
  return name;
};

var sayAge = function sayAge(age) {
  return age;
};

exports = module.exports = {
  sayName: sayName,
  sayAge: sayAge
};