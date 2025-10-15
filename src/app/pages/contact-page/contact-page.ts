import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { Contact, NewContact } from '../../interfaces/contact';
import { AuthService } from '../../services/auth-service';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  imports: [RouterModule,ContactListItem, FormsModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css'
})
export class ContactPage implements OnInit {
  ngOnInit(): void {
    this.contactsService.getContacts();
  }

  authService = inject(AuthService);
  contactsService = inject(ContactsService);

}
