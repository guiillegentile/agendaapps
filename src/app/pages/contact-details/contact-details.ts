import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.css'
})
export class ContactDetails {
  contact = { name: 'John Doe', email: 'john.doe@example.com' };
}
