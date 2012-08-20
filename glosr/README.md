Glossary plugin
=======

This plugin takes some text and wraps it with an abbr tag with some glossary test you provide.

Based on the excellent [Highlight plugin](http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html)
by Johann Burkard 

##Usage

    $(selector).glosr(obj terms, obj options);

Parameters:

    terms - An object of terms and the glossary text to add to them
    options - Glosr settings that can be changed 


###Available options
    'wrapper'          : (string) the tag you want to wrap the term in, defaults to 'abbr'
    'class'            : (string) extra classes you want to add to the wrapper markup, defaults to 'glosr'
    'before'           : (string) prepends this string before the term but inside the wrapper tag, default empty
    'after'            : (string) appends this string after the term but inside the wrapper tag, default empty
    'before_and_after' : (string) prepends and appends the string to the text between the wrapper tag, this
                         takes precedence over the individual 'before' and 'after' options.


##Example

    <!-- Markup -->
    <div id="content">
        What is glosr and what can it do for your HTML markup?
    </div>
    
    
    <!-- include the glosr plugin before the </body> tag after the jQuery library -->
    <script src="jquery.glosr-1.0.1.js"></script>
    
    
    <!-- Use glosr -->
    <script>
        jQuery('#content').glosr({
            'glosr' : 'The plugin that makes this possible!',
            'html markup' : 'Hypertext Markup Language, what the www is written in.'
        }, {
            'class' : 'css-class',
        });
    </script>
    
Results in:

    <!-- Markup -->
    <div id="content">
        What is <abbr class="css-class" title="The plugin that makes this possible!">glosr</abbr> and what can it do for 
        your <abbr class="css-class" title="Hypertext Markup Language, what the www is written in.">HTML markup</abbr>?
    </div>
