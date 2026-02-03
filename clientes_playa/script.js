/* USUARIOS AUTORIZADOS */
let usuarios = {
  "roussearoni": "1234",
  "yurico": "1234",
  "jeny": "1234"
};

/* PLAYAS */
let datos = {
  "Punta Hermosa": ["Playa Norte", "Playa Sur"],
  "Asia": ["Playa Blanca", "Playa Central"],
  "Pucusana": ["Playa Naplo", "Playa Principal"]
};

/* CLIENTES GUARDADOS */
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

/* SESION */
let usuarioActivo = localStorage.getItem("usuarioActivo");


/* LOGIN */
function login() {
  let user = document.getElementById("usuario").value.toLowerCase();
  let pass = document.getElementById("password").value;

  if (usuarios[user] && usuarios[user] === pass) {
    localStorage.setItem("usuarioActivo", user);
    window.location.href = "sistema.html";
  } else {
    document.getElementById("error").textContent =
      "❌ Usuario o contraseña incorrectos";
  }
}


/* CERRAR SESION */
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "index.html";
}


/* VERIFICAR ACCESO */
function verificarAcceso() {
  if (!document.getElementById("bienvenida")) return;

  if (usuarioActivo) {
    document.getElementById("zonaRegistro").style.display = "block";
    document.getElementById("btnCerrar").style.display = "inline-block";
    document.getElementById("bienvenida").textContent =
      "👋 Bienvenida " + usuarioActivo.toUpperCase();
  } else {
    document.getElementById("bienvenida").textContent =
      "👀 Modo público: solo búsqueda";
  }
}


/* CARGAR DISTRITOS */
function cargarDistritos() {
  let select = document.getElementById("distritoSelect");
  if (!select) return;

  select.innerHTML = "";

  let op = document.createElement("option");
  op.textContent = "Seleccione Distrito";
  op.value = "";
  select.appendChild(op);

  for (let distrito in datos) {
    let option = document.createElement("option");
    option.value = distrito;
    option.textContent = distrito;
    select.appendChild(option);
  }
}


/* PLAYAS */
function actualizarPlayas() {
  let distrito = document.getElementById("distritoSelect").value;
  let playaSelect = document.getElementById("playaSelect");

  playaSelect.innerHTML = "";

  let op = document.createElement("option");
  op.textContent = "Seleccione Playa";
  op.value = "";
  playaSelect.appendChild(op);

  if (distrito === "") return;

  datos[distrito].forEach(playa => {
    let option = document.createElement("option");
    option.value = playa;
    option.textContent = playa;
    playaSelect.appendChild(option);
  });
}


/* REGISTRAR CLIENTE */
function registrarCliente() {
  let nombre = document.getElementById("nombre").value;
  let dni = document.getElementById("dni").value;
  let numero = document.getElementById("numero").value;
  let distrito = document.getElementById("distritoSelect").value;
  let playa = document.getElementById("playaSelect").value;
  let ubicacion = document.getElementById("ubicacion").value;

  if (!nombre || !dni || !numero || !distrito || !playa || !ubicacion) {
    alert("⚠️ Completa todo");
    return;
  }

  clientes.push({
    nombre: nombre,
    dni: dni,
    numero: numero,
    distrito: distrito,
    playa: playa,
    ubicacion: ubicacion
  });

  localStorage.setItem("clientes", JSON.stringify(clientes));

  alert("✅ Cliente guardado");

  mostrarClientes();
}


/* MOSTRAR CLIENTES */
function mostrarClientes() {
  let div = document.getElementById("listaClientes");
  if (!div) return;

  div.innerHTML = "";

  clientes.forEach(c => {
    div.innerHTML += "<p><b>" + c.nombre +
      "</b><br>📍 " + c.distrito + " - " + c.playa +
      "</p><hr>";
  });
}


/* BUSCAR */
function buscarCliente() {
  let texto = document.getElementById("buscar").value.toLowerCase();
  let div = document.getElementById("resultadoBusqueda");

  div.innerHTML = "";

  clientes.filter(c =>
    c.nombre.toLowerCase().includes(texto)
  ).forEach(c => {
    div.innerHTML += "<p><b>" + c.nombre +
      "</b><br>📍 " + c.distrito + " - " + c.playa +
      "</p><hr>";
  });
}


/* INICIO */
window.onload = function () {
  verificarAcceso();
  cargarDistritos();
  actualizarPlayas();
  mostrarClientes();
};