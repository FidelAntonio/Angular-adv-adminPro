import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
   
  

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    // este se encarga de colocar el check respectivo 
    this.settingsService.checkCurrentTheme();

  }

  changeTheme(theme: string){
  //  a qui se cambia el tema
    this.settingsService.changeTheme(theme);
    
    
  }


}
