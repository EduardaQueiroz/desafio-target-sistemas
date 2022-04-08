import { FormControl, Validators } from '@angular/forms';
import { PessoaModel } from './../../models/pessoaModel';
import { Component, OnInit } from '@angular/core';

import { FormularioService } from 'src/app/service/formulario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  pessoa: PessoaModel = {
    nome: "",
    telefone: ""
  }

  dataSourcePessoas: PessoaModel[] = [];
  displayedColumns = ['codigo', 'nome', 'telefone'];

  nomeFormControl = new FormControl('', [Validators.required]);
  telefoneFormControl = new FormControl('', [Validators.required]);

  sortedData: PessoaModel[];

  constructor(private formularioService: FormularioService, private snackBar: MatSnackBar) {
    this.sortedData = this.dataSourcePessoas.slice();
  }

  ngOnInit(): void {
    this.popularTabela()
  }

  salvar() {
    if (this.pessoa.nome !== "" && this.pessoa.telefone !== "") {
      this.formularioService.salvar(this.pessoa).subscribe(() => {

        this.popularTabela();

        this.snackBar.open("Pessoa cadastrada!", 'X', {
          duration: 2000,
          verticalPosition: "top",
          horizontalPosition: "center"
        })

      });

    } else {
      this.snackBar.open("Preencha todos os campos, por favor!", 'X', {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "center"
      })
    }
  }

  popularTabela() {
    this.formularioService.listarPessoas().subscribe((pessoas: PessoaModel[]) => {
      this.dataSourcePessoas = pessoas;
    });

    console.log(this.dataSourcePessoas)
  }

  sortData(sort: Sort) {
    const data = this.dataSourcePessoas.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'codigo':
          return this.compare(`${a.id}`, `${b.id}`, isAsc);
        case 'nome':
          return this.compare(a.nome, b.nome, isAsc);
        case 'telefone':
          return this.compare(a.telefone, b.telefone, isAsc);
        default:
          return 0;
      }
    });
    
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


}
