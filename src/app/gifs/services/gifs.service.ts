import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = 'oPv0rzupgA018OXNWyj4HYmhO75bqACN';

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[]=[];

  public resultados: Gif[] =[]; 

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    //if(localStorage.getItem('historial')){
    //  this._historial = JSON.parse(localStorage.getItem('historial')!);
    //}
  }

  async buscarGifs(query: string = ''){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)) {  
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apikey)
          .set('q',query)
          .set('limit','10'); 

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

    /*
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=oPv0rzupgA018OXNWyj4HYmhO75bqACN&q=drangon&limit=10');
    const data = await resp.json();
    console.log(data);*/

    /*fetch('https://api.giphy.com/v1/gifs/search?api_key=oPv0rzupgA018OXNWyj4HYmhO75bqACN&q=drangon&limit=10')
    .then(resp => {
      resp.json().then(data =>{
        console.log(data)
      })
    })*/


    console.log(this._historial);
  }
}
