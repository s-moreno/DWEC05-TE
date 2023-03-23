import { NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import { Configuracion } from '../modelos/configuracion';

@Component({
  selector: 'app-adivina-numero',
  templateUrl: './adivina-numero.component.html',
  styleUrls: ['./adivina-numero.component.css'],
})

export class AdivinaNumeroComponent {
  public nombreUsuario: String = '';
  public apellidoUsuario: String = '';
  public rangoNum: number = 1;
  public intentos: number = 1;
  public numeroUsuario: number = 0;
  public intentosRestantes: number = 0;
  
  public respuesta : String = "";
  public disabled = true;
  public numerosIntentados : Array<number> = [];
  public noAdivinado : boolean = false;
  public alerta : String = "alert-success";

  public conf : Configuracion =  new Configuracion(this.nombreUsuario,this.apellidoUsuario,this.rangoNum,this.intentos, 0);
 
  formValido(): boolean {
    return (this.conf.nombreUsuario != "" && this.conf.apellidoUsuario != "" && this.conf.rangoNum > 0 && this.conf.intentos > 0)
  }
  
  getDatos(): void {
    this.conf.nombreUsuario = this.nombreUsuario;
    this.conf.apellidoUsuario = this.apellidoUsuario;
    this.conf.rangoNum = this.rangoNum;
    this.conf.intentos = this.intentos;

    if (!this.formValido()){
      window.alert("Es necesario rellenar todos los campos del formulario, y los números mayores a 0.");
    }
    else {
      this.conf.numeroAleatorio = this.numAleatorio();
      this.intentosRestantes = this.conf.intentos;
      console.log("Número aleatorio generado --> " + this.conf.numeroAleatorio);
    }
    this.respuesta = "";
    this.numerosIntentados = [];
    this.noAdivinado = false;
    this.disabled = false;
    this.colorAlerta();
    console.log(this.conf);
  }

  numAleatorio(): number {
    return Math.round(Math.random() * this.conf.rangoNum);
  }

  comprobarNumero(): void {
    if (this.intentosRestantes > 0) {
      if (this.numeroUsuario < 0 || this.numeroUsuario > this.conf.rangoNum) {
        window.alert("El número introducido no está en el rango de números generados. Números entre 0 y " + this.conf.rangoNum + ".")
      }
      else {
        this.numerosIntentados.push(this.numeroUsuario);
        console.log(this.numerosIntentados);
        if (this.conf.numeroAleatorio == this.numeroUsuario) {
          this.respuesta = "¿Has Adivinado?: <strong>SÍ</strong>";
          this.disabled = true;
        }
        else {
          this.respuesta = "¿Has Adivinado?: <strong>NO</strong>";
        }
        this.intentosRestantes--;
        this.colorAlerta();
        if (this.intentosRestantes == 0 && this.conf.numeroAleatorio != this.numeroUsuario) {
          this.noAdivinado = true;
          this.disabled = true;
        }
      }
    }
  }

  colorAlerta() : void {
    if (this.intentosRestantes == 0) {
      this.alerta = "alert-danger";
    } 
    else if (this.intentosRestantes > 0 && this.intentosRestantes < 3) {
      this.alerta = "alert-warning";
    }
    else {
      this.alerta = "alert-success";
    }
  }
}


