hash = {
  init: function() {
    window.addEventListener('hashchange', handleChange)
  },

  handleChange: function() {
    var currHash = location.hash
    if (currHash === '') {
      content.clear()
    } else {
      content.addAndRevealNew('#' + currHash)
    }
  },

  change: function(hashName) {
    location.hash = hashName
  }
}