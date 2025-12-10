document.addEventListener( "DOMContentLoaded", function () {

  var f = document.getElementById( "signupForm" )

  if ( f ) {
    f.addEventListener( "submit", function ( e ) {

      e.preventDefault()

      var name  = document.getElementById( "fullname" ).value.trim()
      var email = document.getElementById( "email" ).value.trim()
      var pass  = document.getElementById( "password" ).value
      var conf  = document.getElementById( "confirmPassword" ).value

      var ok = true

      document.getElementById( "err-fullname" ).textContent = ""
      document.getElementById( "err-email" ).textContent = ""
      document.getElementById( "err-password" ).textContent = ""
      document.getElementById( "err-confirm" ).textContent = ""

      if ( !name ) {
        document.getElementById( "err-fullname" ).textContent = "Full name is required."
        ok = false
      }

      if ( !email || email.indexOf( "@" ) === -1 ) {
        document.getElementById( "err-email" ).textContent = "Enter a valid email."
        ok = false
      }

      if ( !pass || pass.length < 6 ) {
        document.getElementById( "err-password" ).textContent = "Password must be at least 6 characters."
        ok = false
      }

      if ( pass !== conf ) {
        document.getElementById( "err-confirm" ).textContent = "Passwords do not match."
        ok = false
      }

      if ( !ok ) {
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

      for ( var i = 0; i < users.length; i++ ) {
        if ( users[i].email === email ) {
          showNotification( "Email already exists", "error" )
          return
        }
      }

      users.push( { name: name, email: email, password: pass } )
      localStorage.setItem( "bookHavenUsers", JSON.stringify( users ) )
      localStorage.setItem( "currentUser", JSON.stringify( { name: name, email: email } ) )

      showNotification( "Welcome " + name, "success" )

      setTimeout( function () {
        window.location.href = "index.html"
      }, 700 )

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