import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const rtx5090={ //datos que se cargan de una al entrar en la pagina podrian venir del backend
  name:'',
  price:'',
  inStorage:'',
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent implements OnInit{


  // public myForm:FormGroup=new FormGroup({
  //   name: new FormControl('',[],[]),   valor sincronos y asincronos  si se va a colocar mas de una validacion se colocan las llaves []
  //   price:new FormControl(0),
  //   inStorage:new FormControl(0),
  // });


  public myForm:FormGroup=this.fb.group({
      name:['', [Validators.required,Validators.minLength(3)]],
      price:[0, [Validators.required,Validators.min(0)]],
      inStorage:[0, [Validators.required,Validators.min(0)]],
  })

  constructor (private fb:FormBuilder){  }

  ngOnInit(): void {
  //  this.myForm.reset(rtx5090)   //si el backend nos manda los datos que deberian ya ir llenos en la pagina al entrar se mandarias asi en el ngoninit
  }

  onSave(){

    if(this.myForm.invalid){
    this.myForm.markAllAsTouched(); //marca todos los campos como si fueran tocados
    return;
  }
    console.log(this.myForm.value)

    this.myForm.reset({price:0,inStorage:0});  //sirve para resetear el formulario una vez que se envio la informacion con el submit

  }



}
