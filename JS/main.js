var $item = $("#usuario"), //item = usuario/organizacion
    $search = $("#buscar"),
    $select = $("#seleccion"),
    $impresion = $('#impresion'),
    html;

function show_repos(data){// aqui hay un error nose donde pero no me sirve algo del for ni de nada
    console.log(data);// bota un arreglo del numero de repos -1 asi array[0,1,2,3] 4 items
    console.log(this);
    var $repos = $(".repos"),
        reposlugar;
    for (var i in data){
        if (data[i].description != "null"){
            reposlugar += data[i].name +": "+ data[i].description + "<br/>"
            $repos.html(reposlugar)
        }
        else {
            reposlugar += data[i].name +": Repo de Github<br/>"
            $repos.html(reposlugar)
        }
    }

}
function info_user(data){
    var data = data.data,
        login = data.login,
        name = data.name,
        avatar_url = data.avatar_url,
        bio = data.bio,
        nrepos = data.public_repos,
        repos = data.repos_url;
    html += "<section class='imprs'>"+ "<figure>"+"<img id='avatar' src='"+avatar_url +"'>"+"</figure>"  
    +"<h3>"+ login +"<br/>"+ name +"</h3>"+ "<h4>biografia</h4>" +bio +"<br/>"+ "<a href='#' class='repos'>" + 
    "repositorios publicos: " + nrepos + "</a>"+"<br/>" +"<aside class='repos'>" +"</section>"; // clase y id con comilla sencilla
    $impresion.html(html);
    $(".imprs").on("click", function(){
        $.getJSON( repos , show_repos);
    });
}
function info_org(data){
    console.log(data);
    var data = data.data,
        login = data.login,
        name = data.name,
        avatar_url = data.avatar_url,
        email = data.email,
        nrepos = data.public_repos,
        repos = data.repos_url;
    html += "<section class='imprs'>"+ "<figure>"+"<img id='avatar' src='"+avatar_url +"'>"+"</figure>"  
    +"<h3>"+ login +"<br/>"+ name +"</h3>"+ "<h4>email</h4>" +email +"<br/>"+ "<a href='#' class='repos'>" + 
    "repositorios publicos: " + nrepos + "</a>"+"<br/>" +"<aside class='repos'>" +"</section>"; // clase y id con comilla sencilla
    $impresion.html(html);
    $(".imprs").on("click", function(){
        $.getJSON( repos , show_repos);
    });
}
function submit(){
    if ($select.val() == 1){
        $.getJSON("https://api.github.com/users/"+$item.val()+"?callback=?", info_user);//user
    }
    else if ($select.val() == 2){
        $.getJSON("https://api.github.com/orgs/"+$item.val()+"?callback=?", info_org);//org
    }
    else{
        alert("Por favor seleccione un opcion")
    }
}
$(document).keyup(     //tambien se puede en ves de "document" usar "&item" pero document lo facilita para el usuario
    function(tecla){
            if (tecla.keyCode == 13){
                if ($item.val() == undefined || $item.val() == ""){
                    alert("ingrese un usuario")
                }
                else{
                    submit()
                }
            }
    }
);
$search.on("click", function(){
        if ($item.val() == undefined || $item.val() == ""){
            alert("ingrese un usuario")
        }
        else{
            submit()
        }
});
