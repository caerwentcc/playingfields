
function FWAddClassNames(node)
{
	if(FWIsListItem(node, "items"))
	{
		var depth = FWFindDepth(node);
		node.onmouseover=function() { 
			this.className+=' over'+(depth == 1?'':(depth-1));
			FWIsListItem(this.lastChild, "blocks")?this.lastChild.id = "fwSub"+depth:""; 
		};
		node.onmouseout=function() { 
			this.className=this.className.replace(' over'+(depth == 1?'':depth-1), "");
			FWIsListItem(this.lastChild, "blocks")?this.lastChild.id = "":""; 
		};
	}
	if(node.nextSibling) 
		FWAddClassNames(node.nextSibling);
}

function FWIsListItem(node, listType)
{
	var blocks = ["UL", "OL", "DL"];
	var items = ["LI", "DD"];
	if(listType == "blocks")
	{
		if(blocks.toString().search(node.nodeName) != -1) 
			return true;
	}
	else if(listType == "items")
	{
		if(items.toString().search(node.nodeName) != -1)
			return true;
	}
	else
	{
		if(blocks.toString().search(node.nodeName) != -1 || items.toString().search(node.nodeName) != -1)
			return true;
	}
	return false;
}

function FWFindDepth(node)
{
	currentNode = node;
	depth = 0;
	while(FWIsListItem(currentNode.parentNode, "all"))
	{
		if(FWIsListItem(currentNode.parentNode, "blocks")) 
			depth++;
		currentNode = currentNode.parentNode;
	}
	return depth;
}

function FWStartList()
{
	var listTypes = ['OL','UL','DL'];
	var nodes = [];
	for(i=0; i<3; i++)
	{
		var temp = document.getElementsByTagName(listTypes[i]);
		for(var j = 0;j<temp.length;j++)
			if(FWIsListItem(temp[j], "blocks")) 
				nodes.push(temp[j]);
	}
	for(i=0; i<nodes.length; i++) 
		FWAddClassNames(nodes[i].firstChild);
}
