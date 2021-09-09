import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UtilisateurService} from '../../service/utilisateur.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Token} from '../../utils/token/token';
import {Router} from '@angular/router';

@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  messageErreur: string;

  constructor(private title: Title, private utilisateurService: UtilisateurService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.initLoginForm();
    this.messageErreur = '';
  }

  ngOnInit(): void {
    this.title.setTitle('page de connexion');
    this.initLoginForm();
    localStorage.removeItem('token');
  }

  initLoginForm(): FormGroup {
    return this.loginForm = this.formBuilder.group({
      nomUtilisateur : this.formBuilder.control('', Validators.required),
      motDePasse     : this.formBuilder.control('', Validators.required),
      seSouvenirDeMoi: this.formBuilder.control(false, Validators.required)
    });
  }

  loginFormAction(): void {
    this.messageErreur = '';
    const formData = new FormData();
    formData.append('nomUtilisateur', this.loginForm.value.nomUtilisateur);
    formData.append('motDePasse', this.loginForm.value.motDePasse);
    formData.append('seSouvenirDeMoi', this.loginForm.value.seSouvenirDeMoi);
    this.utilisateurService.login(formData).then(() => {
      const token = localStorage.getItem('token');
      if (token != null) {
        this.router.navigate(['/', 'application', 'accueil']);
      } else {
        this.messageErreur = 'Nom d\'utilisateur ou mot de passe incorrect';
      }
    }).catch(() => this.messageErreur = 'Connexion au serveur impossible').finally(() => setTimeout(() => this.messageErreur = '', 1500));
  }

}
