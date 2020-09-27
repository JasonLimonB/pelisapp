import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/CarteleraResponse';
import { PeliculasService } from '../../services/peliculas/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies:Movie[] = [];
  public moviesSlideshow:Movie[] = [];
  

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = document.documentElement.scrollTop + 1300;
    const max = document.documentElement.scrollHeight;
    
    if( pos > max ){
      this._SPelis.getCartelera().subscribe( resp => {
        this.movies.push(...this.movies);
      })
    }

  }

  
  constructor(
    private _SPelis: PeliculasService
  ) { }

  ngOnInit(): void {
    this._SPelis.getCartelera()
      .subscribe( movies=>{
        this.movies = movies;
        this.moviesSlideshow = movies;
      })
  }

  ngOnDestroy(){
    this._SPelis.resetCartelera();
  }

}
