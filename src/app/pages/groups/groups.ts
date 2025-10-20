import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts-service'; // tu servicio real

interface Group {
  name: string;
  contacts: any[]; // usar el tipo de tus contactos reales
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.html',
  styleUrls: ['./groups.css']
})
export class GroupsPage {
  contacts: any[] = []; // contactos reales
  groups: Group[] = [];

  showNewGroupForm = false;
  newGroupName = '';
  showAddContactsForm = false;
  selectedGroup: Group | null = null;
  selectedContacts: any[] = [];

  constructor(private contactsService: ContactsService) {
    this.loadContacts();
  }

  async loadContacts() {
    await this.contactsService.getContacts(); // carga desde tu API
    this.contacts = this.contactsService.contacts;
  }

  // Crear grupo
  openNewGroupForm() { this.showNewGroupForm = true; }
  saveNewGroup() {
    if (!this.newGroupName.trim()) return;
    this.groups.push({ name: this.newGroupName, contacts: [] });
    this.showNewGroupForm = false;
    this.newGroupName = '';
  }
  cancelNewGroup() { this.showNewGroupForm = false; }

  // Agregar contactos a grupo
  openAddContactsForm(group: Group) {
    this.selectedGroup = group;
    this.selectedContacts = [];
    this.showAddContactsForm = true;
  }
  addContactsToGroup() {
    if (!this.selectedGroup) return;
    this.selectedContacts.forEach(c => {
      if (!this.selectedGroup!.contacts.find(x => x.id === c.id)) {
        this.selectedGroup!.contacts.push(c);
      }
    });
    this.showAddContactsForm = false;
    this.selectedGroup = null;
    this.selectedContacts = [];
  }
  cancelAddContacts() {
    this.showAddContactsForm = false;
    this.selectedGroup = null;
    this.selectedContacts = [];
  }
}