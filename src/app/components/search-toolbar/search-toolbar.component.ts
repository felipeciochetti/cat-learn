import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.css']
})
export class SearchToolbarComponent implements OnInit {
  constructor(private router: Router, private serviceSearch: SearchService) {}

  ngOnInit() {}

  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }
}
