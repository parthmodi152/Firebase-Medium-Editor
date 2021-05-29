import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DbService } from 'src/app/shared/services/db.service';
import { User } from 'src/app/shared/services/user';

declare const MediumEditor: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  userData: User;

  constructor(
    public authService: AuthService,
    public dbService: DbService
  ) { 
    this.userData = this.authService.UserData;
  }

  @ViewChild('medium') media: ElementRef;

  ngAfterViewInit() {

    const edit = this.media.nativeElement;
    let editor;
    let text = this.dbService.getUserText(this.userData.uid).subscribe(val => {
      const editor = new MediumEditor(edit, {
        placeholder: false
      });
      editor.setContent(val, 0);
  
      editor.subscribe('editableInput', (event: any, editable: any) => {
        this.dbService.UpdateText(this.userData.uid, editor.getContent())
        console.log(editor.getContent());
      })

    })
  }

}
