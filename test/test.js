const assert = require('assert');

const { TestSuite, TestCase, TestResult } = require('../dhooUnit');

class WasRun extends TestCase{
  setUp(){
    this.log = 'setUp ';
  }
  tearDown(){
    this.log += 'tearDown ';
  }
  testMethod(){
    this.wasRun = true;
    this.log += 'testMethod ';
  }
  testBrokenMethod(){
    throw Error('Boo!');
  }
}

class TestCaseTest extends TestCase{
  setUp(){
    this.result = new TestResult();
    this.test = new WasRun('testMethod');
  }
  testTemplateMethod(){
    this.test.run(this.result);
    assert.equal('setUp testMethod tearDown ', this.test.log);
  }
  testResult(){
    const result = this.test.run(this.result);
    assert.equal('1 run, 0 failed', this.result.summary());
  }
  testFailedResult(){
    const test = new WasRun('testBrokenMethod');
    const result = test.run(this.result);
    assert.equal('1 run, 1 failed', this.result.summary());
  }
  testFailedResultFormatting(){
    const result = new TestResult();
    result.testStarted();
    result.testFailed();
    assert.equal('1 run, 1 failed', result.summary());
  }
  testSuite(){
    const suite = new TestSuite();
    suite.add(new WasRun('testMethod'));
    suite.add(new WasRun('testBrokenMethod'));
    suite.run(this.result);
    assert.equal('2 run, 1 failed', this.result.summary());
  }
}

const suite = new TestSuite();
suite.add(new TestCaseTest('testTemplateMethod'));
suite.add(new TestCaseTest('testResult'));
suite.add(new TestCaseTest('testFailedResult'));
suite.add(new TestCaseTest('testFailedResultFormatting'));
suite.add(new TestCaseTest('testSuite'));
const result = new TestResult();
suite.run(result);
console.log(result.summary());
