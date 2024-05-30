import { NgModule } from '@angular/core';
import {
    HashLocationStrategy,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';

import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptor } from './api/interceptors/auth/auth.interceptor';
import { NotfoundComponent } from './api/components/notfound/notfound.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        AuthInterceptor,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
