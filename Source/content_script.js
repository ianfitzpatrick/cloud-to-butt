var loadJSON = function(url) {
  request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      phrases = JSON.parse(request.responseText);
      walk(document.body, phrases);

    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
};

var stencil_old = document.createElement("span")
stencil_old.setAttribute("style", "text-decoration: line-through;")

var url = "https://rawgit.com/ianfitzpatrick/37c37e32074ff1f648db3a4b77411ddb/raw/e092402b51b30d31d6fd034d863b8cf4d9c61002/normalization-to-not-phrases.json"
loadJSON(url);


function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	try {
		if (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea' ) {
			return;
		}
	} catch(err){
		// Probably undefined node passed in
	}
	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode)
{
	var v = textNode.nodeValue;

	for (var key in phrases) {
		if (phrases.hasOwnProperty(key)) {
	
			regex = new RegExp("\\b(" + key + ")\\b", "gi");

			if (v.match(regex)) {
				v =  v.replace(regex, "$1 " + phrases[key]);
				textNode.nodeValue = v;

				result = findAndReplaceDOMText(textNode, {find: regex, wrap: stencil_old });
			}
		}				
	}
}	

