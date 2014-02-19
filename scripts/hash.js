hash = {
  nextFadeTime: null,

  init: function() {
    window.addEventListener('hashchange', hash.handleChange)
    var currHash = location.hash
    content.fastReveal($(currHash))
  },

  handleChange: function() {
    var currHash = location.hash
    if (currHash === '') {
      content.fastClear()
    } else {
      content.somethingAlreadyDisplayed = true
      content.$lastButtonPressed = content.inferLastButtonPressed()
      content.addAndRevealNew(hash.nextFadeTime, $(currHash))
    }
  },

  change: function(fadeTime, hashName) {
    hash.nextFadeTime = fadeTime
    location.hash = hashName
  },

  remove: function() {
    location.hash = ''
  },

  notBlank: function() {
    return location.hash !== ''
  },

  get: function() {
    return location.hash
  },

  inferNext: function() {
    if (content.$lastButtonPressed.hasClass("left")) {
      return "about"
    } else if (content.$lastButtonPressed.hasClass("center")) {
      return "portfolio"
    } else if (content.$lastButtonPressed.hasClass("right")) {
      return "resume"
    }
  }
}