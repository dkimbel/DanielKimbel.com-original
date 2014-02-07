content = {
  $lastButtonPressed: null,
  somethingAlreadyDisplayed: false,

  displayClicked: function(e) {
    if (content.somethingAlreadyDisplayed && $(e.target).attr("class") === content.$lastButtonPressed.attr("class")) {
      // do nothing
    } else {
      content.$lastButtonPressed = $(e.target)
      content.transition()
    }
  },

  transition: function() {
    if (content.somethingAlreadyDisplayed) {
      $("#content").fadeOut(600, function() {
        hash.change(600, hash.inferNext())
      })
    } else {
      content.somethingAlreadyDisplayed = true
      hash.change(1000, hash.inferNext())
    }
  },

  addAndRevealNew: function(fadeTime, template) {
    var template = typeof(template) !== undefined ? template : content.getTemplate()
    content.changeHTML(template)
    content.reveal(fadeTime)
  },

  changeHTML: function(template) {
    $("#content").html(template.html())
  },

  reveal: function(fadeTime) {
    if (fadeTime >= 1000) {
      setInterval(function() {
        $("#content").fadeIn(fadeTime)
      }, 300)
    } else {
      $("#content").fadeIn(fadeTime)
    }
  },

  getTemplate: function() {
    if (content.$lastButtonPressed.hasClass("left")) {
      return $("#about")
    } else if (content.$lastButtonPressed.hasClass("center")) {
      return $("#project")
    } else if (content.$lastButtonPressed.hasClass("right")) {
      return $("#resume")
    }
  },

  clear: function() {
    $("#content").fadeOut(600, function() {
      $("#content").html('')
      hash.remove()
    })
    content.$lastButtonPressed = null
    content.somethingAlreadyDisplayed = false
  },

  fastClear: function() {
    $("#content").css("display","none")
    $("#content").html('')
    content.$lastButtonPressed = null
    content.somethingAlreadyDisplayed = false
  },

  fastReveal: function(template) {
    console.log('fastReveal called!')
    content.changeHTML(template)
    if (hash.notBlank()) {
      content.somethingAlreadyDisplayed = true
      $("#content").css("display","block")
      content.$lastButtonPressed = content.inferLastButtonPressed()
    }
  },

  inferLastButtonPressed: function() {
    var currHash = hash.get()
    var index
    if (currHash === '#about') {
      index = 0
    } else if (currHash === '#project') {
      index = 1
    } else if (currHash === '#resume') {
      index = 2
    }
    return $($('.large-nav-button')[index])
  }
}