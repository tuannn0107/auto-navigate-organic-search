navigateFromOganicSearch();
var origin = ["https://www.google.com/search?q=ieo+la+gi"];
var replace = ["https://www.google.com/search?q=ieo+l%C3%A0+g%C3%AC"];

function navigateFromOganicSearch() {
    // if (window.location.host === 'www.google.com') {
    //     var currentHref = window.location.href;
    //     for (var i = 0; i < origin.length; i++) {
    //         if (currentHref === origin[i]) {
    //             window.location.replace(replace[i]);
    //         }
    //     } 

    //     var linkFoundLenth = document.querySelectorAll('a[href^="https://chuyenthienha.com"]').length;
    //     if (linkFoundLenth === 0)
    //     {
    //         window.setTimeout(findLinkToNavigate(), 10000);
    //     } else {
    //         navigateToMainDomain();
    //     }
    // }
    navigateToMainDomain();
}

function findLinkToNavigate() {
    var pageLength = document.getElementById("nav").getElementsByTagName("td").length;
    var i = 1;
    while (i < (pageLength - 2)) {
        if (document.getElementById("nav").getElementsByTagName("td")[i] == undefined) {
            navigateToMainDomain();
            break;
        }

        var linkPageNavigate = document.getElementById("nav").getElementsByTagName("td")[i].getElementsByTagName('a').length;
        if (linkPageNavigate > 0) {
            document.getElementById("nav").getElementsByTagName("td")[i].getElementsByTagName('a')[0].click();
        }
        i += 1;
    }
}


function navigateToMainDomain() {
    var length = document.querySelectorAll('a[href^="https://chuyenthienha.com"]').length;
    if (length > 0) {
        simulate(document.querySelectorAll('a[href^="https://chuyenthienha.com"]')[0], "click");
    } else {
        window.location.replace("https://chuyenthienha.com");
    }
}


function simulate(element, eventName)
{
    var eventMatchers = {
        'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
        'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
    }
    var defaultOptions = {
        pointerX: 0,
        pointerY: 0,
        button: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        bubbles: true,
        cancelable: true
    }

    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}