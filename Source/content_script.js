jqn2n = jQuery.noConflict(true);
(function($){

	gist_id = '37c37e32074ff1f648db3a4b77411ddb'
	url = 'https://api.github.com/gists/' + gist_id;

	// url = "https://gist.github.com/ianfitzpatrick/37c37e32074ff1f648db3a4b77411ddb/raw/";

	n2n = {

		init: function() {
			n2n.get_phrases();
		},

		gist_retrieved: function(data){
			
			// Calling a raw gist directly results in 301 redirect
			// which ajax/json request won't follow. Extract raw gist
			// URL from Github API, as raw gist URL changes each time
			// gist is modified.

			raw_gist_url = data.files['normalization-to-not-phrases.json'].raw_url;
			console.log(raw_gist_url);

			jqn2n.getJSON(raw_gist_url, n2n.phrases_retrieved);
		},

		phrases_retrieved: function(data){

			for (var key in data) {
				n2n.replace_phrases(key, data[key])
			}            

		},

		replace_phrases: function(old_phrase, new_phrase) {

			// There must be a smarter way to build this selector
			// But targeting body:contains can wreak havoc on a page

			jqn2n("	h1:contains('" + old_phrase +"'), \
				   	h2:contains('" + old_phrase +"'), \
				   	h3:contains('" + old_phrase +"'), \
				   	h4:contains('" + old_phrase +"'), \
				   	h5:contains('" + old_phrase +"'), \
				   	h6:contains('" + old_phrase +"'), \
				   	p:contains('" + old_phrase +"'), \
				   	blockquote:contains('" + old_phrase +"')")
					.html(function(_, html) {
						regex = new RegExp("\\b(" + old_phrase + ")\\b", "gi");
						return html.replace(regex, '<span style="text-decoration: line-through; text-shadow: none; color: #9c9c9c;">$1</span><span style="color: red;"> ' + new_phrase +'</span>');
			});

		},

		get_phrases: function() {

			jqn2n.getJSON(url, n2n.gist_retrieved);

		}
	};

	n2n.init();

})(jqn2n);