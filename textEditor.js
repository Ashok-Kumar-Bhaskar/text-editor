function format(name)
{
	document.execCommand(name,false,null);
}
function chooseColor(name)
{
	var mycolor = document.getElementById("myColor").value;
	document.execCommand(name, false, mycolor);
}

function changeFont()
{
	var myFont = document.getElementById("input-font").value;
	document.execCommand('fontName', false, myFont);
}

function changeSize()
{
	var mysize = document.getElementById("fontSize").value;
	document.execCommand('fontSize', false, mysize);
}

function checkDiv()
{
	var editorText = document.getElementById("editor").innerHTML;
	if(editorText === '')
	{
		document.getElementById("editor").style.border = '5px solid red';
	}
}

function removeBorder()
{
	document.getElementById("editor").style.border = '1px solid transparent';
}

function saveTextAsFile()
{
  var text = document.getElementById('editor').innerHTML;
  var fileName = "file.rtf";
  sessionStorage.setItem("text",document.getElementById('editor').innerHTML);
  
  var downloadLink = document.createElement("a");
  var file = new File([text], fileName ,{type: "text/plain"});


  downloadLink.href = URL.createObjectURL(file);
  console.log(file);
  downloadLink.download = fileName;
  downloadLink.click();
}

