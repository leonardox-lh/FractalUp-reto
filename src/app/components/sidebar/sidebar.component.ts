import {Component} from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  menuItems = [
    { name: 'home', icon: 'home'},
    { name: 'view1', icon: 'report'},
    { name: 'view2', icon: 'people'},
  ];
  activeItem = this.menuItems[0];
  constructor(private router:Router
  ) {
  }

  setActiveItem(item: any) {
    this.activeItem = item;
  }
  Navigate(name: string) {
    if (name === 'home') {
      this.navigateHome(name);
    } else if (name === 'view1') {
      this.navigateView1(name);
    } else if (name === 'view2') {
      this.navigateView2(name)
    }
  }

  navigateHome(name: string) {
    this.router.navigate([name]).then(r => console.log(r));
  }

  navigateView1(name: string) {
    this.router.navigate([name]).then(r => console.log(r));
  }

  navigateView2(name: string) {
    this.router.navigate([name]).then(r => console.log(r));
  }

}
