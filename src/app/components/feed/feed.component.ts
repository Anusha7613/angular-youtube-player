import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { SharedService } from '../../services/shared.service';
import { NotifyService } from '../../services/notify.service';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
	tempNextPageToken = "";

	@HostListener('window:scroll', ['$event'])
	onWindowScroll() {
		const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
		const max = document.documentElement.scrollHeight;
		const IS_TEMP_TOKEN_NOT_SAME = this.tempNextPageToken !== this.globals.nextPageToken;
		if (this.globals.nextPageToken && IS_TEMP_TOKEN_NOT_SAME && (pos + 700) >= max) {
			this.tempNextPageToken = this.globals.nextPageToken;
			this.shared.initFeed('', this.globals.nextPageToken);
			this.notify.triggerNotify(24, 1000);
		}
	}

	constructor(
		public globals: GlobalsService,
		public shared: SharedService,
		private notify: NotifyService
	) { }

	ngOnInit() {
	}

}
