const assert = require('assert');
const { AssertionError } = assert;

/*
~Invoke test method~
~Invoke setUp first~
~Invoke tearDown after~
Invoke tearDown even if test fails
Run multiple tests
Report collected results
~Log string in WasRun~
Report failed tests
*/

class TestSuite{
  constructor(){
    this.tests = [];
  }
  add(test){
    this.tests.push(test);
  }
  run(result){
    for(let test of this.tests){
      test.run(result);
    }
  }
}

class TestCase{
  constructor(name){
    this.name = name;
  }
  setUp(){
    //placeholder
  }
  tearDown(){
    //placeholder
  }
  run(result){
    result.testStarted();
    this.setUp();
    try{
      const method = this[this.name].bind(this);
      method();
    }catch(e){
      if(e instanceof AssertionError){
        console.log(e);
      }
      result.testFailed();
    }
    this.tearDown();
  }
}

class TestResult{
  constructor(){
    this.runCount = 0;
    this.errorCount = 0;
  }
  testStarted(){
    this.runCount += 1;
  }
  testFailed(){
    this.errorCount += 1;
  }
  summary(){
    return `${this.runCount} run, ${this.errorCount} failed`;
  }
}

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
