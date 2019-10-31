const assert = require('assert');

/*
~Invoke test method~
~Invoke setUp first~
Invoke tearDown after
Invoke tearDown even if test fails
Run multiple tests
Report collected results
~Log string in WasRun~
*/

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
  run(){
    this.setUp();
    const method = this[this.name].bind(this);
    method();
    this.tearDown();
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
}

class TestCaseTest extends TestCase{
  testTemplateMethod(){
    const test = new WasRun('testMethod');
    test.run();
    assert.equal('setUp testMethod tearDown ', test.log);
  }
}

new TestCaseTest('testTemplateMethod').run();
