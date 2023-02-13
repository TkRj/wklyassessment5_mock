import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { FormsModule } from '@angular/forms';
import { TopicListItemComponent } from './topic-list-item/topic-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicListComponent,
    TopicListItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
