content = {
  $lastButtonPressed: null,
  somethingAlreadyDisplayed: false,

  displayClicked: function(e) {
    if (content.somethingAlreadyDisplayed && $(e.target).attr("class") === content.$lastButtonPressed.attr("class")) {
      // do nothing
    } else {
      content.$lastButtonPressed = $(e.target)
      content.transition(content.currentDisplayed)
    }
  },

  transition: function() {
    if (content.somethingAlreadyDisplayed) {
      $("#content").fadeOut(400, function() {
        content.addAndRevealNewContent()
      })
    } else {
      content.somethingAlreadyDisplayed = true
      content.addAndRevealNewContent()
    }
  },

  addAndRevealNewContent: function() {
    content.changeHTML()
    $("#content").fadeIn()
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
  }
}