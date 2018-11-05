import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/_services/entry.service';
import { ActivatedRoute } from '@angular/router';
import { Entry } from 'src/app/_models/entry';

@Component({
  selector: 'app-view-entry',
  templateUrl: './view-entry.component.html',
  styleUrls: ['./view-entry.component.scss']
})
export class ViewEntryComponent implements OnInit {

  entry: Entry = new Entry();
  objectKeys = Object.keys;

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(value => {
      this.entryService.getEntry(value.entry_id)
      .subscribe(entry => {
        this.entry = entry;
      })
    })
  }

}
