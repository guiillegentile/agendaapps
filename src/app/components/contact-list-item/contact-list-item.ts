import { Component, inject, input, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts-service';
import { Contact } from '../../interfaces/contact';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-details-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.css'
})
export class ContactDetailsPage implements OnInit {
  // Id del contacto pasado desde la ruta
  idContacto = input.required<string>();

  // Servicio y router
  readonly contactService = inject(ContactsService);
  router = inject(Router);

  // Datos del contacto
  contacto: Contact | undefined;
  cargandoContacto = false;

  // Estado de edición
  editando = false;

  async ngOnInit() {
    if (this.idContacto()) {
      // Busco primero en el array local del servicio
      this.contacto = this.contactService.contacts.find(
        c => c.id.toString() === this.idContacto()
      );

      if (!this.contacto) this.cargandoContacto = true;

      // Luego busco en el backend
      const res = await this.contactService.getContactById(this.idContacto());
      if (res) this.contacto = res;

      this.cargandoContacto = false;
    }
  }

  // Marcar o desmarcar favorito
  async toggleFavorite() {
    if (this.contacto) {
      const res = await this.contactService.setFavourite(this.contacto.id);
      if (res) this.contacto.isFavorite = !this.contacto.isFavorite;
    }
  }

  // Eliminar contacto
  async deleteContact() {
    if (this.contacto) {
      const res = await this.contactService.deleteContact(this.contacto.id);
      if (res) this.router.navigate(['/']);
    }
  }

  // Guardar cambios en modo edición usando tu método editContact
  async guardarCambios() {
    if (this.contacto) {
      const res = await this.contactService.editContact(this.contacto);
      if (res) {
        alert('Contacto actualizado correctamente');
        this.editando = false;
      } else {
        alert('Error al actualizar');
      }
    }
  }

  // Cancelar edición
  cancelarEdicion() {
    this.editando = false;
  }
}

