import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-shell',
    imports: [RouterOutlet],
    templateUrl: './shell.html',
    styleUrls: ['./shell.scss']
})
export class ShellComponent { }
