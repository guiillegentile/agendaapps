import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { ContactsService } from '../../services/contacts-service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [RouterModule, CommonModule, ContactListItem],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css'
})
export class ContactPage {
  constructor(public contactsService: ContactsService) {}
}