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
        hash.change(600, content.getHash())
      })
    } else {
      content.somethingAlreadyDisplayed = true
      hash.change(1000, content.getHash())
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

  getHash: function() {
    if (content.$lastButtonPressed.hasClass("left")) {
      return "about"
    } else if (content.$lastButtonPressed.hasClass("center")) {
      return "project"
    } else if (content.$lastButtonPressed.hasClass("right")) {
      return "resume"
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
    content.changeHTML(template)
    $("#content").css("display","block")
  }
}