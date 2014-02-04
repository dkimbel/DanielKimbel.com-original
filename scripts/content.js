content = {
  currentDisplayed: null,
  displayClicked: function(e) {
    if (e.target.id === content.currentDisplayed) {
      // do nothing
    } else {
      content.currentDisplayed = e.target.id
      content.transition(content.currentDisplayed)
    }
  },
  transition: function(buttonPressedID) {
    $("#content").fadeOut(400, function() {
      content.changeHTML(buttonPressedID)
      $("#content").fadeIn()
    })
  },
  changeHTML: function(buttonPressedID) {
    var template = null
    if (buttonPressedID === "left") {
      template = $("#about")
    } else if (buttonPressedID === "center") {
      template = $("#project")
    } else if (buttonPressedID === "right") {
      template = $("#resume")
    }
    $("#content").html(template.html())
  }
}