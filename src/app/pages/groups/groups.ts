import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-groups',
  imports: [],
  templateUrl: './groups.html',
  styleUrl: './groups.css'
})
export class GroupsPage {
  authService = inject(AuthService);
}