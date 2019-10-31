const assert = require('assert');
const { TestSuite, TestCase, TestResult } = require('../dhooUnit');

class SimpleMaths extends TestCase{
  testAddition(){
    assert.equal(2, 1 + 1);
  }
  //deliberately failing test
  testBadAddition(){
    assert.equal(2, 10 + 1);
  }
}

const suite = new TestSuite();
suite.add(new SimpleMaths('testAddition'));
suite.add(new SimpleMaths('testBadAddition'));
const result = new TestResult();
suite.run(result);
console.log(result.summary());
