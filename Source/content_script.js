jqn2n = jQuery.noConflict(true);

// Make new jQuery selector :containsNC. A case-insensitive :contains.
jqn2n.extend(jqn2n.expr[":"], {
	"containsNC": function(elem, i, match, array) {
	return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
});

(function(jqn2n){

	url = 'http://www.ianfitzpatrick.com/n2n/normalization-to-not-phrases.json'

	n2n = {

		init: function() {
			n2n.get_phrases();
		},

		get_phrases: function() {

			jqn2n.getJSON(url, n2n.phrases_retrieved);

		},


		phrases_retrieved: function(data){

			for (var key in data) {
				n2n.replace_phrases(key, data[key])
			}            

		},

		replace_phrases: function(old_phrase, new_phrase) {

			// There must be a smarter way to build this selector
			// But targeting body:contains can wreak havoc on a page

			jqn2n("	h1:containsNC('" + old_phrase +"'), \
					h2:containsNC('" + old_phrase +"'), \
					h3:containsNC('" + old_phrase +"'), \
					h4:containsNC('" + old_phrase +"'), \
					h5:containsNC('" + old_phrase +"'), \
					h6:containsNC('" + old_phrase +"'), \
					p:containsNC('" + old_phrase +"'), \
					blockquote:containsNC('" + old_phrase +"')")
					.html(function(_, html) {
						regex = new RegExp("\\b(" + old_phrase + ")\\b", "gi");
						return html.replace(regex, function(match){
							new_phrase = n2n.match_capitalization(match, new_phrase);
							return '<span style="text-decoration: line-through; text-shadow: none; color: #9c9c9c;">' + match + '</span><span style="color: red;"> ' + new_phrase +'</span>'
						});
			});
		},

		match_capitalization: function(match_phrase, new_phrase) {
			// Try our best to make new phrase match capitalization of matched phrase

			if (match_phrase === match_phrase.toUpperCase() ) {
				return new_phrase.toUpperCase();

			} else if (match_phrase === match_phrase.toLowerCase() ) {
				return new_phrase.toLowerCase();

			} else {
				// Title Case
				return new_phrase.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			}

			
		}

	};

	n2n.init();

})(jqn2n);