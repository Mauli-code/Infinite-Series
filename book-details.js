var BOOKS = [
  { id: "b1", title: "The Lost Library", author: "A. Reader", price: 12.99, genre: "fiction", img: "images/book1.jpg", description: "A story about a hidden library." },
  { id: "b2", title: "Starlight Journey", author: "M. Voyager", price: 15.50, genre: "fantasy", img: "images/book2.jpg", description: "A fantasy adventure among stars." },
  { id: "b3", title: "Mystery of the Clock", author: "C. Sleuth", price: 9.99, genre: "mystery", img: "images/book3.jpg", description: "A detective mystery set in an old town." },
  { id: "b4", title: "Thoughts & Theory", author: "D. Thinker", price: 18.00, genre: "non-fiction", img: "images/book4.jpg", description: "Essays about science and life." },
  { id: "b5", title: "Forest Tales", author: "E. Green", price: 11.25, genre: "fiction", img: "images/book5.jpg", description: "Short tales from the forest." },
  { id: "b6", title: "Deep Magic", author: "F. Mage", price: 13.75, genre: "fantasy", img: "images/book6.jpg", description: "Magic and mystery collide." }
]

function param( name ) {

  var parts = location.search.replace( "?", "" ).split( "&" )

  for ( var i = 0; i < parts.length; i++ ) {
    var p = parts[i].split( "=" )

    if ( p[0] === name ) {
      return decodeURIComponent( p[1] || "" )
    }
  }

  return ""
}

var id = param( "id" )
var el = document.getElementById( "book-details" )

if ( el ) {

  var found = null

  for ( var i = 0; i < BOOKS.length; i++ ) {
    if ( BOOKS[i].id === id ) {
      found = BOOKS[i]
      break
    }
  }

  if ( !found ) {

    el.innerHTML =
      '<h2>Book not found</h2>' +
      '<p><a href="books.html">Back to books</a></p>'

  } else {

    el.innerHTML =
      '<div style="display:flex;gap:16px;flex-wrap:wrap">' +
        '<div style="width:260px">' +
          '<img src="' + found.img + '" alt="" style="width:100%;border-radius:8px" />' +
        '</div>' +
        '<div style="flex:1">' +
          '<h2>' + found.title + '</h2>' +
          '<div class="small">by ' + found.author + '</div>' +
          '<div style="color:#8b6b46;font-weight:bold;margin-top:8px">$' + found.price.toFixed(2) + '</div>' +
          '<p style="margin-top:12px">' + found.description + '</p>' +
          '<div style="margin-top:12px">' +
            '<button id="add" style="background:#8b6b46;color:#fff;padding:8px 12px;border-radius:6px;border:none;cursor:pointer">Add to Cart</button> ' +
            '<button id="wish" style="padding:8px 12px;border-radius:6px;border:1px solid #ddd;cursor:pointer">Add to Wishlist</button>' +
          '</div>' +
        '</div>' +
      '</div>'

    var addBtn  = document.getElementById( "add" )
    var wishBtn = document.getElementById( "wish" )

    if ( addBtn ) {
      addBtn.addEventListener( "click", function () {

        var d = localStorage.getItem( "bookHavenCart" )
        var items = []

        if ( d ) {
          try {
            items = JSON.parse( d )
          } catch ( e ) {
            items = []
          }
        }

        var f = false

        for ( var j = 0; j < items.length; j++ ) {
          if ( items[j].id === found.id ) {
            items[j].quantity = ( items[j].quantity || 0 ) + 1
            f = true
            break
          }
        }

        if ( !f ) {
          items.push( { id: found.id, name: found.title, price: found.price, quantity: 1 } )
        }

        localStorage.setItem( "bookHavenCart", JSON.stringify( items ) )

        updateCartCount()
        showNotification( found.title + " added to cart", "success" )
      })
    }

    if ( wishBtn ) {
      wishBtn.addEventListener( "click", function () {

        var d = localStorage.getItem( "bookHavenWishlist" )
        var list = []

        if ( d ) {
          try {
            list = JSON.parse( d )
          } catch ( e ) {
            list = []
          }
        }

        for ( var k = 0; k < list.length; k++ ) {
          if ( list[k] === found.id ) {
            showNotification( "Already in wishlist", "error" )
            return
          }
        }

        list.push( found.id )
        localStorage.setItem( "bookHavenWishlist", JSON.stringify( list ) )
        showNotification( "Added to wishlist", "success" )
      })
    }
  }
}

function updateCartCount() {

  var d = localStorage.getItem( "bookHavenCart" )
  var items = []

  if ( d ) {
    try {
      items = JSON.parse( d )
    } catch ( e ) {
      items = []
    }
  }

  var s = 0

  for ( var i = 0; i < items.length; i++ ) {
    s = s + ( items[i].quantity || 0 )
  }

  var els = document.querySelectorAll( "#cart-count" )

  for ( var j = 0; j < els.length; j++ ) {
    els[j].textContent = s
  }
}

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

updateCartCount()