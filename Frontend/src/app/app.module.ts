import { NgModule } from '@angular/core';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient,provideHttpClient} from '@angular/common/http';
 import { ProductService } from './admin/product.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { ProductspageComponent } from './productspage/productspage.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductspageComponent,
  
    
    
   
  
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
     NgbModule
    
  ],
  providers: [
    
    [ProductService],HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
