largeNavButtons = {
  init: function() {
    $(".large-nav-button").hover(largeNavButtons.hoverOn, largeNavButtons.hoverOff)
    .click(content.displayClicked)
  },
  hoverOn: function() {
    $(this).css("background", "#FFF")
  },
  hoverOff: function() {
    $(this).css("background", "#EEE")
  }
}