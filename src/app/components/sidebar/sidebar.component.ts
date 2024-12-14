import {Component, HostListener} from '@angular/core';
import { Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  isMobile: boolean = false;
  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }
  menuLinks = [
    { name: 'home', icon: 'home'},
    { name: 'view1', icon: 'report'},
    { name: 'view2', icon: 'people'},
  ];
  activeLink = this.menuLinks[0];
  constructor(private router:Router) {
    this.onResize();
  }

  setActiveLink(item: any) {
    this.activeLink = item;
  }
  Navigate(name: string, snav: MatSidenav) {
    if (name === 'home') {
      this.navigateHome(name);
    } else if (name === 'view1') {
      this.navigateView1(name);
    } else if (name === 'view2') {
      this.navigateView2(name)
    }
    if (snav.mode === 'over') { // Solo lo cierra si está en modo 'over' (móvil)
      snav.close();
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
