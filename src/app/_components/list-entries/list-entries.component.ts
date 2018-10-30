import { Component, OnInit } from '@angular/core';
import { EntryTypeService } from '../../_services/entry-type.service';
import { EntryType } from '../../_models/entry-type';
import { EntryService } from '../../_services/entry.service';
import { Entry } from '../../_models/entry';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-list-entries',
  templateUrl: './list-entries.component.html',
  styleUrls: ['./list-entries.component.scss']
})
export class ListEntriesComponent implements OnInit {

  entryTypes: EntryType[] = [];

  private entryTypeId: String = null;
  private entries: Entry[] = [];
  private preSelectedEntryType: EntryType;
  
  constructor(private dataService: DataService, private entryTypeService: EntryTypeService, private entryService: EntryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.entryTypeService.getAllSubEntryTypes()
    .subscribe(entryTypes => {
      this.entryTypes = entryTypes;
      if(this.dataService.data != null) {
        this.preSelectedEntryType = this.entryTypes.find(entryType => entryType.name === this.dataService.data)
        this.entryTypeId = this.preSelectedEntryType.id;
        this.dataService.data = null;
        this.getEntries();
      }
    })
  }

  getEntries(): void {
    this.entryService.getEntriesById(this.entryTypeId)
    .subscribe(entries => {
      this.entries = entries;
    })
  }

}