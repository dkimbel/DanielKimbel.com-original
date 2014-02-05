largeNavButtons = {
  lastHoveredClass: null,
  lastHoveredColor: null,
  $lastAssociatedShadows: null,
  animationClasses: ["rotate-fast", "rotate-medium", "rotate-slow"],

  init: function() {
    $(".large-nav-button").hover(largeNavButtons.hoverOn, largeNavButtons.hoverOff)
    .click(content.displayClicked)
  },

  hoverOn: function() {
    largeNavButtons.lastHoveredClass = largeNavButtons.getLastHoveredClass(this)
    largeNavButtons.lastHoveredColor = largeNavButtons.getLastHoveredColor(this)
    $(this).css("background", "transparent")
    largeNavButtons.$lastAssociatedShadows = largeNavButtons.getAssociatedShadows()
    for (i in largeNavButtons.$lastAssociatedShadows) {
      largeNavButtons.$lastAssociatedShadows[i].toggleClass('hidden')
      largeNavButtons.$lastAssociatedShadows[i].toggleClass(largeNavButtons.animationClasses[i])
    }
  },

  hoverOff: function() {
    $(this).css("background", largeNavButtons.lastHoveredColor)
    for (i in largeNavButtons.$lastAssociatedShadows) {
      largeNavButtons.$lastAssociatedShadows[i].toggleClass('hidden')
      largeNavButtons.$lastAssociatedShadows[i].toggleClass(largeNavButtons.animationClasses[i])
    }
  },

  getLastHoveredClass: function(self) {
    var classes = $(self).attr("class").split(" ")
    for (var i in classes) {
      if (classes[i] === "left" || classes[i] === "center" || classes[i] === "right") {
        return classes[i]
      }
    }
  },

  getLastHoveredColor: function(self) {
    return $(self).css("background")
  },

  getAssociatedShadows: function() {
    var shadows = $(".shadow")
    var associatedShadows = []
    for (var i = 0; i < shadows.length; i++) {
      if ($(shadows[i]).hasClass(largeNavButtons.lastHoveredClass)) {
        associatedShadows.push($(shadows[i]))
      }
    }
    return associatedShadows
  }
}