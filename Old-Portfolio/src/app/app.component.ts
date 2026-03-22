import { DOCUMENT, ViewportScroller } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";

import { Observable, fromEvent, map } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "mPrograms-mg";

  activeNavItem: string = "home"; // Set the default active navigation item

  @HostListener("window:scroll", []) onScroll(): void {
    const homeElement = document.getElementById("home");
    const aboutElement = document.getElementById("about");
    const skillElement = this.document.getElementById("skill");
    const workElement = this.document.getElementById("work");
    const contectElement = this.document.getElementById("contact");

    if (this.isElementInViewport(homeElement)) {
      this.activeNavItem = "home";
    } else if (this.isElementInViewport(aboutElement)) {
      this.activeNavItem = "about";
    } else if (this.isElementInViewport(skillElement)) {
      this.activeNavItem = "skill";
    } else if (this.isElementInViewport(workElement)) {
      this.activeNavItem = "work";
    } else if (this.isElementInViewport(contectElement)) {
      this.activeNavItem = "contact";
    }
  }

  isElementInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top <= 100 && rect.bottom >= 100;
  }

  constructor() {}

  ngOnInit(): void {}

  @ViewChild("navbarToggler") navbarToggler: ElementRef;

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }

  private readonly document = inject(DOCUMENT);
  private readonly viewport = inject(ViewportScroller);

  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    "scroll"
  ).pipe(map(() => this.viewport.getScrollPosition()?.[1] > 0));

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
