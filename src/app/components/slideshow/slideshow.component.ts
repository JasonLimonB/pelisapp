import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/CarteleraResponse';

import { Swiper } from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movie:Movie[];

  public mySwiper: Swiper;

  constructor() { }

  ngAfterViewInit(): void {
     this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
    
  }

  ngOnInit(): void { 
    
  }

  onNext(  ){
    this.mySwiper.slideNext();
  }
  onPrev(){
    this.mySwiper.slidePrev();
  }

}
