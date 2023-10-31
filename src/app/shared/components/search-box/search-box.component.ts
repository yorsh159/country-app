import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';


@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder:string = '';

  @Input()
  public initialValue:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription =  this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( value => { 
      console.log(value)
      this.onDebounce.emit(value)
     } )
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe()
  }

  searchCapital(value:string):void{
    this.onValue.emit(value)
  }

  onKeyPress(search:string){
    this.debouncer.next(search);
  }
}
