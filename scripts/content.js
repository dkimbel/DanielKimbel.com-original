content = {
  currentDisplayed: null,
  displayClicked: function(e) {
    if (e.target.id === content.currentDisplayed) {
      // do nothing
    } else {
      content.currentDisplayed = e.target.class
      content.transition(content.currentDisplayed)
    }
  },
  transition: function(buttonPressedClass) {
    $("#content").fadeOut(400, function() {
      content.changeHTML(buttonPressedClass)
      $("#content").fadeIn()
    })
  },
  changeHTML: function(buttonPressedClass) {
    var template = null
    if (buttonPressedClass === "left") {
      template = $("#about")
    } else if (buttonPressedClass === "center") {
      template = $("#project")
    } else if (buttonPressedClass === "right") {
      template = $("#resume")
    }
    $("#content").html(template.html())
  }
}