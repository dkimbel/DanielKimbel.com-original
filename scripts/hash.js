hash = {
  init: function() {
    window.addEventListener('hashchange', hash.handleChange)
  },

  handleChange: function() {
    var currHash = location.hash
    if (currHash === '') {
      content.clear()
    } else {
      content.addAndRevealNew(600, $(currHash))
    }
  },

  change: function(fadeTime, hashName) {
    location.hash = hashName
  },

  remove: function() {
    location.hash = ''
  }
}