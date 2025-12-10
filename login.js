document.addEventListener( "DOMContentLoaded", function () {

  var f = document.getElementById( "loginForm" )

  if ( f ) {
    f.addEventListener( "submit", function ( e ) {

      e.preventDefault()

      var email = document.getElementById( "email" ).value.trim()
      var password = document.getElementById( "password" ).value

      if ( !email || !password ) {
        showNotification( "Please fill in all fields", "error" )
        return
      }

      if ( email === "demo@email.com" && password === "password123" ) {
        localStorage.setItem( "currentUser", JSON.stringify( { name: "Demo User", email: email } ) )
        showNotification( "Welcome Demo User", "success" )

        setTimeout( function () {
          window.location.href = "index.html"
        }, 700 )

        return
      }

      var u = localStorage.getItem( "bookHavenUsers" )
      var users = []

      if ( u ) {
        try {
          users = JSON.parse( u )
        } catch ( e ) {
          users = []
        }
      }

      var ok = false
      var name = ""

      for ( var i = 0; i < users.length; i++ ) {
        if ( users[i].email === email && users[i].password === password ) {
          ok = true
          name = users[i].name
          break
        }
      }

      if ( ok ) {
        localStorage.setItem( "currentUser", JSON.stringify( { name: name, email: email } ) )
        showNotification( "Welcome " + name, "success" )

        setTimeout( function () {
          window.location.href = "index.html"
        }, 700 )

      } else {
        showNotification( "Invalid email or password", "error" )
      }
    })
  }
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