//var yafuepost= false;
var ObjDisabled=""; //Variable me va a permirir conocer cuando di click al enento post desactivar y activar el botobn
function EnabDisbleSubmit()
{   
  
    //console.log("actual 0 "+ ObjDisabled );
      //Aqui opbtento el ultmo elemtno que le di click botn :D SUMIT :)
       LastInputType=""
       if (ObjDisabled=="")
       {
            var LasBtnNameClick = document.activeElement.getAttribute('id');
            var LasBtnNameClickValue = document.activeElement.getAttribute('value');
            var LastInputType = document.activeElement.getAttribute('type');
            if(LastInputType== null)  LastInputType='';
            
            if(LastInputType.toLowerCase() === 'submit' || LastInputType.toLowerCase() === 'button' )
                ObjDisabled=document.getElementById(LasBtnNameClick); 
              //console.log("actual 1 "+ LasBtnNameClick );  
       }
       else
       {
            LastInputType =ObjDisabled.getAttribute('type');
             //console.log("actual 2 "+ ObjDisabled.getAttribute('id'));
       } 
  
        if(LastInputType.toLowerCase() === 'submit' || LastInputType.toLowerCase() === 'button' )
        {    
            
            try{
                var ab=ObjDisabled.disabled;
            }
            catch (error) {
                return false;
            }
            
            // console.log("actual 3 "+ ObjDisabled.getAttribute('id'));
            if  (ObjDisabled.disabled == true)
            {
               setTimeout(() => { 
                 ObjDisabled.disabled = false;
                  //console.log("actual d d "+ ObjDisabled.getAttribute('id'));
               }, 2000);   

            }
            else
            {
                //console.log("actual 5 e "+ ObjDisabled.getAttribute('id'));
                ObjDisabled.disabled = true;

            }
            
        }
        return false;
}

function MK_PostGetAjax($LNK,$Custom,$DATOS,$Tipo ) ///,$Timeout,$Timeout_MSG)
{ 
    /*si incluimos el header en las vistas cuendo estan metidas en otra se buguea y hace doble submit. 
    Ejemplo en el user panel que se cargan el panel, el importador, etc alli mismo*/
   /* if(yafuepost)
    {
        yafuepost=false
        return false;
    }
  if(!yafuepost)
       yafuepost=true;*/
    
  $Tipo = typeof $Tipo !== 'undefined' ? $Tipo : "POST";
  $DATOS = typeof $DATOS !== 'undefined' ? $DATOS : '';
  $Custom = typeof $Custom !== 'undefined' ? $Custom : '';
  
	
  var data="";
  $.ajax({
      cache:false,
      timeout: 0, //10000,  // I chose 10 secs for kicks 0 ilimitado joda
      type:$Tipo,
      url: $LNK,
      data: $DATOS , /*{ NPREDIO: 11} ,*/
		processData: false,
		contentType: false
  })
  .done(function (data) {
        // success logic here
        EnabDisbleSubmit();  
        if ($Custom)
        {
          MK_GetAjaxDatos(data);
          return true;
        }
        else
        {    MK_AutoMsg(data);
             return true;
        }
  })
  .fail(function (jqXHR, exception, errorThrown) {

   
    EnabDisbleSubmit();  
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network. ' + exception + ' ' +  errorThrown);
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
	})	//ajax
	.always(function () {
			//alert("complete");
		});
}


function MK_ADDCUSTOM_CLASS_CSS_ATTR(TipoObj,AtributoOclaseName,AddType,Valores)
{	


	TipoObj=TipoObj.toLowerCase();	AddType=AddType.toLowerCase();

	//degault attr
	var comple1="";
	var comple2="";	
	
	if (TipoObj=="class") {
		var comple1="."; var comple2="";		
	}
	else if(TipoObj=="attr") {
		var comple1="["; var comple2="]";
	}
	
	$(""+comple1+AtributoOclaseName+comple2+"").each(function(e) {
	
		if (AddType=='class')	 	 $(this).addClass(Valores);
		else 
		{	
			// porcia le paso un param y no es array buele paso como texto
			if (typeof Valores[0]=== 'undefined' || Valores[0]=== null)  Valores[0]=Valores;

			if (AddType=='css')	 	$(this).css(Valores[0]); //Puede recbir aarray 
			else if (AddType=='attr')	$(this).attr(Valores[0]); //Puede recbir aarray 
		}
	});
}

//Necesario si haces un add class si recargo este valida el objeto
function MK_RELOAD_INPUTS_FITERS()
{
    
    	//Otros Customs
	//Soporta 1 a hasta 10 MK_MY_CUSTOM_CLASS_5 pra que cada una sea diferente
	var maxsupport=10;	
	for(i=1;i<=maxsupport;i++)
	{
		//Busco si tiene esr attr atributy  ahgo lo que queira
		var LaClase="MK_MY_CUSTOM_CLASS_"+i;
		$("["+LaClase+"]").each(function(e)
		{
			$(this).addClass(LaClase);
		});
	}

	$('.CampoNumericoDecimal').keydown(function(event) 
    {
		
		//0-9 or numpad 0-9,disallow shift,ctrl,and alt
		if ( (!event.shiftKey && !event.ctrlKey && !event.altKey) && ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) 
		|| event.keyCode ==13 || event.keyCode ==110 || event.keyCode ==190 || event.keyCode ==9)) 
		{
				// check textbox value now and tab over if necessary
		}
		else if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) // not esc, del, left or right
		{
				event.preventDefault();
		}		
    }); //-campo numerico

    //On blur 2 decimales
    $(".CampoNumericoDecimal").blur(function() {
        var valor=this.value;
        if (valor=='')  
            this.value=''
        else
            this.value = parseFloat(valor).toFixed(2);
    });
    
		
    $('.CampoSoloNumerico').keydown(function(event)
    {
				
        //0-9 or numpad 0-9,disallow shift,ctrl,and alt
        if ( (!event.shiftKey && !event.ctrlKey && !event.altKey) && ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) 
        || event.keyCode ==13 || event.keyCode ==9 ))  //enter y tab
        { 
            // check textbox value now and tab over if necessary
        }
        else if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) // not esc, del, left or right
        {
            event.preventDefault();
        }

    }); // -campo numerico	
	
}



$(document).ready(function()
{


	MK_RELOAD_INPUTS_FITERS();

    $(".MK_FORMCATH, .MK_FORMCATH_CUSTOM").submit(function(e)
    {
        e.preventDefault();
        var form = $(this);
        
        //Aqui opbtento el ultmo elemtno que le di click botn :D SUMIT :)
        var LasBtnNameClick = document.activeElement.getAttribute('id');
        var LasBtnNameClickValue = document.activeElement.getAttribute('value');
        var LastInputType = document.activeElement.getAttribute('type')
        if(LastInputType== null)  LastInputType='';
        
        var PushToData=false;
        if(LastInputType.toLowerCase() === 'submit' || LastInputType.toLowerCase() === 'button' )
         {   
            PushToData=true;
            EnabDisbleSubmit();
         }

         
		//Soporte para tinyMCE de una vez
		if (typeof(tinyMCE) != "undefined") tinyMCE.triggerSave();

		//Si tiene esta clase espoque voy a tomar manualmente los datos desde el javascrip y voy hacer cosas c= CUSTOMS
		var Custom=$(this).hasClass('MK_FORMCATH_CUSTOM');

		$Tipo="POST";	$VST=this.action;	//$DATOS= $(this).serialize(); //el serilize no toma ni los imputs ni secect ;)
        $DATOS= new FormData( this );
        
        //Le hago push solo si vino de un boton submit o tipo button
        if (PushToData==true)   $DATOS.append(LasBtnNameClick, LasBtnNameClickValue);   //Agrego mi bton a los datos del arrat

        var data=MK_PostGetAjax($VST,Custom,$DATOS,$Tipo);

	}); //.MK_FORMCATH


 console.log("MK_JS Inicializado exitosamente");


}); //Dc ready


function MK_AutoMsg(data)
{

	$('.MK_JQDIV').html('');
  if (TryJs(data)==false)  return false;

  var res=JSON.parse(data);
	if (res.MSG==0 ||  res.MSG==1)
	{
		var Caption="Info";
		if (res.Tipo=="danger") Caption="Error!";

    var Link=''
    if ( res.RedirectLNK!='undefined' && res.RedirectLNK !='')  Link=res.RedirectLNK;

		if (res.MSG==1)
		{
  //alert(data);
			var BtnCerrar=1;  var Grande=1;
			//Mensaje,Header,BtnCerrar,Grande,Link)
			IzMsg(res.Valor ,Caption,'1',1,Link);
			return false;
		}
		else if (res.MSG==0)
		{
			$('.MK_JQDIV').hide(100);
			$('.MK_JQDIV').html('<div class="alert alert-'+res.Tipo +'" role="alert"><strong>'+Caption+'</strong> '+res.Valor +'</div>');
			$('.MK_JQDIV').show(1000);


			//Si queire redireccionar incluyendo compatibilidad con segundos para redireccionar
			if ( Link !='')
			{

				if (res.TimeToRedir>0)
				{
          setTimeout(function(){
            if (Link=="F5")
              window.location.reload();
            else
              window.location.href=res.RedirectLNK;

            }, res.TimeToRedir );
				}
				else
        {
          if (Link=="F5")
            window.location.reload();
          else
  					window.location.href=res.RedirectLNK;
        }

			}

			return false;
		}

	}
}

function TryJs(data)
{
  try
  {

     var res=JSON.parse(data);
  } catch (e)
  {
     IzMsg(data,'Mensaje_ ',1,0);
     return false;
     
    if (e instanceof SyntaxError)
    {
          IzMsg("TryJsFnc Error parseando Json" +e +"\r"+data,'Error',1,0,'');
          //alert("TryJsFnc Error parseando Json" +e +"\r"+data);
          return false;
    }
      else
    {
        IzMsg("TryJsFnc Error parseando Json" +e +"\r"+data,'Error',1,0,'');
        //alert("TryJsFnc Error parseando Json" +e+"\r"+data);
        return false;
    }
  }
  return true;
}

function EfectoTitila(OBJ)
{
		var TimeFade=500;
		$(OBJ).fadeIn(TimeFade).fadeOut(TimeFade).fadeIn(TimeFade).fadeOut(TimeFade).fadeIn(TimeFade).fadeOut(TimeFade).fadeIn(TimeFade);

		setTimeout( function(){
		  $(OBJ).css( "background-color","#f8d7da");
		},500);
		
		setTimeout( function(){
		  $(OBJ).css( "background-color","");
		},2500);
		
}