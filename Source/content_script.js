(function($){
   
   url = 'https://gist.github.com/ianfitzpatrick/37c37e32074ff1f648db3a4b77411ddb/raw/'

   n2n = {

   		init: function() {
   			this.get_phrases();
   		},

         phrases_retrieved: function(data){
               
            for (var key in data) {
               this.replace_phrases(key, data[key])
            }            

         },


   		replace_phrases: function(old_phrase, new_phrase) {

   			$("h1, h2, h3, h4, h5, h6, p, blockquote:contains('" + old_phrase +"')").html(function(_, html) {
   				regex = new RegExp("\\b(" + old_phrase + ")\\b", "gi");
               return html.replace(regex, '<span style="text-decoration: line-through; text-shadow: none; color: #9c9c9c;">$1</span><span style="color: red;"> ' + new_phrase +'</span>');
   			});
   		},

         get_phrases: function() {
            
            $.getJSON(url, function(data){
               n2n.phrases_retrieved(data);
            });      
         }

   };

   n2n.init();

})(jQuery);