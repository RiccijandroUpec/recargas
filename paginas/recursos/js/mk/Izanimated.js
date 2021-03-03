function IzAnimar(Objeto,aniname,repetir)
{
    if (aniname.length <=0) return false;
    
    if (typeof repetir == typeof undefined) 
        repetir =true;

      Objeto.addClass(aniname +" animated").one('animationend webkitAnimationEnd oAnimationEnd', function()
      {
        var attr = Objeto.attr('MK-NoRemoveAnim');
        if (typeof attr !== typeof undefined && attr !== false) {
          return true;
        }
        if(repetir)
            Objeto.removeClass(aniname);
      });
}

$("[MK-animatedOver]").mouseover(function()
{
  var aniname=$(this).attr('MK-animatedOver');
  if (aniname.length <=0) return false;
  //  $(this).css('box-shadow', '10px 10px 5px #888');
  IzAnimar($(this),aniname);
});
//

$("[MK-animatedClick]").click(function()
{
  var aniname=$(this).attr('MK-animatedClick');
  if (aniname.length <=0) return false;
  IzAnimar($(this),aniname);
});

$("[MK-animatedMouseDown]").click(function()
{
  var aniname=$(this).attr('MK-animatedMouseDown');
  if (aniname.length <=0) return false;
  IzAnimar($(this),aniname);
});


$(window).scroll(function()
{
    if($(this).scrollTop() > 100)  /*height in pixels when the navbar becomes non opaque*/
    {
        $("[MK-animatedScroll]").each(function()
        {
            var aniname=$(this).attr('MK-animatedScroll');
            if (aniname.length <=0) return false;
            IzAnimar($(this),aniname,repetir=false);
        });
    }
});

/* // VIEJO MODDO =p
    var aniname=$(this).attr('IzanimatedOver');
    if (aniname.length <=0) return false;
    $(this).addClass(aniname +" animated").one('animationend webkitAnimationEnd oAnimationEnd', function() {
      $(this).removeClass(aniname);
    });
    */
