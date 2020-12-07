const titles={
  personal_information:'Personal Information',
  interest_in_it:'Interest in IT',
  ideal_job:'Ideal Job',
  personal_profile:'Personal Profile',
  project_idea:'Project Idea'};

var initialPage=document.location.href.split('?page=');
if(initialPage.length>1)
  showPage(initialPage[1], "replace");
else
  showPage("personal_information", "replace");

makeBackground();

document.getElementById('overlay').innerHTML="Loading web fonts, should only take a second.";

document.fonts.onloadingdone=function()
{ 
  var headers=document.getElementsByClassName('header_link');
  for(var i=0; i<headers.length; i++)
  {
    headers[i].style.fontFamily='Nanum Gothic';
  }
  var overlay=document.getElementById('overlay');
  overlay.style.animationDuration='1s';
  overlay.style.animationName='fadeout';
  overlay.style.pointerEvents='none';
  overlay.style.animationFillMode='forwards';
};

document.getElementById('name').innerHTML=atob('SmFycmFkIEVsdmV5');

window.onresize=function(){ makeBackground(); bodyBackground(); };

window.onpopstate = function(event)
{
  if(event.state.page)
    showPage(event.state.page, true);
}

function bodyBackground()
{
  var width=document.body.clientWidth;
  var height=window.innerHeight;
  var content=document.getElementById('content');
  var cHeight=content.offsetHeight+content.offsetTop;

  var svg='<svg width="'+width+'" height="'+cHeight+'" xmlns="http://www.w3.org/2000/svg">\n';
  if(window.location.href.indexOf('page=personal_information')!==-1)
  {
    var rect=document.getElementById('portrait').getBoundingClientRect();
    var border=0;
    svg+="<defs><mask id='mask2' x='0' y='0' width='"+width+"' height='"+height+"'><rect x='0' y='0' width='"+width+"' height='"+height+"' fill='white' /><rect x='"+Math.round(rect.x-border)+"' y='"+Math.round(rect.y-border)+"' width='"+Math.round(rect.width+border*2)+"' height='"+Math.round(rect.height+border*2)+"' fill='black' rx='5' /></mask></defs>";
  }
  svg+='<filter id="bodyBackgroundBlur"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>';
  svg+='<path d="M'+Math.round((width-1000)/2)+',100 C'+Math.round(width/2)+',0 '+Math.round(width/2)+',0, '+(Math.round((width-1000)/2)+1000)+',100 L'+width+','+cHeight+' 0,'+cHeight+'" fill="rgba(210,210,210,0.8)" mask="url(#mask2)" />\n';
  svg+='<path d="M'+Math.round((width-1000)/2)+',50 C'+Math.round(width/2)+',110 '+Math.round(width/2)+',110, '+(Math.round((width-1000)/2)+1000)+',50" stroke-width="5" stroke="rgba(0,0,0,0.8)" fill="none" filter="url(#bodyBackgroundBlur)" />\n';
  svg+='</svg>';
  document.body.style.background='url(data:image/svg+xml;base64,'+btoa(svg)+')';
}
bodyBackground();

function toggle(id)
{
  var element=document.getElementById(id);
  if(element.style.display=='none')
    element.style.display='';
  else
    element.style.display='none';
  bodyBackground();
}

function showPage(id, inHistory)
{
  if(inHistory=="replace")
  {
    history.replaceState({page:id}, titles[id], "?page="+id);
  }
  else if(!inHistory)
  {
    history.pushState({page:id}, titles[id], "?page="+id);
  }

  var sections=document.getElementsByClassName('section');
  for(var i=0; i<sections.length; i++)
  {
    var s=sections[i];
    if(s.id==id)
      s.setAttribute('class', 'section displayed');
    else
      s.setAttribute('class', 'section');
  }

  var headerLinks=document.getElementsByClassName('header_link');
  for(var i=0; i<headerLinks.length; i++)
  {
    var h=headerLinks[i];
    if(h.id==id+'_header')
      h.setAttribute('class', 'header_link selected');
    else
      h.setAttribute('class', 'header_link');
  }
  makeBackground();
  bodyBackground();
}

function generateTitle(id)
{
  var temp=id.split('_');
  var title="";
  for(var i=0; i<temp.length; i++)
  {
    title+=capitalise(temp[i])+' ';
  }
  return title.trim();
}

function capitalise(string)
{
  return string[0].toUpperCase() + string.substring(1);
}

function makeBackground()
{
  var width=document.body.clientWidth;
  var height=window.innerHeight;

  var content=document.getElementById('content');
  var cHeight=content.offsetHeight+content.offsetTop;

  var background=document.getElementById('backgroundSVG');
  if(background)
    background.parentNode.removeChild(background);
  var svg=document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  svg.id='backgroundSVG';
  svg.setAttribute('viewbox', '0 0 '+width+' '+height);
  svg.setAttribute('style', 'width:'+width+'px; height:'+height+'px; pointer-events:none; z-index:10; position:fixed; top:0; left:0;');
  var filter=document.createElementNS("http://www.w3.org/2000/svg", 'filter');
  filter.id='blur5';
  svg.appendChild(filter);
  filter.innerHTML='<feGaussianBlur in="SourceGraphic" stdDeviation="5" />\n'+
    '<feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>';
  var defs=document.createElementNS("http://www.w3.org/2000/svg", 'defs');
  defs.innerHTML="<mask id='mask1' x='0' y='0' width='"+width+"' height='"+height+"'>\n"+
    "<rect x='0' y='0' width='"+width+"' height='"+height+"' style='stroke:none; fill:#ffffff;' />\n"+
    "<path d='M"+Math.round((width-1000)/2)+",80 C"+Math.round(width/2)+",-20 "+Math.round(width/2)+",-20 "+Math.round(width-(width-1000)/2)+",80 L"+Math.round(width-(width-1000)/2)+","+cHeight+" "+Math.round((width-1000)/2)+","+cHeight+"' style='stroke:none; fill:#777;' filter='url(#blur5)' />\n";
  defs.innerHTML+="</mask>";
  defs.innerHTML+="<radialGradient id='RadialGradient1' spreadMethod='reflect'>"+
    "<stop offset='0%' stop-color='rgba(0,255,0,0.5)' />"+
    "<stop offset='2%' stop-color='rgba(0,255,0,0.0)' />"+
    "<stop offset='10%' stop-color='rgba(0,0,255,0.2)' />"+
    "<stop offset='15%' stop-color='rgba(0,255,255,1)' />"+
    "<stop offset='20%' stop-color='rgba(0,128,255,0.05)' />"+
    "<stop offset='30%' stop-color='rgba(0,128,255,0.1)' />"+
    "<stop offset='35%' stop-color='rgba(0,255,255,1)' />"+
    "<stop offset='40%' stop-color='rgba(0,128,255,0.1)' />"+
    "<stop offset='60%' stop-color='rgba(0,128,255,0.3)' />"+
    "<stop offset='65%' stop-color='rgba(0,255,255,1)' />"+
    "<stop offset='70%' stop-color='rgba(0,128,255,0.3)' />"+
    "<stop offset='95%' stop-color='rgba(0,128,255,1)' />"+
    "<stop offset='100%' stop-color='rgba(0,255,255,1)' />"+
    "<stop offset='120%' stop-color='rgba(255,255,255,1)' />"+
    "</radialGradient>";
  svg.appendChild(defs);

  var points=[];
  var max=Math.floor(Math.random()*4)+2;
  for(var i=0; i<max; i++)
  {
    if(i==Math.floor(max/4))
      points.push([Math.floor(width/4), 0]);
    if(i==Math.floor(max/2))
      points.push([Math.floor(width/2), 0]);
    if(i==Math.floor(max*0.75))
      points.push([Math.floor(width/2), Math.floor(height/2)]);
    if(i==Math.floor(max*0.85))
      points.push([Math.floor(width/4), Math.floor(height/2)]);
    points.push([Math.floor(Math.random()*width/2), Math.floor(Math.random()*height/2)]);
  }
  var pointString="M0,0 L";
  for(var i=0; i<points.length; i++)
  {
    pointString+=points[i][0]+','+points[i][1]+' ';
  }
  pointString+="0,"+Math.floor(height/2)+" M"+width+",0 L";
  for(var i=0; i<points.length; i++)
  {
    pointString+=(width-points[i][0]-1)+','+points[i][1]+' ';
  }
  pointString+=(width-1)+","+Math.floor(height/2)+" M"+width+","+(height-1)+" L";
  for(var i=0; i<points.length; i++)
  {
    pointString+=(width-points[i][0]-1)+','+(height-points[i][1]-1)+' ';
  }
  pointString+=(width-1)+","+Math.floor(height/2)+" M0,"+(height-1)+" L";
  for(var i=0; i<points.length; i++)
  {
    pointString+=(points[i][0])+','+(height-points[i][1]-1)+' ';
  }
  pointString+="0,"+Math.floor(height/2);


  var path=document.createElementNS("http://www.w3.org/2000/svg", 'path');
  setAttributes(path, {fill:'transparent', stroke:'url(#RadialGradient1)', filter:'url(#blur5)', mask:'url(#mask1)', 'stroke-width':'2',
    d:pointString});
  svg.appendChild(path);

/*  var path=document.createElementNS("http://www.w3.org/2000/svg", 'path');
  svg.appendChild(path);
  path.setAttribute('fill', 'rgba(0,255,0,0.2)');
  path.setAttribute('mask', 'url(#mask1)');
  path.setAttribute('d', "M0,0 L"+width+","+height+" 0,"+height);
  var path=document.createElementNS("http://www.w3.org/2000/svg", 'path');
  svg.appendChild(path);
  path.setAttribute('fill', 'rgba(0,0,255,0.2)');
  path.setAttribute('mask', 'url(#mask1)');
  path.setAttribute('d', "M"+width+",0 L"+width+","+height+" 0,"+height);
  var path=document.createElementNS("http://www.w3.org/2000/svg", 'path');
  svg.appendChild(path);
  path.setAttribute('fill', 'rgba(255,0,0,0.2)');
  path.setAttribute('mask', 'url(#mask1)');
  path.setAttribute('d', "M0,0 L0,"+height+" "+width+",0");
  */

  document.body.appendChild(svg);
}

function setAttributes(element, attributes)
{
  for(var key in attributes)
  {
    element.setAttribute(key, attributes[key]);
  }
}
