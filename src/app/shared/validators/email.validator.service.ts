import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, Subscriber, delay, of } from "rxjs";

@Injectable({providedIn:'root'})

export class EmailValidator implements AsyncValidator{


  validate(control: AbstractControl ): Observable<ValidationErrors | null> {

    const email=control.value;

    const httpCallObservable=new Observable<ValidationErrors|null>((Subscriber)=>{
      console.log({email});

      if(email==='ana@google.com'){
        Subscriber.next({emailTaken:true});
        Subscriber.complete();
      }

      Subscriber.next(null);
      Subscriber.complete();
    }).pipe(
      delay(3000)
    )

    return httpCallObservable;


  }






}
































