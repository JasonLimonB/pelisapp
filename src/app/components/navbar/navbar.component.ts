import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  buscarPelicula(dato: string){
    dato = dato.trim();
    if(dato.length === 0){return;}

    this._router.navigate(['/buscar', dato]);

  }

}
