import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>;
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = "";

  @Output()
  onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  @Input()
  public initialValue: string = "";

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    })
  }

  ngOnDestroy(): void {
    if (this.debouncerSuscription) {
      this.debouncerSuscription.unsubscribe();
    }
  }

  /* emitValue(txtValue: string): void {
    this.onValue.emit(txtValue);
  } */

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

}
