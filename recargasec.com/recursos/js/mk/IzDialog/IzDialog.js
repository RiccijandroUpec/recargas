
var TMPLINK = '';
function Redir()
{
    if (TMPLINK.length > 5)
    {
        if (TMPLINK == "F5")
        {
            window.location.reload();
        } else {
            window.location = TMPLINK;
        }
    }
}

function IzMsg(Mensaje, Header, BtnCerrar, Grande, Link)
{
    //alert(BtnCerrar);
    if (typeof Link == 'undefined')
        Link = '';
    if (typeof Header !== "undefined")
    {
        $('#IzMsgHeader').text(Header);
    }

    if (Mensaje.indexOf(".ERROR.") != -1)
    {
        Link = "";
        Mensaje = reemplazar(Mensaje, ".ERROR.", "");
    }

    if (Link.length > 5)
    {
        TMPLINK = Link;
    }

    if (typeof BtnCerrar == "undefined")
    {
        $('#IzMsgFooter').hide();
    } else
    {
        if (BtnCerrar == 1)
            $('#IzMsgFooter').show();
        else
            $('#IzMsgFooter').hide();

    }





    if (typeof Grande !== "undefined")
    {
        $('#IzMsgGrandePeq').removeClass('modal-sm');
        $('#IzMsgGrandePeq').addClass('modal-lg');
    } else
    {
        $('#IzMsgGrandePeq').removeClass('modal-lg');
        $('#IzMsgGrandePeq').addClass('modal-sm');
    }

    $('#IzMsgMensaje').html(Mensaje);
    $('#IzMsg').modal('show');
}


function IzMsgFrame(srcFrame, Header, Alto, Ancho)
{
    var AltoOR = 600;
    var AnchoOR = 768;

    if (typeof Alto !== "undefined")
        AltoOR = Alto;

    if (typeof Ancho !== "undefined")
        AnchoOR = Ancho;

    $('#IzMsgFrameHeader').text(Header);
    $('#IzMsgFrameFRAME').attr('width', AnchoOR);
    $('#IzMsgFrameFRAME').attr('height', AltoOR);
    $('#IzMsgFrameFRAME').attr('src', srcFrame);

    $('#IzMsgFrame').modal('show');
}

function  reemplazar(text, busca, reemplaza)
{

    var idx = text.toString().indexOf(busca);
    while (idx != -1)
    {

        text = text.toString().replace(busca, reemplaza);

        idx = text.toString().indexOf(busca, idx);
    }
    return text;
}
