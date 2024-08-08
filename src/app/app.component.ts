import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { AccountComponent } from './components/account/account.component';
import { AuthComponent } from './components/auth/auth.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    AccountComponent,
    AuthComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'maze-rats';
  session: any;

  constructor(private readonly supabase: SupabaseService) {
    this.session = this.supabase.session;
  }

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }
}
