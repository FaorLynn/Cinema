import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { Responsable } from '../../model/responsable';
import { ResponsableService } from '../../service/responsable-service';
import { apiError } from '../../service/api-error';

function emptyAccount(): Responsable {
  return { login: '', password: '' };
}

@Component({
  selector: 'app-responsable-page',
  imports: [FormsModule],
  templateUrl: './responsable-page.html',
  styleUrl: '../accounts.css',
})
export class ResponsablePage implements OnInit {
  private readonly service = inject(ResponsableService);
  readonly accounts = signal<Responsable[]>([]);
  readonly loading = signal(false);
  readonly loaded = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly success = signal('');
  editing = false;
  selectedId: number | null = null;
  pendingDelete: Responsable | null = null;
  form: Responsable = emptyAccount();

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

  edit(account: Responsable): void {
    this.reset();
    this.success.set('');
    this.error.set('');
    this.selectedId = account.id ?? null;
    this.form = { ...account, password: '' };
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
    const payload: Responsable = { ...this.form };
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

  askDelete(account: Responsable): void {
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
