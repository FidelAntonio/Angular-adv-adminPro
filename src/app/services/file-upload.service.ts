import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http:HttpClient) {}

  // funcion asyn para esto es recomendable trabajarlo con el try y catch java script puro
  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      // construyendo la url
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen',archivo); // agregando la imagen si necesitamos mas campos solo se agrega el append
      // haciendo la peticion y la alamceno en una constante
      // el fetch nos permite hacer peticiones http
      const resp = await fetch(url,{
        // declarando sus propiedades
        method:'PUT',
        headers:{
          'x-token': localStorage.getItem('token')|| ''
        },
        body: formData // todos los datos que le quiero mandar al endPoint
      });
      console.log(resp);
      
      const data = await resp.json();
      // si fu exitosa la operacion
      if(data.ok){
        return data.nombreArchivo
      }else{
        console.log(data.msg);
        return false;
      }
     
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // typeScript
  actualizarFotoT(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    const url = `${base_url}/upload/${tipo}/${id}`;
    const formData = new FormData();
    formData.append('imagen',archivo); // 
    return this.http.put( url, formData, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    })
  }
}
