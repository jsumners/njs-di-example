'use strict';

function Bar(question, answer) {
  if (! (this instanceof Bar)) {
    return new Bar(question, answer);
  }

  if (question && answer) {
    this.question = question;
    this.answer = answer;
  }
}

Bar.prototype = {
  get answer() {
    return (this._answer) ? this._answer : 42;
  },
  set answer(answer) {
    this._answer = answer;
  },

  get question() {
    return (this._question) ? this._question : 'The Ultimate Question';
  },
  set question(question) {
    this._question = question;
  }
};

Bar.prototype.toJSON = function toJSON() {
  return {
    answer: this.answer,
    question: this.question
  };
};

exports = module.exports = Bar;

// Electrolyte annotation that indicates the exported component
// is not a factory method.
exports['@literal'] = true;