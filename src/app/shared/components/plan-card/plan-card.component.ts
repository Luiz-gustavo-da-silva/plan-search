import { Component, Input, input, OnInit } from '@angular/core';
import { Plano, PlanoDetalhado } from '../../../core/models/plan-interface';
import { CommonModule } from '@angular/common';
import { PlanoService } from '../../../core/services/plano.service';
import { MatDialog } from '@angular/material/dialog';
import { PlanoDetalhadoModalComponent } from '../plano-detalhado-modal/plano-detalhado-modal.component';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.scss',
})
export class PlanCardComponent implements OnInit {
  @Input() plano!: Plano;
  randomColor!: string;

  constructor(readonly planoService: PlanoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.randomColor = this.getRandomColor();
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getFirstLetter(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '-';
  }

  verDetalhes() {
    if(this.plano && this.plano.registro_ans){
      this.planoService.getPlanoDetalhado(this.plano.registro_ans).subscribe({
        next: (response) => {
          this.openModal(response);
        },
        error: (err) => {
          console.error('Erro ao buscar os Plano Detalhado:', err);
        }
      });
    }
  }

  openModal(planoDetalhado: PlanoDetalhado): void {
    this.dialog.open(PlanoDetalhadoModalComponent, {
      data: planoDetalhado,
      disableClose: false,
    });
  }
}
