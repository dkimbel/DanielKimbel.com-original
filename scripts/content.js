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
        content.addAndRevealNewContent(600)
      })
    } else {
      content.somethingAlreadyDisplayed = true
      content.addAndRevealNewContent(1200)
    }
  },

  addAndRevealNewContent: function(fadeTime) {
    content.changeHTML()
    $("#content").fadeIn(fadeTime)
  },

  changeHTML: function() {
    var template = null
    if (content.$lastButtonPressed.hasClass("left")) {
      template = $("#about")
    } else if (content.$lastButtonPressed.hasClass("center")) {
      template = $("#project")
    } else if (content.$lastButtonPressed.hasClass("right")) {
      template = $("#resume")
    }
    $("#content").html(template.html())
  },

  clear: function() {
    $("#content").fadeOut(600, function() {
      $("#content").html('')
    })
    content.$lastButtonPressed = null
    content.somethingAlreadyDisplayed = false
  }
}