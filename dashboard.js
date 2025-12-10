document.addEventListener( "DOMContentLoaded", function () {

  var menuItems = document.querySelectorAll( ".menu-item" )
  var sections = document.querySelectorAll( ".content-section" )
  var userNameEl = document.getElementById( "user-name" )

  function showSection( id ) {

    for ( var i = 0; i < sections.length; i++ ) {
      sections[i].classList.remove( "active" )
    }

    for ( var j = 0; j < menuItems.length; j++ ) {
      menuItems[j].classList.remove( "active" )
    }

    var menu = document.querySelector( '.menu-item[data-section="' + id + '"]' )

    if ( menu ) {
      menu.classList.add( "active" )
    }

    var sec = document.getElementById( id + "-section" )

    if ( sec ) {
      sec.classList.add( "active" )
    }
  }

  for ( var k = 0; k < menuItems.length; k++ ) {
    menuItems[k].addEventListener( "click", function ( e ) {
      var s = this.getAttribute( "data-section" )
      showSection( s )
      e.preventDefault()
    })
  }

  var cur = localStorage.getItem( "currentUser" )

  if ( cur ) {
    try {
      var u = JSON.parse( cur )
      if ( u && u.name ) {
        userNameEl.textContent = "Welcome, " + u.name + "!"
        document.getElementById( "profile-name" ).value = u.name || ""
        document.getElementById( "profile-email" ).value = u.email || ""
      }
    } catch ( e ) {}
  }

  var wishlist = localStorage.getItem( "bookHavenWishlist" )
  var list = []

  if ( wishlist ) {
    try {
      list = JSON.parse( wishlist )
    } catch ( e ) {
      list = []
    }
  }

  var container = document.getElementById( "wishlist-items" )

  if ( container ) {

    if ( list.length === 0 ) {
      container.innerHTML = "<div>No items in wishlist</div>"
    } else {
      var html = ""
      for ( var m = 0; m < list.length; m++ ) {
        var id = list[m]
        html += '<div class="wishlist-item" data-id="' + id + '">' +
                  '<img src="images/book-placeholder.jpg" width="80" height="100" />' +
                  '<div class="wishlist-details">' +
                    '<div>Book id: ' + id + '</div>' +
                  '</div>' +
                  '<button class="remove-wishlist" data-id="' + id + '">Remove</button>' +
                '</div>'
      }
      container.innerHTML = html
    }
  }

  document.addEventListener( "click", function ( e ) {
    var t = e.target
    if ( t && t.classList && t.classList.contains( "remove-wishlist" ) ) {
      var id = t.getAttribute( "data-id" )
      var w = localStorage.getItem( "bookHavenWishlist" )
      var arr = []
      if ( w ) {
        try {
          arr = JSON.parse( w )
        } catch ( e ) {
          arr = []
        }
      }
      var idx = arr.indexOf( id )
      if ( idx !== -1 ) {
        arr.splice( idx, 1 )
        localStorage.setItem( "bookHavenWishlist", JSON.stringify( arr ) )
        showNotification( "Removed from wishlist", "success" )
        location.reload()
      }
    }
  })

  var logout = document.getElementById( "logout-button" )

  if ( logout ) {
    logout.addEventListener( "click", function ( e ) {
      localStorage.removeItem( "currentUser" )
      showNotification( "Logged out", "success" )
      setTimeout( function () {
        window.location.href = "index.html"
      }, 600 )
      e.preventDefault()
    })
  }

  showSection( "profile" )
})

function showNotification( m, t ) {

  var area = document.getElementById( "notification-area" )

  if ( !area ) {
    return
  }

  var n = document.createElement( "div" )
  n.className = "notification"

  if ( t === "error" ) {
    n.className = "notification error"
  }

  n.textContent = m

  area.appendChild( n )

  setTimeout( function () {
    if ( n.parentNode ) {
      n.parentNode.removeChild( n )
    }
  }, 2500 )
}