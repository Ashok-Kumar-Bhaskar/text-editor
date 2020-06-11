function format(name)
{
	document.execCommand(name,false,null);
}

function chooseColor(name)
{
	var mycolor = document.getElementById("myColor").value;
	document.execCommand(name, false, mycolor);
	console.log(document.getElementById("myColor").value);
}

function chooseBgColor(name)
{
	var bgcolor = document.getElementById("bgColor").value;
	document.execCommand(name, false, bgcolor);

	console.log(document.getElementById("bgColor").value[1]+document.getElementById("bgColor").value[2]);
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

function saveTextAsFile()
{
  var text = document.getElementById('editor').innerHTML;
  var finalText = convertHtmlToRtf(text)
  var fileName = "file.rtf";
  sessionStorage.setItem("text",finalText);


  var downloadLink = document.createElement("a");
  var file = new File([finalText], fileName ,{type: "text/plain;charset:UTF-8"});

  downloadLink.href = URL.createObjectURL(file);
  downloadLink.download = fileName;
  downloadLink.click();
}


function convertHtmlToRtf(html) {
  if (!(typeof html === "string" && html)) {
      return null;
  }

  var tmpRichText, hasHyperlinks;
  var richText = html;

  // Singleton tags
  richText = richText.replace(/<(?:hr)(?:\s+[^>]*)?\s*[\/]?>/ig, "{\\pard \\brdrb \\brdrs \\brdrw10 \\brsp20 \\par}\n{\\pard\\par}\n");
  richText = richText.replace(/<(?:br)(?:\s+[^>]*)?\s*[\/]?>/ig, "{\\pard\\par}\n");

  // Empty tags
  richText = richText.replace(/<(?:p|div|section|article)(?:\s+[^>]*)?\s*[\/]>/ig, "{\\pard\\par}\n");
  richText = richText.replace(/<(?:[^>]+)\/>/g, "");


  richText = richText.replace(
      /<a(?:\s+[^>]*)?(?:\s+href=(["'])(?:javascript:void\(0?\);?|#|return false;?|void\(0?\);?|)\1)(?:\s+[^>]*)?>/ig,
      "{{{\n");
  tmpRichText = richText;
  richText = richText.replace(
      /<a(?:\s+[^>]*)?(?:\s+href=(["'])(.+)\1)(?:\s+[^>]*)?>/ig,
      "{\\field{\\*\\fldinst{HYPERLINK\n \"$2\"\n}}{\\fldrslt{\\ul\\cf1\n");
  hasHyperlinks = richText !== tmpRichText;
  richText = richText.replace(/<a(?:\s+[^>]*)?>/ig, "{{{\n");
  richText = richText.replace(/<\/a(?:\s+[^>]*)?>/ig, "\n}}}");

  richText = richText.replace(/<(?:b|strong)(?:\s+[^>]*)?>/ig, "{\\b\n");
  richText = richText.replace(/<(?:i|em)(?:\s+[^>]*)?>/ig, "{\\i\n");
  richText = richText.replace(/<(?:u|ins)(?:\s+[^>]*)?>/ig, "{\\ul\n");
  richText = richText.replace(/<(?:strike|del)(?:\s+[^>]*)?>/ig, "{\\strike\n");
  richText = richText.replace(/<sup(?:\s+[^>]*)?>/ig, "{\\super\n");
  richText = richText.replace(/<sub(?:\s+[^>]*)?>/ig, "{\\sub\n");
  richText = richText.replace(/<(?:div style="text-align: right;")(?:\s+[^>]*)?>/ig, "{\\qr\n");
  richText = richText.replace(/<(?:div style="text-align: center;")(?:\s+[^>]*)?>/ig, "{\\qc\n");
  
  richText = richText.replace(/<(?:font face="Times New Roman")(?:\s+[^>]*)?>/ig, "{\\fonttbl {\\f0 Times New Roman;}}\n");
  richText = richText.replace(/<(?:font face="Monotype Corsiva")(?:\s+[^>]*)?>/ig, "{\\fonttbl {\\f0 Monotype Corsiva;}}\n");
  richText = richText.replace(/<(?:font face="Courier New")(?:\s+[^>]*)?>/ig, "{\\fonttbl {\\f0 Courier New;}}\n");
  richText = richText.replace(/<(?:font face="Arial")(?:\s+[^>]*)?>/ig, "{\\fonttbl {\\f0 Arial;}}\n");
  richText = richText.replace(/<(?:font face="Sans serif")(?:\s+[^>]*)?>/ig, "{\\fonttbl {\\f0 Sans serif;}}\n");
  richText = richText.replace(/<(?:font face="Verdana")(?:\s+[^>]*)?>/ig, "{\\fonttbl {\\f0 Verdana;}}\n");
  richText = richText.replace(/<(?:font face="Georgia")(?:\s+[^>]*)?>/ig, "{\\fonttbl {\\f0 Georgia;}}\n");
  richText = richText.replace(/<(?:font face="Palatino")(?:\s+[^>]*)?>/ig, "{\\fonttbl {\\f0 Palatino;}}\n");
  richText = richText.replace(/<(?:font face="Garamond")(?:\s+[^>]*)?>/ig, "{\\fonttbl {\\f0 Garamond;}}\n");
  richText = richText.replace(/<(?:font face="Comic Sans MS")(?:\s+[^>]*)?>/ig, "{{\\fonttbl {\\f0 Comic Sans MS;}}\n");
  richText = richText.replace(/<(?:font face="Arial Black")(?:\s+[^>]*)?>/ig, "{\\fonttbl {\\f0 Arial Black;}}\n");
  
  richText = richText.replace(/<(?:font size="1")(?:\s+[^>]*)?>/ig, "{\\f0\\fs20 \n");
  richText = richText.replace(/<(?:font size="2")(?:\s+[^>]*)?>/ig, "{\\f0\\fs24 \n");
  richText = richText.replace(/<(?:font size="3")(?:\s+[^>]*)?>/ig, "{\\f0\\fs28 \n");
  richText = richText.replace(/<(?:font size="4")(?:\s+[^>]*)?>/ig, "{\\f0\\fs34 \n");
  richText = richText.replace(/<(?:font size="5")(?:\s+[^>]*)?>/ig, "{\\f0\\fs40 \n");
  richText = richText.replace(/<(?:font size="6")(?:\s+[^>]*)?>/ig, "{\\f0\\fs48 \n");
  richText = richText.replace(/<(?:font size="7")(?:\s+[^>]*)?>/ig, "{\\f0\\fs58 \n");
  richText = richText.replace(/<(?:font size="8")(?:\s+[^>]*)?>/ig, "{\\f0\\fs72 \n");

  richText = richText.replace(/<(?:font color="#000000")(?:\s+[^>]*)?>/ig, "{{\\colortbl;\\red0\\green0\\blue0;}\\cf1");
  richText = richText.replace(/<(?:font color="#FF0000")(?:\s+[^>]*)?>/ig, "{{\\colortbl;\\red255\\green0\\blue0;}\\cf1");
  richText = richText.replace(/<(?:font color="#0000FF")(?:\s+[^>]*)?>/ig, "{{\\colortbl;\\red0\\green0\\blue255;}\\cf1");
  richText = richText.replace(/<(?:font color="#FFFFFF")(?:\s+[^>]*)?>/ig, "{{\\colortbl;\\red255\\green255\\blue255;}\\cf1");
  richText = richText.replace(/<(?:font color="#008000")(?:\s+[^>]*)?>/ig, "{{\\colortbl;\\red0\\green128\\blue0;}\\cf1");
  richText = richText.replace(/<(?:font color="#EE82EE")(?:\s+[^>]*)?>/ig, "{{\\colortbl;\\red238\\green130\\blue238;}\\cf1");
  richText = richText.replace(/<(?:font color="#A52A2A")(?:\s+[^>]*)?>/ig, "{{\\colortbl;\\red165\\green42\\blue42;}\\cf1");
  richText = richText.replace(/<(?:font color="#808080")(?:\s+[^>]*)?>/ig, "{{\\colortbl;\\red128\\green128\\blue128;}\\cf1");


  richText = richText.replace(/<(?:p|div|section|article|)(?:\s+[^>]*)?>/ig, "{\\pard\n");

  richText = richText.replace(/<\/(?:p|div|section|article)(?:\s+[^>]*)?>/ig, "\n\\par}\n");
  richText = richText.replace(/<\/(?:b|strong|i|em|u|ins|strike|del|sup|sub|font|span|ul|li)(?:\s+[^>]*)?>/ig,"\n}");

  richText = richText.replace(/<(?:[^>]+)>/g, "");

  richText = richText.replace(/<!--[\s\S]*?-->/ig,"");

  richText =
      "{\\rtf1\\ansi\n" + (hasHyperlinks ? "{\\colortbl\n;\n\\red0\\green0\\blue255;\n}\n" : "") + richText +  "\n}";

  return richText;
}
