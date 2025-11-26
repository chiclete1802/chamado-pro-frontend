import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChamadosService } from '../../services/chamados.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-novo-chamado',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './novo-chamado.component.html',
  styleUrls: ['./novo-chamado.style.css']
})
export class NovoChamadoComponent {
  model: { titulo?: string; descricao?: string; categoria?: string } = {};

  constructor(
    private router: Router,
    private chamados: ChamadosService,
    private auth: AuthService
  ) { }

  enviar() {
    if (!this.model.titulo || !this.model.descricao) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const emailDoUsuario = this.auth.getUserEmail() || "";
    const payload = {
      titulo: this.model.titulo!,
      descricao: this.model.descricao!,
      categoria: this.model.categoria,
      clienteNome: emailDoUsuario
    };

    this.chamados.criar(payload).subscribe({
      next: () => {
        alert('Chamado criado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao criar chamado', err);
        alert('Erro ao criar chamado: ' + (err.error?.error || err.message));
      }
    });
  }


  voltar() {
    this.router.navigate(['/']);
  }
}
