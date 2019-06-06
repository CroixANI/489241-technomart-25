function addEvent(target, eventName, handler) {
  if (target.addEventListener) {
    target.addEventListener(eventName, handler);
  } else if (target.attachEvent) {
      target.attachEvent("on" + eventName, handler);
  } else {
      target["on" + eventName] = handler;
  }
}

var services = {
  selectors: {
    serviceNavigationButtons: 'service',
    serviceDetailsPanes: 'service-details',
    serviceCredit: 'service-credit'
  },
  subscribe: function() {
    var elements = document.getElementsByClassName(services.selectors.serviceNavigationButtons);
    for (var i = 0; i < elements.length; i++) {
      addEvent(elements[i], 'click', services.toggleHidden);
    }
  },
  toggleHidden: function(args) {
    var elements = document.getElementsByClassName(services.selectors.serviceNavigationButtons);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.classList.contains('active')) {
        element.classList.remove('active');
      }
    }

    args.target.classList.add('active');
    var selector = args.target.getAttribute('data-target');

    var elements = document.getElementsByClassName(services.selectors.serviceDetailsPanes);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    }

    var element = document.getElementsByClassName(selector)[0];
    element.classList.remove('hidden');
  }
}

services.subscribe();
