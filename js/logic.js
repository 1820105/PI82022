var db = firebase.database();

var update = document.getElementById('update');
update.disabled = true;

function value(request){
    return  document.getElementById(request).value;
}
function asignation(request,response){
    return  document.getElementById(request).value=response;
}
function printHTML(request,response){
    return document.getElementById(request).innerHTML+=response;
}
function inHTML(request,response){
    return document.getElementById(request).innerHTML=response;
}
function dateActuality(){
    var fh = new Date();
    return fh.getFullYear()+"-"+(fh.getMonth()+1)+"-"+fh.getDate()+" "+fh.getHours()+":"+fh.getMinutes();
}
function insertTask(cep,bairro,logradouro,localidade,uf,description){
    db.ref('task/').push({
        cep:cep,
        bairro:bairro,
        logradouro:logradouro,
        localidade:localidade,
        uf:uf,
        description:description,
        date:dateActuality()
    });
}
function onClickInsert(){
    var cep = value("cep");
    var bairro = value("bairro");
    var logradouro = value("logradouro");
    var localidade = value("localidade");
    var uf = value("uf");
    var description = value("desc");
    if(cep.length==0 || bairro.length==0 || logradouro.length==0 || localidade.length==0 || uf.length==0 || description.length==0){ 
        alert("Campo em Branco!"); 
    }else{ 
        inHTML("loadTable","");
        insertTask(cep,bairro,logradouro,localidade,uf,description); 
        asignation("cep","");
        asignation("bairro","");
        asignation("logradouro","");
        asignation("localidade","");
        asignation("uf","");
        asignation("desc","");
        alert("Salvo com Sucesso!");
    }
}
function updateTask(cep,bairro,logradouro,localidade,uf,description,key){
    db.ref('task/'+key).update({
        cep:cep,
        bairro:bairro,
        logradouro:logradouro,
        localidade:localidade,
        uf:uf,
        description:description,
        date:dateActuality()
    });
}
function onClickUpdate(){
    var cep = value("cepEdit");
    var bairro = value("bairroEdit");
    var logradouro = value("logradouroEdit");
    var localidade = value("localidadeEdit");
    var uf = value("ufEdit");
    var description = value("descEdit");
    var key = value("key"); 
    if(cep.length==0 || bairro.length==0 || logradouro.length==0 || localidade.length==0 || uf.length==0 || description.length==0){ 
        alert("Campo em branco!"); 
    }else{ 
        inHTML("loadTable","");
        updateTask(cep,bairro,logradouro,localidade,uf,description,key); 
        inHTML("editData","");
        alert("Alterado com Sucesso!");
        update.disabled = true;
    }
}
function removeTask(key){
    if(confirm("Tem certeza que deseja excluir?")){
        inHTML("loadTable","");
        db.ref('task/'+key).remove();
    }
}
function table(cep,bairro,logradouro,localidade,uf,description,date,key){
    return '<tr><td>'+cep+'</td><td>'+bairro+'</td><td>'+logradouro+'</td><td>'+localidade+'</td><td>'+uf+'</td><td>'+description+'</td><td>'+date+'</td>'+
    '<td><a href="#" onclick="viewDataUpdate(\''+cep+'\',\''+bairro+'\',\''+logradouro+'\',\''+localidade+'\',\''+uf+'\',\''+description+'\',\''+key+'\')">'+
    '<i class="fas fa-edit blue icon-lg"></i></a></td>'+
    '<td><a href="#" onclick="removeTask(\''+key+'\')">'+
     '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}
function viewDataUpdate(cep,bairro,logradouro,localidade,uf,description,key){
    var response = '<div class="form-group"><input type="hidden" value='+key+' id="key">' +
    '<input type="text" id="cepEdit" class="form-control" placeholder="CEP" value='+cep+'>'+
    '</div>'+
    '<div class="form-group">'+
    '<textarea placeholder="BairroEdit" class="form-control" id="bairroEdit">'+bairro+'</textarea>'+
    '</div>'+
    '<div class="form-group">'+
    '<textarea placeholder="LogradouroEdit" class="form-control" id="logradouroEdit">'+logradouro+'</textarea>'+
    '</div>'+
    '<div class="form-group">'+
    '<textarea placeholder="LocalidadeEdit" class="form-control" id="localidadeEdit">'+localidade+'</textarea>'+
    '</div>'+
    '<div class="form-group">'+
    '<textarea placeholder="UFEdit" class="form-control" id="ufEdit">'+uf+'</textarea>'+
    '</div>'+
    '<div class="form-group">'+
    '<textarea placeholder="DescriptionEdit" class="form-control" id="descEdit">'+description+'</textarea>'+
    '</div>';
    inHTML('editData',response);
    update.disabled = false;
}
var reference = db.ref('task/');    
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.cep,value.bairro,value.logradouro,value.localidade,value.uf,value.description,value.date,nodo);
            printHTML('loadTable',sendData);
    });       
});