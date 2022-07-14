//--------------CLASES---------------//
class registroSocio{
    constructor(nombre,apellido,email,dni,telefono,fecha){
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.dni=dni;
        this.telefono=telefono;
        this.fecha=fecha;
    }
}

class actividades{
    constructor(id,nombre,precio,resumen,imagen){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.resumen=resumen;
        this.imagen=imagen;
    }
}
const actividad1=new actividades("1","FITNESS","2800","Musculacion personalizada","fitness");
const actividad2=new actividades("2","CROSSFIT","3000","Entrenamiento de alta intensidad","crossfit");
const actividad3=new actividades("3","FUNCIONAL","2500","Entrenamiento aerobico de alta resistencia","funcional");
const actividad4=new actividades("4","SPINNING","2200","Entrenamiento cardio y aerobico en bicicleta estatica","spinning");
//-------------VARIABLES------------//
let carrito = [];
const workout = [actividad1,actividad2,actividad3,actividad4];
const validacionForm = {
    nameForm: false,
    lastName: false,
    emailForm:false,
    documentForm:false,
    phoneForm:false,
    dateForm:false,
}
const url= "https://api.emailjs.com/api/v1.0/email/send";
const menu=document.getElementById("icon-main");
const mainList=document.getElementById("main-list");
const workoutRow=document.getElementById("workout-row");
const workout1=document.getElementById("workouts");
const cart=document.getElementById("cart");
const modalCart=document.querySelector(".modal-cart");
const listRow= document.getElementsByClassName("list-row");
const priceRow= document.getElementsByClassName("price");
const totalPrice= document.getElementById("final-price");
const cleanCart= document.getElementById("btn-clean");
const buy=document.getElementById("btn-buy");
const nameForm= document.getElementById("nameForm");
const lastName= document.getElementById("lastName");
const emailForm= document.getElementById("emailForm");
const documentForm= document.getElementById("documentForm");
const phoneForm= document.getElementById("phoneForm");
const dateForm= document.getElementById("dateForm");
let socios=JSON.parse(localStorage.getItem("usuario")) || [];

//-------------FUNCIONES-----------//
const usuarioNuevo= ()=>{
    let nombre= document.getElementById("nameForm").value;;
    let apellido= document.getElementById("lastName").value;;
    let email= document.getElementById("emailForm").value;;
    let dni= document.getElementById("documentForm").value;;
    let telefono= document.getElementById("phoneForm").value;;
    let fecha= document.getElementById("dateForm").value;;
    let usuario= new registroSocio (nombre,apellido,email,dni,telefono,fecha);
    
    if((nombre != "") && (apellido!= "") && (email != "") && (dni != "") && (telefono != "") && (fecha != "")){
        socios.push(usuario);
        localStorage.setItem("usuario",JSON.stringify(socios));
    }
}

const formularioValidado = () =>{
    if((validacionForm.nameForm==true) && (validacionForm.lastName==true) && (validacionForm.emailForm==true) && (validacionForm.documentForm==true) && (validacionForm.phoneForm==true) && (validacionForm.dateForm==true)){
        swal("¡Felicitaciones!", "Formulario enviado", "success");
    }
    
    else{
        swal("¡Error!", "Rellene todos los campos del formulario", "error");
    }
}

const agregarCarrito = () =>{
    workoutRow.innerHTML="";

    carrito.forEach(item =>{
        let row = document.createElement("div");
        row.innerHTML=
        `<ul class="list-row" id="${item.id}">
            <li>${item.nombre}</li>
            <li> <span class="price">${item.precio}</span></li>
        </ul>    
        `
    workoutRow?.appendChild(row);
    });
    totalPrice.innerHTML=carrito.reduce((acc, item) => acc + parseInt(item.precio),0);
}

const removeCart = () =>{
    carrito=[];
    workoutRow.innerHTML="";
    totalPrice.innerHTML="$0";

    btn1.innerText="Inscribite";
    btn2.innerText="Inscribite";
    btn3.innerText="Inscribite";
    btn4.innerText="Inscribite";
}

workout.forEach(item => {
    let divNodo=document.createElement("div");
    divNodo.innerHTML=`<div class="box-img">
    <img src="./img/${item.imagen}.jpg">
    <div class="text">
        <h3>${item.nombre}</h3>
        <p>${item.resumen}. 12 clases al mes a tan solo ${item.precio}.</p>
        <button id=boton-${item.id}>Inscribite</button>
    </div>    
</div>
    `
    workout1?.appendChild(divNodo);
    
});

const validarNombre=()=>{
    let nameForm= document.getElementById("nameForm").value;
    if(nameForm.value != ""){
        validar=true;
    } 
}

const validarApellido=()=>{ 
    let lastName= document.getElementById("lastName").value;
    if(lastName.value != ""){
        validar=true;
    }
}

const validarMail=()=>{ 
     let emailForm= document.getElementById("emailForm").value;
     if(emailForm.value != ""){
        validar=true;
    }
}

const validarDocument=()=>{ 
    let documentForm= document.getElementById("documentForm").value;
    if(documentForm.length > 7){
        validar=true;
    }
}

const validarPhone=()=>{ 
    let phoneForm= document.getElementById("phoneForm").value;
    if( !isNaN(phoneForm.value)){
        validar=true;
    }
}

const validarDate=()=>{ 
    dateForm= document.getElementById("dateForm").value;
    if(dateForm.value != ""){
        validar=true;
    }
} 

//-----------------EVENTOS-------------//

menu?.addEventListener("click",() =>{
    mainList.classList.toggle("dissapear");
})

cart?.addEventListener("click",(e)=>{
    modalCart.classList.toggle("close");
})

cleanCart?.addEventListener("click",() =>{
    removeCart();
})

buy?.addEventListener("click",()=>{
    swal("¡Felicitaciones!", "Muchas gracias por su compra", "success");
    removeCart();
})

const btn1=document.getElementById("boton-1");
btn1?.addEventListener("click",(e)=>{
    let buscar=workout.find(item => "boton-"+item.id ==e.target.id);
    if(btn1.innerText=="Inscribite"){   
        carrito.push(buscar);
        swal("¡Inscripción exitosa!", "Añadido al carrito", "success");
        btn1.innerText="Desinscribirse";
        agregarCarrito();
    }

    else{
        return false;
    }
})

const btn2=document.getElementById("boton-2");
btn2?.addEventListener("click",(e)=>{
    let buscar=workout.find(item => "boton-"+item.id ==e.target.id);
    if(btn2.innerText=="Inscribite"){
        carrito.push(buscar);
        swal("¡Inscripción exitosa!", "Añadido al carrito", "success");
        btn2.innerText="Desinscribirse";
        agregarCarrito();
    }

    else{
        return false;
    }
})

const btn3=document.getElementById("boton-3");
btn3?.addEventListener("click",(e)=>{
    let buscar=workout.find(item => "boton-"+item.id ==e.target.id);
    if(btn3.innerText=="Inscribite"){
        carrito.push(buscar);
        swal("¡Inscripción exitosa!", "Añadido al carrito", "success");
        btn3.innerText="Desinscribirse";
        agregarCarrito(); 
    }

    else{
        return false;
    }
})

const btn4=document.getElementById("boton-4");
btn4?.addEventListener("click",(e)=>{
    let buscar=workout.find(item => "boton-"+item.id ==e.target.id);
    if(btn4.innerText=="Inscribite"){
        carrito.push(buscar);
        swal("¡Inscripción exitosa!", "Añadido al carrito", "success");
        btn4.innerText="Desinscribirse";
        agregarCarrito(); 
    }

    else{
        return false;
    }
})

const enviarDatos = ()=>{
    fetch(url,{
        method: "POST",
        body: JSON.stringify({
            service_id: "service_u885hh8",
            template_id: "template_w4aq7df",
            user_id: "rk1CobxNJFEmiSWDN",
        }),
        headers: {'content-type':'application/json'}
    })
    .then(response => response.text())
    .then(data => console.log(data))
}


//---------EVENTOS DE PAGE ASOCIATE------------//

nameForm?.addEventListener("change", (e)=>{
    if(e.target.value.length > 0){
        validacionForm.nameForm = true;
    }
})

lastName?.addEventListener("change", (e)=>{//
    if(e.target.value.length > 0){
        validacionForm.lastName = true;
    }
})

emailForm?.addEventListener("change", (e)=>{//
    if(e.target.value.length > 0){
        validacionForm.emailForm = true;
    }
})

documentForm?.addEventListener("change", (e)=>{//
    if(e.target.value.length >=7 ){
        validacionForm.documentForm = true;
    }
})

phoneForm?.addEventListener("change", (e)=>{//
    if(!isNaN(e.target.value)){
        validacionForm.phoneForm = true;
    }
})

dateForm?.addEventListener("change", (e)=>{//
    if(e.target.value.length >0 ){
        validacionForm.dateForm = true;
    }
})

const buttonSubmit= document.getElementById("submitButton");
buttonSubmit?.addEventListener("click", (e)=>{
        e.preventDefault();
        formularioValidado();
        usuarioNuevo();
        enviarDatos();
})