import { CommonModule } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlanCardComponent } from '../../shared/components/plan-card/plan-card.component';
import { Plano } from '../../core/models/plan-interface';
import { PlanoService } from '../../core/services/plano.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterPlan } from '../../core/models/filter-plan-interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, PlanCardComponent, HttpClientModule, ReactiveFormsModule, InfiniteScrollModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  showFilters = true;
  public planos!: Plano[];
  public totalElementos: number = 0;
  public filter: FilterPlan = { nomePlano: '', cnpj: '', status: 'todos' };
  public nextpage: number = 1;
  public page: number = 0;
  searchForm!: FormGroup;

  constructor(readonly planoService: PlanoService,  private fb: FormBuilder){}
  

  ngOnInit(): void {
    this.getPlanos();

    this.searchForm = this.fb.group({
      nomePlano: [''],
      cnpj: [''],
      registroANS: [''],
      status: ['todos']
    });
  }

  toggleFilters(e: any): void {
    this.showFilters = !this.showFilters;
    this.preventDefault(e);  
  }


  getPlanos(){
    this.planoService.findAll().subscribe({
      next: (response) => {
        this.planos = response.content;
        this.totalElementos = response.total_elements;
        this.page = response.page;
      },
      error: (err) => {
        console.error('Erro ao buscar os planos:', err);
      }
    });
  }

  submit(){
    if (this.searchForm.valid) {

      this.filter = {
        nomePlano: this.searchForm.value.nomePlano,
        cnpj: this.searchForm.value.cnpj,
        status: this.searchForm.value.status
      };

      this.planoService.findFilterPlan(this.filter).subscribe({
        next: (response) => {
          this.planos = response.content;
          this.totalElementos = response.total_elements;
          this.page = response.page;
        },
        error: (err) => {
          console.error('Erro ao buscar os planos:', err);
        }
      });
      
    }
  }

  limparFiltros(e: any) {
    this.searchForm.reset({
      nomePlano: '',  
      cnpj: '',
      status: 'todos'      
    });

    this.preventDefault(e); 
  }

  carregarMais(e: any){
    this.preventDefault(e); 
  }

  onScroll() {
    this.planoService.findAllPage(this.nextpage, this.filter).subscribe({
      next: (response) => {
        if (response.page_elements >= this.nextpage) {
          this.nextpage += 1;
          Array.from(response.content).forEach((element) => {
            this.planos = [...this.planos, element]
          })
        }
      }
    })
  }

  preventDefault(e: any){
    e.preventDefault(); 
  }
}
