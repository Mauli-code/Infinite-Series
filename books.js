var BOOKS = [
  { id: "b1", title: "The Lost Library", author: "A. Reader", price: 12.99, genre: "fiction", img: "images/book1.jpg" },
  { id: "b2", title: "Starlight Journey", author: "M. Voyager", price: 15.50, genre: "fantasy", img: "images/book2.jpg" },
  { id: "b3", title: "Mystery of the Clock", author: "C. Sleuth", price: 9.99, genre: "mystery", img: "images/book3.jpg" },
  { id: "b4", title: "Thoughts & Theory", author: "D. Thinker", price: 18.00, genre: "non-fiction", img: "images/book4.jpg" },
  { id: "b5", title: "Forest Tales", author: "E. Green", price: 11.25, genre: "fiction", img: "images/book5.jpg" },
  { id: "b6", title: "Deep Magic", author: "F. Mage", price: 13.75, genre: "fantasy", img: "images/book6.jpg" }
]

var searchInput   = document.getElementById( "search" )
var genreSelect   = document.getElementById( "genre" )
var sortSelect    = document.getElementById( "sort" )
var grid          = document.getElementById( "books-grid" )
var loadMore      = document.getElementById( "load-more" )

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

document.addEventListener( "click", function ( e ) {

  var t = e.target

  if ( !t ) {
    return
  }

  if ( t.classList && t.classList.contains( "add" ) ) {

    var id    = t.getAttribute( "data-id" )
    var name  = t.getAttribute( "data-name" )
    var price = parseFloat( t.getAttribute( "data-price" ) || 0 )

    var d = localStorage.getItem( "bookHavenCart" )
    var items = []

    if ( d ) {
      try {
        items = JSON.parse( d )
      } catch ( er ) {
        items = []
      }
    }

    var f = false

    for ( var i = 0; i < items.length; i++ ) {
      if ( items[i].id === id ) {
        items[i].quantity = ( items[i].quantity || 0 ) + 1
        f = true
        break
      }
    }

    if ( !f ) {
      items.push( { id: id, name: name, price: price, quantity: 1 } )
    }

    localStorage.setItem( "bookHavenCart", JSON.stringify( items ) )

    updateCartCount()
    showNotification( name + " added to cart", "success" )

  } else if ( t.classList && t.classList.contains( "wish" ) ) {

    var id2 = t.getAttribute( "data-id" )

    var d2 = localStorage.getItem( "bookHavenWishlist" )
    var list = []

    if ( d2 ) {
      try {
        list = JSON.parse( d2 )
      } catch ( e ) {
        list = []
      }
    }

    for ( var k = 0; k < list.length; k++ ) {
      if ( list[k] === id2 ) {
        showNotification( "Already in wishlist", "error" )
        return
      }
    }

    list.push( id2 )
    localStorage.setItem( "bookHavenWishlist", JSON.stringify( list ) )
    showNotification( "Added to wishlist", "success" )
  }

})

function filterCards() {

  var q = ( searchInput ? searchInput.value.trim().toLowerCase() : "" )
  var g = ( genreSelect ? genreSelect.value : "all" )

  var cards = document.querySelectorAll( ".book-card" )

  for ( var i = 0; i < cards.length; i++ ) {

    var c = cards[i]

    var title  = ( c.getAttribute( "data-title" ) || "" ).toLowerCase()
    var author = ( c.getAttribute( "data-author" ) || "" ).toLowerCase()
    var genre  = c.getAttribute( "data-genre" ) || ""

    var match = true

    if ( q ) {
      match = ( title.indexOf( q ) !== -1 || author.indexOf( q ) !== -1 )
    }

    if ( g !== "all" && genre !== g ) {
      match = false
    }

    c.style.display = match ? "" : "none"
  }
}

if ( searchInput ) {
  searchInput.addEventListener( "input", filterCards )
}

if ( genreSelect ) {
  genreSelect.addEventListener( "change", filterCards )
}

if ( sortSelect ) {
  sortSelect.addEventListener( "change", function () {

    var v = sortSelect.value
    var cards = Array.prototype.slice.call( document.querySelectorAll( ".book-card" ) )

    cards.sort( function ( a, b ) {
      var pa = parseFloat( a.getAttribute( "data-price" ) || 0 )
      var pb = parseFloat( b.getAttribute( "data-price" ) || 0 )

      if ( v === "price-low" ) {
        return pa - pb
      }

      if ( v === "price-high" ) {
        return pb - pa
      }

      return 0
    })

    for ( var i = 0; i < cards.length; i++ ) {
      grid.appendChild( cards[i] )
    }
  })
}

if ( loadMore ) {
  loadMore.addEventListener( "click", function () {

    for ( var i = 0; i < 3; i++ ) {
      var b = BOOKS[i]
      var id = b.id + "-m" + Math.random().toString(36).slice(2,5)

      var div = document.createElement( "div" )
      div.className = "book-card"
      div.setAttribute( "data-id", id )
      div.setAttribute( "data-title", b.title )
      div.setAttribute( "data-author", b.author )
      div.setAttribute( "data-price", b.price )
      div.setAttribute( "data-genre", b.genre )

      div.innerHTML =
        '<a href="book-details.html?id=' + encodeURIComponent( b.id ) + '">' +
          '<img src="' + b.img + '" alt="" />' +
        '</a>' +
        '<div class="body">' +
          '<h3><a href="book-details.html?id=' + encodeURIComponent( b.id ) + '">' + b.title + '</a></h3>' +
          '<div class="author">' + b.author + '</div>' +
          '<div class="price">$' + b.price.toFixed(2) + '</div>' +
          '<div class="actions">' +
            '<button class="add" data-id="' + id + '" data-name="' + b.title + '" data-price="' + b.price + '">Add to Cart</button>' +
            '<button class="wish" data-id="' + id + '"><i class="fas fa-heart"></i></button>' +
          '</div>' +
        '</div>'

      grid.appendChild( div )
    }
  })
}

updateCartCount()