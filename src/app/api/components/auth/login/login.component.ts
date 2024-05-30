import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/services/auth/auth.service';
import { StorageService } from 'src/app/api/services/auth/storage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
declare var particlesJS: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    valCheck: string[] = ['remember'];
    password!: string;
    registerForm!: FormGroup;
    submitted: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private storageService: StorageService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        // particlesJS.load(
        //     'particles-js',
        //     'assets/particles.json',
        //     function () {}
        // );

        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            // this.roles = this.storageService.getUser().roles;
        }

        this.initializeForm();
    }

    initializeForm() {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: [false],
        });
        this.registerForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: [false],
        });
    }
    get f() {
        return this.registerForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        const username = this.registerForm.get('username')?.value;
        const password = this.registerForm.get('password')?.value;
        console.log(this.registerForm.value);

        this.authService.login(username, password).subscribe(
            (response) => {
                this.storageService.saveToken(response.access_token);
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                // this.roles = this.storageService.getToken().roles;
                this.router.navigate(['/']);
            },
            (error) => {
                this.errorMessage = error.message;
                this.isLoginFailed = true;
            }
        );
    }
}
