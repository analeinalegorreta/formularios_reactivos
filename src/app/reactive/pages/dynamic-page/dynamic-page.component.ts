import { Component } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent {

  // public myForm=new FormGroup({
  //   favoriteGame: new FormArray([])
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],

    ])

  })

  public newFavorite: FormControl= new FormControl('', Validators.required);  /// se crea un input vacio con la validacion de required

  constructor(private fb: FormBuilder) { }

  get favoriteGames() {   /// sirve para consultar el array de favoriteGames y decirle q es de tipo array  para poder despues usarla en agregar y eliminar los elemenos del array
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldArray(FormArray:FormArray, index:number){
    return FormArray.controls[index].errors
    && FormArray.controls[index].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracters.`;

      }
    }
    return null;
  }


  addToFavorites(){

    if(this.newFavorite.invalid)return;
    const newGame=this.newFavorite.value;

    //this.favoriteGames.push(new FormControl(newGame, Validators.required));  FormControl y control es igual a un input

    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    );

    this.newFavorite.reset();

  }

  onDeleteFavorite(index:number){
    this.favoriteGames.removeAt(index);
  }






  onSubmit() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray)= this.fb.array([]);  // esta linea sirve para limpiar los Favoritos una vez q se de guardar en el formulario
    this.myForm.reset();
  }

}
