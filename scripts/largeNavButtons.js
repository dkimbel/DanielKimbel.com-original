largeNavButtons = {
  lastHoveredClass: null,
  lastColor: null,
  lastTouchedColor: null,
  $lastButtonTouched: null,
  $lastAssociatedShadows: null,
  animationClasses: ["rotate-fast", "rotate-medium", "rotate-slow"],

  init: function() {
    $(".large-nav-button").hover(this.hoverOn, this.hoverOff)
    .click(content.displayClicked)
    .click(this.brieflyExpandAllBorders)
    .on('touchstart', this.handleTouch)
  },

  brieflyExpandAllBorders: function() {
    for (i in largeNavButtons.$lastAssociatedShadows) {
      var currShadow = largeNavButtons.$lastAssociatedShadows[i]
      largeNavButtons.brieflyExpandBorders(currShadow)
    }
  },

  brieflyExpandBorders: function(currShadow) {
    var animateTime = 200
    if (currShadow.hasClass('one')) {
      currShadow.animate({'height':'172px', 'width':'172px', 'border-width':'10px'}, animateTime, function() {
        currShadow.animate({'height':'182px', 'width':'182px', 'border-width':'5px'}, animateTime)
      })
    } else if (currShadow.hasClass('two')) {
      currShadow.animate({'height':'156px', 'width':'156px', 'border-width':'18px'}, animateTime, function() {
        currShadow.animate({'height':'174px', 'width':'174px','border-width':'9px'}, animateTime)
      })
    } else if (currShadow.hasClass('three')) {
      currShadow.animate({'height':'136px', 'width':'136px', 'border-width':'28px'}, animateTime, function() {
        currShadow.animate({'height':'164px', 'width':'164px', 'border-width':'14px'}, animateTime)
      })
    }
  },

  hoverOn: function() {
    largeNavButtons.lastHoveredClass = largeNavButtons.getLastHoveredClass(this)
    largeNavButtons.lastColor = largeNavButtons.getLastColor(this)
    $(this).css("background", "transparent")
    largeNavButtons.$lastAssociatedShadows = largeNavButtons.getAssociatedShadows()
    largeNavButtons.toggleAppearances()
  },

  hoverOff: function() {
    $(this).css("background", largeNavButtons.lastColor)
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

  getLastColor: function(self) {
    return $(self).css("background")
  },

  getLastTouchedColor: function() {
    return largeNavButtons.$lastButtonTouched.css("background")
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
  },

  handleTouch: function(e) {
    largeNavButtons.$lastButtonTouched = $(e.target)
    largeNavButtons.lastTouchedColor = largeNavButtons.getLastTouchedColor()
    e.preventDefault()
    largeNavButtons.flashTouchedColor()
    largeNavButtons.$lastButtonTouched.trigger('click')
  },

  flashTouchedColor: function() {
    largeNavButtons.$lastButtonTouched.css('background','#eee')
    setTimeout(function() {
      largeNavButtons.$lastButtonTouched.css('background',largeNavButtons.lastTouchedColor)
    }, 100)
  }
}