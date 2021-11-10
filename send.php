<?php
/**
 * @version 1.0
 */

require("./php/class.phpmailer.php");
require("./php/class.smtp.php");

// Valores enviados desde el formulario
if ( !isset($_POST["nombre"]) || !isset($_POST["email"]) || !isset($_POST["mensaje"]) || !isset($_POST["telefono"]) ) {
    die ("Es necesario completar todos los datos del formulario");
}
$nombre = $_POST["nombre"];
$email = $_POST["email"];
$mensaje = "Mensaje: " . $_POST["mensaje"] . "\nTelefono: " . $_POST["telefono"] . "\r\n";


// Datos de la cuenta de correo utilizada para enviar vía SMTP
$smtpHost = "c2340106.ferozo.com";  // Dominio alternativo brindado en el email de alta 
$smtpUsuario = "no-reply@c2340106.ferozo.com";  // Mi cuenta de correo
$smtpClave = "sXbEHlwDmk";  // Mi contraseña

// Email donde se enviaran los datos cargados en el formulario de contacto
$emailDestino = "info@fundacion-despertar.com";

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Port = 465; 
$mail->SMTPSecure = 'ssl';
$mail->IsHTML(true); 
$mail->CharSet = "utf-8";


// VALORES A MODIFICAR //
$mail->Host = $smtpHost; 
$mail->Username = $smtpUsuario; 
$mail->Password = $smtpClave;

$mail->From = $email; // Email desde donde envío el correo.
$mail->FromName = $nombre;
$mail->AddAddress($emailDestino); // Esta es la dirección a donde enviamos los datos del formulario

$mail->Subject = "Mensaje desde fundacion-despertar.com"; // Este es el titulo del email.
$mensajeHtml = nl2br($mensaje);
$mail->Body = "{$mensajeHtml} <br /><br/>Mensaje generado a través del formulario de contacto"; // Texto del email en formato HTML
$mail->AltBody = "{$mensaje} \n\n Enviado desde la web"; // Texto sin formato HTML
// FIN - VALORES A MODIFICAR //

$estadoEnvio = $mail->Send(); 
if($estadoEnvio){
    echo "<script>alert('El mensaje fue enviado correctamente');location.href ='./index.html';</script>";
} else {
    echo "Ocurrió un error inesperado.";
}
?>