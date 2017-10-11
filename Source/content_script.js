walk(document.body);

if (window.MutationObserver) {
	var observer = new MutationObserver(function (mutations) {
		Array.prototype.forEach.call(mutations, function (m) {
			if (m.type === 'childList') {
				walk(m.target);
			} else if (m.target.nodeType === 3) {
				handleText(m.target);
			}
		});
	});

	observer.observe(document.body, {
		childList: true,
		attributes: false,
		characterData: true,
		subtree: true
	});
}

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

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
	if (textNode.parentElement.tagName.toLowerCase() === "script" || textNode.parentElement.isContentEditable === true) {
		return false;
	}

	var oldValue = textNode.nodeValue;
	var v = oldValue;

    v = v.replace(/\b([cC])yber(\w)/ig, "$1yborg $2");
    v = v.replace(/\b([cC])yber/ig, "$1yborg");
    v = v.replace(/\b([cC])y·ber/ig, "$1y·borg");

	if (v !== oldValue) {
		textNode.nodeValue = v;
	}
}