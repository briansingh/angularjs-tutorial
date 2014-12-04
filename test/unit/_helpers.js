beforeEach(function () {
  var store = {};

  spyOn(localStorage, 'getItem').andCallFake(function (key) {
    return store[key];
  });
  spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
    return store[key] = value.toString();
  });
  spyOn(localStorage, 'clear').andCallFake(function () {
    store = {};
  });
  localStorage.clear();
});
