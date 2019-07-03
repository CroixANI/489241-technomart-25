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

var contactUs = {
  selectors: {
    modalDialog: 'modal-contact',
    closeButton: 'close-button',
    contactUsButton: 'contacts-us-button'
  },
  subscribe: function() {
    var button = document.getElementsByClassName(contactUs.selectors.contactUsButton)[0];
    if (button === undefined) {
      return;
    }
    addEvent(button, 'click', contactUs.showModal);
    var modal = document.getElementsByClassName(contactUs.selectors.modalDialog)[0];
    var closeButton = modal.getElementsByClassName(contactUs.selectors.closeButton)[0];
    addEvent(closeButton, 'click', contactUs.closeModal);
  },
  showModal: function() {
    var modal = document.getElementsByClassName(contactUs.selectors.modalDialog)[0];
    modal.classList.remove('hidden');
  },
  closeModal: function() {
    var modal = document.getElementsByClassName(contactUs.selectors.modalDialog)[0];
    if (!modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  }
}

var map = {
  selectors: {
    modalDialog: 'modal-map',
    closeButton: 'close-button',
    mapLink: 'map-link'
  },
  subscribe: function() {
    var link = document.getElementsByClassName(map.selectors.mapLink)[0];
    if (link === undefined) {
      return;
    }
    addEvent(link, 'click', map.showModal);
    var modal = document.getElementsByClassName(map.selectors.modalDialog)[0];
    var closeButton = modal.getElementsByClassName(map.selectors.closeButton)[0];
    addEvent(closeButton, 'click', map.closeModal);
  },
  showModal: function(args) {
    args.preventDefault();
    var modal = document.getElementsByClassName(map.selectors.modalDialog)[0];
    modal.classList.remove('hidden');
  },
  closeModal: function() {
    var modal = document.getElementsByClassName(map.selectors.modalDialog)[0];
    if (!modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  }
}

var addToCart = {
  selectors: {
    modalDialog: 'modal-cart',
    closeButton: 'close-button',
    buyButton: 'button-buy',
    continueShopping: 'continue-button'
  },
  subscribe: function() {
    var buttons = document.getElementsByClassName(addToCart.selectors.buyButton);
    for (var i = 0; i < buttons.length; i++) {
      addEvent(buttons[i], 'click', addToCart.showModal);
    }
    var modal = document.getElementsByClassName(addToCart.selectors.modalDialog)[0];
    if (modal === undefined) {
      return;
    }
    var closeButton = modal.getElementsByClassName(addToCart.selectors.closeButton)[0];
    if (closeButton === undefined) {
      return;
    }
    addEvent(closeButton, 'click', addToCart.closeModal);
    var continueButton = modal.getElementsByClassName(addToCart.selectors.continueShopping)[0];
    addEvent(continueButton, 'click', addToCart.closeModal);
  },
  showModal: function(args) {
    args.preventDefault();
    var modal = document.getElementsByClassName(addToCart.selectors.modalDialog)[0];
    modal.classList.remove('hidden');
  },
  closeModal: function() {
    var modal = document.getElementsByClassName(addToCart.selectors.modalDialog)[0];
    if (!modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  }
}

var slider = {
  selectors: {
    slide: 'slide',
    previousButton: 'button-previous',
    nextButton: 'button-next',
    radioButton: 'radio-button'
  },
  totalSlides: 0,
  currentIndex: 0,
  subscribe: function() {
    var buttons = document.getElementsByClassName(slider.selectors.radioButton);
    for (var i = 0; i < buttons.length; i++) {
      addEvent(buttons[i], 'click', slider.handleRadioButtonClick);

      var attr = buttons[i].getAttribute('checked');
      if (attr != undefined && attr != null) {
        slider.currentIndex = parseInt(buttons[i].getAttribute('data-index'));
      }
    }

    slider.totalSlides = buttons.length;

    var nextButton = document.getElementsByClassName(slider.selectors.nextButton)[0];
    if (nextButton === undefined) {
      return;
    }
    addEvent(nextButton, 'click', slider.handleNextButtonClick);

    var previousButton = document.getElementsByClassName(slider.selectors.previousButton)[0];
    addEvent(previousButton, 'click', slider.handlePreviousButtonClick);
  },
  handleRadioButtonClick: function(args) {
    var slideIndex = parseInt(args.target.getAttribute('data-index'));
    slider.changeSlideByIndex(slideIndex);
  },
  handlePreviousButtonClick: function() {
    var newIndex = slider.currentIndex - 1;
    if (newIndex < 0) {
      newIndex = slider.totalSlides - 1;
    }
    var buttons = document.getElementsByClassName(slider.selectors.radioButton);
    buttons[newIndex].click();
    slider.changeSlideByIndex(newIndex);
  },
  handleNextButtonClick: function() {
    var newIndex = slider.currentIndex + 1;
    if (newIndex >= slider.totalSlides) {
      newIndex = 0;
    }
    var buttons = document.getElementsByClassName(slider.selectors.radioButton);
    buttons[newIndex].click();
    slider.changeSlideByIndex(newIndex);
  },
  changeSlideByIndex: function(index) {
    var slides = document.getElementsByClassName(slider.selectors.slide);
    if (!slides[slider.currentIndex].classList.contains('hidden')) {
      slides[slider.currentIndex].classList.add('hidden');
    }
    slides[index].classList.remove('hidden');
    slider.currentIndex = index;
  }
}

services.subscribe();
contactUs.subscribe();
map.subscribe();
addToCart.subscribe();
slider.subscribe();
