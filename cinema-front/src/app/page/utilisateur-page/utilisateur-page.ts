import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { Utilisateur } from '../../model/utilisateur';
import { UtilisateurService } from '../../service/utilisateur-service';
import { apiError } from '../../service/api-error';

function emptyAccount(): Utilisateur {
  return {
    login: '',
    password: '',
    nom: '',
    prenom: '',
    adresse: { numero: '', voie: '', ville: '', cp: '' },
  };
}

@Component({
  selector: 'app-utilisateur-page',
  imports: [FormsModule],
  templateUrl: './utilisateur-page.html',
  styleUrl: '../accounts.css',
})
export class UtilisateurPage implements OnInit {
  private readonly service = inject(UtilisateurService);
  readonly accounts = signal<Utilisateur[]>([]);
  readonly loading = signal(false);
  readonly loaded = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly success = signal('');
  editing = false;
  selectedId: number | null = null;
  pendingDelete: Utilisateur | null = null;
  form: Utilisateur = emptyAccount();

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.error.set('');
    this.loading.set(true);
    this.service
      .findAll()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (accounts) => {
          this.accounts.set(accounts);
          this.loaded.set(true);
        },
        error: (error) => this.error.set(apiError(error)),
      });
  }

  add(): void {
    this.reset();
    this.success.set('');
    this.error.set('');
    this.editing = true;
  }

  edit(account: Utilisateur): void {
    this.reset();
    this.success.set('');
    this.error.set('');
    this.selectedId = account.id ?? null;
    this.form = {
      ...account,
      adresse: { numero: '', voie: '', ville: '', cp: '', ...account.adresse },
      password: '',
    };
    this.editing = true;
  }

  reset(): void {
    this.editing = false;
    this.selectedId = null;
    this.pendingDelete = null;
    this.form = emptyAccount();
  }

  save(accountForm: NgForm): void {
    if (accountForm.invalid || this.saving()) return;
    const payload: Utilisateur = { ...this.form };
    const request = this.service.save(payload);
    this.saving.set(true);
    this.error.set('');
    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.reset();
        this.success.set('Compte enregistré.');
        this.load();
      },
      error: (error) => this.error.set(apiError(error)),
    });
  }

  askDelete(account: Utilisateur): void {
    this.reset();
    this.error.set('');
    this.success.set('');
    this.pendingDelete = account;
  }

  confirmDelete(): void {
    const id = this.pendingDelete?.id;
    if (id === undefined || this.saving()) return;
    this.saving.set(true);
    this.service
      .remove(this.pendingDelete!)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.reset();
          this.success.set('Compte supprimé.');
          this.load();
        },
        error: (error) => this.error.set(apiError(error)),
      });
  }
}
