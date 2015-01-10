'use strict';

describe('The main view', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000');
  });


  describe('when not logged in', function(){
    it('redirects user to login page', function () {
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/login?redirect=home');
    });
  });


  describe('when logged in', function(){

    beforeEach(function () {
      element(by.model('loginCtrl.email')).sendKeys('jack@frost.com');
      element(by.model('loginCtrl.password')).sendKeys('access');

      // Submit the form. Could use one of the following:
      // element(by.model('loginCtrl.password')).sendKeys(protractor.Key.ENTER);
      // element(by.model('loginCtrl.password')).submit(); // submit whatever form this element exists on
      // element(by.buttonText('Login')).click();
      element(by.buttonText('Login')).click();

      browser.wait(function() {
          // keeps waiting until the returned promise resolves to true
          return browser.getCurrentUrl().then(function(url){
            if (url === 'http://localhost:3000/#/'){
              return true;
            } else {
              return;
            }
          });
        },
        5000,
        'browser never redirected to home after login'
      );
    });

    afterEach(function(){
      element(by.linkText('Log Out')).click();
      browser.wait(function() {
          // keeps waiting until the returned promise resolves to true
          return browser.getCurrentUrl().then(function(url){
            if (url === 'http://localhost:3000/#/login?redirect=home'){
              return true;
            } else {
              return;
            }
          });
        },
        5000,
        'browser never redirected to home after logout'
      );
    });

    it('shows the home page', function(){
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/');
    });

    it('allows adding a todo through the new todo form', function(){
      expect(element(by.model('mainCtrl.newTodoTitle')).isDisplayed()).toBe(true);

      var todosFinder = element.all(by.repeater('todo in ajstTodoListCtrl.todos track by todo.$id'));

      element.all(by.repeater('todo in ajstTodoListCtrl.todos track by todo.$id')).count()
        .then(function(originalCount){
          var newTodoTitle = 'new todo title ' + Date.now();
          element(by.model('mainCtrl.newTodoTitle')).sendKeys(newTodoTitle);
          element(by.model('mainCtrl.newTodoTitle')).submit();

          var newCount = element.all(by.repeater('todo in ajstTodoListCtrl.todos track by todo.$id')).count();

          expect(newCount).toEqual(originalCount + 1);
        });
    });
  });
});
