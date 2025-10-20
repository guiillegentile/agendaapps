import { Component, OnInit, inject } from '@angular/core';
import { ContactsService } from '../../services/contacts-service';
import { Contact } from '../../interfaces/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-details-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.css'
})
export class ContactDetailsPage implements OnInit {
  contacto: Contact | undefined;
  cargandoContacto = true;
  editando = false;

  constructor(
    private contactService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.cargandoContacto = false;
      return;
    }

    // Primero busco en el array local
    this.contacto = this.contactService.contacts.find(c => c.id.toString() === id);

    // Si no lo encuentro, busco en backend
    if (!this.contacto) {
      const res = await this.contactService.getContactById(id);
      if (res) this.contacto = res;
    }

    this.cargandoContacto = false;
  }

  async toggleFavorite() {
    if (!this.contacto) return;
    const res = await this.contactService.setFavourite(this.contacto.id);
    if (res) this.contacto.isFavorite = !this.contacto.isFavorite;
  }

  async deleteContact() {
    if (!this.contacto) return;
    const res = await this.contactService.deleteContact(this.contacto.id);
    if (res) this.router.navigate(['/']);
  }

  async guardarCambios() {
    if (!this.contacto) return;
    const res = await this.contactService.editContact(this.contacto);
    if (res) {
      this.editando = false;
      alert('Contacto actualizado ✅');
    } else {
      alert('Error al actualizar');
    }
  }

  cancelarEdicion() {
    this.editando = false;
  }
}