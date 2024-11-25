import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanoDetalhado } from '../../../core/models/plan-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plano-detalhado-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plano-detalhado-modal.component.html',
  styleUrl: './plano-detalhado-modal.component.scss',
})
export class PlanoDetalhadoModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PlanoDetalhado,
    private dialogRef: MatDialogRef<PlanoDetalhadoModalComponent>
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  getFirstLetter(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '-';
  }
}
