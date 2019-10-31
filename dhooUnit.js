'use strict'
const { AssertionError } = require('assert');

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

module.exports = {
  TestSuite,
  TestCase,
  TestResult
}
