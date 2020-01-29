import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../../services/youtube.service';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { NotifyService } from '../../services/notify.service';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

	constructor(
		private youtube: YoutubeGetVideo,
		private shared: SharedService,
		public globals: GlobalsService,
		private notify: NotifyService
	) { }

	ngOnInit() {
		this.initCategories();
	}

	initCategories() {
		this.youtube.categories().then(catData => {
			this.converFilterObject(catData);
		});
	}

	categoryChanged(event: Event) {
		const category = event.target['value'];
		this.notify.triggerNotify(24, 1000);
		if (category !== 'all') {
			this.globals.currentCategory = category;
			this.getCategories();
		} else {
			this.resetCategories();
		}
	}

	converFilterObject(catData: Object) {
		const categoryArray = [];
		let categoryObject = {};

		catData['items'].map(category => {
			categoryObject['id'] = category.id;
			categoryObject['title'] = category.snippet.title;
			categoryObject['assignable'] = category.snippet.assignable;
			categoryArray.push(categoryObject);
			categoryObject = {};
		});

		this.globals.categories = categoryArray;
	}

	getCategories() {
		this.youtube.categories().then(catData => {
			this.converFilterObject(catData);
			this.getCategoriesVideos(this.globals.currentCategory);
		});
	}

	async getCategoriesVideos(val: string) {
		this.globals.loadingState.feed = true;
		const res2 = await this.youtube.feedVideos(val);
		this.shared.convertVideoObject(res2['items'], 'categoryVideos');
		this.globals.loadingState.feed = false;
	}

	resetCategories() {
		this.globals.loadingState.feed = true;
		this.globals.currentCategory = 'all';
		this.globals.feedVideos = [];
		this.shared.initFeed().then(() => {
			this.globals.loadingState.feed = false;
		});
	}
}
