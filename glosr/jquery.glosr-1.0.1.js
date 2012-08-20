String.prototype.regexIndexOf = function(regex, startpos)
{
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

jQuery.fn.glosr = function(terms, options)
{
    var settings = {
        'before' : false,
        'after' : false,
        'before_and_after' : false,
        'wrapper' : 'abbr',
        'class' : 'glosr'
    };

    function glosary(node, term, info)
    {
        term = term.toUpperCase();
        var skip = 0;
        if (node.nodeType == 3)
        {
            var rgx = new RegExp('\\b' + term + '\\b', 'g');
            var pos = node.data.toUpperCase().regexIndexOf(rgx);
            if (pos >= 0)
            {
                var wrapper = document.createElement(settings.wrapper);
                wrapper.title = info;
                var middlebit = node.splitText(pos);
                var endbit = middlebit.splitText(term.length);
                var middleclone = middlebit.cloneNode(true);

                if(settings.before_and_after)
                {
                    middleclone.textContent = settings.before_and_after
                                            + middleclone.textContent
                                            + settings.before_and_after;
                }
                else
                {
                    if(settings.before)
                    {
                        middleclone.textContent = settings.before + middleclone.textContent;
                    }
                    if(settings.after)
                    {
                        middleclone.textContent = middleclone.textContent + settings.after;
                    }
                }

                $(wrapper).addClass(settings['class']);
                wrapper.appendChild(middleclone);
                middlebit.parentNode.replaceChild(wrapper, middlebit);
                skip = 1;
            }
        }
        else if (node.nodeType == 1 && node.childNodes && !/(script|style|abbr|h1|h2|h3|h4|h5|h6)/i.test(node.tagName))
        {
            for (var i = 0; i < node.childNodes.length; ++i)
            {
                i += glosary(node.childNodes[i], term, info);
            }
        }
        return skip;
    }


    /**
     * Loop through the terms that are to be made into a glossary
     */
    return this.each( function()
    {
        if('object' == typeof(options))
        {
            $.extend(settings, options);
        }

        for (var term in terms)
        {
            glosary(this, term, terms[term]);
        }
    });
};
