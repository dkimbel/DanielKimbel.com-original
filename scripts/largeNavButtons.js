largeNavButtons = {
  lastHoveredClass: null,
  lastHoveredColor: null,
  $lastAssociatedShadows: null,
  animationClasses: ["rotate-fast", "rotate-medium", "rotate-slow"],

  init: function() {
    $(".large-nav-button").hover(largeNavButtons.hoverOn, largeNavButtons.hoverOff)
    .click(content.displayClicked)
    .click(largeNavButtons.brieflyExpandAllBorders)
  },

  brieflyExpandAllBorders: function() {
    for (i in largeNavButtons.$lastAssociatedShadows) {
      var currShadow = largeNavButtons.$lastAssociatedShadows[i]
      largeNavButtons.brieflyExpandBorders(currShadow)
    }
  },

  brieflyExpandBorders: function(currShadow) {
    if (currShadow.hasClass('one')) {
      currShadow.animate({'height':'172px', 'width':'172px', 'border-width':'10px'}, 100, function() {
        currShadow.animate({'height':'182px', 'width':'182px', 'border-width':'5px'}, 100)
      })
    } else if (currShadow.hasClass('two')) {
      currShadow.animate({'height':'156px', 'width':'156px', 'border-width':'18px'}, 100, function() {
        currShadow.animate({'height':'174px', 'width':'174px','border-width':'9px'}, 100)
      })
    } else if (currShadow.hasClass('three')) {
      currShadow.animate({'height':'136px', 'width':'136px', 'border-width':'28px'}, 100, function() {
        currShadow.animate({'height':'164px', 'width':'164px', 'border-width':'14px'}, 100)
      })
    }
  },

  hoverOn: function() {
    largeNavButtons.lastHoveredClass = largeNavButtons.getLastHoveredClass(this)
    largeNavButtons.lastHoveredColor = largeNavButtons.getLastHoveredColor(this)
    $(this).css("background", "transparent")
    largeNavButtons.$lastAssociatedShadows = largeNavButtons.getAssociatedShadows()
    largeNavButtons.toggleAppearances()
  },

  hoverOff: function() {
    $(this).css("background", largeNavButtons.lastHoveredColor)
    largeNavButtons.toggleAppearances()
  },

  toggleAppearances: function() {
    for (i in largeNavButtons.$lastAssociatedShadows) {
      var currShadow = largeNavButtons.$lastAssociatedShadows[i]
      currShadow.toggleClass('hidden')
      currShadow.toggleClass(largeNavButtons.animationClasses[i])
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