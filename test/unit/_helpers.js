beforeEach(function () {
  var store = {};

  spyOn(localStorage, 'getItem').and.callFake(function (key) {
    return store[key];
  });
  spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
    return store[key] = value.toString();
  });
  spyOn(localStorage, 'clear').and.callFake(function () {
    store = {};
  });
  localStorage.clear();
});
