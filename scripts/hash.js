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
      content.addAndRevealNew(hash.nextFadeTime, $(currHash))
    }
  },

  change: function(fadeTime, hashName) {
    hash.nextFadeTime = fadeTime
    location.hash = hashName
  },

  remove: function() {
    location.hash = ''
  }
}