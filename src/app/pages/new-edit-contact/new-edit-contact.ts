import { Component, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, NewContact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-edit-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.css'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router);
  errorEnBack = false;
  idContacto = input<number>();
  contactoOriginal: Contact | undefined = undefined;
  form = viewChild<ElementRef<NgForm>>('newContactForm');

  async ngOnInit() {
    if (this.idContacto()) {
      // Si hay idContacto, significa que estamos en modo edición
      this.contactoOriginal = await this.contactsService.getContactById(this.idContacto()!);
    }
  }

  async saveContact(form: NgForm) {
    this.errorEnBack = false;

    const contactoData: NewContact = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: form.value.isFavorite
    };

    try {
      if (this.idContacto()) {
        // 🩷 Editar contacto existente
        const updated = await this.contactsService.updateContact(this.idContacto()!, contactoData);
        if (!updated) throw new Error('Error al actualizar');
        this.router.navigate(['/contacts', this.idContacto()]);
      } else {
        // 💕 Crear nuevo contacto
        const res = await this.contactsService.createContact(contactoData);
        if (!res) throw new Error('Error al crear');
        this.router.navigate(['/contacts', res.id]);
      }
    } catch {
      this.errorEnBack = true;
    }
  }

  cancelar() {
    if (this.idContacto()) {
      this.router.navigate(['/contacts', this.idContacto()]);
    } else {
      this.router.navigate(['/contacts']);
    }
  }
}