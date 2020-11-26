const titles={
  personal_information:'Personal Information',
  interest_in_it:'Interest in IT',
  ideal_job:'Ideal Job',
  personal_profile:'Personal Profile',
  project_idea:'Project Idea'};

var initialPage=document.location.href.split('?page=');
if(initialPage.length>1)
  showPage(initialPage[1], "replace");

makeBackground();

document.getElementById('name').innerHTML=atob('SmFycmFkIEVsdmV5');

window.onpopstate = function(event)
{
  if(event.state.page)
    showPage(event.state.page, true);
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
  var svg=document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  svg.setAttribute('viewbox', '0 0 1000 1000');
  var path=document.createElementNS("http://www.w3.org/2000/svg", 'path');
  svg.appendChild(path);
  path.setAttribute('fill', '#00FF00');
  path.setAttribute('d', "M0,0 L1000,1000 0,1000");
  //document.body.appendChild(svg);
}
