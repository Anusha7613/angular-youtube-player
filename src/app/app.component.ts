import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotifyService } from './services/notify.service';
import { GlobalsService } from './services/globals.service';
import { PlaylistControlService } from './services/playlist-control.service';

@Component({
	selector: 'app-yt',
	templateUrl: 'app.component.html',
	providers: [PlaylistControlService]
})
export class AppComponent implements OnInit {
	@ViewChild('videoItemIDvalue', { static: true }) videoItemIDvalue: ElementRef;

	constructor(
		public globals: GlobalsService,
		public playlistCTRL: PlaylistControlService,
		public notify: NotifyService
	) { }

	ngOnInit() {
		this.globals.videoItemIDvalue = this.videoItemIDvalue;
	}
}
