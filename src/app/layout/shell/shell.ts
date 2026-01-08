import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-shell',
    imports: [RouterOutlet, RouterLink],
    templateUrl: './shell.html',
    styleUrls: ['./shell.scss']
})
export class ShellComponent { }
