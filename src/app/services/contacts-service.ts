import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contact';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  aleatorio = Math.random();
  authService = inject(AuthService);
  readonly URL_BASE = "https://agenda-api.somee.com/api/contacts";

  contacts: Contact[] = []

  /** Obtiene los contactos del backend */
  async getContacts() {
    const res = await fetch(this.URL_BASE,
      {
        headers:{
          Authorization: "Bearer "+this.authService.token,
        }
      }
    )
    const resJson: Contact[] = await res.json()
    this.contacts = resJson;
  }

  async getContactById(id: string | number) {
    const res = await fetch(this.URL_BASE+"/"+id, 
      {
        headers: {
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if(!res.ok) return;
    const resContact:Contact = await res.json();
    return resContact;
  }

  /** Crea un contacto */
  async createContact(nuevoContacto:NewContact) {
    const res = await fetch(this.URL_BASE, 
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+this.authService.token,
        },
        body: JSON.stringify(nuevoContacto)
      });
    if(!res.ok) return;
    const resContact:Contact = await res.json();
    this.contacts.push(resContact);
    return resContact;
  }

  editContact() { }

  /** Borra un contacto */
  deleteContact(id:string) {
    this.contacts = this.contacts.filter(contact => contact.id !== id)
  }

  setFavourite() { }
}