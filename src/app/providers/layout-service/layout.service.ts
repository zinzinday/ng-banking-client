import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  media: any;

  constructor(private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar) {
    this.subscriber();
  }

  get isXSmall(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.XSmall);
  }

  get isSmall(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Small);
  }

  get isMedium(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Medium);
  }

  get isLarge(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Large);
  }

  get isXLarge(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.XLarge);
  }

  get isHandset(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }

  get isTablet(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Tablet);
  }

  get isWeb(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Web);
  }

  get isHandsetPortrait(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait);
  }

  get isTabletPortrait(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.TabletPortrait);
  }

  get isWebPortrait(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.WebPortrait);
  }

  get isHandsetLandscape(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.HandsetLandscape);
  }

  get isTabletLandscape(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.TabletLandscape);
  }

  get isWebLandscape(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.WebLandscape);
  }

  get isDrawerToggle() {
    return this.isHandset || this.isTablet;
  }

  subscriber() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web,
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait,
      Breakpoints.WebPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletLandscape,
      Breakpoints.WebLandscape,
    ]).subscribe((result) => {
      this.media = {
        isXSmall: this.isXSmall,
        isSmall: this.isSmall,
        isMedium: this.isMedium,
        isLarge: this.isLarge,
        isXLarge: this.isXLarge,
        isHandset: this.isHandset,
        isTablet: this.isTablet,
        isWeb: this.isWeb,
        isHandsetPortrait: this.isHandsetPortrait,
        isTabletPortrait: this.isTabletPortrait,
        isWebPortrait: this.isWebPortrait,
        isHandsetLandscape: this.isHandsetLandscape,
        isTabletLandscape: this.isTabletLandscape,
        isWebLandscape: this.isWebLandscape,
      };
    });
  }

  alert(message, action: string = 'Dismiss', duration: number = 3000) {
    this.snackBar.open(message, action, {duration: duration});
  }

}
